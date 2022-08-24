import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../services/api";

type ChangePassword = {
  email: string;
  password: string;
};

const initialState = {
  loading: false,
  error: "",
  password: "",
};

export const changePassword = createAsyncThunk(
  "change/password",
  async (payload: ChangePassword, { rejectWithValue }) => {
    console.log(payload);
    try {
      const response = await api.put("/users/changepsw", payload);
      if (response.data.message === "Contraseña cambiada exitosamente.")
        return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data.message);
    }
  }
);
