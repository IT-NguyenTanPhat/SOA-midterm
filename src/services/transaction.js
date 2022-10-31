const { transactionModel } = require('../models');

const addPopulateQuery = (query, fields) => {
	Object.entries(fields).forEach(([path, selectedFields]) =>
		query.populate(path, selectedFields)
	);
	return query;
};

const TransactionService = {
	get: async (payloads, field, needPopulate = true) => {
		const query = transactionModel.findOne(payloads, field);

		if (!needPopulate) return await query.lean();

		return await addPopulateQuery(query, {
			transactor: 'name tel email',
			student: 'studentId name',
		}).lean();
	},

	getMany: async (payloads, field) => {
		const query = transactionModel.find(payloads, field);

		const res = await addPopulateQuery(query, {
			transactor: 'name tel email',
			student: 'studentId name',
		}).lean();

		res.map((item) => {
			item.createdAt = item.createdAt.toLocaleString('vi-VN');
		});

		return res;
	},

	create: async (payloads) => {
		return await transactionModel.create(payloads);
	},

	update: async (id, payloads) => {
		return await transactionModel.findOneAndUpdate({ _id: id }, payloads, {
			new: true,
		});
	},

	delete: async (id) => {
		return await transactionModel.findOneAndDelete({ _id: id });
	},
};

module.exports = TransactionService;
