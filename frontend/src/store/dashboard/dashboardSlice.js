import { createSlice } from "@reduxjs/toolkit";

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    isDashboard: false,
  },
  reducers: {
    showDashboard: (state, action) => {
      state.isDashboard = action.payload;
    },
  },
});

export const { showDashboard } = dashboardSlice.actions;
export default dashboardSlice.reducer;
