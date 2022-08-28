import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth";
import tournamentsReducer from "./slices/tournament";
import userReducer from "./slices/user";
import teamReducer from "./slices/team";

export const store = configureStore({
  reducer: {
    tournaments: tournamentsReducer,
    auth: authReducer,
    user: userReducer,
    team: teamReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
