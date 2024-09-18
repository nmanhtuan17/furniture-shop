import { createSlice } from "@reduxjs/toolkit";
import {getCategory} from "../actions/app.action";


const initialState = {
  category: []
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(getCategory.fulfilled, (state, action) => {
      state.category = action.payload;
    })
  }
});

export const {
} = appSlice.actions;
