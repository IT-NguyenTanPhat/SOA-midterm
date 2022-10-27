const { transactionModel } = require('../models');

const TransactionService = {
    get: async (payloads, field) => {
        return await transactionModel
            .findOne(payloads, field)
            .populate('user', 'name tel email')
            .lean();
    },

    getMany: async (payloads, field) => {
        return await transactionModel
            .find(payloads, field)
            .populate('user', 'name tel email')
            .lean();
    },

    create: async (payloads) => {
        return await transactionModel.create(payloads);
    },

    update: async (id, payloads) => {
        return await transactionModel.findOneAndUpdate({ id }, payloads);
    },
};

module.exports = TransactionService;
// change userModel -> User
// check findOneAndUpdate can validate available balance and tuition fee?
