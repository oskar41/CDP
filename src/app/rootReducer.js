import { combineReducers } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import { counterApi } from "../features/counter/counterApi";

// Об'єднуємо всі редюсери в один rootReducer
const rootReducer = combineReducers({
  counter: counterReducer,
  [counterApi.reducerPath]: counterApi.reducer,
});

export default rootReducer;
