const { Schema: _Schema, model } = require('mongoose');
const Schema = _Schema;

const Student = new Schema({
    name: String,
    studentId: String,
    tuition: Number,
});

module.exports = model('Student', Student);
    