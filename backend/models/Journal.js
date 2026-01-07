const mongoose = require('mongoose');

const journalSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  acronym: String,
  description: String,
  issn: String,
  impactFactor: String,
  about: String,
  editorialBoard: [{
    name: String,
    position: String,
    affiliation: String,
    bio: String
  }],
  instructions: String,
  contact: {
    email: String,
    phone: String,
    address: String
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Journal', journalSchema);