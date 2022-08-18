import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import tournaments from "../../utils/tournaments.json";

type Tournament = {
  id: string;
  name: string;
  status: string;
  type: string;
};

type InitialState = {
  tournaments: Tournament[];
  loading: boolean;
  error: string;
};

const initialState: InitialState = {
  tournaments: [],
  loading: false,
  error: "",
};

export const fetchTournaments = createAsyncThunk(
  "tournaments/fetchTournaments",
  () => {
    return tournaments;
  }
);

const tournamentSlice = createSlice({
  name: "tournaments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
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
  },
});

export default tournamentSlice.reducer;