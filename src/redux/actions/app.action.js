import { createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../../services/api.service";
import { toast } from "react-toastify";

export const login = createAsyncThunk('auth/login', async (payload) => {
  return await apiService.post('auth/sign-in', payload)
})

export const register = createAsyncThunk('auth/register', async (payload) => {
  return await apiService.post('auth/register', payload)
})

export const getProducts = createAsyncThunk('product/get', async (payload) => {
  return await apiService.get('products')
})

