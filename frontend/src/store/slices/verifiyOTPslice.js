import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const verifyOTPslice = createSlice({
  name: "verifyOTP",
  initialState: {
    loading: false,
    error: null,
    success: false,
    otp: "",
  },
  reducers: {
    verifyOTPRequest(state) {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    verifyOTPSuccess(state, action) {
      state.loading = false;
      state.success = true;
      state.otp = action.payload;
    },
    verifyOTPFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },
  },
});

export const { verifyOTPRequest, verifyOTPSuccess, verifyOTPFailure } =
  verifyOTPslice.actions;

// Thunk for verifying OTP
export const verifyingOTP = (OTP) => async (dispatch) => {
  try {
    dispatch(verifyOTPRequest());

    const response = await axios.post(
      "http://localhost:5000/api/v1/user/verifyotp/:id",
      { OTP },
      { withCredentials: true } // needed if req.user comes from session/cookie
    );

    dispatch(verifyOTPSuccess(OTP));
    toast.success(response.data.message || "OTP Verified Successfully");
  } catch (error) {
    const errMsg =
      error.response?.data?.message || "Error Occurred while verifying OTP";
    dispatch(verifyOTPFailure(errMsg));
    toast.error(errMsg);
  }
};

export default verifyOTPslice.reducer;
