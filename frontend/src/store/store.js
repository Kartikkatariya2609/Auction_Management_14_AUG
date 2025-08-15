import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import commissionReducer from "./slices/commissionSlice";
import auctionReducer from "./slices/auctionSlice";
import bidReducer from "./slices/bidSlice";
import superAdminReducer from "./slices/superAdminSlice";
import verifyOTP from "./slices/verifiyOTPslice"
export const store = configureStore({
  reducer: {
    user: userReducer,
    commission: commissionReducer,
    auction: auctionReducer,
    bid: bidReducer,
    superAdmin: superAdminReducer,
    verifyOTP: verifyOTPReducer
  },
});
