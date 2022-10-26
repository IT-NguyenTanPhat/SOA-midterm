const catchAsync = require('../utils/catchAsync');
const { TransactionService } = require('../services');
const { MailService } = require('../services');

const TransactionController = {
	createTransaction: catchAsync(async (req, res, next) => {
		await MailService.sendMail({
			to: 'nht20021116@gmail.com',
			subject: 'Welcome to Google send email',
			content: `<h1>This is email to send otp</h1>`,
		});
		res.send('Otp has been sent to you email');
		// verify data
		/* 
			data: {
				payer: req.user.id,
				money: req.body.money,
				payFor: req.body.studentId
			}
		*/
		// if ok generate otp
		// call email function to send otp
	}),
	performTransaction: catchAsync(async (req, res, next) => {
		await MailService.sendMail({
			to: 'nht20021116@gmail.com',
			subject: 'Welcome to Google send email',
			content: `<h1>This is email to inform that transaction was succesful</h1>`,
		});
		res.send('Transaction was succesfully created');
		// verify otp
		// begin transaction
		// update payer balance
		// update student fee to 0
		// if transaction successful
		// generate transaction detail and invalidate otp
		// in case consistent transaction, check if the fee already paid, invalidate all otp belong to this studentId
	}),
	getTransactionHistory: catchAsync(async (req, res, next) => {
		const transactions = await TransactionService.getAll(req.user._id);
		console.log('Transactions: ', transactions);
		res.send('Render transaction history');
	}),
	getTransactionDetail: catchAsync(async (req, res, next) => {
		const transaction = await TransactionService.get({ _id: req.params.id });
		console.log(transaction);
		res.send('Render transaction detail');
	}),
};

module.exports = TransactionController;
/* submit form -> /post create transaction
validate data -> store in db with pending status
redirect to otp view

enter otp -> /confirm-transaction
select otp
if otp ok -> transaction id
transaction id

perform transaction
(update student fee to 0
update current user balance)

if success create transaction log
invalidate otp

redirect to transaction detail
or render flash error*/
