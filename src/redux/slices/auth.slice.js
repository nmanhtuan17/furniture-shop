import { createSlice } from "@reduxjs/toolkit";
import { login } from "../actions/app.action";
const initialState = {
  loggedIn: false,
  account: {}
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state = initialState
      return state
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state, action) => {
        state.loggedIn = false
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loggedIn = true
        state.account = action.payload
      })
      .addCase(login.rejected, (state) => {
        state.loggedIn = false
      })
  }
});

export const {
  logout
} = authSlice.actions;
