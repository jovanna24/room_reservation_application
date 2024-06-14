const nodemailer = require("nodemailer");

// Create a transporter object
const transporter = nodemailer.createTransport({
  host: "",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "",
    pass: "",
  },
});

// Function to send email
async function sendMail({ from, to, subject, text, html }) {
  const info = await transporter.sendMail({
    from,
    to,
    subject,
    text,
    html,
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

module.exports = sendMail;
