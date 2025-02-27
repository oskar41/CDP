import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer"; // Імпортуємо кореневий редюсер

export const store = configureStore({
  reducer: rootReducer,
});

export default store;
