import { User } from "../models/userSchema.js";
import jwt from "jsonwebtoken";
import ErrorHandler from "./error.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";

export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const token = req.cookies.token;
  // console.log(token);
  if (!token) {
    return next(new ErrorHandler("User not authenticated.", 400));
  }
  // console.log(token);
  const decoded = jwt.verify(token, "secret123");
  // console.log(decoded);
  req.user = await User.findById(decoded.id);
  console.log
  next();
});

export const isAuthorized = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `${req.user.role} not allowed to access this resouce.`,
          403
        )
      );
    }
    next();
  };
};
