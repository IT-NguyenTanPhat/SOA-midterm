const RedisService = require('./redis');

const generateOtp = async () => {
	let otp;

	do {
		otp = '';
		const digits = '0123456789';
		const otpLength = 6;

		for (let i = 0; i < otpLength; i++) {
			const index = Math.floor(Math.random() * digits.length);
			otp += digits[index];
		}
	} while (await RedisService.get(`otp_${otp}`));

	return otp;
};

const OtpService = {
	get: async (otp) => {
		return await RedisService.get(`otp_${otp}`);
	},
	create: async (transactionId) => {
		const otpCode = await generateOtp();

		await RedisService.set(`otp_${otpCode}`, transactionId.toString(), {
			EX: 300,
		});

		return otpCode;
	},
	invalidate: async (otp) => {
		await RedisService.del(`otp_${otp}`);
	},
};

module.exports = OtpService;
