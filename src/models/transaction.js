const { Schema: _Schema, model, default: mongoose } = require('mongoose');
const User = require('./user');

const Schema = _Schema;

const Transaction = new Schema(
	{
		payer: {
			type: mongoose.Types.ObjectId,
			ref: User,
			required: true,
		},
		money: {
			type: Number,
			required: true,
			min: 0,
		},
		payFor: {
			type: mongoose.Types.ObjectId,
			ref: User,
			required: true,
		},
		createdAt: {
			type: Date,
			default: Date.now,
		},
		status: {
			type: String,
			default: 'Pending',
		},
	},
	{
		id: false,
		toJSON: {
			virtuals: true,
		},
		toObject: {
			virtuals: true,
		},
	}
);

Transaction.virtual('type').get(function () {
	return this.payer._id.equals(this.payFor._id)
		? 'Self-Payment'
		: 'For Other Payment';
});

Transaction.pre(/^find/, function (next) {
	this.populate({
		path: 'payer',
		select: 'fullname tel',
	}).populate({
		path: 'payFor',
		select: 'fullname studentId tel',
	});

	next();
});

module.exports = model('Transaction', Transaction);
