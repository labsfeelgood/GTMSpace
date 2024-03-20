import { configureStore } from "@reduxjs/toolkit";
import balanceReducer from "./features/balanceSlice.js";
export const store = configureStore({
   reducer: {
      balance: balanceReducer,
   },
});
