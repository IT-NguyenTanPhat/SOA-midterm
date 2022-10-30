const { studentModel } = require('../models');

const StudentService = {
	// payload is condition (where clause)
	// field is selected field (select clause)
	get: async (payloads, field) => {
		return await studentModel.findOne(payloads, field);
	},

	create: async (payloads) => {
		return await studentModel.create(payloads);
	},

	update: async (conditions, payloads) => {
		const query = studentModel.findOneAndUpdate(conditions, payloads, {
			runValidators: true,
		});
		console.log(query);
		return await query;
	},

	delete: async (id) => {
		return await studentModel.findOneAndDelete({ _id: id });
	},
};

module.exports = StudentService;
