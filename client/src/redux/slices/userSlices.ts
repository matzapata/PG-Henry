import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../../services/api";

type ChangePassword = {
  email: string;
  password: string;
};

type DeleteUser = {
  is_active: boolean;
  id: string;
};

const initialState: {
  token: string | null;
  decoded: { id: string; email: string; username: string } | null;
  loading: boolean;
  error: string;
  error_message: string;
  message: string;
  user_detail: any;
} = {
  token: null,
  decoded: null,
  loading: false,
  error: "",
  error_message: "",
  message: "",
  user_detail: {},
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
    console.log(payload);
    try {
      const response = await api.put("/users/changepsw", payload);
      return response.data.msg;
    } catch (err: any) {
      console.log(err.response.data.error);
      console.log(err);
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

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
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
      state.user_detail = {};
      state.error = action.error.message || "Algo salio mal";
    });

    builder.addCase(changePassword.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(changePassword.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload;
      state.error_message = "";
    });
    builder.addCase(changePassword.rejected, (state, action) => {
      state.loading = false;
      state.user_detail = {};
      state.error_message =
        "Ingresaste un email incorrecto." || "Algo salio mal";
    });
  },
});

export default userSlice.reducer;
