// Add to your User model schema (models/User.js)

const mongoose=require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const UserSchema = new mongoose.Schema({
  prefix: {
    type: String,
    enum: ['Dr.', 'Prof.', 'Mr.', 'Ms.', 'Mrs.', 'Mx.'],
  },
  firstName: {
    type: String,
    required: [true, 'Please add a first name'],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'Please add a last name'],
    trim: true,
  },
  username: {
    type: String,
    // required: [true, 'Please add a username'],
    unique: true,
    trim: true,
    lowercase: true,
    minlength: [3, 'Username must be at least 3 characters'],
    maxlength: [30, 'Username must not exceed 30 characters'],
    match: [
      /^[a-zA-Z][a-zA-Z0-9._-]*$/,
      'Username must start with a letter and contain only letters, numbers, dots, hyphens and underscores'
    ],
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ],
  },
  passwordResetToken: String,
passwordResetExpires: Date,
    isVerified: {
    type: Boolean,
    default: false
  },
  verificationToken: String,
  verificationTokenExpires: Date,
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 8,
    select: false,
  },
  affiliation: {
    type: String,
    trim: true,
  },
  role: {
    type: String,
    enum: ['author', 'reviewer', 'editor', 'admin'],
    default: 'author',
  },
  // NEW: Reviewer specialization
  specialization: {
    type: [String],
    enum: ['pharma', 'history', 'chemistry', 'science', 'ayurvedic', 'technology'],
    default: []
  },
  // NEW: Track reviewer workload
  activeReviews: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  orcid:{
    type:String,
    required:true
  },
  reviewerRole:{
    type:String,
    enum:['Associate','Assistant','Editorial']
  }
}, {
  timestamps: true,
});

// Hash password before saving
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password method
UserSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Get full name
UserSchema.virtual('fullName').get(function() {
  return `${this.prefix ? this.prefix + ' ' : ''}${this.firstName} ${this.lastName}`;
});
UserSchema.methods.generateVerificationToken = function() {
  const crypto = require('crypto');
  const token = crypto.randomBytes(32).toString('hex');
  
  this.verificationToken = crypto
    .createHash('sha256')
    .update(token)
    .digest('hex');
  
  this.verificationTokenExpires = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
  
  return token;
};
// Generate password reset token
UserSchema.methods.generatePasswordResetToken = function() {
  const resetToken = crypto.randomBytes(32).toString('hex');
  
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  
  this.passwordResetExpires = Date.now() + 60 * 60 * 1000; // 1 hour
  
  return resetToken;
};
module.exports = mongoose.model('User', UserSchema);