import { createSlice } from "@reduxjs/toolkit";
import { changePassword, getUserInfo } from "./userThunk";

type InitialState = {
  loading: boolean;
  error: string;
  message: string;
  user_detail: {
    id: string;
    username: string;
    full_name: string;
    email: string;
    is_admin: boolean;
    banned: boolean;
    avatar: string;
    alias_mp: string;
  } | null;
};

const initialState: InitialState = {
  loading: false,
  error: "",
  message: "",
  user_detail: null,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get user info
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
      state.user_detail = null;
      state.error = action.error.message || "Algo salio mal";
    });

    // Change password
    builder.addCase(changePassword.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(changePassword.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload;
      state.error = "";
    });
    builder.addCase(changePassword.rejected, (state) => {
      state.loading = false;
      state.user_detail = null;
      state.error = "Ingresaste un email incorrecto." || "Algo salio mal";
    });
  },
});

export default userSlice.reducer;
