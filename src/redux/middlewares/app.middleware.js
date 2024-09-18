import {createListenerMiddleware} from "@reduxjs/toolkit";
import {getCarts, getProducts} from "../actions/app.action";


export const appMiddleware = createListenerMiddleware();

appMiddleware.startListening({
  predicate: (action) => {
    return action.type?.startsWith("auth/login") || action.type?.startsWith("cart/add")
  },
  effect: async (action, listenerApi) => {
    switch (action.type) {
      case 'auth/login/fulfilled':
        listenerApi.dispatch(getProducts());
        break;
      case 'cart/add/fulfilled':
        listenerApi.dispatch(getCarts());
        break;
    }
  }
})
