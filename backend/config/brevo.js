const SibApiV3Sdk = require('sib-api-v3-sdk');

// Configure Brevo API
const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.BREVO_API_KEY;

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

/**
 * Send email using Brevo
 * @param {Object} emailData - Email data
 * @param {string} emailData.to - Recipient email
 * @param {string} emailData.toName - Recipient name
 * @param {string} emailData.subject - Email subject
 * @param {string} emailData.htmlContent - Email HTML content
 * @param {Array} emailData.attachment - Attachments (optional, images only)
 */
const sendEmail = async (emailData) => {
  try {
    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
    
    sendSmtpEmail.sender = {
      email: process.env.BREVO_SENDER_EMAIL,
      name: process.env.BREVO_SENDER_NAME
    };
    
    sendSmtpEmail.to = [{
      email: emailData.to,
      name: emailData.toName || emailData.to
    }];
    
    sendSmtpEmail.subject = emailData.subject;
    sendSmtpEmail.htmlContent = emailData.htmlContent;
    
    // Add attachments if provided (images only from Cloudinary)
    if (emailData.attachments && emailData.attachments.length > 0) {
      sendSmtpEmail.attachment = emailData.attachments.map(att => ({
        url: att.url,
        name: att.filename || 'image.jpg'
      }));
    }
    
    const result = await apiInstance.sendTransacEmail(sendSmtpEmail);
    return {
      success: true,
      messageId: result.messageId
    };
  } catch (error) {
    console.error('Brevo email error:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

/**
 * Send notification email (system generated)
 */
const sendNotificationEmail = async (to, toName, subject, message) => {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #4CAF50; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background-color: #f9f9f9; }
        .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>IJPPI</h1>
        </div>
        <div class="content">
          <h2>${subject}</h2>
          <p>Dear ${toName},</p>
          ${message}
        </div>
        <div class="footer">
          <p>This is an automated message from IJPPI System.</p>
          <p>&copy; ${new Date().getFullYear()} IJPPI. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
  
  return await sendEmail({
    to,
    toName,
    subject,
    htmlContent
  });
};

module.exports = {
  sendEmail,
  sendNotificationEmail
};