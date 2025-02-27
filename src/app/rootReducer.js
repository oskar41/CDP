import { combineReducers } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";

// Об'єднуємо всі редюсери в один rootReducer
const rootReducer = combineReducers({
  counter: counterReducer
});

export default rootReducer;
