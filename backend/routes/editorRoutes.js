const express = require('express');
const router = express.Router();
const {
  approveSubmission,
  rejectSubmission,
  moveToReviewer,
  getQueries,
  schedulePublication,
  sendBackToAuthor , // NEW: Import this
  createReviewer,        // NEW
  getAllReviewers,       // NEW
  getAvailableReviewers, // NEW
  updateReviewer ,
  getAllAuthors,
  toggleAuthorStatus        // NEW
} = require('../controllers/editorController');
const { protect, authorize } = require('../middleware/auth');

router.use(protect);
router.use(authorize('editor'));
// Reviewer management routes
router.post('/reviewers', createReviewer);
router.get('/reviewers', getAllReviewers);
router.get('/reviewers/available/:journal', getAvailableReviewers);
router.put('/reviewers/:id', updateReviewer);

router.get('/queries/allQueries',getQueries)
router.put('/submissions/:id/approve', approveSubmission);
router.put('/submissions/:id/reject', rejectSubmission);
router.put('/submissions/:id/move-to-reviewer', moveToReviewer);
router.put('/submissions/:id/schedule', schedulePublication);
router.put('/submissions/:id/send-back', sendBackToAuthor);  // NEW: Add this route


router.get('/authors', protect, authorize('editor'), getAllAuthors);
router.put('/authors/:authorId/toggle-status', protect, authorize('editor'), toggleAuthorStatus);
module.exports = router;