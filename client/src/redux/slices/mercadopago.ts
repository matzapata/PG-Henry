import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../../services/api";

export const fetchMercadoPago = createAsyncThunk(
  "mercadopago/fetchMercadoPago",
  async () => {
    const result = await api.get(`/mercadopago/payment`);
    console.log(result.data.init_point);
    // window.location.href = `${result.data.init_point}`;
  }
);
