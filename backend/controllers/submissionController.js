const Submission = require('../models/Submission');
const { getSignedFileUrl ,uploadToS3, generateS3Key, deleteFile} = require('../config/aws');
const { GetObjectCommand } = require("@aws-sdk/client-s3");
const { sendNotificationEmail } = require('../config/brevo');
const User = require('../models/User');
const { s3 } = require('../config/aws');
const { convertDocxToPdf } = require('../utils/docxToPdfConverter'); // Add this utility
async function getBufferFromS3(key) {
  const command = new GetObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
  });

  const response = await s3.send(command);
  
  // Convert stream to buffer
  const chunks = [];
  for await (const chunk of response.Body) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
}
// @desc    Create new submission (Step 1: Start)
// @route   POST /api/submissions
// @access  Private (Author)
exports.createSubmission = async (req, res) => {
  try {
    const {
      journal,
      section,
      commentsForEditor,
      potentialReviewers,
      agreementsAccepted
    } = req.body;

    if (!agreementsAccepted) {
      return res.status(400).json({
        success: false,
        message: 'You must accept all submission requirements'
      });
    }

    // Create submission
    const submission = await Submission.create({
      journal,
      author: req.user.id,
      section,
      commentsForEditor,
      potentialReviewers,
      agreementsAccepted,
      currentStep: 1,
      status: 'draft'
    });

    // Fetch author details (email & name)
    const author = await User.findById(req.user.id).select('email name');

    // Send email (do NOT block response if email fails)
   

    res.status(201).json({
      success: true,
      message: 'Submission started successfully',
      data: { submission }
    });
  } catch (error) {
    console.error('Create submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating submission',
      error: error.message
    });
  }
};


exports.getDocument = async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.id);

    if (!submission || !submission.documentFile) {
      return res.status(404).json({ success: false, message: "File not found" });
    }

    // Optional: check if user is authorized to view
    if (submission.author.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    const signedUrl = await getSignedFileUrl(submission.documentFile.key, 900); // 15 min expiry

    res.json({ success: true, url: signedUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error generating file URL" });
  }
};

// In submissionController.js - Add this new function

exports.streamDocument = async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.id);

    if (!submission || !submission.documentFile) {
      return res.status(404).json({ success: false, message: "File not found" });
    }

    // Check authorization
    const isAuthor = submission.author.toString() === req.user.id;
    const isEditor = req.user.role === 'editor';
    const isReviewer = req.user.role === 'reviewer' && submission.status === 'with_reviewer';
console.log(submission.status);
    if (!isAuthor && !isEditor && !isReviewer) {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    // Stream the file from S3
    const command = new GetObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: submission.documentFile.key,
    });

    const s3Response = await s3.send(command);
    
    // Set headers to prevent caching and enable streaming
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline');
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    
    // Pipe the S3 stream to response
    s3Response.Body.pipe(res);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error streaming file" });
  }
};


// @desc    Upload document (Step 2) - COMPLETE FIXED VERSION
// @route   POST /api/submissions/:id/upload
// @access  Private (Author)
exports.uploadDocument = async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.id);

    if (!submission) {
      return res.status(404).json({
        success: false,
        message: 'Submission not found'
      });
    }

    if (submission.author.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized'
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload a document'
      });
    }

    console.log('📄 File received:', {
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      bufferAvailable: !!req.file.buffer
    });

    // Check if buffer is available (should be with memory storage)
    if (!req.file.buffer) {
      return res.status(500).json({
        success: false,
        message: 'File buffer not available. Please check multer configuration.'
      });
    }

    let fileBuffer = req.file.buffer;
    let finalFilename = req.file.originalname;
    let finalMimetype = req.file.mimetype;

    // Check if it's a DOCX file
    const isDocx = req.file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
                   req.file.originalname.toLowerCase().endsWith('.docx');

    // Convert DOCX to PDF
    if (isDocx) {
      try {
        console.log('🔄 Converting DOCX to PDF...');
        fileBuffer = await convertDocxToPdf(req.file.buffer);
        
        // Update filename and mimetype
        finalFilename = req.file.originalname.replace(/\.docx$/i, '.pdf');
        finalMimetype = 'application/pdf';
        
        console.log('✅ Conversion successful! PDF size:', fileBuffer.length);
      } catch (conversionError) {
        console.error('❌ Conversion error:', conversionError);
        return res.status(500).json({
          success: false,
          message: 'Error converting DOCX to PDF. Please ensure the file is valid or upload a PDF directly.',
          error: conversionError.message
        });
      }
    }

    // Generate S3 key
    const s3Key = generateS3Key(finalFilename, submission.journal);

    // Upload to S3
    try {
      console.log('☁️ Uploading to S3:', s3Key);
      await uploadToS3(fileBuffer, s3Key, finalMimetype, {
        uploadedBy: req.user.id,
        submissionId: req.params.id,
        originalFilename: req.file.originalname
      });
      console.log('✅ Upload to S3 successful');
    } catch (uploadError) {
      console.error('❌ S3 upload error:', uploadError);
      return res.status(500).json({
        success: false,
        message: 'Error uploading to S3',
        error: uploadError.message
      });
    }

    // Save to submission
    submission.documentFile = {
      key: s3Key,
      filename: finalFilename,
      size: fileBuffer.length,
      mimetype: finalMimetype,
      uploadedAt: new Date()
    };

    submission.currentStep = 2;
    await submission.save();

    res.status(200).json({
      success: true,
      message: isDocx 
        ? 'Document converted to PDF and uploaded successfully' 
        : 'Document uploaded successfully',
      data: { submission }
    });

  } catch (error) {
    console.error('❌ Upload document error:', error);
    res.status(500).json({
      success: false,
      message: 'Error uploading document',
      error: error.message
    });
  }
};

// @desc    Update submission document - COMPLETE FIXED VERSION
// @route   PUT /api/submissions/:id/update-document
// @access  Private (Author)
exports.updateSubmissionDocument = async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.id);

    if (!submission) {
      return res.status(404).json({
        success: false,
        message: 'Submission not found'
      });
    }

    if (submission.author.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized'
      });
    }

    const canEdit = ['draft', 'pending', 'rejected_by_editor', 'rejected_by_reviewer'].includes(submission.status) ||
                    (submission.status === 'approved_by_editor' && submission.reviewerNotes);
    
    if (!canEdit) {
      return res.status(400).json({
        success: false,
        message: 'Cannot edit submission at this stage'
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload a document'
      });
    }

    console.log('📄 Update - File received:', {
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      bufferAvailable: !!req.file.buffer
    });

    if (!req.file.buffer) {
      return res.status(500).json({
        success: false,
        message: 'File buffer not available. Please check multer configuration.'
      });
    }

    // Store old key for deletion
    const oldKey = submission.documentFile ? submission.documentFile.key : null;

    let fileBuffer = req.file.buffer;
    let finalFilename = req.file.originalname;
    let finalMimetype = req.file.mimetype;

    // Check if it's a DOCX file
    const isDocx = req.file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
                   req.file.originalname.toLowerCase().endsWith('.docx');

    // Convert DOCX to PDF
    if (isDocx) {
      try {
        console.log('🔄 Converting DOCX to PDF...');
        fileBuffer = await convertDocxToPdf(req.file.buffer);
        
        finalFilename = req.file.originalname.replace(/\.docx$/i, '.pdf');
        finalMimetype = 'application/pdf';
        
        console.log('✅ Conversion successful! PDF size:', fileBuffer.length);
      } catch (conversionError) {
        console.error('❌ Conversion error:', conversionError);
        return res.status(500).json({
          success: false,
          message: 'Error converting DOCX to PDF. Please ensure the file is valid or upload a PDF directly.',
          error: conversionError.message
        });
      }
    }

    // Generate new S3 key
    const s3Key = generateS3Key(finalFilename, submission.journal);

    // Upload to S3
    try {
      console.log('☁️ Uploading to S3:', s3Key);
      await uploadToS3(fileBuffer, s3Key, finalMimetype, {
        uploadedBy: req.user.id,
        submissionId: req.params.id,
        originalFilename: req.file.originalname,
        isUpdate: 'true'
      });
      console.log('✅ Upload to S3 successful');
    } catch (uploadError) {
      console.error('❌ S3 upload error:', uploadError);
      return res.status(500).json({
        success: false,
        message: 'Error uploading to S3',
        error: uploadError.message
      });
    }

    // Delete old file from S3 if exists
    if (oldKey) {
      try {
        console.log('🗑️ Deleting old file from S3:', oldKey);
        await deleteFile(oldKey);
        console.log('✅ Old file deleted');
      } catch (deleteError) {
        console.warn('⚠️ Could not delete old file:', deleteError.message);
        // Don't fail the request if deletion fails
      }
    }

    // Update submission
    submission.documentFile = {
      key: s3Key,
      filename: finalFilename,
      size: fileBuffer.length,
      mimetype: finalMimetype,
      uploadedAt: new Date()
    };

    // Reset status if rejected
    if (submission.status.includes('rejected')) {
      submission.status = 'pending';
      submission.submittedAt = new Date();
      submission.rejectionReason = null;
    }

    // Add timeline event
    submission.addTimelineEvent({
      eventType: 'author_edited',
      title: 'Document Updated',
      description: `Author uploaded a new document file${isDocx ? ' (converted from DOCX to PDF)' : ''}`,
      performedBy: req.user.id,
      performedByRole: 'author'
    });

    await submission.save();

    res.status(200).json({
      success: true,
      message: isDocx
        ? 'Document converted to PDF and updated successfully'
        : 'Document updated successfully',
      data: { submission }
    });

  } catch (error) {
    console.error('❌ Update submission document error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating document',
      error: error.message
    });
  }
};

// @desc    Add metadata (Step 3)
// @route   PUT /api/submissions/:id/metadata
// @access  Private (Author)
exports.addMetadata = async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.id);

    if (!submission) {
      return res.status(404).json({
        success: false,
        message: 'Submission not found'
      });
    }

    if (submission.author.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized'
      });
    }

    const { prefix, title, subtitle, abstract, coAuthors, keywords, references } = req.body;

    submission.metadata = {
      prefix,
      title,
      subtitle,
      abstract,
      coAuthors,
      keywords,
      references
    };
    submission.currentStep = 3;

    await submission.save();

    res.status(200).json({
      success: true,
      message: 'Metadata added successfully',
      data: { submission }
    });
  } catch (error) {
    console.error('Add metadata error:', error);
    res.status(500).json({
      success: false,
      message: 'Error adding metadata',
      error: error.message
    });
  }
};

// @desc    Confirm and submit (Step 4)
// @route   PUT /api/submissions/:id/confirm
// @access  Private (Author)
exports.confirmSubmission = async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.id).populate('author', 'firstName lastName email');

    if (!submission) {
      return res.status(404).json({
        success: false,
        message: 'Submission not found'
      });
    }

    if (submission.author._id.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized'
      });
    }

    // Validate all steps are completed
    if (!submission.documentFile || !submission.metadata.title) {
      return res.status(400).json({
        success: false,
        message: 'Please complete all previous steps'
      });
    }

    submission.status = 'pending';
    submission.isCompleted = true;
    submission.currentStep = 4;
    submission.submittedAt = new Date();
submission.addTimelineEvent({
  eventType: 'submitted',
  title: 'Submission Submitted',
  description: `Submitted to ${submission.journal} journal in ${submission.section} section`,
  performedBy: req.user.id,
  performedByRole: 'author'
});
    await submission.save();

    // Send notification to editor
    const editor = await User.findOne({ role: 'editor' });
    if (editor) {
      await sendNotificationEmail(
        editor.email,
        `${editor.firstName} ${editor.lastName}`,
        'New Submission Received',
        `<p>A new submission has been received for the <strong>${submission.journal}</strong> journal.</p>
         <p><strong>Title:</strong> ${submission.metadata.title}</p>
         <p><strong>Author:</strong> ${submission.author.firstName} ${submission.author.lastName}</p>
         <p><strong>Section:</strong> ${submission.section}</p>
         <p>Please review the submission in your dashboard.</p>`
      );
    }
    const author = await User.findById(req.user.id).select('email name');
 if (author?.email) {
      const subject = 'Submission Created Successfully';
      const message = `
        <p>Your submission has been successfully created and saved as a <strong>draft</strong>.</p>
        <p><strong>Submission ID:</strong> ${submission._id}</p>
        <p>You can continue editing and complete your submission by logging into your account.</p>
        <br />
        <p>Best regards,<br />MS Publication Team</p>
      `;

      // Fire and forget
      sendNotificationEmail(
        author.email,
        author.name || 'Author',
        subject,
        message
      ).catch(err => {
        console.error('Email send failed:', err.message);
      });
    }
    res.status(200).json({
      success: true,
      message: 'Submission completed successfully',
      data: { submission }
    });
  } catch (error) {
    console.error('Confirm submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Error confirming submission',
      error: error.message
    });
  }
};

// @desc    Get all submissions for author
// @route   GET /api/submissions/my-submissions
// @access  Private (Author)
exports.getMySubmissions = async (req, res) => {
  try {
   const submissions = await Submission.find({
  author: req.user.id,
  status: { $ne: 'draft' }})
      .sort({ createdAt: -1 })
      .select('-__v');

    res.status(200).json({
      success: true,
      count: submissions.length,
      data: { submissions }
    });
    
  } catch (error) {
    console.error('Get my submissions error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching submissions',
      error: error.message
    });
  }
};
const filterTimelineByRole = (timeline, userRole) => {
  if (!timeline || timeline.length === 0) return [];

  // Editor sees everything
  if (userRole === 'editor') {
    return timeline;
  }

  // Author sees only author-editor interactions
  if (userRole === 'author') {
    const allowedEventTypes = [
      'submitted',
      'author_edited',
      'editor_approved',
      'editor_rejected',
      'editor_sent_back',
      'scheduled',
      'published'
    ];
    return timeline.filter(event => allowedEventTypes.includes(event.eventType));
  }

  // Reviewer sees only reviewer-editor interactions
  if (userRole === 'reviewer') {
    const allowedEventTypes = [
      'moved_to_reviewer',
      'reviewer_approved',
      'reviewer_rejected',
      'reviewer_sent_back',
      'editor_approved', // After reviewer approval
      'scheduled',
      'published',
      'forwarded_to_reviewer'
    ];
    return timeline.filter(event => allowedEventTypes.includes(event.eventType));
  }

  return timeline;
};

// @desc    Get single submission by ID
// @route   GET /api/submissions/:id
// @access  Private
// Replace the existing getSubmission function
exports.getSubmission = async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.id)
      .populate('author', 'prefix firstName lastName email affiliation')
      .populate('reviewerAssigned', 'firstName lastName email specialization activeReviews'); // UPDATED

    if (!submission) {
      return res.status(404).json({
        success: false,
        message: 'Submission not found'
      });
    }

    const isAuthor = submission.author._id.toString() === req.user.id;
    const isEditor = req.user.role === 'editor';
    const isReviewer = req.user.role === 'reviewer' && 
                       submission.reviewerAssigned && 
                       submission.reviewerAssigned._id.toString() === req.user.id;

    if (!isAuthor && !isEditor && !isReviewer) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this submission'
      });
    }

    if (submission.documentFile && submission.documentFile.key) {
      submission.documentFile.signedUrl = await getSignedFileUrl(submission.documentFile.key);
    }

    const submissionObj = submission.toObject();
    submissionObj.timeline = filterTimelineByRole(submissionObj.timeline, req.user.role);

    res.status(200).json({
      success: true,
      data: { submission: submissionObj }
    });
  } catch (error) {
    console.error('Get submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching submission',
      error: error.message
    });
  }
};

// @desc    Get all submissions by journal (Editor/Reviewer)
// @route   GET /api/submissions/journal/:journal
// @access  Private (Editor/Reviewer)
exports.getSubmissionsByJournal = async (req, res) => {
  try {
    const { journal } = req.params;
    const { status } = req.query;

    let query = { journal };

    // Filter by status if provided
    if (status) {
      query.status = status;
    }

    // For reviewers, only show submissions assigned to them
    if (req.user.role === 'reviewer') {
      query.reviewerAssigned = req.user.id;
    }

    const submissions = await Submission.find(query)
      .populate('author', 'firstName lastName email')
      .populate('reviewerAssigned', 'firstName lastName email')
      .sort({ submittedAt: -1 });

    res.status(200).json({
      success: true,
      count: submissions.length,
      data: { submissions }
    });
  } catch (error) {
    console.error('Get submissions by journal error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching submissions',
      error: error.message
    });
  }
};

// @desc    Get journal statistics
// @route   GET /api/submissions/stats/journals
// @access  Private (Editor/Reviewer)
exports.getJournalStats = async (req, res) => {
  try {
    const journals = ['pharma', 'history', 'chemistry', 'science', 'ayurvedic', 'technology'];
    
    const stats = await Promise.all(
      journals.map(async (journal) => {
        let query = { journal };
        
        // For reviewers, only count their assigned submissions
        if (req.user.role === 'reviewer') {
          query.reviewerAssigned = req.user.id;
        }

        const total = await Submission.countDocuments(query);
        const pending = await Submission.countDocuments({ ...query, status: 'pending' });
        const withReviewer = await Submission.countDocuments({ ...query, status: 'with_reviewer' });
        const published = await Submission.countDocuments({ ...query, status: 'published' });

        return {
          journal,
          total,
          pending,
          withReviewer,
          published
        };
      })
    );

    res.status(200).json({
      success: true,
      data: { stats }
    });
  } catch (error) {
    console.error('Get journal stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching journal statistics',
      error: error.message
    });
  }
};

// @desc    Update submission metadata (before final approval)
// @route   PUT /api/submissions/:id/update-metadata
// @access  Private (Author)
exports.updateSubmissionMetadata = async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.id);

    if (!submission) {
      return res.status(404).json({
        success: false,
        message: 'Submission not found'
      });
    }

    // Check if user owns this submission
    if (submission.author.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized'
      });
    }

    // Check if submission can be edited
    const canEdit = ['draft', 'pending', 'rejected_by_editor', 'rejected_by_reviewer'].includes(submission.status);
    
    if (!canEdit) {
      return res.status(400).json({
        success: false,
        message: 'Cannot edit submission at this stage'
      });
    }

    const { prefix, title, subtitle, abstract, coAuthors, keywords, references } = req.body;

    submission.metadata = {
      prefix,
      title,
      subtitle,
      abstract,
      coAuthors,
      keywords,
      references
    };

    // If it was rejected, set back to pending after edit
    if (submission.status.includes('rejected')) {
      submission.status = 'pending';
      submission.submittedAt = new Date();
      submission.rejectionReason = null;
    }
// Add timeline event for author edit
submission.addTimelineEvent({
  eventType: 'author_edited',
  title: 'Submission Edited',
  description: 'Author updated the submission metadata',
  performedBy: req.user.id,
  performedByRole: 'author'
});
    await submission.save();

    res.status(200).json({
      success: true,
      message: 'Submission updated successfully',
      data: { submission }
    });
  } catch (error) {
    console.error('Update submission metadata error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating submission',
      error: error.message
    });
  }
};

// @desc    Update submission document (before final approval)
// @route   PUT /api/submissions/:id/update-document
// @access  Private (Author)
exports.updateSubmissionDocument = async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.id);

    if (!submission) {
      return res.status(404).json({
        success: false,
        message: 'Submission not found'
      });
    }

    if (submission.author.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized'
      });
    }

    const canEdit = ['draft', 'pending', 'rejected_by_editor', 'rejected_by_reviewer'].includes(submission.status) ||
                    (submission.status === 'approved_by_editor' && submission.reviewerNotes);
    
    if (!canEdit) {
      return res.status(400).json({
        success: false,
        message: 'Cannot edit submission at this stage'
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload a document'
      });
    }

    console.log('📄 Update - File received:', {
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      bufferAvailable: !!req.file.buffer
    });

    if (!req.file.buffer) {
      return res.status(500).json({
        success: false,
        message: 'File buffer not available. Please check multer configuration.'
      });
    }

    // Store old key for deletion
    const oldKey = submission.documentFile ? submission.documentFile.key : null;

    let fileBuffer = req.file.buffer;
    let finalFilename = req.file.originalname;
    let finalMimetype = req.file.mimetype;

    // Check if it's a DOCX file
    const isDocx = req.file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
                   req.file.originalname.toLowerCase().endsWith('.docx');

    // Convert DOCX to PDF
    if (isDocx) {
      try {
        console.log('🔄 Converting DOCX to PDF...');
        fileBuffer = await convertDocxToPdf(req.file.buffer);
        
        finalFilename = req.file.originalname.replace(/\.docx$/i, '.pdf');
        finalMimetype = 'application/pdf';
        
        console.log('✅ Conversion successful! PDF size:', fileBuffer.length);
      } catch (conversionError) {
        console.error('❌ Conversion error:', conversionError);
        return res.status(500).json({
          success: false,
          message: 'Error converting DOCX to PDF. Please ensure the file is valid or upload a PDF directly.',
          error: conversionError.message
        });
      }
    }

    // Generate new S3 key
    const s3Key = generateS3Key(finalFilename, submission.journal);

    // Upload to S3
    try {
      console.log('☁️ Uploading to S3:', s3Key);
      await uploadToS3(fileBuffer, s3Key, finalMimetype, {
        uploadedBy: req.user.id,
        submissionId: req.params.id,
        originalFilename: req.file.originalname,
        isUpdate: 'true'
      });
      console.log('✅ Upload to S3 successful');
    } catch (uploadError) {
      console.error('❌ S3 upload error:', uploadError);
      return res.status(500).json({
        success: false,
        message: 'Error uploading to S3',
        error: uploadError.message
      });
    }

    // Delete old file from S3 if exists
    if (oldKey) {
      try {
        console.log('🗑️ Deleting old file from S3:', oldKey);
        await deleteFile(oldKey);
        console.log('✅ Old file deleted');
      } catch (deleteError) {
        console.warn('⚠️ Could not delete old file:', deleteError.message);
        // Don't fail the request if deletion fails
      }
    }

    // Update submission
    submission.documentFile = {
      key: s3Key,
      filename: finalFilename,
      size: fileBuffer.length,
      mimetype: finalMimetype,
      uploadedAt: new Date()
    };

    // Reset status if rejected
    if (submission.status.includes('rejected')) {
      submission.status = 'pending';
      submission.submittedAt = new Date();
      submission.rejectionReason = null;
    }

    // Add timeline event
    submission.addTimelineEvent({
      eventType: 'author_edited',
      title: 'Document Updated',
      description: `Author uploaded a new document file${isDocx ? ' (converted from DOCX to PDF)' : ''}`,
      performedBy: req.user.id,
      performedByRole: 'author'
    });

    await submission.save();

    res.status(200).json({
      success: true,
      message: isDocx
        ? 'Document converted to PDF and updated successfully'
        : 'Document updated successfully',
      data: { submission }
    });

  } catch (error) {
    console.error('❌ Update submission document error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating document',
      error: error.message
    });
  }
};

// @desc    Check if submission can be edited
// @route   GET /api/submissions/:id/can-edit
// @access  Private (Author)
exports.canEditSubmission = async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.id);

    if (!submission) {
      return res.status(404).json({
        success: false,
        message: 'Submission not found'
      });
    }

    // Check if user owns this submission
    if (submission.author.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized'
      });
    }

    // UPDATED: Include 'approved_by_editor' when reviewer has sent it back with notes
    const canEdit = [
      'draft', 
      'pending', 
      'rejected_by_editor', 
      'rejected_by_reviewer'
    ].includes(submission.status) || 
    // Allow edit if status is approved_by_editor AND there are reviewer notes (sent back)
    (submission.status === 'approved_by_editor' && submission.reviewerNotes);

    res.status(200).json({
      success: true,
      data: { canEdit }
    });
  } catch (error) {
    console.error('Check can edit error:', error);
    res.status(500).json({
      success: false,
      message: 'Error checking edit permission',
      error: error.message
    });
  }
};

module.exports = exports;