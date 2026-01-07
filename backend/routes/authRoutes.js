const express = require('express');
const router = express.Router();
const { register, login, getMe, changePassword, verifyEmail, 
  resendVerification, } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

// Public routes
router.post('/register', register);
router.post('/login', login);
router.get('/verify-email/:token', verifyEmail);
router.post('/resend-verification', resendVerification);

// Add this line
router.put('/change-password', protect, changePassword);
// Protected routes
router.get('/me', protect, getMe);

module.exports = router;