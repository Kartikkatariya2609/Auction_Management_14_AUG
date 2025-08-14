import express from "express";
import {
  fetchLeaderboard,
  getProfile,
  login,
  logout,
  register,
} from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { sendOTPVerification2, verifyOtp } from "../controllers/OTPverificationcontroller.js";
// import OtpVerification from "../models/OTPverification.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", isAuthenticated, getProfile);
router.get("/logout", isAuthenticated, logout);
router.get("/leaderboard", fetchLeaderboard);

router.post('/sendotp',sendOTPVerification2)
router.post('/verifyotp',verifyOtp)

export default router;
