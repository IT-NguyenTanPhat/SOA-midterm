const mongoose = require('mongoose');

async function connect() {
	try {
		await mongoose.connect(process.env.DATABASE, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log('Connect db successfully');
	} catch (error) {
		console.log('Fail to connect db');
	}
}

module.exports = { connect };
