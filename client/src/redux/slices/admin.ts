import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchStats,
  getActiveTournaments,
  getAllComments,
  getBannedUser,
} from "./adminThunk";

export type Stats = {
  tournaments: number;
  privateTournaments: number;
  publicTournaments: number;
  users: number;
  activeUsers: number;
  inactiveUsers: number;
  banned: number;
  revenue: number;
};

export type InitialState = {
  stats: Stats;
  loading: boolean;
  error: string;
  bannedUsers: [];
  allComments: [];
  activeTournaments: [];
};

const initialState: InitialState = {
  stats: {
    tournaments: 0,
    privateTournaments: 0,
    publicTournaments: 0,
    users: 0,
    activeUsers: 0,
    inactiveUsers: 0,
    banned: 0,
    revenue: 0,
  },
  loading: false,
  error: "",
  bannedUsers: [],
  allComments: [],
  activeTournaments: [],
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch stats
    builder.addCase(fetchStats.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchStats.fulfilled,
      (state, action: PayloadAction<Stats>) => {
        state.stats = action.payload;
      }
    );
    builder.addCase(fetchStats.rejected, (state, action) => {
      state.stats = {
        tournaments: 0,
        privateTournaments: 0,
        publicTournaments: 0,
        users: 0,
        activeUsers: 0,
        inactiveUsers: 0,
        banned: 0,
        revenue: 0,
      };
    });
    // Get banned users
    builder.addCase(getBannedUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getBannedUser.fulfilled, (state, action) => {
      state.loading = false;
      state.bannedUsers = action.payload;
    });
    builder.addCase(getBannedUser.rejected, (state, action) => {
      state.loading = false;
      state.bannedUsers = [];
    });
    // Get all comments
    builder.addCase(getAllComments.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllComments.fulfilled, (state, action) => {
      state.loading = false;
      state.allComments = action.payload;
    });
    builder.addCase(getAllComments.rejected, (state, action) => {
      state.loading = false;
      state.allComments = [];
    });
    // Get active tournaments
    builder.addCase(getActiveTournaments.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getActiveTournaments.fulfilled, (state, action) => {
      state.loading = false;
      state.activeTournaments = action.payload;
    });
    builder.addCase(getActiveTournaments.rejected, (state, action) => {
      state.loading = false;
      state.activeTournaments = [];
    });
  },
});

export default adminSlice.reducer;
