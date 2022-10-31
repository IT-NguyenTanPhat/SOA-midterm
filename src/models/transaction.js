const { Schema: _Schema, model } = require('mongoose');
const Schema = _Schema;

const Transaction = new Schema(
	{
		name: {
			type: String,
			default: 'Pay Tuition',
		},
		detail: String,
		transactor: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		amount: {
			type: Number,
			required: true,
			min: 0,
		},
		student: {
			type: Schema.Types.ObjectId,
			ref: 'Student',
			required: true,
		},
		status: {
			type: String,
			default: 'Pending',
		},
	},
	{
		timestamps: true,
	}
);

Transaction.index(
	{ updatedAt: 1 },
	{ expires: 300, partialFilterExpression: { status: 'Pending' } }
);

module.exports = model('Transaction', Transaction);
