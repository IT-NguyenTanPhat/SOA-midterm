const { Schema: _Schema, model } = require('mongoose');
const Schema = _Schema;

const Transaction = new Schema(
    {
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
        studentId: String,
    },
    {
        timestamps: true,
    }
);

module.exports = model('Transaction', Transaction);
