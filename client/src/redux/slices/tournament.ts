import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchTournaments,
  fetchFilterTournaments,
  fetchTournamentDetail,
} from "./tournamentThunk";

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
  loading: boolean;
  error: string;
};

const initialState: InitialState = {
  tournamentDetail: null,
  tournaments: [],
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
  },
});

export default tournamentSlice.reducer;
