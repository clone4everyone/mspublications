const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  email: {
    type: String,
    
    required: true
  },
 
  subject: {
    type: String,
    required: true,
    trim: true
  },
  message: {
    type: String,
    required: true
  },
  
}, {
  timestamps: true
});

// Index for efficient queries
contactSchema.index({ journal: 1, status: 1, createdAt: -1 });
contactSchema.index({ author: 1, createdAt: -1 });

module.exports = mongoose.model('Contact', contactSchema);