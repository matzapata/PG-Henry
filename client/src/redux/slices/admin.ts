import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchStats, getBannedUser } from "./adminThunk";

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
  },
});

export default adminSlice.reducer;
