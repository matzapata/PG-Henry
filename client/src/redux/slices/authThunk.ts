import { createAsyncThunk } from "@reduxjs/toolkit";
import { getToken, removeToken, setToken } from "../../utils/auth";
import api from "../../services/api";
import history from "../../utils/history";

type LoginPayload = {
  email: string;
  password: string;
};

export const login = createAsyncThunk(
  "auth/login",
  async (payload: LoginPayload) => {
    const response = await api.post("/auth/signin", payload);
    setToken(response.data.token);
    history.push("/home");
    return response.data;
  }
);

export const signOut = createAsyncThunk("auth/signOut", async () => {
  removeToken();
});
