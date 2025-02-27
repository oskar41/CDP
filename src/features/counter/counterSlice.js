import { createSlice } from "@reduxjs/toolkit";
import { fetchCounterValue } from "./counterActions";
const counterSlice = createSlice({
    name: "counter",
    initialState: { value: 0, status: "idle", error: null },
    reducers: {
      increment: (state) => { state.value += 1; },
      decrement: (state) => { state.value -= 1; },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchCounterValue.pending, (state) => {
          state.status = "loading";
        })
        .addCase(fetchCounterValue.fulfilled, (state, action) => {
          state.status = "succeeded";
          state.value = action.payload;
        })
        .addCase(fetchCounterValue.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        });
    },
  });

export const { increment, decrement } = counterSlice.actions;
export default counterSlice.reducer;