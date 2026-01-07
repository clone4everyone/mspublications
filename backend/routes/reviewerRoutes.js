const express = require('express');
const router = express.Router();
const {
  approveSubmission,
  rejectSubmission,
  getAssignedSubmissions,
  sendBackToEditor
} = require('../controllers/reviewerController');
const { protect, authorize } = require('../middleware/auth');

// All routes are protected and only for reviewers
router.use(protect);
router.use(authorize('reviewer'));

router.get('/submissions', getAssignedSubmissions);
router.put('/submissions/:id/approve', approveSubmission);
router.put('/submissions/:id/reject', rejectSubmission);
router.put('/submissions/:id/send-back', sendBackToEditor);

module.exports = router;