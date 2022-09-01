import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

export const fetchStats = createAsyncThunk("admin/fetchStats", async () => {
  const result = await api.get(`${process.env.REACT_APP_API_URL}/stats`);
  return result.data;
});
