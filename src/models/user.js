const { Schema: _Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const Schema = _Schema;

const User = new Schema(
	{
		studentId: {
			type: String,
			required: true,
			unique: true,
		},
		username: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
			minLength: 6,
			maxLength: 16,
		},
		passwordConfirm: {
			type: String,
			required: true,
			validate: function (val) {
				return val === this.password;
			},
		},
		fullname: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			validate: validator.isEmail,
		},
		tel: {
			type: String,
			required: true,
			unique: true,
			length: 10,
		},
		availableBalance: {
			type: Number,
			default: 0,
			min: 0,
		},
		tuitionFee: {
			type: Number,
			default: 0,
			min: 0,
		},
		transactionHistory: [Schema.Types.ObjectId],
	},
	{
		id: false,
	}
);

User.pre('save', async function (next) {
	// 12 is salt length
	this.password = await bcrypt.hash(this.password, 12);
	this.passwordConfirm = undefined;

	next();
});

module.exports = model('User', User);
