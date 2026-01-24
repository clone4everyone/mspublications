const SibApiV3Sdk = require('sib-api-v3-sdk');
const Contact=require("../models/Contact")
const User=require("../models/User")

/**
 * @desc    Send contact message to admin
 * @route   POST /api/author/contact
 * @access  Private
 */
const sendContactMessage = async (req, res) => {
  try {
    const { subject, message } = req.body;
    
    // Validate input
    if (!subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'Subject and message are required'
      });
    }
const msg=await Contact.create({subject,message,email:req.user.email});



    
    res.status(200).json({
      success: true,
      message: 'Your message has been sent successfully. We will get back to you soon.',
     
    });

  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send message. Please try again later.',
      error: error.message
    });
  }
};
const allReviewers = async(req,res) => {
   try {
    const reviewers = await User.find({
      role: 'reviewer',
      isActive: true,
      isVerified: true
    })
    .select('firstName lastName prefix email affiliation orcid reviewerRole post department')
    .sort({ reviewerRole: 1, lastName: 1 });
console.log(reviewers)
    res.status(200).json({
      success: true,
      data: {
        reviewers,
        count: reviewers.length
      }
    });
  } catch (error) {
    console.error('Get public reviewers error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch reviewers'
    });
  }
}
module.exports = {
  sendContactMessage,
  allReviewers
};