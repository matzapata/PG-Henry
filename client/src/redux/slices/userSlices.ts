import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../services/api";
import { useHistory } from "react-router-dom";

type ChangePassword = {
  email: string;
  password: string;
};

type ProfileInput = {
  email: string;
  password: string;
};

const initialState = {
  loading: false,
  error: "",
  success: "",
  user_detail: {},
};

export const getUserInfo = createAsyncThunk(
  "get/avatar",
  async (payload: any, { rejectWithValue }) => {
    console.log(payload);
    try {
      const response = await api.get("/users/getprofileinfo", payload);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const changePassword = createAsyncThunk(
  "change/password",
  async (payload: ChangePassword, { rejectWithValue }) => {
    console.log(payload);
    try {
      const response = await api.put("/users/changepsw", payload);
      return response.data.msg;
    } catch (err: any) {
      console.log(err.response.data.error);
      return rejectWithValue(err.response.data.error);
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserInfo.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUserInfo.fulfilled, (state, action) => {
      state.loading = false;
      state.user_detail = action.payload;
      state.error = "";
    });
    builder.addCase(getUserInfo.rejected, (state, action) => {
      state.loading = false;
      state.user_detail = {};
      state.error = action.error.message || "Algo salio mal";
    });

    builder.addCase(changePassword.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(changePassword.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload;
      state.error = "";
    });
    builder.addCase(changePassword.rejected, (state, action) => {
      state.loading = false;
      state.user_detail = {};
      state.error = action.error.message || "Algo salio mal";
    });
  },
});

export default userSlice.reducer;
