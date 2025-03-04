import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { counterApi } from "../features/counter/counterApi";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(counterApi.middleware),
});

export default store;