import { filter } from "@chakra-ui/react";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../../services/api";
import axios from "axios";

type Tournament = {
  id: string;
  name: string;
  status: string;
  type: string;
  logo_url: string;
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
  async () => {
    const result = await api.get(
      `${process.env.REACT_APP_API_URL}/tournaments?sort=asc`
    );
    return result.data;
  }
);

export const fetchFilterTournaments = createAsyncThunk(
  "tournaments/fetchFilterTournaments",
  async (filters: {
    type: string;
    stat: string;
    sort: string;
    name: string;
    page?: number;
  }) => {
    const result = await api.get(
      `${process.env.REACT_APP_API_URL}/tournaments?${
        filters.type ? "type=" + filters.type : ""
      }&${filters.stat ? "status=" + filters.stat : ""}&${
        filters.sort ? "sort=" + filters.sort : ""
      }&${filters.name ? "name=" + filters.name : ""}&${
        filters.page ? "page=" + filters.page : ""
      }`
    );
    return result.data;
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
  },
});

export default tournamentSlice.reducer;
