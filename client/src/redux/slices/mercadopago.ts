import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

export const fetchMercadoPago = createAsyncThunk(
  "mercadopago/fetchMercadoPago",
  async () => {
    const result = await api.get(`/mercadopago/payment`);
    window.location.href = `${result.data}`;
  }
);
