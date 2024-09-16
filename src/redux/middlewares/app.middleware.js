import {createListenerMiddleware} from "@reduxjs/toolkit";

export const appMiddleware = createListenerMiddleware();

appMiddleware.startListening({
  predicate: (action) => {
  },
  effect: async (action, listenerApi) => {
    
  },
});
