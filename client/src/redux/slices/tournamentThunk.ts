import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

export const fetchTournaments = createAsyncThunk(
  "tournaments/fetchTournaments",
  async () => {
    const result = await api.get(
      `${process.env.REACT_APP_API_URL}/tournaments?sort=asc&page=1`
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
        filters.sort ? "sort=" + filters.sort : "asc"
      }&${filters.name ? "name=" + filters.name : ""}&${
        filters.page ? "page=" + filters.page : "1"
      }`
    );
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
