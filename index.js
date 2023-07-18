const nodemailer = require("nodemailer");

const sendOtpEmail = (
  senderEmail,
  senderPassword,
  recipientEmail,
  subject
) => {

  return new Promise((resolve, reject) => {
    if (
      !senderEmail.length ||
      !senderPassword.length ||
      !recipientEmail.length ||
      !subject.length
    ) {
      reject(
        "Please provide valid details (senderEmail, senderPassword, recipientEmail, subject)."
      );
    } else {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: senderEmail,
          pass: senderPassword,
        },
      });

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
      </html>`,
      };

      transporter.sendMail(
        mailOptions,
        function (error, info) {
          if (error) {
            reject({ error, message: "Inavlid sender-email or password" });
          } else {
            resolve({ otp, message: "OTP sended successfully" });
          }
        }
      );
    }
  });
};

module.exports = sendOtpEmail;