import { createSlice } from "@reduxjs/toolkit";

const loaderSlice = createSlice({
  name: "laoder",
  initialState: {
    showLoader: false,
  },
  reducers: {
    showLoader: (state, action) => {
      state.showLoader = action.payload;
    },
  },
});

export const { showLoader } = loaderSlice.actions;
export default loaderSlice.reducer;
