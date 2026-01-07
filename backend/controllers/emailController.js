const Email = require('../models/Email');
const Submission = require('../models/Submission');
const User = require('../models/User');
const { sendEmail } = require('../config/brevo');
const { uploadToCloudinary } = require('../config/cloudinary');

// @desc    Send email between author and editor
// @route   POST /api/emails/send
// @access  Private (Author/Editor)
exports.sendEmailMessage = async (req, res) => {
  try {
    const { submissionId, subject, body } = req.body;

    if (!submissionId || !subject || !body) {
      return res.status(400).json({
        success: false,
        message: 'Submission ID, subject, and body are required'
      });
    }

    const submission = await Submission.findById(submissionId)
      .populate('author', 'firstName lastName email');

    if (!submission) {
      return res.status(404).json({
        success: false,
        message: 'Submission not found'
      });
    }

    // Determine sender and recipient
    let recipientId, recipientRole, recipientEmail, recipientName;
    const senderRole = req.user.role;

    if (senderRole === 'author') {
      // Author sending to editor
      if (submission.author._id.toString() !== req.user.id) {
        return res.status(403).json({
          success: false,
          message: 'Not authorized'
        });
      }

      const editor = await User.findOne({ role: 'editor' });
      if (!editor) {
        return res.status(404).json({
          success: false,
          message: 'Editor not found'
        });
      }

      recipientId = editor._id;
      recipientRole = 'editor';
      recipientEmail = editor.email;
      recipientName = `${editor.firstName} ${editor.lastName}`;
      
      // DON'T add timeline event for author messages
    } else if (senderRole === 'editor') {
      // Editor sending to author
      recipientId = submission.author._id;
      recipientRole = 'author';
      recipientEmail = submission.author.email;
      recipientName = `${submission.author.firstName} ${submission.author.lastName}`;
      
      // ADD timeline event for editor messages to author
      submission.addTimelineEvent({
        eventType: 'editor_message_sent',
        title: 'Message from Editor',
        description: 'The editor has sent you a message regarding your submission.',
        performedBy: req.user.id,
        performedByRole: 'editor',
        metadata: {
          subject: subject,
          preview: body.substring(0, 100) // First 100 chars as preview
        }
      });
      
      await submission.save();
    } else {
      return res.status(403).json({
        success: false,
        message: 'Only authors and editors can send emails'
      });
    }

    // Handle image attachments if provided
    let attachments = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        try {
          const result = await uploadToCloudinary(file.buffer, 'email-attachments');
          attachments.push({
            url: result.secure_url,
            publicId: result.public_id,
            filename: file.originalname,
            size: file.size
          });
        } catch (uploadError) {
          console.error('Error uploading image:', uploadError);
        }
      }
    }

    // Create email record
    const emailRecord = await Email.create({
      submission: submissionId,
      sender: req.user.id,
      senderRole,
      recipient: recipientId,
      recipientRole,
      subject,
      body,
      attachments
    });

    // Prepare email data for Brevo
    const emailData = {
      to: recipientEmail,
      toName: recipientName,
      subject: `[${submission.journal.toUpperCase()}] ${subject}`,
      htmlContent: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #4CAF50; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background-color: #f9f9f9; }
            .submission-info { background-color: #e8f5e9; padding: 15px; margin: 15px 0; border-left: 4px solid #4CAF50; }
            .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
            .attachments { margin-top: 15px; }
            .attachment-img { max-width: 100%; height: auto; margin: 10px 0; border-radius: 4px; }
            .message-body { margin: 20px 0; white-space: pre-wrap; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>MS Publication</h1>
            </div>
            <div class="content">
              <h2>${subject}</h2>
              <p>Dear ${recipientName},</p>
              
              <div class="submission-info">
                <strong>Submission:</strong> ${submission.metadata?.title || 'Untitled'}<br>
                <strong>Journal:</strong> ${submission.journal.toUpperCase()}<br>
                <strong>From:</strong> ${req.user.firstName} ${req.user.lastName} (${senderRole.charAt(0).toUpperCase() + senderRole.slice(1)})
              </div>
              
              <div class="message-body">
                ${body.replace(/\n/g, '<br>')}
              </div>
              
              ${attachments.length > 0 ? `
                <div class="attachments">
                  <strong>Attachments (${attachments.length}):</strong><br>
                  ${attachments.map(att => `
                    <img src="${att.url}" alt="${att.filename}" class="attachment-img" />
                  `).join('')}
                </div>
              ` : ''}
            </div>
            <div class="footer">
              <p>This message was sent via MS Publication Journal Management System.</p>
              <p>Please log in to your dashboard to reply.</p>
              <p>&copy; ${new Date().getFullYear()} MS Publication. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `
    };

    if (attachments.length > 0) {
      emailData.attachments = attachments.map(att => ({
        url: att.url,
        filename: att.filename
      }));
    }

    console.log('Sending email to:', recipientEmail);
    const brevoResult = await sendEmail(emailData);

    if (brevoResult.success) {
      emailRecord.brevoMessageId = brevoResult.messageId;
      await emailRecord.save();
      console.log('Email sent successfully. Message ID:', brevoResult.messageId);
    } else {
      console.error('Failed to send email via Brevo:', brevoResult.error);
      return res.status(201).json({
        success: true,
        message: 'Email record created but email delivery failed',
        warning: 'Email could not be sent via Brevo',
        data: { 
          email: emailRecord,
          brevoError: brevoResult.error 
        }
      });
    }

    res.status(201).json({
      success: true,
      message: 'Email sent successfully',
      data: { email: emailRecord }
    });
  } catch (error) {
    console.error('Send email error:', error);
    res.status(500).json({
      success: false,
      message: 'Error sending email',
      error: error.message
    });
  }
};

// @desc    Get all emails for a submission
// @route   GET /api/emails/submission/:submissionId
// @access  Private (Author/Editor related to submission)
exports.getSubmissionEmails = async (req, res) => {
  try {
    const { submissionId } = req.params;

    const submission = await Submission.findById(submissionId);

    if (!submission) {
      return res.status(404).json({
        success: false,
        message: 'Submission not found'
      });
    }

    // Check authorization
    const isAuthor = submission.author.toString() === req.user.id;
    const isEditor = req.user.role === 'editor';

    if (!isAuthor && !isEditor) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view these emails'
      });
    }

    const emails = await Email.find({ submission: submissionId })
      .populate('sender', 'firstName lastName email role')
      .populate('recipient', 'firstName lastName email role')
      .sort({ sentAt: 1 });

    res.status(200).json({
      success: true,
      count: emails.length,
      data: { emails }
    });
  } catch (error) {
    console.error('Get submission emails error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching emails',
      error: error.message
    });
  }
};

// @desc    Mark email as read
// @route   PUT /api/emails/:id/read
// @access  Private
exports.markAsRead = async (req, res) => {
  try {
    const email = await Email.findById(req.params.id);

    if (!email) {
      return res.status(404).json({
        success: false,
        message: 'Email not found'
      });
    }

    // Only recipient can mark as read
    if (email.recipient.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized'
      });
    }

    email.isRead = true;
    email.readAt = new Date();
    await email.save();

    res.status(200).json({
      success: true,
      message: 'Email marked as read',
      data: { email }
    });
  } catch (error) {
    console.error('Mark as read error:', error);
    res.status(500).json({
      success: false,
      message: 'Error marking email as read',
      error: error.message
    });
  }
};

// @desc    Get unread email count
// @route   GET /api/emails/unread/count
// @access  Private
exports.getUnreadCount = async (req, res) => {
  try {
    const count = await Email.countDocuments({
      recipient: req.user.id,
      isRead: false
    });

    res.status(200).json({
      success: true,
      data: { count }
    });
  } catch (error) {
    console.error('Get unread count error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching unread count',
      error: error.message
    });
  }
};

module.exports = exports;