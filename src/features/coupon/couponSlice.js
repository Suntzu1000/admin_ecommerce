import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import couponService from "./couponService";

export const getCoupon = createAsyncThunk(
  "coupon/get-coupons",
  async (thunkAPI) => {
    try {
      return await couponService.getCoupon();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createCoupon = createAsyncThunk(
  "coupon/create-coupon",
  async (couponData, thunkAPI) => {
    try {
      return await couponService.createCoupon(couponData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");


const initialState = {
  coupons: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const couponSlice = createSlice({
  name: "coupons",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCoupon.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCoupon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.coupons = action.payload;
      })
      .addCase(getCoupon.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createCoupon.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCoupon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdCoupon = action.payload;
      })
      .addCase(createCoupon.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);

  },
});
export default couponSlice.reducer;