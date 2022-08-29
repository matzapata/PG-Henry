import { createSlice } from "@reduxjs/toolkit";
import { getLogoA } from "./teamThunk";

const initialState: {
  logo_a: string | any;
  loading: boolean;
  error: string;
  message: string;
} = {
  loading: false,
  logo_a: "",
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
      state.logo_a = null;
      state.error = action.error.message || "No se pudo cargar el logo";
    });
  },
});

export default teamSlice.reducer;
