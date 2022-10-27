const express = require('express');
const { transactionController, authController } = require('../controllers');

const router = express.Router();

router.use(authController.forLoggedIn);
router.post('/', transactionController.createTransaction);
router.get('/otp/:otp', transactionController.performTransaction);
router.get('/history', transactionController.getTransactionHistory);
router.get('/:id', transactionController.getTransactionDetail);

module.exports = router;
