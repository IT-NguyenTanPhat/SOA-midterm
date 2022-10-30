const express = require('express');
const router = express.Router();
const authRouter = require('./auth');
const {
    authController,
    paymentController,
    otpController,
    transactionController,
} = require('../controllers');
const {
    userService,
    transactionService,
    studentService,
} = require('../services');
const catchAsync = require('../utils/catchAsync');

/* GET home page. */
router.get(
    '/',
    authController.forLoggedIn,
    catchAsync(async (req, res, next) => {
        const user = await userService.get({ _id: req.user._id });
        const error = req.flash('error') || '';
        const transactions = await transactionService.getMany({
            transactor: req.user._id,
        });
        res.render('index', { title: 'Ibanking', user, transactions, error });
    })
);

router.get(
    '/payment',
    authController.forLoggedIn,
    paymentController.paymentView
);
router.post('/payment', authController.forLoggedIn, paymentController.pay);

router.get('/otp', authController.forLoggedIn, otpController.otpView);
router.get('/resend-otp', authController.forLoggedIn, otpController.resend);
router.post(
    '/otp',
    authController.forLoggedIn,
    otpController.verifyOtp,
    transactionController.create
);

router.get(
    '/student/:id',
    authController.forLoggedIn,
    catchAsync(async function (req, res, next) {
        const student = await studentService.get({ studentId: req.params.id });
        res.json(student);
    })
);

router.use('/auth', authRouter);

module.exports = router;
