const Submission = require('../models/Submission');
const User = require('../models/User');
const { sendNotificationEmail } = require('../config/brevo');
// Add this helper function at the top of the file
const decrementReviewerWorkload = async (reviewerId) => {
  try {
    const reviewer = await User.findById(reviewerId);
    if (reviewer && reviewer.activeReviews > 0) {
      reviewer.activeReviews -= 1;
      await reviewer.save();
    }
  } catch (error) {
    console.error('Error decrementing reviewer workload:', error);
  }
};
// @desc    Approve submission by reviewer
// @route   PUT /api/reviewer/submissions/:id/approve
// @access  Private (Reviewer)
exports.approveSubmission = async (req, res) => {
  try {
    const { reviewerNotes } = req.body;

    const submission = await Submission.findById(req.params.id)
      .populate('author', 'firstName lastName email');

    if (!submission) {
      return res.status(404).json({
        success: false,
        message: 'Submission not found'
      });
    }

    if (!submission.reviewerAssigned || submission.reviewerAssigned.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'This submission is not assigned to you'
      });
    }

    if (submission.status !== 'with_reviewer') {
      return res.status(400).json({
        success: false,
        message: 'Submission is not in review status'
      });
    }

    submission.status = 'approved_by_reviewer';
    submission.reviewerNotes = reviewerNotes;
    submission.reviewerReviewedAt = new Date();

    submission.addTimelineEvent({
      eventType: 'reviewer_approved',
      title: 'Approved by Reviewer',
      description: 'Submission has been approved by the reviewer',
      notes: reviewerNotes,
      performedBy: req.user.id,
      performedByRole: 'reviewer'
    });

    await submission.save();

    // NEW: Decrement reviewer workload
    await decrementReviewerWorkload(req.user.id);

    // ... rest of the email notifications remain the same ...

    res.status(200).json({
      success: true,
      message: 'Submission approved successfully',
      data: { submission }
    });
  } catch (error) {
    console.error('Approve submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Error approving submission',
      error: error.message
    });
  }
};

// @desc    Reject submission by reviewer
// @route   PUT /api/reviewer/submissions/:id/reject
// @access  Private (Reviewer)
exports.rejectSubmission = async (req, res) => {
  try {
    const { rejectionReason } = req.body;

    if (!rejectionReason) {
      return res.status(400).json({
        success: false,
        message: 'Rejection reason is required'
      });
    }

    const submission = await Submission.findById(req.params.id)
      .populate('author', 'firstName lastName email');

    if (!submission) {
      return res.status(404).json({
        success: false,
        message: 'Submission not found'
      });
    }

    if (!submission.reviewerAssigned || submission.reviewerAssigned.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'This submission is not assigned to you'
      });
    }

    if (submission.status !== 'with_reviewer') {
      return res.status(400).json({
        success: false,
        message: 'Submission is not in review status'
      });
    }

    submission.status = 'rejected_by_reviewer';
    submission.rejectionReason = rejectionReason;
    submission.reviewerReviewedAt = new Date();

    submission.addTimelineEvent({
      eventType: 'reviewer_rejected',
      title: 'Rejected by Reviewer',
      description: 'Submission has been rejected by the reviewer',
      notes: rejectionReason,
      performedBy: req.user.id,
      performedByRole: 'reviewer'
    });

    await submission.save();

    // NEW: Decrement reviewer workload
    await decrementReviewerWorkload(req.user.id);

    // ... rest of the email notifications remain the same ...

    res.status(200).json({
      success: true,
      message: 'Submission rejected',
      data: { submission }
    });
  } catch (error) {
    console.error('Reject submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Error rejecting submission',
      error: error.message
    });
  }
};

// Update sendBackToEditor - add this before res.status(200)
exports.sendBackToEditor = async (req, res) => {
  try {
    const { reviewerNotes } = req.body;
    const submission = await Submission.findById(req.params.id)
      .populate('author', 'firstName lastName email')
      .populate('reviewerAssigned', 'firstName lastName email');

    if (!submission) {
      return res.status(404).json({
        success: false,
        message: 'Submission not found'
      });
    }

    if (submission.status !== 'with_reviewer') {
      return res.status(400).json({
        success: false,
        message: 'Submission is not with reviewer'
      });
    }

    if (!reviewerNotes) {
      return res.status(400).json({
        success: false,
        message: 'Reviewer notes are required'
      });
    }

    submission.status = 'pending';
    submission.reviewerNotes = reviewerNotes;

    if (!submission.sendBackHistory) {
      submission.sendBackHistory = [];
    }
    submission.sendBackHistory.push({
      sentBackAt: new Date(),
      reviewerNotes,
      reviewerId: req.user.id
    });

    submission.addTimelineEvent({
      eventType: 'reviewer_sent_back',
      title: 'Sent Back to Editor',
      description: 'Reviewer has sent the submission back for revisions',
      notes: reviewerNotes,
      performedBy: req.user.id,
      performedByRole: 'reviewer'
    });

    await submission.save();

    // NEW: Decrement reviewer workload
    await decrementReviewerWorkload(req.user.id);

    // ... rest of the email notifications remain the same ...

    res.status(200).json({
      success: true,
      message: 'Submission sent back to editor successfully',
      data: { submission }
    });
  } catch (error) {
    console.error('Reviewer send back error:', error);
    res.status(500).json({
      success: false,
      message: 'Error sending back submission',
      error: error.message
    });
  }
};

// @desc    Get all assigned submissions for reviewer
// @route   GET /api/reviewer/submissions
// @access  Private (Reviewer)
exports.getAssignedSubmissions = async (req, res) => {
  try {
    const { journal, status } = req.query;

    let query = {
      reviewerAssigned: req.user.id
    };

    if (journal) {
      query.journal = journal;
    }

    if (status) {
      query.status = status;
    }

    const submissions = await Submission.find(query)
      .populate('author', 'firstName lastName email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: submissions.length,
      data: { submissions }
    });
  } catch (error) {
    console.error('Get assigned submissions error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching assigned submissions',
      error: error.message
    });
  }
};


module.exports = exports;