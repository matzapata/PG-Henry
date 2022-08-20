import { createSlice } from "@reduxjs/toolkit";
import { login, signOut } from "./authThunk";

const initialState = {
  token: null,
  loading: false,
  userData: {},
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.token = action.payload.token;
      state.loading = false;
    });
    builder.addCase(login.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(signOut.fulfilled, (state) => {
      state.loading = false;
      state.userData = {};
      state.token = null;
    });

    // [login.rejected]: (state, action) => {
    // [fetchUserData.pending]: (state, action) => {
    //   state.loading = true;
    // },
    // [fetchUserData.fulfilled]: (state, action) => {
    //   const { accessToken, user } = action.payload;
    //   state.token = accessToken;
    //   state.userData = user;
    //   state.loading = false;
    // },
    // [fetchUserData.rejected]: (state, action) => {
    //   state.loading = false;
    //   state.userData = {};
    //   state.token = null;
    // },
  },
});

export const {} = authSlice.actions;

export default authSlice.reducer;
