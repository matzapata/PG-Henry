import { createAsyncThunk } from "@reduxjs/toolkit";
import { getToken, removeToken, setToken } from "../../utils/auth";
import api from "../../services/api";
import history from "../../utils/history";
import { AxiosError, HeadersDefaults } from "axios";

type LoginPayload = {
  email: string;
  password: string;
  check?: boolean;
};

interface AxiosDefaultHeaders extends HeadersDefaults {
  "x-access-token": string;
}

export const login = createAsyncThunk(
  "auth/login",
  async (payload: LoginPayload, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/signin", payload);
      api.defaults.headers = {
        ...api.defaults.headers,
        "x-access-token": response.data.token,
      } as AxiosDefaultHeaders;

      if (payload.check) setToken(response.data.token);
      history.push("/");
      return response.data;
    } catch (e: any) {
      return rejectWithValue(e.response.data.message);
    }
  }
);

export const refreshToken = createAsyncThunk("auth/refreshToken", async () => {
  const token = getToken();
  if (!token) throw new Error("No token in storage");

  api.defaults.headers = {
    ...api.defaults.headers,
    "x-access-token": token,
  } as AxiosDefaultHeaders;
  const response = await api.post("/auth/refresh");

  setToken(response.data.token);
  api.defaults.headers = {
    ...api.defaults.headers,
    "x-access-token": response.data.token,
  } as AxiosDefaultHeaders;

  return response.data;
});

export const signOut = createAsyncThunk("auth/signOut", async () => {
  removeToken();
});
