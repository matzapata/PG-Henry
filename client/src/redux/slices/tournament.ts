import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchTournaments,
  fetchFilterTournaments,
  fetchTournamentDetail,
  fetchTournamentMatches,
  fetchTournamentRanking,
  fetchTournamentAllMatches,
} from "./tournamentThunk";

export type TournamentRanking = {
  score: number;
  full_name: string;
  username: string;
};

export type Tournament = {
  id: string;
  name: string;
  status: string;
  type: string;
  logo_url: string;
  is_official: boolean;
};

export type Prediction = {
  id: string;
  score_a: number;
  score_b: number;
  match_id: string;
  user_id: string;
  tournament_id: string;
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
  creator_user_id: string;
  is_official: boolean;
};

export type TournamentMatch = {
  team_b_id: number;
  team_a_id: number;
  id: string;
  score_a: number | undefined;
  score_b: number | undefined;
  date: string;
  stage: string;
  team_a: Team;
  team_b: Team;
  match_id: Prediction[];
};

export type Team = {
  name: string;
  shield_url: string;
};

export type InitialState = {
  tournamentDetail: TournamentDetail | null;
  tournamentAllMatches: TournamentMatch[] | null;
  tournamentMatches: {
    page: number;
    lastPage: number;
    matches: TournamentMatch[] | null;
  };
  tournaments: Tournament[];
  tournamentRanking: {
    page: number;
    lastPage: number;
    ranking: TournamentRanking[] | null;
  };
  loading: boolean;
  error: string;
};

const initialState: InitialState = {
  tournamentDetail: null,
  tournamentAllMatches: null,
  tournamentMatches: {
    page: 1,
    lastPage: 1,
    matches: null,
  },
  tournaments: [],
  tournamentRanking: {
    page: 1,
    lastPage: 1,
    ranking: null,
  },
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
    //Fetch tournament  matches
    builder.addCase(fetchTournamentMatches.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchTournamentMatches.fulfilled, (state, action) => {
      state.loading = false;
      state.tournamentMatches = action.payload;
    });
    builder.addCase(fetchTournamentMatches.rejected, (state, action) => {
      state.loading = false;
      state.tournamentMatches = {
        page: 1,
        lastPage: 1,
        matches: null,
      };
      state.error = action.error.message || "Algo salio mal";
    });
    // Fetch tournament ranking
    builder.addCase(fetchTournamentRanking.fulfilled, (state, action) => {
      state.tournamentRanking = action.payload;
    });
    builder.addCase(fetchTournamentRanking.rejected, (state) => {
      state.tournamentRanking = {
        page: 1,
        lastPage: 1,
        ranking: null,
      };
    });
    //Fetch tournament ALL matches
    builder.addCase(fetchTournamentAllMatches.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchTournamentAllMatches.fulfilled, (state, action) => {
      state.loading = false;
      state.tournamentAllMatches = action.payload;
    });
    builder.addCase(fetchTournamentAllMatches.rejected, (state, action) => {
      state.loading = false;
      (state.tournamentAllMatches = null),
        (state.error = action.error.message || "Algo salio mal");
    });
  },
});

export default tournamentSlice.reducer;
