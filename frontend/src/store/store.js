import { configureStore } from "@reduxjs/toolkit";
import currencySlice from "./currency/currencySlice";
import loginRegisterSlice from "./loginRegister/loginRegisterSlice";

const store = configureStore({
  reducer: {
    currencyStore: currencySlice,
    loginRegisterStore: loginRegisterSlice,
  },
});

export default store;
