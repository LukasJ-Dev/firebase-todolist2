import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  isLoggedIn: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action) {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
  },
});

export const selectIsLoggedIn = (state) => state.user.isLoggedIn;

export const userAction = userSlice.actions;
export const userReducer = userSlice.reducer;
