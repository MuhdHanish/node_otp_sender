declare const nodeOtpSender: (senderEmail: string, senderPassword: string, recipientEmail: string, subject: string, length?: number, maxRetries?: number, retryDelay?: number) => Promise<{
    otp: number;
    message: string;
}>;
export default nodeOtpSender;
