const mongoose = require('mongoose');

const emailSchema = new mongoose.Schema({
  submission: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Submission',
    required: true
  },
  
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  senderRole: {
    type: String,
    enum: ['author', 'editor'],
    required: true
  },
  
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  recipientRole: {
    type: String,
    enum: ['author', 'editor'],
    required: true
  },
  
  subject: {
    type: String,
    required: true,
    trim: true
  },
  
  body: {
    type: String,
    required: true
  },
  
  // Images only (stored in Cloudinary)
  attachments: [{
    url: String,
    publicId: String,
    filename: String,
    size: Number
  }],
  
  // Brevo email tracking
  brevoMessageId: {
    type: String
  },
  
  isRead: {
    type: Boolean,
    default: false
  },
  
  readAt: {
    type: Date
  },
  
  sentAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for faster queries
emailSchema.index({ submission: 1, sentAt: -1 });
emailSchema.index({ sender: 1 });
emailSchema.index({ recipient: 1 });

module.exports = mongoose.model('Email', emailSchema);