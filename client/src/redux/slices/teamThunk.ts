import { createAsyncThunk } from "@reduxjs/toolkit";

export const getLogoA = createAsyncThunk(
  "get/logoA",
  (payload: any, { rejectWithValue }) => {
    try {
      return payload;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const getLogoB = createAsyncThunk(
  "get/logoB",
  (payload: any, { rejectWithValue }) => {
    try {
      return payload;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);
