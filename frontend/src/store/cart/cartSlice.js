import { createSlice } from "@reduxjs/toolkit";
import { localStorageConfig } from "../../config/LocalStorageConfig";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    isNewItem: false,
    isOldItem: false,
  },
  reducers: {
    addToCart: (state, action) => {
      const newArray = [...state.cart];
      const newItem = { ...action.payload };
      let itemIndex = null;
      newArray.find((el, i) => {
        if (el._id === newItem._id) {
          itemIndex = i;
        }
      });
      if (itemIndex === null) {
        state.isNewItem = true;
        newItem.count = 1;
        newItem.totalAmount = newItem.price;
        newArray.push(newItem);
      } else {
        state.isOldItem = true;
        newArray[itemIndex].count++;
        newArray[itemIndex].totalAmount =
          newArray[itemIndex].count * newArray[itemIndex].price;
      }

      state.cart = newArray;
    },
    changeCounter: (state, action) => {
      const newArray = [...state.cart];
      newArray[action.payload.index].count += action.payload.act;
      newArray[action.payload.index].totalAmount =
        newArray[action.payload.index].count *
        newArray[action.payload.index].price;
      if (newArray[action.payload.index].count < 1) {
        newArray[action.payload.index].count = 1;
        newArray[action.payload.index].totalAmount =
          newArray[action.payload.index].count *
          newArray[action.payload.index].price;
      }
      state.cart = newArray;
    },
    removeItem: (state, action) => {
      const newArray = [...state.cart];
      newArray.splice(action.payload, 1);
      if (newArray.length < 1) localStorage.removeItem(localStorageConfig.CART);
      state.cart = newArray;
    },
    setCart: (state, action) => {
      state.cart = action.payload;
    },
    resetNewOldMessage: (state) => {
      state.isNewItem = false;
      state.isOldItem = false;
    },
  },
});

export const {
  addToCart,
  changeCounter,
  removeItem,
  setCart,
  resetNewOldMessage,
} = cartSlice.actions;
export default cartSlice.reducer;
