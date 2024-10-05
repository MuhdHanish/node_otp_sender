interface OtpSenderConfig {
    senderEmail: string;
    senderPassword: string;
    recipientEmail: string;
    subject: string;
    length?: number;
    maxRetries?: number;
    retryDelay?: number;
}
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
 *  - `otp`: The generated OTP as a number.
 *  - `message`: A message indicating the OTP was sent successfully.
 */
export declare const nodeOtpSender: ({ senderEmail, senderPassword, recipientEmail, subject, length, maxRetries, retryDelay }?: Partial<OtpSenderConfig>) => Promise<{
    otp: number;
    message: string;
}>;
export {};
