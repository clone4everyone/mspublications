const cron = require('node-cron');
const Submission = require('../models/Submission');
const { sendNotificationEmail } = require('../config/brevo');

/**
 * Auto-publish submissions when publication date is reached
 * Runs every hour
 */
const autoPublishSubmissions = cron.schedule('0 * * * *', async () => {
  try {
    console.log('Running auto-publish cron job...');

    const now = new Date();

    // Find all scheduled submissions where publication date has passed
    const submissionsToPublish = await Submission.find({
      status: 'scheduled',
      publicationDate: { $lte: now }
    }).populate('author', 'firstName lastName email');

    if (submissionsToPublish.length === 0) {
      console.log('No submissions to publish');
      return;
    }

    console.log(`Found ${submissionsToPublish.length} submissions to publish`);

    for (const submission of submissionsToPublish) {
      try {
        // Update status to published
        submission.status = 'published';
        submission.publishedAt = new Date();
        await submission.save();

        console.log(`Published: ${submission.metadata.title}`);

        // Send notification to author
        await sendNotificationEmail(
          submission.author.email,
          `${submission.author.firstName} ${submission.author.lastName}`,
          'Your Submission is Now Published!',
          `<p>Congratulations! Your submission "<strong>${submission.metadata.title}</strong>" has been published.</p>
           <p><strong>Journal:</strong> ${submission.journal}</p>
           <p><strong>Published On:</strong> ${new Date().toDateString()}</p>
           <p>Your work is now available to readers.</p>`
        );
      } catch (error) {
        console.error(`Error publishing submission ${submission._id}:`, error);
      }
    }

    console.log('Auto-publish cron job completed');
  } catch (error) {
    console.error('Auto-publish cron job error:', error);
  }
});

/**
 * Send reminder for upcoming publications
 * Runs daily at 9 AM
 */
const sendPublicationReminders = cron.schedule('0 9 * * *', async () => {
  try {
    console.log('Running publication reminder cron job...');

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    const dayAfter = new Date(tomorrow);
    dayAfter.setDate(dayAfter.getDate() + 1);

    // Find submissions scheduled for tomorrow
    const upcomingSubmissions = await Submission.find({
      status: 'scheduled',
      publicationDate: {
        $gte: tomorrow,
        $lt: dayAfter
      }
    }).populate('author', 'firstName lastName email');

    if (upcomingSubmissions.length === 0) {
      console.log('No upcoming publications for tomorrow');
      return;
    }

    console.log(`Found ${upcomingSubmissions.length} submissions scheduled for tomorrow`);

    for (const submission of upcomingSubmissions) {
      try {
        await sendNotificationEmail(
          submission.author.email,
          `${submission.author.firstName} ${submission.author.lastName}`,
          'Your Submission Will Be Published Tomorrow',
          `<p>This is a reminder that your submission "<strong>${submission.metadata.title}</strong>" is scheduled to be published tomorrow.</p>
           <p><strong>Publication Date:</strong> ${submission.publicationDate.toDateString()}</p>
           <p>Your work will be automatically published and made available to readers.</p>`
        );

        console.log(`Reminder sent for: ${submission.metadata.title}`);
      } catch (error) {
        console.error(`Error sending reminder for submission ${submission._id}:`, error);
      }
    }

    console.log('Publication reminder cron job completed');
  } catch (error) {
    console.error('Publication reminder cron job error:', error);
  }
});

// Start all cron jobs
const startCronJobs = () => {
  console.log('Starting cron jobs...');
  autoPublishSubmissions.start();
  sendPublicationReminders.start();
  console.log('Cron jobs started successfully');
};

// Stop all cron jobs
const stopCronJobs = () => {
  console.log('Stopping cron jobs...');
  autoPublishSubmissions.stop();
  sendPublicationReminders.stop();
  console.log('Cron jobs stopped');
};

module.exports = {
  startCronJobs,
  stopCronJobs
};