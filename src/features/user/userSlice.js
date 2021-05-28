import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  photo: "",
  userId: "",
  subscription: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.photo = action.payload.photo;
      state.userId = action.payload.userId;
    },
    logout: (state) => {
      state.name = "";
      state.email = "";
      state.photo = "";
      state.userId = "";
    },
    subscribe: (state, action) => {
      state.subscription = action.payload.subscription;
    },
  },
});

export const { login, logout, subscribe } = userSlice.actions;

export const selectUserName = (state) => state.user.name;
export const selectUserEmail = (state) => state.user.email;
export const selectUserPhoto = (state) => state.user.photo;
export const selectUserId = (state) => state.user.userId;
export const selectUserSubscription = (state) => state.user.subscription;

export default userSlice.reducer;
