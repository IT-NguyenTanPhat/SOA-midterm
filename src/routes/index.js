const express = require('express');
const router = express.Router();
const authRouter = require('./auth');
const transactionRouter = require('./transaction');
/* GET home page. */
router.use('/auth', authRouter);
router.use('/transactions', transactionRouter);
router.get('/', function (req, res, next) {
	res.render('index', { title: 'Express' });
});

module.exports = router;
