const Submission = require('../models/Submission');
const User = require('../models/User');
const { sendNotificationEmail } = require('../config/brevo');
const Contact=require('../models/Contact')

exports.getQueries=async(req,res)=>{
  try{
   const data=await Contact.find();
   console.log(data)
   res.status(200).json({data});
  }catch(err){
    console.log(err.message);
  }
}
// @desc    Approve submission by editor
// @route   PUT /api/editor/submissions/:id/approve
// @access  Private (Editor)
exports.approveSubmission = async (req, res) => {
  try {
    const { editorNotes } = req.body;

    const submission = await Submission.findById(req.params.id)
      .populate('author', 'firstName lastName email');

    if (!submission) {
      return res.status(404).json({
        success: false,
        message: 'Submission not found'
      });
    }

    if (submission.status === 'draft') {
      return res.status(400).json({
        success: false,
        message: 'Submission is not in pending status'
      });
    }

    submission.status = 'approved_by_editor';
    submission.editorNotes = editorNotes;
    submission.editorReviewedAt = new Date();
// Add timeline event
submission.addTimelineEvent({
  eventType: 'editor_approved',
  title: 'Approved by Editor',
  description: 'Submission has been approved by the editor',
  notes: editorNotes,
  performedBy: req.user.id,
  performedByRole: 'editor'
});
    await submission.save();

    // Send notification to author
    await sendNotificationEmail(
      submission.author.email,
      `${submission.author.firstName} ${submission.author.lastName}`,
      'Submission Approved by Editor',
      `<p>Your submission "<strong>${submission.metadata.title}</strong>" has been approved by the editor.</p>
       <p>The submission will now be forwarded to a reviewer.</p>
       ${editorNotes ? `<p><strong>Editor's Notes:</strong> ${editorNotes}</p>` : ''}`
    );

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
exports.sendBackToAuthor = async (req, res) => {
  try {
    const { editorNotes } = req.body;

    if (!editorNotes) {
      return res.status(400).json({
        success: false,
        message: 'Please provide notes for the author'
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

    // Can only send back if pending or approved_by_editor (before moving to reviewer)
    if (!['pending', 'approved_by_editor','with_reviewer'].includes(submission.status)) {
      return res.status(400).json({
        success: false,
        message: 'Submission cannot be sent back at this stage'
      });
    }

    // Store the send back history
    if (!submission.sendBackHistory) {
      submission.sendBackHistory = [];
    }
    
    submission.sendBackHistory.push({
      sentBackAt: new Date(),
      editorNotes: editorNotes,
      editorId: req.user.id,
      sentBackBy: 'editor'
    });

    // Set status back to pending and store editor notes
    submission.status = 'pending';
    submission.editorNotes = editorNotes;

    // Add timeline event
    submission.addTimelineEvent({
      eventType: 'editor_sent_back',
      title: 'Sent Back by Editor',
      description: 'Editor requested changes from author',
      notes: editorNotes,
      performedBy: req.user.id,
      performedByRole: 'editor'
    });

    await submission.save();

    // Send notification to author
    await sendNotificationEmail(
      submission.author.email,
      `${submission.author.firstName} ${submission.author.lastName}`,
      'Changes Requested for Your Submission',
      `<p>The editor has reviewed your submission "<strong>${submission.metadata.title}</strong>" and is requesting some changes.</p>
       <p><strong>Editor's Notes:</strong></p>
       <div style="background-color: #f3f4f6; padding: 15px; border-radius: 8px; margin: 10px 0;">
         ${editorNotes.replace(/\n/g, '<br>')}
       </div>
       <p>Please review the feedback and update your submission accordingly.</p>
       <p>You can edit your submission from your dashboard.</p>`
    );

    res.status(200).json({
      success: true,
      message: 'Submission sent back to author',
      data: { submission }
    });
  } catch (error) {
    console.error('Send back to author error:', error);
    res.status(500).json({
      success: false,
      message: 'Error sending submission back to author',
      error: error.message
    });
  }
};
// @desc    Reject submission by editor
// @route   PUT /api/editor/submissions/:id/reject
// @access  Private (Editor)
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

    submission.status = 'rejected_by_editor';
    submission.rejectionReason = rejectionReason;
    submission.editorReviewedAt = new Date();
// Add timeline event
submission.addTimelineEvent({
  eventType: 'editor_rejected',
  title: 'Rejected by Editor',
  description: 'Submission has been rejected by the editor',
  notes: rejectionReason,
  performedBy: req.user.id,
  performedByRole: 'editor'
});
    await submission.save();

    // Send notification to author
    await sendNotificationEmail(
      submission.author.email,
      `${submission.author.firstName} ${submission.author.lastName}`,
      'Submission Rejected',
      `<p>Unfortunately, your submission "<strong>${submission.metadata.title}</strong>" has been rejected by the editor.</p>
       <p><strong>Reason:</strong> ${rejectionReason}</p>
       <p>You may revise and resubmit your work if you wish.</p>`
    );

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

// @desc    Move submission to reviewer
// @route   PUT /api/editor/submissions/:id/move-to-reviewer
// @access  Private (Editor)
exports.moveToReviewer = async (req, res) => {
  try {
    const {editorNotes}=req.body;
    const submission = await Submission.findById(req.params.id)
      .populate('author', 'firstName lastName email');

    if (!submission) {
      return res.status(404).json({
        success: false,
        message: 'Submission not found'
      });
    }

    // if (submission.status !== 'approved_by_editor') {
    //   return res.status(400).json({
    //     success: false,
    //     message: 'Submission must be approved by editor first'
    //   });
    // }

    // Get reviewer
    const reviewer = await User.findOne({ role: 'reviewer' });
    if (!reviewer) {
      return res.status(404).json({
        success: false,
        message: 'No reviewer found in the system'
      });
    }
    submission.editorNotes = editorNotes;
    submission.status = 'with_reviewer';
    submission.reviewerAssigned = reviewer._id;
// Add timeline event
submission.addTimelineEvent({
  eventType: 'forwarded_to_reviewer',
  title: 'Forwarded to Reviewer',
  description: 'Submission has been sent to reviewer for evaluation',
  performedBy: req.user.id,
  performedByRole: 'editor',
  notes:editorNotes
});
    await submission.save();

    // Send notification to reviewer
    await sendNotificationEmail(
      reviewer.email,
      `${reviewer.firstName} ${reviewer.lastName}`,
      'New Submission for Review',
      `<p>A new submission has been assigned to you for review.</p>
       <p><strong>Journal:</strong> ${submission.journal}</p>
       <p><strong>Title:</strong> ${submission.metadata.title}</p>
       <p><strong>Author:</strong> ${submission.author.firstName} ${submission.author.lastName}</p>
       <p>Please review the submission in your dashboard.</p>`
    );

    // Send notification to author
    await sendNotificationEmail(
      submission.author.email,
      `${submission.author.firstName} ${submission.author.lastName}`,
      'Submission Sent for Review',
      `<p>Your submission "<strong>${submission.metadata.title}</strong>" has been sent to a reviewer.</p>
       <p>You will be notified once the review is complete.</p>`
    );

    res.status(200).json({
      success: true,
      message: 'Submission moved to reviewer successfully',
      data: { submission }
    });
  } catch (error) {
    console.error('Move to reviewer error:', error);
    res.status(500).json({
      success: false,
      message: 'Error moving submission to reviewer',
      error: error.message
    });
  }
};

// @desc    Set publication date
// @route   PUT /api/editor/submissions/:id/schedule
// @access  Private (Editor)
exports.schedulePublication = async (req, res) => {
  try {
    const { publicationDate } = req.body;

    if (!publicationDate) {
      return res.status(400).json({
        success: false,
        message: 'Publication date is required'
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

    if (submission.status !== 'approved_by_reviewer') {
      return res.status(400).json({
        success: false,
        message: 'Submission must be approved by reviewer first'
      });
    }

    const pubDate = new Date(publicationDate);
    
    if (pubDate <= new Date()) {
      return res.status(400).json({
        success: false,
        message: 'Publication date must be in the future'
      });
    }

    submission.publicationDate = pubDate;
    submission.status = 'scheduled';
// Add timeline event
submission.addTimelineEvent({
  eventType: 'scheduled',
  title: 'Publication Scheduled',
  description: 'Submission has been scheduled for publication',
  performedBy: req.user.id,
  performedByRole: 'editor',
  metadata: { publicationDate }
});
    await submission.save();

    // Send notification to author
    await sendNotificationEmail(
      submission.author.email,
      `${submission.author.firstName} ${submission.author.lastName}`,
      'Publication Scheduled',
      `<p>Congratulations! Your submission "<strong>${submission.metadata.title}</strong>" has been scheduled for publication.</p>
       <p><strong>Publication Date:</strong> ${pubDate.toDateString()}</p>
       <p>Your work will be automatically published on this date.</p>`
    );

    res.status(200).json({
      success: true,
      message: 'Publication scheduled successfully',
      data: { submission }
    });
  } catch (error) {
    console.error('Schedule publication error:', error);
    res.status(500).json({
      success: false,
      message: 'Error scheduling publication',
      error: error.message
    });
  }
};
// @desc    Create new reviewer account
// @route   POST /api/editor/reviewers
// @access  Private (Editor)
exports.createReviewer = async (req, res) => {
  try {
    const { firstName, lastName, email, password, affiliation, specialization } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with this email already exists'
      });
    }

    // Create reviewer
    const reviewer = await User.create({
      firstName,
      lastName,
      email,
      password,
      affiliation,
      specialization: specialization || [],
      role: 'reviewer',
      isActive: true,
      isVerified:true
    });

    // Send credentials email to reviewer
    await sendNotificationEmail(
      reviewer.email,
      `${reviewer.firstName} ${reviewer.lastName}`,
      'Welcome to MS Publication - Reviewer Account Created',
      `<p>Dear ${reviewer.firstName} ${reviewer.lastName},</p>
       <p>An account has been created for you as a reviewer for MS Publication Journal Management System.</p>
       <p><strong>Your Login Credentials:</strong></p>
       <div style="background-color: #f3f4f6; padding: 15px; border-radius: 8px; margin: 10px 0;">
         <p><strong>Email:</strong> ${email}</p>
         <p><strong>Temporary Password:</strong> ${password}</p>
       </div>
       <p>You can log in at your dashboard and start reviewing submissions assigned to you.</p>
       <p>Thank you for joining our review team!</p>
       <br />
       <p>Best regards,<br />MS Publication Team</p>`
    );

    res.status(201).json({
      success: true,
      message: 'Reviewer account created successfully. Credentials sent to their email.',
      data: {
        reviewer: {
          id: reviewer._id,
          firstName: reviewer.firstName,
          lastName: reviewer.lastName,
          email: reviewer.email,
          specialization: reviewer.specialization
        }
      }
    });
  } catch (error) {
    console.error('Create reviewer error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating reviewer account',
      error: error.message
    });
  }
};

// @desc    Get all reviewers
// @route   GET /api/editor/reviewers
// @access  Private (Editor)
exports.getAllReviewers = async (req, res) => {
  try {
    const reviewers = await User.find({ role: 'reviewer' })
      .select('-password')
      .sort({ createdAt: -1 });
console.log(reviewers)
    res.status(200).json({
      success: true,
      count: reviewers.length,
      data: { reviewers }
    });
  } catch (error) {
    console.error('Get reviewers error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching reviewers',
      error: error.message
    });
  }
};

// @desc    Get available reviewers for a journal
// @route   GET /api/editor/reviewers/available/:journal
// @access  Private (Editor)
exports.getAvailableReviewers = async (req, res) => {
  try {
    const { journal } = req.params;

    // Get reviewers specialized in this journal or with no specialization (general reviewers)
    const reviewers = await User.find({
      role: 'reviewer',
      isActive: true,
      $or: [
        { specialization: journal },
        { specialization: { $size: 0 } }
      ]
    })
    .select('firstName lastName email specialization activeReviews')
    .sort({ activeReviews: 1 }); // Sort by workload (ascending)
console.log(reviewers)
    res.status(200).json({
      success: true,
      count: reviewers.length,
      data: { reviewers }
    });
  } catch (error) {
    console.error('Get available reviewers error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching available reviewers',
      error: error.message
    });
  }
};

// @desc    Update reviewer account
// @route   PUT /api/editor/reviewers/:id
// @access  Private (Editor)
exports.updateReviewer = async (req, res) => {
  try {
    const { firstName, lastName, affiliation, specialization, isActive } = req.body;

    const reviewer = await User.findById(req.params.id);

    if (!reviewer || reviewer.role !== 'reviewer') {
      return res.status(404).json({
        success: false,
        message: 'Reviewer not found'
      });
    }

    // Update fields
    if (firstName) reviewer.firstName = firstName;
    if (lastName) reviewer.lastName = lastName;
    if (affiliation) reviewer.affiliation = affiliation;
    if (specialization) reviewer.specialization = specialization;
    if (typeof isActive === 'boolean') reviewer.isActive = isActive;

    await reviewer.save();

    res.status(200).json({
      success: true,
      message: 'Reviewer updated successfully',
      data: { reviewer }
    });
  } catch (error) {
    console.error('Update reviewer error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating reviewer',
      error: error.message
    });
  }
};

// UPDATED: Move to reviewer with selection
exports.moveToReviewer = async (req, res) => {
  try {
    const { editorNotes, reviewerId } = req.body;

    if (!reviewerId) {
      return res.status(400).json({
        success: false,
        message: 'Please select a reviewer'
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

    // Get selected reviewer
    const reviewer = await User.findById(reviewerId);
    if (!reviewer || reviewer.role !== 'reviewer') {
      return res.status(404).json({
        success: false,
        message: 'Invalid reviewer selected'
      });
    }

    if (!reviewer.isActive) {
      return res.status(400).json({
        success: false,
        message: 'Selected reviewer is inactive'
      });
    }

    // Update submission
    submission.editorNotes = editorNotes;
    submission.status = 'with_reviewer';
    submission.reviewerAssigned = reviewer._id;

    // Add timeline event
    submission.addTimelineEvent({
      eventType: 'forwarded_to_reviewer',
      title: 'Forwarded to Reviewer',
      description: `Submission assigned to ${reviewer.firstName} ${reviewer.lastName} for review`,
      performedBy: req.user.id,
      performedByRole: 'editor',
      notes: editorNotes,
      metadata: {
        reviewerId: reviewer._id,
        reviewerName: `${reviewer.firstName} ${reviewer.lastName}`
      }
    });

    await submission.save();

    // Increment reviewer's active reviews count
    reviewer.activeReviews += 1;
    await reviewer.save();

    // Send notification to reviewer
    await sendNotificationEmail(
      reviewer.email,
      `${reviewer.firstName} ${reviewer.lastName}`,
      'New Submission Assigned for Review',
      `<p>Dear ${reviewer.firstName},</p>
       <p>A new submission has been assigned to you for review.</p>
       <p><strong>Journal:</strong> ${submission.journal}</p>
       <p><strong>Title:</strong> ${submission.metadata.title}</p>
       <p><strong>Author:</strong> ${submission.author.firstName} ${submission.author.lastName}</p>
       ${editorNotes ? `<p><strong>Editor's Notes:</strong></p><div style="background-color: #f3f4f6; padding: 15px; border-radius: 8px;">${editorNotes}</div>` : ''}
       <p>Please review the submission in your dashboard.</p>`
    );

    // Send notification to author
    await sendNotificationEmail(
      submission.author.email,
      `${submission.author.firstName} ${submission.author.lastName}`,
      'Submission Sent for Review',
      `<p>Your submission "<strong>${submission.metadata.title}</strong>" has been sent to a reviewer for evaluation.</p>
       <p>You will be notified once the review is complete.</p>`
    );

    res.status(200).json({
      success: true,
      message: 'Submission assigned to reviewer successfully',
      data: { submission }
    });
  } catch (error) {
    console.error('Move to reviewer error:', error);
    res.status(500).json({
      success: false,
      message: 'Error assigning submission to reviewer',
      error: error.message
    });
  }
};
module.exports = exports;