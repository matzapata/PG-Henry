import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth";
import tournamentsReducer from "./slices/tournament";
import userReducer from "./slices/userSlices";

export const store = configureStore({
  reducer: {
    tournaments: tournamentsReducer,
    auth: authReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
