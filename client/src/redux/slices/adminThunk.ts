import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

export const fetchStats = createAsyncThunk("admin/fetchStats", async () => {
  const result = await api.get(`${process.env.REACT_APP_API_URL}/stats`);
  return result.data;
});

export const getBannedUser = createAsyncThunk("get/bannedUsers", async () => {
  const response = await api.get("/admin/bannedusers");
  return response.data;
});

export const unbanUser = createAsyncThunk(
  "put/unbanUser",
  async (payload: { email: string }, { rejectWithValue }) => {
    try {
      const response = await api.put("/admin/unbanuser", payload);
      console.log(response.data);
    } catch (err: any) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const getAllComments = createAsyncThunk("get/allComments", async () => {
  const response = await api.get("/admin/allcomments");
  return response.data;
});

export const deleteComment = createAsyncThunk(
  "delete/Comment",
  async (payload: any, { rejectWithValue }) => {
    try {
      console.log(payload);
      const response = await api.delete("/feedback/deletereview", {
        data: { id: payload.id },
      });
      console.log(response.data);
    } catch (err: any) {
      return rejectWithValue(err.response.data.message);
    }
  }
);
