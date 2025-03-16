import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    currentStep: 1,
  },
  reducers: {
    nextStep: (state) => {
      if (state.currentStep < 2) state.currentStep = state.currentStep + 1; // bilo je manje od 3
    },
    backStep: (state, action) => {
      if (state.currentStep > 1) state.currentStep = state.currentStep - 1;
    },
  },
});

export const { nextStep, backStep } = orderSlice.actions;
export default orderSlice.reducer;
