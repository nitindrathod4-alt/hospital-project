const express = require('express');
const router = express.Router();
const { auth, authorize } = require('../middleware/auth');
const authController = require('../controllers/authController');

// Public routes
router.post('/register', authController.register);
router.post('/login', authController.login);

// Private routes
router.get('/me', auth, authController.getMe);
router.put('/change-password', auth, authController.changePassword);

module.exports = router;
