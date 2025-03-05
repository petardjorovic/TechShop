import { createSlice } from "@reduxjs/toolkit";

const setSymbol = (currency) => {
  if (currency === "EUR") return "€";
  if (currency === "USD") return "$";
  if (currency === "RSD") return "дин";
  return "€";
};

const currencySlice = createSlice({
  name: "currency",
  initialState: {
    currency: localStorage.getItem("currency")
      ? localStorage.getItem("currency")
      : "EUR",
    symbol: setSymbol(localStorage.getItem("currency")),
  },
  reducers: {
    setCurrency: (state, action) => {
      state.currency = action.payload;
      // localStorage.setItem("currency", state.currency);  // ovo je moj nacin
      if (state.currency === "EUR") state.symbol = "€";
      if (state.currency === "USD") state.symbol = "$";
      if (state.currency === "RSD") state.symbol = "дин";
    },
  },
});

export const { setCurrency } = currencySlice.actions;
export default currencySlice.reducer;
