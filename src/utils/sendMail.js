const transporter = require("../config/mailer");
const getOtpEmailTemplate = (otp) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>OTP Email</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f9;
          color: #333;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #fff;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
          text-align: center;
        }
        .header img {
          width: 100px;
          border-radius: 50%;
        }
        .content {
          text-align: center;
          padding: 20px 0;
        }
        .otp {
          font-size: 24px;
          font-weight: bold;
          margin: 20px 0;
        }
        .footer {
          text-align: center;
          font-size: 12px;
          color: #777;
          margin-top: 20px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
        //   <img src="https://example.com/astrology-image.jpg" alt="Astrology Image">
          <h1>Welcome to Our Vote App Service</h1>
        </div>
        <div class="content">
          <p>Your OTP code is:</p>
          <div class="otp">${otp}</div>
          <p>Please use this code to complete your authentication.</p>
        </div>
        <div class="footer">
          <p>&copy; 2024 VoteApp Service. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
    `;
};
// sendMail(guest.email, "Your OTP Code", emailTemplate);
const sendMail = (to, subject, html) => {
  const mailOptions = {
    from: process.env.MAILER,
    to: to,
    subject: subject,
    html: html,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = {
  sendMail,
  getOtpEmailTemplate,
};
