import { configureStore } from "@reduxjs/toolkit";
import currencySlice from "./currency/currencySlice";
import loginRegisterSlice from "./loginRegister/loginRegisterSlice";
import loaderSlice from "./loader/loaderSlice";
import userSlice from "./user/userSlice";
import dashboardSlice from "./dashboard/dashboardSlice";
import cartSlice from "./cart/cartSlice";

const store = configureStore({
  reducer: {
    currencyStore: currencySlice,
    loginRegisterStore: loginRegisterSlice,
    loaderStore: loaderSlice,
    userStore: userSlice,
    dashboardStore: dashboardSlice,
    cartStore: cartSlice,
  },
});

export default store;
