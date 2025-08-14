import mongoose from 'mongoose';

const otpVerificationSchema = new mongoose.Schema({
  otp: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  expiresAt: {
    type: Date,
    required: false
  }
});

export const OtpVerification = mongoose.model('OtpVerification', otpVerificationSchema);

// module.exports = OtpVerification;
