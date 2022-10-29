const express = require('express');
const router = express.Router();
const authRouter = require('./auth');
const transactionRouter = require('./transaction');
const { authController } = require('../controllers');
const { userService, transactionService } = require('../services');
const catchAsync = require('../utils/catchAsync');

/* GET home page. */
router.get(
    '/',
    authController.forLoggedIn,
    catchAsync(async (req, res, next) => {
        const user = await userService.get({ _id: req.user._id });
        const transactions = await transactionService.getMany({
            transactor: req.user._id,
        });
        res.render('index', { title: 'Ibanking', user, transactions });
    })
);
router.get(
    '/payment',
    authController.forLoggedIn,
    catchAsync(async function (req, res, next) {
        const user = await userService.get({ _id: req.user._id });
        res.render('payment', { title: 'Tuition payment', user });
    })
);
router.post('/payment', authController.forLoggedIn, function (req, res, next) {
    res.redirect('/otp');
});

router.get('/otp', authController.forLoggedIn, function (req, res, next) {
    res.render('otp', { title: 'Verify OTP' });
});
router.post('/otp', authController.forLoggedIn, function (req, res, next) {
    console.log(req.body);
});

module.exports = router;
