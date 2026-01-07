const Journal = require('../models/Journal');
const Submission = require('../models/Submission');

// Get all active journals
exports.getAllJournals = async (req, res) => {
  try {
    const journals = await Journal.find({ isActive: true });
    res.json({ success: true, data: { journals } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get single journal by ID
exports.getJournalById = async (req, res) => {
  try {
    const journal = await Journal.findOne({ id: req.params.id, isActive: true });
    if (!journal) {
      return res.status(404).json({ success: false, message: 'Journal not found' });
    }
    res.json({ success: true, data: { journal } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get published articles for a journal
exports.getPublishedArticles = async (req, res) => {
  try {
    const { journalId } = req.params;
    const { volume, issue } = req.query;
    
    let query = {
      journal: journalId,
      status: 'published'
    };
    
    const articles = await Submission.find(query)
      .populate('author', 'prefix firstName lastName affiliation')
      .sort({ publishedAt: -1 });
    
    res.json({ success: true, count: articles.length, data: { articles } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get current issue
exports.getCurrentIssue = async (req, res) => {
  try {
    const { journalId } = req.params;
    
    const articles = await Submission.find({
      journal: journalId,
      status: 'published'
    })
    .populate('author', 'prefix firstName lastName affiliation')
    .sort({ publishedAt: -1 })
    .limit(20);
    
    res.json({ success: true, data: { articles } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = exports;