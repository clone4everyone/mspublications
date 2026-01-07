const express = require('express');
const router = express.Router();
const {
  sendEmailMessage,
  getSubmissionEmails,
  markAsRead,
  getUnreadCount
} = require('../controllers/emailController');
const { protect, authorize } = require('../middleware/auth');
const { uploadImage } = require('../config/cloudinary');

// All routes are protected
router.use(protect);

// Only authors and editors can send emails
router.post('/send', authorize('author', 'editor'), uploadImage.array('images', 5), sendEmailMessage);

// Get emails for a submission
router.get('/submission/:submissionId', getSubmissionEmails);

// Mark email as read
router.put('/:id/read', markAsRead);

// Get unread count
router.get('/unread/count', getUnreadCount);

module.exports = router;