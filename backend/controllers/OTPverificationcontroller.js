
import { sendMailto } from "../utils/sendEmail.js";
import { OtpVerification } from "../models/OTPverification.js"
import nodemailer from "nodemailer";
export function generateOTP() {
    
    const otp = Math.floor(100000 + Math.random() * 900000);
    
    // Convert to string to ensure it's exactly 6 digits
    // (Math.random could theoretically generate a number less than 100000)
    return otp.toString().padStart(6, '0');
  }
// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

// Send OTP function
export const sendOTPVerification2 = async (userEmail,OTP) => {
  try {
    

    const info = await transporter.sendMail({
      from: `"Auction Authority" <${process.env.EMAIL_USER}>`,
      to: userEmail,
      subject: "Your OTP Code",
      text: `Your OTP is ${OTP}`,
      html: ` <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
    <div style="max-width: 600px; margin: auto; background: white; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
      <div style="background-color: #004aad; color: white; padding: 15px 20px; text-align: center; font-size: 20px; font-weight: bold;">
        Auction Authority - OTP Verification
      </div>
      <div style="padding: 20px; color: #333; font-size: 16px; line-height: 1.5;">
        <p>Dear User,</p>
        <p>We have received a request to verify your email address for your account with <strong>Auction Authority</strong>.</p>
        <p>Please use the following One-Time Password (OTP) to complete your verification process. This code is valid for <strong>10 minutes</strong> only.</p>
        <div style="text-align: center; margin: 30px 0;">
          <span style="display: inline-block; font-size: 28px; letter-spacing: 4px; font-weight: bold; color: #004aad; padding: 12px 20px; border: 2px dashed #004aad; border-radius: 6px;">
            ${OTP}
          </span>
        </div>
        <p>If you did not request this, please ignore this email or contact our support immediately.</p>
        <p style="margin-top: 20px;">Best regards,<br><strong>Auction Authority Team</strong></p>
      </div>
      <div style="background-color: #f2f2f2; padding: 10px; text-align: center; font-size: 12px; color: #888;">
        &copy; ${new Date().getFullYear()} Auction Authority. All rights reserved.
      </div>
    </div>
  </div>`,
    });

    console.log("OTP email sent:", info.messageId);
    // return otp; // You can store this in DB for verification
  } catch (error) {
    console.error("Error sending mail:", error);
    throw error;
  }
}