import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {persistReducer, persistStore} from "redux-persist";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import { appMiddleware } from "./middlewares/app.middleware";
import { appSlice } from "./slices/app.slice";
import { authSlice } from "./slices/auth.slice";
import storage from 'redux-persist/lib/storage'
import { productSilce } from "./slices/product.slice";
import { cartSlice } from "./slices/cart.slice";
import {orderSlice} from "./slices/order.slice";
const reducers = combineReducers({
  app: appSlice.reducer,
  auth: authSlice.reducer,
  product: productSilce.reducer,
  cart: cartSlice.reducer,
  order: orderSlice.reducer
});

const persistedReducer = persistReducer({
  key: "root",
  storage: storage,
}, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }).prepend(appMiddleware.middleware),
});

export const persistor = persistStore(store);

export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;
