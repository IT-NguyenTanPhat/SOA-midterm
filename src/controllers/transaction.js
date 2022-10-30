const mongoose = require('mongoose');
const catchAsync = require('../utils/catchAsync');
const customError = require('../utils/customError');
const {
	transactionService,
	studentService,
	userService,
	otpService,
	mailService,
} = require('../services');

const transactionController = {
	createTransaction: catchAsync(async (req, res, next) => {
		// req.body is required to have amount, studentId
		const { amount, studentId } = req.body;

		if (!amount || !studentId) {
			return res.send('Missing data');
		}

		const targetStudent = await studentService.get({ studentId }, '_id');

		if (!targetStudent) {
			return res.send('Not found this student');
		}

		if (targetStudent.tuition === 0) {
			return res.send('Tuition has already been paid');
		}

		if (amount < 0 || amount > req.user.balance) {
			return res.send('amount is invalid');
		}

		const transaction = await transactionService.create({
			transactor: req.user._id,
			amount,
			student: targetStudent._id,
		});

		const otp = await otpService.create(transaction._id);

		await mailService.sendMail({
			to: 'nht20021116@gmail.com',
			// to: req.user.email,
			subject: 'Thank you for choosing our services. Here is your otp code',
			content: `<p>Please enter this otp to execute your transaction ${otp}</p>`,
		});

		res.send('Redirect to otp page');
	}),

	verifyOtp: catchAsync(async (req, res, next) => {
		// req.body is required to have otp
		const otpCode = req.body.otp;

		if (!otpCode) {
			return res.send('Please provide otp code');
		}

		const transactionId = await otpService.get(otpCode);

		if (!transactionId) {
			return res.send('Invalid OTP or it has already expired');
		}

		req.otp = otpCode;
		req.transactionId = transactionId;
		next();
	}),

	performTransaction: catchAsync(async (req, res, next) => {
		const transactionId = req.transactionId;

		const transaction = await transactionService.get(
			{ _id: transactionId },
			'-__v',
			false
		);

		if (!transaction) {
			return res.send('500 error code');
		}

		const { transactor, student, amount } = transaction;

		const session = await mongoose.startSession();

		try {
			await session.startTransaction();

			const userBalance = req.user.balance;
			const targetStudent = await studentService.get({ student });

			if (!targetStudent) {
				throw customError(500, 'Student not found');
			}

			if (targetStudent.tuition === 0) {
				throw customError(400, 'Tuition has already been paid');
			}

			if (userBalance < amount) {
				throw customError(400, 'Not enough money');
			}

			await userService.update(
				{ _id: transactor },
				{ balance: userBalance - amount }
			);

			await studentService.update({ student }, { tuition: 0 });

			await transactionService.update(
				{ _id: transactionId },
				{ status: 'Success' }
			);

			session.commitTransaction();
			res.send('Redirect to transaction detail page');
		} catch (err) {
			await session.abortTransaction();
			await transaction.updateOne({ status: 'Failed' });

			if (err.code && err.code === 400) {
				return res.send(`Flash message: ${err.message}`);
			}
			res.send('Internal Server Error');
		} finally {
			session.endSession();
			otpService.invalidate(req.otp);
		}
	}),
	getTransactionHistory: catchAsync(async (req, res, next) => {
		const transactions = await transactionService.getMany({
			transactor: req.user._id,
		});
		console.log('Transactions: ', transactions);
		res.send('Render transaction history');
	}),
	getTransactionDetail: catchAsync(async (req, res, next) => {
		const transaction = await transactionService.get({ _id: req.params.id });
		console.log(transaction);
		res.send('Render transaction detail');
	}),
};

module.exports = transactionController;
