const { userModel } = require('../models');

const UserService = {
	// payload is condition (where clause)
	// field is selected field (select clause)
	get: async (payloads, field) => {
		return await userModel.findOne(payloads, field).lean();
	},

	create: async (payloads) => {
		return await userModel.create(payloads);
	},

	update: async (conditions, payloads) => {
		return await userModel.findOneAndUpdate(conditions, payloads, {
			runValidators: true,
			new: true,
		});
	},

	delete: async (id) => {
		return await userModel.findOneAndDelete({ _id: id });
	},
};

module.exports = UserService;
