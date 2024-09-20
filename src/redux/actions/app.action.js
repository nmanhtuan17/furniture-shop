import {createAction, createAsyncThunk} from "@reduxjs/toolkit";
import apiService from "../../services/api.service";
import { toast } from "react-toastify";
import {store} from "../store";

export const login = createAsyncThunk('auth/login', async (payload) => {
  return await apiService.post('auth/sign-in', payload)
})

export const register = createAsyncThunk('auth/register', async (payload) => {
  return await apiService.post('auth/register', payload)
})

export const getProducts = createAsyncThunk('product/get', async (payload) => {
  return await apiService.get('products')
})


export const getCarts = createAsyncThunk('cart/get', async (payload) => {
  const {account} = store.getState().auth
  return await apiService.get(`cart/${account._id}`)
})

export const getCategory = createAsyncThunk('category/get', async (payload) => {
  return await apiService.get('category')
})


export const addToCart = createAsyncThunk('cart/add', async (payload) => {
  const {account} = store.getState().auth
  return await apiService.post(`cart/${account._id}`, payload)
})


export const getOrders = createAsyncThunk('order/get', async (payload) => {
  const {account} = store.getState().auth
  return await apiService.get(`order/${account._id}`)
})
