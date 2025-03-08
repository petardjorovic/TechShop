import { createSlice } from "@reduxjs/toolkit";

const loginRegisterSlice = createSlice({
  name: "loginRegister",
  initialState: {
    isLoginForm: false,
  },
  reducers: {
    toggleLoginForm: (state, action) => {
      state.isLoginForm = action.payload;
    },
    showLoginForm: (state) => {
      state.isLoginForm = false;
    },
    showRegisterForm: (state) => {
      state.isLoginForm = true;
    },
  },
});

export const { toggleLoginForm, showLoginForm, showRegisterForm } =
  loginRegisterSlice.actions;
export default loginRegisterSlice.reducer;
