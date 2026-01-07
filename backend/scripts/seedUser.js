require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

const seedUsers = async () => {
  try {
    await connectDB();

    // Check if editor already exists
    const existingEditor = await User.findOne({ role: 'editor' });
    if (!existingEditor) {
      const editor = await User.create({
        firstName: 'Editor',
        lastName: 'MS Publication',
        email: process.env.EDITOR_EMAIL || 'editor@mspublication.com',
        password: process.env.EDITOR_PASSWORD || 'editor123456',
        role: 'editor',
        affiliation: 'MS Publication'
      });
      console.log('✓ Editor account created:', editor.email);
    } else {
      console.log('✓ Editor account already exists:', existingEditor.email);
    }

    // Check if reviewer already exists
    const existingReviewer = await User.findOne({ role: 'reviewer' });
    if (!existingReviewer) {
      const reviewer = await User.create({
        firstName: 'Reviewer',
        lastName: 'MS Publication',
        email: process.env.REVIEWER_EMAIL || 'reviewer@mspublication.com',
        password: process.env.REVIEWER_PASSWORD || 'reviewer123456',
        role: 'reviewer',
        affiliation: 'MS Publication'
      });
      console.log('✓ Reviewer account created:', reviewer.email);
    } else {
      console.log('✓ Reviewer account already exists:', existingReviewer.email);
    }

    console.log('\n===========================================');
    console.log('Seed completed successfully!');
    console.log('===========================================');
    console.log('\nLogin Credentials:');
    console.log('\nEditor:');
    console.log(`  Email: ${process.env.EDITOR_EMAIL || 'editor@mspublication.com'}`);
    console.log(`  Password: ${process.env.EDITOR_PASSWORD || 'editor123456'}`);
    console.log('\nReviewer:');
    console.log(`  Email: ${process.env.REVIEWER_EMAIL || 'reviewer@mspublication.com'}`);
    console.log(`  Password: ${process.env.REVIEWER_PASSWORD || 'reviewer123456'}`);
    console.log('===========================================\n');

    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seedUsers();