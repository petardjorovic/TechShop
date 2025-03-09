import { configureStore } from "@reduxjs/toolkit";
import currencySlice from "./currency/currencySlice";
import loginRegisterSlice from "./loginRegister/loginRegisterSlice";
import loaderSlice from "./loader/loaderSlice";
import userSlice from "./user/userSlice";
import dashboardSlice from "./dashboard/dashboardSlice";

const store = configureStore({
  reducer: {
    currencyStore: currencySlice,
    loginRegisterStore: loginRegisterSlice,
    loaderStore: loaderSlice,
    userStore: userSlice,
    dashboardStore: dashboardSlice,
  },
});

export default store;
