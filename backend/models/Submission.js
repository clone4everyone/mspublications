const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  // ... all existing fields remain the same ...
  
  journal: {
    type: String,
    required: true,
    enum: ['pharma', 'history', 'chemistry', 'science', 'ayurvedic', 'technology']
  },
  
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  section: {
    type: String,
    required: true,
    enum: [
      'Original Article(s)',
      'Review Article(s)',
      'Editorial',
      'Short Communication(s)',
      'Case Study(s)',
      'Letter to Editor',
      'Innopharm 3',
      'Conference Proceeding',
      'ICMAT 2020 Full Proceeding Paper',
      'Conference Proceedings'
    ]
  },
  
  volume: {
    type: Number
  },
  issue: {
    type: Number
  },
  pageNumbers: {
    from: Number,
    to: Number
  },
  
  commentsForEditor: {
    type: String,
    trim: true
  },
  
  potentialReviewers: [{
    name: String,
    affiliation: String,
    email: String,
    expertise: String
  }],
  
  agreementsAccepted: {
    type: Boolean,
    required: true,
    default: false
  },
  
  documentFile: {
    key: String,
    url: String,
    filename: String,
    size: Number,
    uploadedAt: Date
  },
  
  metadata: {
    prefix: String,
    title: {
      type: String,
      trim: true
    },
    subtitle: {
      type: String,
      trim: true
    },
    abstract: {
      type: String
    },
    coAuthors: [{
      prefix: String,
      firstName: String,
      lastName: String,
      email: String,
      affiliation: String,
      isPrimaryContact: Boolean,
      inBrowseList: Boolean
    }],
    keywords: [{
      type: String,
      trim: true
    }],
    references: [{
      type: String,
      trim: true
    }]
  },
  
  status: {
    type: String,
    enum: [
      'draft',
      'pending',
      'approved_by_editor',
      'rejected_by_editor',
      'with_reviewer',
      'approved_by_reviewer',
      'rejected_by_reviewer',
      'scheduled',
      'published',
     
    ],
    default: 'draft'
  },
  
  reviewerAssigned: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  
  editorNotes: {
    type: String
  },
  
  reviewerNotes: {
    type: String
  },
  
  rejectionReason: {
    type: String
  },
  
 sendBackHistory: [{
  sentBackAt: Date,
  editorNotes: String,      // NEW: Add this for editor notes
  reviewerNotes: String,    // Existing for reviewer notes
  editorId: {               // NEW: Add this
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  reviewerId: {             // Existing
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  sentBackBy: {             // NEW: Add this to track who sent it back
    type: String,
    enum: ['editor', 'reviewer']
  }
}],
  
  publicationDate: {
    type: Date
  },
  
  publishedAt: {
    type: Date
  },
  
  submittedAt: {
    type: Date
  },
  
  editorReviewedAt: {
    type: Date
  },
  
  reviewerReviewedAt: {
    type: Date
  },
  
  currentStep: {
    type: Number,
    default: 1,
    min: 1,
    max: 5
  },
  
  isCompleted: {
    type: Boolean,
    default: false
  },
  
  // NEW: Timeline/History tracking
  timeline: [{
    eventType: {
      type: String,
      enum: [
        'submitted',
        'editor_reviewed',
        'editor_approved',
        'editor_rejected',
        'editor_message_sent',
        'author_edited',
        'forwarded_to_reviewer',
        'editor_sent_back', 
        'reviewer_sent_back',
        'reviewer_approved',
        'reviewer_rejected',
        'scheduled',
        'published'
      ],
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: String,
    notes: String, // For editor/reviewer notes
    performedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    performedByRole: {
      type: String,
      enum: ['author', 'editor', 'reviewer', 'system']
    },
    metadata: {
      type: mongoose.Schema.Types.Mixed // For storing additional data like email subject, etc.
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  }]
  
}, {
  timestamps: true
});

// Index for faster queries
submissionSchema.index({ journal: 1, status: 1 });
submissionSchema.index({ author: 1 });
submissionSchema.index({ publicationDate: 1 });

// Helper method to add timeline event
submissionSchema.methods.addTimelineEvent = function(eventData) {
  this.timeline.push({
    eventType: eventData.eventType,
    title: eventData.title,
    description: eventData.description,
    notes: eventData.notes,
    performedBy: eventData.performedBy,
    performedByRole: eventData.performedByRole,
    metadata: eventData.metadata,
    timestamp: new Date()
  });
};

module.exports = mongoose.model('Submission', submissionSchema);