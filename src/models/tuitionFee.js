import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;

const TuitionFee = new Schema({
    idStudent: { type: String, required: true },
    nameStudent: { type: String, required: true },
    isPay: { type: Boolean, required: true, default: false },
});

export default model('TuitionFee', TuitionFee);

