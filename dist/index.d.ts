/**
 * Generates a secure OTP of a specified length.
 *
 * @param length - The length of the OTP to generate.
 *
 * @returns A secure OTP as a number.
 */
export declare const generateSecureOtp: (length: number) => number;
/**
 * Sends an OTP email with a specified subject and recipient details.
 *
 * @param senderEmail - The sender's email address.
 * @param senderPassword - The sender's email password.
 * @param recipientEmail - The recipient's email address.
 * @param subject - The subject of the email.
 * @param length - Optional. The length of the OTP to generate. Defaults to 4.
 * @param maxRetries - Optional. The maximum number of retries in case of errors. Defaults to 3.
 * @param retryDelay - Optional. The delay between retries in milliseconds. Defaults to 1000ms.
 *
 * @returns A promise that resolves with an object containing:
 *  - `otp`: The generated OTP as a number.
 *  - `message`: A message indicating the OTP was sent successfully.
 */
export declare const nodeOtpSender: (senderEmail: string, senderPassword: string, recipientEmail: string, subject: string, length?: number, maxRetries?: number, retryDelay?: number) => Promise<{
    otp: number;
    message: string;
}>;
