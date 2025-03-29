import { createSlice } from "@reduxjs/toolkit";
import { localStorageConfig } from "../../config/LocalStorageConfig";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    removeUser: (state) => {
      state.user = {};
    },
    voteUser: (state, action) => {
      const newUser = { ...state.user };
      newUser.votedFor.push(action.payload);
      state.user = newUser;
    },
  },
});

export const { setUser, removeUser, voteUser } = userSlice.actions;
export default userSlice.reducer;
