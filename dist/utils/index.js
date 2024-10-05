"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSecureOtp = void 0;
const crypto_1 = require("crypto");
const generateSecureOtp = (length) => {
    const randomBuffer = (0, crypto_1.randomBytes)(length);
    let otp = '';
    for (let i = 0; i < length; i++) {
        otp += randomBuffer[i] % 10;
    }
    return parseInt(otp, 10);
};
exports.generateSecureOtp = generateSecureOtp;
