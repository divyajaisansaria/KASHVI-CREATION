const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.example.com', // Your SMTP server
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'your_email@example.com', // Your email
    pass: 'your_email_password', // Your email password
  },
});

module.exports = transporter;