const User = require('../models/User');
const { generateToken } = require('../middleware/auth');
const { sendEmail } = require('../config/brevo');
const crypto = require('crypto');

// @desc    Register new author
// @route   POST /api/auth/register
// @access  Public
// Updated register function in authController.js
// @desc    Register new author
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
  try {
    const { prefix, firstName, lastName, username, email, password, affiliation } = req.body;

    // Check if user already exists with this email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      if (existingUser.isVerified) {
        return res.status(400).json({
          success: false,
          message: 'User with this email already exists'
        });
      } else {
        // User exists but not verified - generate new token and resend email
        const verificationToken = existingUser.generateVerificationToken();
        await existingUser.save();

        // Create verification URL
        const verificationUrl = `${process.env.FRONTEND_URL}/IJPPI/verify-email/${verificationToken}`;

        // Send verification email
        const htmlContent = `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background-color: #4CAF50; color: white; padding: 20px; text-align: center; }
              .content { padding: 30px; background-color: #f9f9f9; }
              .button { 
                display: inline-block; 
                padding: 12px 30px; 
                background-color: #4CAF50; 
                color: white !important; 
                text-decoration: none; 
                border-radius: 5px; 
                margin: 20px 0; 
              }
              .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
              .warning { color: #ff6b6b; margin-top: 20px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>MS Publication</h1>
              </div>
              <div class="content">
                <h2>Verify Your Email Address</h2>
                <p>Dear ${existingUser.prefix || ''} ${existingUser.firstName} ${existingUser.lastName},</p>
                <p>You attempted to register again with MS Publication. Your account exists but hasn't been verified yet.</p>
                <p>Please verify your email address by clicking the button below:</p>
                <div style="text-align: center;">
                  <a href="${verificationUrl}" class="button">Verify Email Address</a>
                </div>
                <p>Or copy and paste this link into your browser:</p>
                <p style="word-break: break-all; color: #4CAF50;">${verificationUrl}</p>
                <p class="warning"><strong>Note:</strong> This verification link will expire in 24 hours.</p>
                <p>If you didn't create an account with MS Publication, please ignore this email.</p>
              </div>
              <div class="footer">
                <p>This is an automated message from MS Publication Journal Management System.</p>
                <p>&copy; ${new Date().getFullYear()} MS Publication. All rights reserved.</p>
              </div>
            </div>
          </body>
          </html>
        `;

        const emailResult = await sendEmail({
          to: existingUser.email,
          toName: `${existingUser.firstName} ${existingUser.lastName}`,
          subject: 'Verify Your Email - MS Publication',
          htmlContent
        });

        if (!emailResult.success) {
          return res.status(500).json({
            success: false,
            message: 'Failed to send verification email. Please try again later.'
          });
        }

        return res.status(200).json({
          success: true,
          message: 'Account exists but was not verified. A new verification email has been sent to your inbox.',
          data: {
            email: existingUser.email,
            verificationSent: true,
            isResend: true
          }
        });
      }
    }

    // Check if username already exists
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({
        success: false,
        message: 'Username is already taken'
      });
    }

    // Create user with isVerified: false
    const user = await User.create({
      prefix,
      firstName,
      lastName,
      username,
      email,
      password,
      affiliation,
      role: 'author',
      isVerified: false
    });

    // Generate verification token
    const verificationToken = user.generateVerificationToken();
    await user.save();

    // Create verification URL
    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email/${verificationToken}`;

    // Send verification email
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #4CAF50; color: white; padding: 20px; text-align: center; }
          .content { padding: 30px; background-color: #f9f9f9; }
          .button { 
            display: inline-block; 
            padding: 12px 30px; 
            background-color: #4CAF50; 
            color: white !important; 
            text-decoration: none; 
            border-radius: 5px; 
            margin: 20px 0; 
          }
          .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
          .warning { color: #ff6b6b; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>MS Publication</h1>
          </div>
          <div class="content">
            <h2>Verify Your Email Address</h2>
            <p>Dear ${prefix || ''} ${firstName} ${lastName},</p>
            <p>Thank you for registering with MS Publication! To complete your registration, please verify your email address by clicking the button below:</p>
            <div style="text-align: center;">
              <a href="${verificationUrl}" class="button">Verify Email Address</a>
            </div>
            <p>Or copy and paste this link into your browser:</p>
            <p style="word-break: break-all; color: #4CAF50;">${verificationUrl}</p>
            <p class="warning"><strong>Note:</strong> This verification link will expire in 24 hours.</p>
            <p>If you didn't create an account with MS Publication, please ignore this email.</p>
          </div>
          <div class="footer">
            <p>This is an automated message from MS Publication Journal Management System.</p>
            <p>&copy; ${new Date().getFullYear()} MS Publication. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const emailResult = await sendEmail({
      to: email,
      toName: `${firstName} ${lastName}`,
      subject: 'Verify Your Email - MS Publication',
      htmlContent
    });

    if (!emailResult.success) {
      // Delete user if email fails to send
      await User.findByIdAndDelete(user._id);
      return res.status(500).json({
        success: false,
        message: 'Failed to send verification email. Please try again.'
      });
    }

    res.status(201).json({
      success: true,
      message: 'Registration successful! Please check your email to verify your account.',
      data: {
        email: user.email,
        verificationSent: true
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Error during registration',
      error: error.message
    });
  }
};



exports.verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    // Hash the token to compare with stored hash
    const hashedToken = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');

    // Find user with matching token and check if not expired
    const user = await User.findOne({
      verificationToken: hashedToken,
      verificationTokenExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired verification token'
      });
    }

    // Update user
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Email verified successfully! You can now login.',
      data: {
        verified: true
      }
    });
  } catch (error) {
    console.error('Verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Error during email verification',
      error: error.message
    });
  }
};

exports.resendVerification = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    if (user.isVerified) {
      return res.status(400).json({
        success: false,
        message: 'Email is already verified'
      });
    }

    // Generate new verification token
    const verificationToken = user.generateVerificationToken();
    await user.save();

    // Create verification URL
    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email/${verificationToken}`;

    // Send verification email (same HTML as register)
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #4CAF50; color: white; padding: 20px; text-align: center; }
          .content { padding: 30px; background-color: #f9f9f9; }
          .button { 
            display: inline-block; 
            padding: 12px 30px; 
            background-color: #4CAF50; 
            color: white !important; 
            text-decoration: none; 
            border-radius: 5px; 
            margin: 20px 0; 
          }
          .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
          .warning { color: #ff6b6b; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>MS Publication</h1>
          </div>
          <div class="content">
            <h2>Verify Your Email Address</h2>
            <p>Dear ${user.prefix || ''} ${user.firstName} ${user.lastName},</p>
            <p>Here is your new verification link:</p>
            <div style="text-align: center;">
              <a href="${verificationUrl}" class="button">Verify Email Address</a>
            </div>
            <p>Or copy and paste this link into your browser:</p>
            <p style="word-break: break-all; color: #4CAF50;">${verificationUrl}</p>
            <p class="warning"><strong>Note:</strong> This verification link will expire in 24 hours.</p>
          </div>
          <div class="footer">
            <p>This is an automated message from MS Publication Journal Management System.</p>
            <p>&copy; ${new Date().getFullYear()} MS Publication. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    await sendEmail({
      to: user.email,
      toName: `${user.firstName} ${user.lastName}`,
      subject: 'Verify Your Email - MS Publication',
      htmlContent
    });

    res.status(200).json({
      success: true,
      message: 'Verification email sent successfully!'
    });
  } catch (error) {
    console.error('Resend verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Error resending verification email',
      error: error.message
    });
  }
};
// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
  try {
    const { emailOrUsername, password } = req.body;

    if (!emailOrUsername || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email/username and password'
      });
    }

    const isEmail = emailOrUsername.includes('@');
    
    const user = await User.findOne(
      isEmail 
        ? { email: emailOrUsername.toLowerCase() }
        : { username: emailOrUsername.toLowerCase() }
    ).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check if email is verified
    if (!user.isVerified) {
      return res.status(401).json({
        success: false,
        message: 'Please verify your email before logging in',
        needsVerification: true,
        email: user.email
      });
    }

    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Account is deactivated. Please contact administrator.'
      });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          username: user.username,
          email: user.email,
          role: user.role
        },
        token
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Error during login',
      error: error.message
    });
  }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
// Updated register function in authController.js
// exports.register = async (req, res) => {
//   try {
//     const { prefix, firstName, lastName, username, email, password, affiliation } = req.body;

//     // Check if user already exists with this email
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({
//         success: false,
//         message: 'User with this email already exists'
//       });
//     }

//     // Check if username already exists
//     const existingUsername = await User.findOne({ username });
//     if (existingUsername) {
//       return res.status(400).json({
//         success: false,
//         message: 'Username is already taken'
//       });
//     }

//     // Create user (role defaults to 'author')
//     const user = await User.create({
//       prefix,
//       firstName,
//       lastName,
//       username,
//       email,
//       password,
//       affiliation,
//       role: 'author'
//     });

//     // Generate token
//     const token = generateToken(user._id);

//     res.status(201).json({
//       success: true,
//       message: 'Registration successful',
//       data: {
//         user: {
//           id: user._id,
//           firstName: user.firstName,
//           lastName: user.lastName,
//           username: user.username,
//           email: user.email,
//           role: user.role
//         },
//         token
//       }
//     });
//   } catch (error) {
//     console.error('Registration error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Error during registration',
//       error: error.message
//     });
//   }
// };

// Updated getMe function in authController.js
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    res.status(200).json({
      success: true,
      data: {
        user: {
          id: user._id,
          prefix: user.prefix,
          firstName: user.firstName,
          lastName: user.lastName,
          username: user.username,
          email: user.email,
          affiliation: user.affiliation,
          role: user.role
        }
      }
    });
  } catch (error) {
    console.error('Get me error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching user data',
      error: error.message
    });
  }
};

// Add this new function
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    
    const user = await User.findById(req.user.id).select('+password');
    
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Current password is incorrect'
      });
    }
    
    user.password = newPassword;
    await user.save();
    
    res.json({
      success: true,
      message: 'Password changed successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};