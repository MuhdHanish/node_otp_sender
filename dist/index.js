"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.nodeOtpSender = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const crypto_1 = require("crypto");
/**
 * Generates a secure OTP of a specified length.
 *
 * @param length - The length of the OTP to generate.
 * @returns A secure OTP as a string.
 */
const generateSecureOtp = (length) => {
    const randomBuffer = (0, crypto_1.randomBytes)(length);
    let otp = '';
    for (let i = 0; i < length; i++) {
        otp += (randomBuffer[i] % 10).toString();
    }
    return otp; // Return as string to maintain leading zeros
};
/**
 * Sends an OTP email with the provided details.
 *
 * @param config - The configuration object containing:
 *  - senderEmail: The sender's email address.
 *  - senderPassword: The sender's email password.
 *  - recipientEmail: The recipient's email address.
 *  - subject: The subject of the email.
 *  - length: Optional. The length of the OTP to generate. Defaults to 4.
 *  - maxRetries: Optional. The maximum number of retries in case of errors. Defaults to 3.
 *  - retryDelay: Optional. The delay between retries in milliseconds. Defaults to 1000ms.
 *
 * @returns A promise that resolves with an object containing:
 *  - `otp`: The generated OTP as a string.
 *  - `message`: A message indicating the OTP was sent successfully.
 */
const nodeOtpSender = ({ senderEmail, senderPassword, recipientEmail, subject, length = 4, maxRetries = 3, retryDelay = 1000 }) => {
    if (!senderEmail || !senderPassword || !recipientEmail || !subject) {
        return Promise.reject(new Error("Missing required parameters: senderEmail, senderPassword, recipientEmail, and subject must all be provided."));
    }
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        let retries = 0;
        const retryableErrors = [
            "ETIMEDOUT",
            "ECONNRESET",
            "EHOSTUNREACH",
            "DNSResolutionError",
            "SSLError"
        ];
        while (retries < maxRetries) {
            try {
                const transporter = nodemailer_1.default.createTransport({
                    service: "gmail",
                    auth: {
                        user: senderEmail,
                        pass: senderPassword,
                    },
                });
                const otp = generateSecureOtp(length);
                const mailOptions = {
                    from: senderEmail,
                    to: recipientEmail,
                    subject,
                    html: `
                        <!DOCTYPE html>
                        <html lang="en">
                        <head>
                            <meta charset="UTF-8">
                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                            <title>OTP Verification</title>
                            <style>
                                body {
                                    font-family: Arial, sans-serif;
                                    margin: 0;
                                    padding: 0;
                                    background-color: #f4f4f4;
                                    color: #333;
                                    text-align: center;
                                }
                                .container {
                                    max-width: 600px;
                                    margin: 40px auto;
                                    background: white;
                                    padding: 20px;
                                    border-radius: 8px;
                                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                                }
                                h1 {
                                    color: #2c3e50;
                                }
                                .otp-code {
                                    font-size: 36px;
                                    font-weight: bold;
                                    color: #e74c3c; /* A strong color for the OTP */
                                    margin: 20px 0;
                                }
                                p {
                                    font-size: 16px;
                                    line-height: 1.5;
                                }
                                footer {
                                    margin-top: 30px;
                                    font-size: 14px;
                                    color: #999;
                                }
                                @media (max-width: 600px) {
                                    .otp-code {
                                        font-size: 28px; /* Responsive font size */
                                    }
                                }
                            </style>
                        </head>
                        <body>
                            <div class="container">
                                <h1>OTP Verification</h1>
                                <p class="otp-code">${otp}</p>
                                <p>Please use this code for verification.</p>
                                <footer>
                                    <p>Thank you for using our service!</p>
                                </footer>
                            </div>
                        </body>
                        </html>
                    `
                };
                yield transporter.sendMail(mailOptions);
                resolve({ otp, message: "OTP sent successfully" });
                return;
            }
            catch (error) {
                retries++;
                if (!retryableErrors.includes(error.code)) {
                    reject("Sorry, we encountered an issue while sending the OTP email. Please try again later.");
                    return;
                }
                if (retries < maxRetries) {
                    yield new Promise((resolve) => setTimeout(resolve, retryDelay));
                }
                else {
                    reject(`Max retry attempts (${maxRetries}) reached. Email delivery failed.`);
                }
            }
        }
    }));
};
exports.nodeOtpSender = nodeOtpSender;
