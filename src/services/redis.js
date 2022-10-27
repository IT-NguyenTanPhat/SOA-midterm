const { createClient } = require('redis');

let redisClient;

(async () => {
	redisClient = createClient({
		socket: {
			host: process.env.REDIS_HOST,
			port: process.env.REDIS_PORT,
		},
		password: process.env.REDIS_PASSWORD,
	});

	redisClient.on('error', (err) => {
		console.log(err);
	});

	redisClient.on('connect', () => {
		console.log('redis connected');
	});

	await redisClient.connect();
})();

module.exports = redisClient;
