const mongoose = require('mongoose');
const dotenv = require('dotenv');

const { userModel, studentModel, transactionModel } = require('../src/models');
const users = require('./users-data');
const students = require('./students-data');

dotenv.config({ path: `${__dirname}/../.env` });
const DB = process.env.DATABASE;

const importData = async () => {
	await userModel.create(users);
	await studentModel.create(students);
};

const deleteData = async () => {
	await userModel.deleteMany();
	await transactionModel.deleteMany();
	await studentModel.deleteMany();
};

const resetData = async () => {
	await deleteData();
	await importData();
};

(async () => {
	try {
		await mongoose.connect(DB, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});

		if (process.argv[2] === 'import') {
			await importData();
			console.log('Created successfully');
		} else if (process.argv[2] === 'delete') {
			await deleteData();
			console.log('Deleted successfully');
		} else {
			await resetData();
			console.log('Reset successfully');
		}
	} catch (err) {
		console.error(err);
	} finally {
		mongoose.disconnect();
	}
})();
