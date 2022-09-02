import { createSlice } from "@reduxjs/toolkit";
import {
  fetchUserTournaments,
  getUserInfo,
  updateProfile,
  fetchUniqueUserTournament,
  getReviews,
  fetchUserTournamentWinner,
} from "./userThunk";

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
    is_attached: boolean;
    winner: boolean;
  };
  userComments: any[];
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
    is_attached: false,
    winner: false,
  },
  userComments: [],
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

    // Edit profile
    builder.addCase(updateProfile.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      console.log(action);
      state.loading = false;
      state.message = action.payload;
      state.error = "";
    });
    builder.addCase(updateProfile.rejected, (state) => {
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
    // fetch if user is attached tournaments
    builder.addCase(fetchUniqueUserTournament.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(fetchUniqueUserTournament.fulfilled, (state, action) => {
      if (typeof action.payload === "object") {
        state.userTournaments.is_attached = true;
      } else {
        state.userTournaments.is_attached = false;
      }
      state.loading = false;
      state.error = "";
    });
    builder.addCase(fetchUniqueUserTournament.rejected, (state, action) => {
      state.userTournaments.is_attached = false;
      state.loading = false;
      state.error = "";
    });
    // fetch user comments
    builder.addCase(getReviews.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getReviews.fulfilled, (state, action) => {
      state.loading = false;
      state.userComments = action.payload;
      state.error = "";
    });
    builder.addCase(getReviews.rejected, (state, action) => {
      state.userComments = [];
      state.error = action.payload as string;
    });
    //fetch winner?
    builder.addCase(fetchUserTournamentWinner.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(fetchUserTournamentWinner.fulfilled, (state, action) => {
      if (typeof action.payload === "object") {
        state.userTournaments.winner = true;
      } else {
        state.userTournaments.winner = false;
      }
      state.loading = false;
      state.error = "";
    });
    builder.addCase(fetchUserTournamentWinner.rejected, (state, action) => {
      state.loading = true;
      state.error = "";
      state.userTournaments.winner = false;
    });
  },
});

export default userSlice.reducer;
