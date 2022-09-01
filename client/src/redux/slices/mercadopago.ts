import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

export const fetchMercadoPago = createAsyncThunk(
  "mercadopago/fetchMercadoPago",
  async (id: {
    tournamentid: string;
    userid: string | undefined;
    useremail?: string | undefined;
  }) => {
    const result = await api.get(
      `/mercadopago/payment?${
        id.tournamentid ? "tournamentid=" + id.tournamentid : ""
      }&${id.userid ? "userid=" + id.userid : ""}&${
        id.useremail ? "useremail=" + id.useremail : ""
      }`
    );
    window.location.href = `${result.data}`;
  }
);
