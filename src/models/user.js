const { Schema: _Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = _Schema;

const User = new Schema({
	name: String,
	tel: {
		type: String,
		required: true,
		unique: true,
		length: 10,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	balance: {
		type: Number,
		min: 0,
		default: 0,
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
});

User.pre('save', async function (next) {
	// 12 is salt length
	this.password = await bcrypt.hash(this.password, 12);
	next();
});

module.exports = model('User', User);
