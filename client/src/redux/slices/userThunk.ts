import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

type ChangePassword = {
  email: string;
  password: string;
};

type DeleteUser = {
  is_active: boolean;
  id: string;
};

export const getUserInfo = createAsyncThunk(
  "get/userinfo",
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await api.get("/users/getprofileinfo");
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const changePassword = createAsyncThunk(
  "change/password",
  async (payload: ChangePassword, { rejectWithValue }) => {
    try {
      const response = await api.put("/users/changepsw", payload);
      return response.data.msg;
    } catch (err: any) {
      return rejectWithValue(err.response.data.error);
    }
  }
);

export const deleteActiveUser = createAsyncThunk(
  "delete/user",
  async (payload: DeleteUser, { rejectWithValue }) => {
    try {
      const { id, is_active } = payload;
      const response = await api.put(`/users/${id}/status`, {
        is_active: is_active,
      });
      if (response.data.status === 200) return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const fetchUserTournaments = createAsyncThunk(
  "user/fetchUserTournaments",
  async (payload: void, { rejectWithValue }) => {
    try {
      const response = await api.get("/users/tournaments");
      return response.data;
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);
