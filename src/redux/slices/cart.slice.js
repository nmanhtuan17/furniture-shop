import {createSlice} from "@reduxjs/toolkit";
import {getProducts, getCarts} from "../actions/app.action";


const initialState = {
  carts: []
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCarts.fulfilled, (state, action) => {
        state.carts = action.payload
      })
  }
});

export const {} = cartSlice.actions;
