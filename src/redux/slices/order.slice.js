import {createSlice} from "@reduxjs/toolkit";
import {getProducts, getCarts, getOrders} from "../actions/app.action";


const initialState = {
  orders: []
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.fulfilled, (state, action) => {
        state.orders = action.payload
      })
  }
});

export const {} = orderSlice.actions;
