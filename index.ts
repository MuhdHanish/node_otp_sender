const nodemailer = require("nodemailer");

const sendOtpEmail = (
  senderEmail: string,
  senderPassword: string,
  recipientEmail: string,
  subject: string
): Promise<{otp: number, message: string}>=> {

  return new Promise((resolve, reject) => {
    if (!senderEmail || !senderPassword || !recipientEmail || !subject) {
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
    .otp-container {
      border: 2px solid #000;
      border-radius: 8px;
      padding: 20px;
      text-align: center;
      font-family: Arial, sans-serif;
      background-color: #f7f7f7;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      max-width: 400px;
      margin: 0 auto;
    }

    .otp-title {
      font-size: 20px;
      font-weight: bold;
      color: #000;
      margin: 0 0 20px;
      text-transform: uppercase;
    }

    .otp-code {
      font-size: 48px;
      font-weight: bold;
      color: #333;
      margin: 0;
      padding: 10px;
      background-color: #fff;
      border-radius: 5px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      display: inline-block;
    }

    .otp-text {
      font-size: 14px;
      color: #555;
      margin-top: 20px;
      font-style: italic;
      font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    }
  </style>
</head>
<body>
  <div class="otp-container">
    <h1 class="otp-title">OTP Verification</h1>
    <p class="otp-text ">Here is your One-Time Password:</p>
    <p class="otp-code" id="otp-code">${otp}</p>
    <p class="otp-text">Please use this code for verification.</p>
  </div>
</body>
</html>
    `,
      };

      transporter.sendMail(mailOptions, function (error: Error, info: any) {
        if (error) {
          reject({ error, message: "Inavlid sender-email or password" });
        } else {
          resolve({ otp, message: "OTP sent successfully" });
        }
      });
    }
  });
};

export default sendOtpEmail;
