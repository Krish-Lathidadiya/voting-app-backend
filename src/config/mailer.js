const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, 
  auth: {
    user: process.env.USER,
    pass: process.env.PASS, 
  },
});

// Verify transporter configuration
transporter.verify(function (error, success) {
  if (error) {
    console.error("Error verifying transporter:", error);
  } else {
    console.log("Transporter is ready to send emails");
  }
});

module.exports = transporter;
