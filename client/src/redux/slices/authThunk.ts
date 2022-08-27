import { createAsyncThunk } from "@reduxjs/toolkit";
import { getToken, removeToken, setToken } from "../../utils/auth";
import api from "../../services/api";
import history from "../../utils/history";
import { HeadersDefaults } from "axios";
import jwtDecode from "jwt-decode";

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
      return {
        ...response.data,
        decoded: jwtDecode(response.data.token),
      };
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

  return {
    ...response.data,
    decoded: jwtDecode(response.data.token),
  };
});

export const signOut = createAsyncThunk("auth/signOut", async () => {
  removeToken();
});

export const createAuthAccount = createAsyncThunk(
  "create/auth0",
  async (payload: any, { rejectWithValue }) => {
    try {
      const { email, username, full_name, avatar } = payload;
      const response = await api
        .post(`/auth/authlogin`, {
          email: email,
          username: username,
          full_name: full_name,
          avatar: avatar,
        })
        .then(async (r) => {
          const response2 = await api.post("/auth/auth0/signin", {
            email: r.data.user.email,
            password: "test",
            check: true,
          });
          api.defaults.headers = {
            ...api.defaults.headers,
            "x-access-token": r.data.token,
          } as AxiosDefaultHeaders;
          setToken(r.data.token);

          return {
            ...response2.data,
            decoded: jwtDecode(response2.data.token),
          };
        });
      return;
    } catch (err: any) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const loginAuth0 = createAsyncThunk(
  "auth0/login",
  async (payload: LoginPayload, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/auth0/signin", payload);
      api.defaults.headers = {
        ...api.defaults.headers,
        "x-access-token": response.data.token,
      } as AxiosDefaultHeaders;

      if (payload.check) setToken(response.data.token);
      history.push("/");
      return {
        ...response.data,
        decoded: jwtDecode(response.data.token),
      };
    } catch (e: any) {
      return rejectWithValue(e.response.data.message);
    }
  }
);
