import { createSlice } from "@reduxjs/toolkit";
import { login, loginAuth0, refreshToken, signOut } from "./authThunk";

type InitialState = {
  token: null | string;
  decoded: null | { id: string; username: string; email: string };
  loading: boolean;
  error: string;
};

const initialState: InitialState = {
  token: null,
  decoded: null,
  loading: false,
  error: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Login
    builder.addCase(login.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.token = action.payload.token;
      state.decoded = action.payload.decoded.payload;
      state.loading = false;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.token = null;
      state.decoded = null;
      state.loading = false;
      state.error = action.payload as string;
    });

    // Auth0Login
    builder.addCase(loginAuth0.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginAuth0.fulfilled, (state, action) => {
      state.token = action.payload.token;
      state.decoded = action.payload.decoded.payload;
      state.loading = false;
    });
    builder.addCase(loginAuth0.rejected, (state, action) => {
      state.token = null;
      state.decoded = null;
      state.loading = false;
      state.error = action.payload as string;
    });

    // RefreshToken
    builder.addCase(refreshToken.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(refreshToken.fulfilled, (state, action) => {
      state.token = action.payload.token;
      state.decoded = action.payload.decoded.payload;
      state.loading = false;
    });
    builder.addCase(refreshToken.rejected, (state) => {
      state.token = null;
      state.decoded = null;
      state.loading = false;
    });

    // SignOut
    builder.addCase(signOut.fulfilled, (state) => {
      state.loading = false;
      state.token = null;
      state.decoded = null;
    });
  },
});

export const {} = authSlice.actions;

export default authSlice.reducer;
