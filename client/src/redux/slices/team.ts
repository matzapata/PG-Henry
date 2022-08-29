import { createSlice } from "@reduxjs/toolkit";
import { getLogoA, getLogoB } from "./teamThunk";

const initialState: {
  logo_a: string | any;
  logo_b: string | any;
  loading: boolean;
  error: string;
  message: string;
} = {
  loading: false,
  logo_a: "",
  logo_b: "",
  error: "",
  message: "",
};

const teamSlice = createSlice({
  name: "teams",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getLogoA.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getLogoA.fulfilled, (state, action) => {
      state.loading = false;
      state.logo_a = action.payload;
      state.error = "";
    });
    builder.addCase(getLogoA.rejected, (state, action) => {
      state.loading = false;
      state.logo_b = null;
      state.error = action.error.message || "No se pudo cargar el logo";
    });
    builder.addCase(getLogoB.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getLogoB.fulfilled, (state, action) => {
      state.loading = false;
      state.logo_b = action.payload;
      state.error = "";
    });
    builder.addCase(getLogoB.rejected, (state, action) => {
      state.loading = false;
      state.logo_b = null;
      state.error = action.error.message || "No se pudo cargar el logo";
    });
  },
});

export default teamSlice.reducer;
