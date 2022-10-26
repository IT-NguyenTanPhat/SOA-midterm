import { TuitionFee } from '../models';

const TuitionFeeService = {
    get: async (payloads, field) => {
        return await TuitionFee.findOne(payloads, field).lean();
    },

    update: async (idStudent, payloads) => {
        return await TuitionFee.findOneAndUpdate({ idStudent }, payloads);
    },
};

export default TuitionFeeService;
