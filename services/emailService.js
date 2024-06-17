const nodemailer = require('nodemailer');

// Create transporter
const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "maddison53@ethereal.email",
    pass: "jn7jnAPss4f63QBp6D",
  },
});

// Function to send reminder email
async function sendReminderEmail(event) {
  try {
    const mailOptions = {
      from: 'maddison53@ethereal.email',
      to: event.contact,
      subject: 'Reminder: Your Upcoming Event',
      text: `Hi ${event.host},\n\nThis is a reminder for your upcoming event on ${event.reservation}. Please be prepared!\n\nRegards,\nYour App Team`
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`Reminder email sent to ${event.contact}: ${info.messageId}`);
  } catch (error) {
    console.error('Error sending reminder email:', error);
    throw error; // Propagate the error to handle it in calling context if needed
  }
}

module.exports = {
  sendReminderEmail
};