const { Schema: _Schema, model } = require('mongoose');
const Schema = _Schema;

const Student = new Schema({
	name: String,
	studentId: String,
	tuition: {
		type: Number,
		min: 0,
		required: true,
	},
});

module.exports = model('Student', Student);
    