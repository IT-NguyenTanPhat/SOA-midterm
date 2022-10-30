const catchAsync = require('../utils/catchAsync');
const {
    transactionService,
    studentService,
    userService,
    otpService,
    mailService,
} = require('../services');

const paymentController = {
    paymentView: catchAsync(async function (req, res, next) {
        const user = await userService.get({ _id: req.user._id });
        res.render('payment', { title: 'Tuition payment', user });
    }),

    pay: catchAsync(async function (req, res, next) {
        const { amount, studentId } = req.body;
        const user = await userService.get({ _id: req.user._id });

        if (!amount || !studentId || amount < 0 || amount > user.balance) {
            req.flash('error', 'Invalid data');
            return res.redirect('/');
        }

        const targetStudent = await studentService.get({ studentId });
        if (!targetStudent) {
            req.flash('error', 'Not found this student');
            return res.redirect('/');
        }

        if (targetStudent.tuition === 0) {
            req.flash('error', 'Tuition has already been paid');
            return res.redirect('/');
        }

        const detail = targetStudent.name + ' - ' + targetStudent.studentId;
        const transaction = await transactionService.create({
            transactor: user._id,
            amount,
            detail,
            student: targetStudent._id,
        });

        const otp = await otpService.create(transaction._id);
        await mailService.sendMail({
            to: user.email,
            subject:
                'Thank you for choosing our services. Here is your otp code',
            content: `<p>Please enter this otp to execute your transaction ${otp}</p>`,
        });

        res.redirect('/otp');
    }),
};

module.exports = paymentController;
