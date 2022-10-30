const { otpService } = require('../services');
const catchAsync = require('../utils/catchAsync');

const otpController = {
    otpView: function (req, res, next) {
        res.render('otp', { title: 'Verify OTP' });
    },

    verifyOtp: catchAsync(async (req, res, next) => {
        // req.body is required to have otp
        const otpCode = req.body.otp;

        if (!otpCode) {
            req.flash('error', 'Invalid OTP code');
            return res.redirect('/');
        }

        const transactionId = await otpService.get(otpCode);

        if (!transactionId) {
            req.flash('error', 'Invalid OTP code');
            return res.redirect('/');
        }

        req.otp = otpCode;
        req.transactionId = transactionId;
        next();
    }),

    resend: catchAsync(async (req, res, next) => {
        // 
    }),
};

module.exports = otpController;
