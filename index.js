const nodemailer = require("nodemailer");

const sendOtpEmail = (
  senderEmail,
  senderPassword,
  recipientEmail,
  subject,
  maxRetries = 3, // Number of retry attempts
  retryDelay = 1000 // Delay between retries
) => {
  return new Promise(async (resolve, reject) => {
    let retries = 0;
    //these errors may resolve after retry
    const retryableErrors = [
      "ETIMEDOUT",                  // Network: Connection timed out
      "ECONNRESET",                 // Network: Connection reset by peer
      "EHOSTUNREACH",               // Network: Host is unreachable
      "DNSResolutionError",         // Network: DNS resolution issue
      "SSLError"                    // Network: SSL/TLS handshake issue
    ];

    while (retries < maxRetries) {
      try {
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

        await transporter.sendMail(mailOptions);

        resolve({ otp, message: "OTP sent successfully" });
        return;
      } catch (error) {
        console.error(`Attempt ${retries + 1} failed: ${error.message}`);

        retries++;
        if (!retryableErrors.includes(error.code)) {
          reject(`Sorry, we encountered an issue while sending the OTP email. Please try again later.`);
          return;
        }

        if (retries < maxRetries) {
          // Wait for the delay before the next retry
          await new Promise((resolve) => setTimeout(resolve, retryDelay));
        } else {
          reject(`Max retry attempts (${maxRetries}) reached. Email delivery failed.`);
        }
      }
    }
  });
};

module.exports = sendOtpEmail;
