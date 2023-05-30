import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showMenu: false,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    toggleMenu(state) {
      state.showMenu = !state.showMenu;
    },
  },
});

export const selectShowMenu = (state) => state.app.showMenu;

export const appAction = appSlice.actions;
export const appReducer = appSlice.reducer;
