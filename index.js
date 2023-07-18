const nodemailer = require("nodemailer");
const { promisify } = require("util");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: senderEmail,
    pass: senderPassword,
  }
});

const sendMailAsync = promisify(transporter.sendMail).bind(transporter);

const otpSender = async (senderEmail, senderPassword, recipientEmail, subject) => {
  if (!senderEmail || !senderPassword || !recipientEmail || !subject) {
    throw new Error("Please provide valid details (senderEmail, senderPassword, recipientEmail, subject).");
  }

  const otp = Math.floor(Math.random() * 900000) + 100000;

  const mailOptions = {
    from: senderEmail,
    to: recipientEmail,
    subject: subject,
    html: `
    <!DOCTYPE html>
    <html>
  <head>
  <title>OTP Verification</title>
  <style>
    .otp-code {
      font-size: 48px;
      font-weight: bold;
      color: #333;
    }
  </style>
  </head>
  <body>
      <h1>OTP Verification</h1>
      <p>Here is your One-Time Password:</p>
      <p class="otp-code">${otp}</p>
      <p>Please use this code for verification.</p>
  </body>
  </html>
    `,
  };

  try {
    await sendMailAsync(mailOptions);
    return { otp, message: "OTP sent successfully" };
  } catch (error) {
    throw new Error(`Failed to send OTP: ${error.message}`);
  }
  
};

module.exports = otpSender;
