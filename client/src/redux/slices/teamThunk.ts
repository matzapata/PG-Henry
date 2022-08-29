import { createAsyncThunk } from "@reduxjs/toolkit";

export const getLogoA = createAsyncThunk(
  "get/logo",
  (payload: any, { rejectWithValue }) => {
    try {
      return payload;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);
