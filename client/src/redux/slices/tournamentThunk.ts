import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

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
    const result = await api.get("/tournaments", {
      params: {
        type: filters.type !== "" ? filters.type : undefined,
        status: filters.stat !== "" ? filters.stat : undefined,
        sort: filters.sort !== "" ? filters.sort : undefined,
        name: filters.name !== "" ? filters.name : undefined,
        page: filters.page,
      },
    });
    return result.data;
  }
);

export const fetchTournamentDetail = createAsyncThunk(
  "tournaments/fetchTournamentDetail",
  async (id: string) => {
    const response = await api.get(`/tournaments/${id}`);
    return response.data;
  }
);

export const fetchTournamentMatches = createAsyncThunk(
  "tournaments/fetchTournamentMatches",
  async ({
    id,
    page,
    pageSize,
    stage,
  }: {
    id: string;
    page?: number;
    pageSize?: number;
    stage?: string;
  }) => {
    const result = await api.get(`/tournaments/${id}/matches`, {
      params: {
        page,
        pageSize,
        stage,
      },
    });
    return result.data;
  }
);

export const fetchTournamentRanking = createAsyncThunk(
  "tournaments/fetchTournamentRanking",
  async ({
    id,
    page,
    pageSize,
  }: {
    id: string;
    page?: number;
    pageSize?: number;
  }) => {
    const response = await api.get(`/tournaments/${id}/ranking`, {
      params: {
        page,
        pageSize,
      },
    });
    return response.data;
  }
);
