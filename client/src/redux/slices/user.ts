import { createSlice } from "@reduxjs/toolkit";
import { changePassword, fetchUserTournaments, getUserInfo } from "./userThunk";

type UserTournament = {
  id: string;
  score: number;
  name: string;
  logo_url: string;
  status: string;
  type: string;
};

type InitialState = {
  loading: boolean;
  error: string;
  message: string;
  userDetail:
    | {
        id: string;
        username: string;
        full_name: string;
        email: string;
        is_admin: boolean;
        banned: boolean;
        avatar: string;
        alias_mp: string;
      }
    | any;
  userTournaments: {
    page: number;
    lastPage: number;
    tournaments: UserTournament[];
  };
};

const initialState: {
  token: string | null;
  decoded: { id: string; email: string; username: string } | null;
  loading: boolean;
  error: string;
  error_message: string;
  message: string;
  userDetail: any;
  userTournaments: {
    page: number;
    lastPage: number;
    tournaments: UserTournament[];
  };
} = {
  token: null,
  decoded: null,
  loading: false,
  error: "",
  error_message: "",
  message: "",
  userDetail: {},
  userTournaments: {
    page: 1,
    lastPage: 1,
    tournaments: [],
  },
};

// const initialState: InitialState = {
//   loading: false,
//   error: "",
//   message: "",
//   userDetail: null,
//   userTournaments: {
//     page: 1,
//     lastPage: 1,
//     tournaments: [],
//   },
// };

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
      state.userDetail = action.payload;
      state.error = "";
    });
    builder.addCase(getUserInfo.rejected, (state, action) => {
      state.loading = false;
      state.userDetail = null;
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
      state.userDetail = null;
      state.error = "Ingresaste un email incorrecto.";
    });

    // fetch user tournaments
    builder.addCase(fetchUserTournaments.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(fetchUserTournaments.fulfilled, (state, action) => {
      state.loading = false;
      state.userTournaments = action.payload;
      state.error = "";
    });
    builder.addCase(fetchUserTournaments.rejected, (state, action) => {
      state.userTournaments = initialState.userTournaments;
      state.error = action.payload as string;
    });
  },
});

export default userSlice.reducer;
