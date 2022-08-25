import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchTournaments,
  fetchFilterTournaments,
  fetchTournamentDetail,
  fetchTournamentRanking,
} from "./tournamentThunk";

export type TournamentRanking = {
  score: number;
  full_name: string;
  username: string;
  position: number;
};

export type Tournament = {
  id: string;
  name: string;
  status: string;
  type: string;
  logo_url: string;
};

export type TournamentDetail = {
  id: string;
  name: string;
  description: string;
  status: string;
  type: string;
  user_limit: number;
  pool: number;
  logo_url: string;
};

export type InitialState = {
  tournamentDetail: TournamentDetail | null;
  tournaments: Tournament[];
  tournamentRanking: TournamentRanking[] | null;
  loading: boolean;
  error: string;
};

const initialState: InitialState = {
  tournaments: [],
  tournamentRanking: [],
  tournamentDetail: null,
  loading: false,
  error: "",
};

const tournamentSlice = createSlice({
  name: "tournaments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch tournamnets
    builder.addCase(fetchTournaments.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchTournaments.fulfilled,
      (state, action: PayloadAction<Tournament[]>) => {
        state.loading = false;
        state.tournaments = action.payload;
        state.error = "";
      }
    );
    builder.addCase(fetchTournaments.rejected, (state, action) => {
      state.loading = false;
      state.tournaments = [];
      state.error = action.error.message || "Algo salio mal";
    });

    // Fetch filter tournaments
    builder.addCase(fetchFilterTournaments.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchFilterTournaments.fulfilled,
      (state, action: PayloadAction<Tournament[]>) => {
        state.loading = false;
        state.tournaments = action.payload;
        state.error = "";
      }
    );
    builder.addCase(fetchFilterTournaments.rejected, (state, action) => {
      state.loading = false;
      state.tournaments = [];
      state.error = action.error.message || "Algo salio mal";
    });

    // Fetch tournament detail
    builder.addCase(fetchTournamentDetail.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchTournamentDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.tournamentDetail = action.payload;
    });
    builder.addCase(fetchTournamentDetail.rejected, (state) => {
      state.loading = false;
      state.tournamentDetail = null;
    });

    // Fetch tournament ranking
    builder.addCase(fetchTournamentRanking.fulfilled, (state, action) => {
      state.tournamentRanking = action.payload;
    });
    builder.addCase(fetchTournamentRanking.rejected, (state) => {
      state.tournamentRanking = null;
    });
  },
});

export default tournamentSlice.reducer;
