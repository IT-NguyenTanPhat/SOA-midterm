const mongoose = require('mongoose');
const catchAsync = require('../utils/catchAsync');
const customError = require('../utils/customError');
const {
	transactionService,
	studentService,
	userService,
	otpService,
} = require('../services');

const transactionController = {
	create: catchAsync(async (req, res, next) => {
		const transactionId = req.transactionId;
		const user = await userService.get({ _id: req.user._id });

		const transaction = await transactionService.get(
			{ _id: transactionId },
			'-__v',
			false
		);

		if (!transaction) {
			req.flash('error', 'Something went wrong!');
			return res.redirect('/');
		}

		const { transactor, student, amount } = transaction;

		const session = await mongoose.startSession();
		try {
			await session.startTransaction();

			const targetStudent = await studentService.get({ _id: student });

			if (!targetStudent) {
				throw customError(500, 'Student not found');
			}

			if (targetStudent.tuition === 0) {
				throw customError(400, 'Tuition has already been paid');
			}

			if (user.balance < amount) {
				throw customError(400, 'Not enough money');
			}

			await userService.update(
				{ _id: transactor },
				{ balance: user.balance - amount }
			);

			await studentService.update({ _id: student._id }, { tuition: 0 });

			await transactionService.update(
				{ _id: transactionId },
				{ status: 'Success' }
			);

			session.commitTransaction();
			req.flash('success', 'Paid tuition successfully');
			res.redirect('/');
		} catch (err) {
			await session.abortTransaction();
			await transactionService.delete({ _id: transactionId });

			req.flash('error', 'Something went wrong!');
			res.redirect('/');
		} finally {
			session.endSession();
			otpService.invalidate(req.otp);
		}
	}),
};

module.exports = transactionController;
