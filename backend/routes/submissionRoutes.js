const express = require('express');
const router = express.Router();
const {
  createSubmission,
  uploadDocument,
  addMetadata,
  confirmSubmission,
  getMySubmissions,
  getSubmission,
  getSubmissionsByJournal,
  getJournalStats,
  updateSubmissionMetadata,
  updateSubmissionDocument,
  canEditSubmission,
  getDocument,
  streamDocument
} = require('../controllers/submissionController');
const { protect, authorize } = require('../middleware/auth');
const { uploadDocument: uploadDocMiddleware } = require('../config/aws');

// Author routes
router.post('/', protect, authorize('author'), createSubmission);
router.post('/:id/upload', protect, authorize('author'), uploadDocMiddleware.single('document'), uploadDocument);
// Get PDF signed URL
router.get(
  '/submissions/:id/document',
  getDocument
);
router.put('/:id/metadata', protect, authorize('author'), addMetadata);
router.put('/:id/confirm', protect, authorize('author'), confirmSubmission);
router.get('/my-submissions', protect, authorize('author'), getMySubmissions);
router.get('/:id/document', protect, getSubmission); // Keep this for metadata
router.get('/:id/stream-document', protect, streamDocument); 
// New update routes for authors
router.put('/:id/update-metadata', protect, authorize('author'), updateSubmissionMetadata);
router.put('/:id/update-document', protect, authorize('author'), uploadDocMiddleware.single('document'), updateSubmissionDocument);
router.get('/:id/can-edit', protect, authorize('author'), canEditSubmission);

// Common routes (all authenticated users)
router.get('/:id', protect, getSubmission);

// Editor/Reviewer routes
router.get('/journal/:journal', protect, authorize('editor', 'reviewer'), getSubmissionsByJournal);
router.get('/stats/journals', protect, authorize('editor', 'reviewer'), getJournalStats);

module.exports = router;