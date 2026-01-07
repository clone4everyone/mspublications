
// routes/authorRoutes.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { 
  sendContactMessage, 
  getMyContacts 
} = require('../controllers/authorController');

// @route   POST /api/author/contact
// @desc    Send contact message
// @access  Private
router.post('/contact', protect, sendContactMessage);


module.exports = router;