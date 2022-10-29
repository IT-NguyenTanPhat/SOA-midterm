const express = require('express');
const router = express.Router();
const authRouter = require('./auth');
const transactionRouter = require('./transaction');
const {
	authController,
	userController,
	studentController,
} = require('../controllers');

/* GET home page. */
router.get('/', authController.forLoggedIn, function (req, res, next) {
	res.render('index', { title: 'Ibanking' });
});
router.get('/payment', authController.forLoggedIn, function (req, res, next) {
	res.render('payment', { title: 'Tuition payment' });
});
router.use('/auth', authRouter);
router.use('/transactions', transactionRouter);

module.exports = router;
