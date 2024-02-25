import { configureStore } from "@reduxjs/toolkit";
import cardSlice from "./slices/CardSlice";

const store = configureStore({
  reducer: {
    card: cardSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
