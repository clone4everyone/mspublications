const express = require('express');
const router = express.Router();
const {
  getAllJournals,
  getJournalById,
  getPublishedArticles,
  getCurrentIssue
} = require('../controllers/journalController');

// Public routes
router.get('/', getAllJournals);
router.get('/:id', getJournalById);
router.get('/:journalId/articles', getPublishedArticles);
router.get('/:journalId/current-issue', getCurrentIssue);

module.exports = router;