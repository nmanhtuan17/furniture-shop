import { createSlice } from "@reduxjs/toolkit";
import { getProducts } from "../actions/app.action";


const initialState = {
  products: []
};

export const productSilce = createSlice({
  name: "product",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.products = action.payload
    })
  }
});

export const {
} = productSilce.actions;
