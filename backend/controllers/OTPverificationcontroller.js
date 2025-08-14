
import { sendMailto } from "../utils/sendEmail.js";
import {OtpVerification} from "../models/OTPverification.js"

function generateOTP() {
    
    const otp = Math.floor(100000 + Math.random() * 900000);
    
    // Convert to string to ensure it's exactly 6 digits
    // (Math.random could theoretically generate a number less than 100000)
    return otp.toString().padStart(6, '0');
  }
  
 export const sendOTPVerification2 = async (req, res) => {
    try {
      const { email } = req.body;
      const otp = generateOTP();
      const htmlTemplate = `<!DOCTYPE html>
  <html>
  <head>
      <style>
          .email-container {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #f8f9fa;
          }
          .header {
              text-align: center;
              padding: 20px 0;
          }
          .logo {
              font-size: 24px;
              color: #2563eb;
              font-weight: bold;
              margin-bottom: 10px;
          }
          .content {
              background-color: white;
              padding: 30px;
              border-radius: 10px;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
              margin: 20px 0;
          }
          .otp-box {
              background-color: #f0f7ff;
              border: 2px dashed #2563eb;
              border-radius: 8px;
              padding: 20px;
              margin: 20px 0;
              text-align: center;
          }
          .otp-code {
              font-size: 32px;
              letter-spacing: 8px;
              color: #2563eb;
              font-weight: bold;
              margin: 10px 0;
              font-family: monospace;
          }
          .warning {
              background-color: #fff8f1;
              border-left: 4px solid #f97316;
              padding: 15px;
              margin: 20px 0;
              font-size: 14px;
              color: #9a3412;
          }
          .footer {
              text-align: center;
              color: #6b7280;
              font-size: 14px;
              margin-top: 20px;
              padding-top: 20px;
              border-top: 1px solid #e5e7eb;
          }
          .message {
              color: #4b5563;
              line-height: 1.6;
              margin-bottom: 20px;
          }
          .expiry {
              font-size: 14px;
              color: #ef4444;
              margin-top: 10px;
          }
      </style>
  </head>
  <body>
      <div class="email-container">
          <div class="header">
              <div class="logo">🔐 SecureLogin</div>
          </div>
          <div class="content">
              <div class="message">
                  <h2>Verify Your Login</h2>
                  <p>Hello,</p>
                  <p>You've requested to log in to your account. To complete the login process, please use the following One-Time Password (OTP):</p>
              </div>
              
              <div class="otp-box">
                  <div>Your OTP Code is:</div>
                  <div class="otp-code">${otp}</div>
                  <div class="expiry">Valid for 5 minutes only</div>
              </div>
  
              <div class="warning">
                  ⚠ Never share this OTP with anyone. Our team will never ask for your OTP.
              </div>
  
              <p class="message">
                  If you didn't request this login, please ignore this email or contact support if you have concerns.
              </p>
          </div>
          <div class="footer">
              <p>This is an automated message, please do not reply to this email.</p>
              <p>© 2025 SecureLogin. All rights reserved.</p>
          </div>
      </div>
  </body>
  </html>`;
  
      
  
      const newOtpVerification = new OtpVerification({
        otp,
        email,
      });
  
      const savedOtpVerification = await newOtpVerification.save();
  
      await sendMailto(
        htmlTemplate,
        email,
        `Your Login OTP: ${otp}`,
        "Login Verification OTP"
      );
  
      res.json({
        status: "pending",
        message: "OTP message sent",
     
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  };
  export const verifyOtp = async (req,res)=>{
    try {
      const {email, otp } = req.body;
  
      const isOtp = await OtpVerification.findOne({email});
      if(!isOtp){
        return res.status(400).json({message:"otp not matched"})
      }
      if(isOtp.otp !== otp){
        return res.status(400).json({message:"otp not matched"})
      }
      const deltedOtp = await OtpVerification.deleteMany({email});
  
      res.status(200).json({
        message: "otp verified successfully",
  
      })
    } catch (error) {
      return res.status(400).json({message:error.message})
  
    }
  }
//   module.exports={verifyOtp,sendOTPVerification2}