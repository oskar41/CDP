import { createAsyncThunk } from "@reduxjs/toolkit";
import counterService from "./counterService";

export const fetchCounterValue = createAsyncThunk(
  "counter/fetchValue",
  async (_, thunkAPI) => {
    try {
      const response = await counterService.getCounterValue();
      return response.value;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);