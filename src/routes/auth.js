const { Router } = require('express');

const { AuthController } = require('../controllers/auth');

const router = Router();

const authController = new AuthController();

router.post('/login', authController.login);
router.post('/register', authController.register);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);

module.exports = router;