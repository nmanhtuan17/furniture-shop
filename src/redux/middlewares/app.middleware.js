import {createListenerMiddleware} from "@reduxjs/toolkit";
import { getProducts } from "../actions/app.action";


export const appMiddleware = createListenerMiddleware();

appMiddleware.startListening({
  predicate: (action) => {
    return action.type?.startsWith("auth/login")
  },
  effect: async (action, listenerApi) => {
    switch (action.type) {
      case 'auth/login/fulfilled':
        listenerApi.dispatch(getProducts());
        break;
    }
  }
})