const catchAsync = require('../utils/catchAsync');
const { userService } = require('../services');

const userController = {
	createSampleData: catchAsync(async (req, res, next) => {
		await userService.create([
			{
				name: 'Nguyễn Tấn Phát',
				tel: '0988662441',
				email: 'tanphat20065@gmail.com',
				balance: 25000000,
				username: 'tanphat',
				password: '123456',
			},
			{
				name: 'Nguyễn Hoài Thanh',
				tel: '0988123512',
				email: 'thanhTDTU2002@gmail.com',
				balance: 30000000,
				username: 'hoaithanh',
				password: '123456',
			},
			{
				name: 'Lý Gia Bảo',
				tel: '0986321324',
				email: 'lygiabaokg2002@gmail.com',
				balance: 27000000,
				username: 'giabao',
				password: '123456',
			},
		]);

		next();
	}),
};

module.exports = userController;
