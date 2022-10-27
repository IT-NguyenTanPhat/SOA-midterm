const express = require('express');
const { authController } = require('../controllers');

const router = express.Router();

router
    .route('/login')
    .all(authController.forAnonymous)
    .get(authController.view)
    .post(authController.login);
router.get('/logout', authController.forLoggedIn, authController.logout);

module.exports = router;
