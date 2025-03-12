import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const newArray = [...state.cart];
      let itemIndex = null;
      newArray.find((el, i) => {
        if (el._id === action.payload._id) {
          itemIndex = i;
        }
      });
      if (itemIndex === null) {
        newArray.push(action.payload);
      }

      state.cart = newArray;
    },
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
