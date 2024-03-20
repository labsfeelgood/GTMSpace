import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   value: null,
};

export const balanceSlice = createSlice({
   name: "Balance",
   initialState,
   reducers: {
      setBalance: (state, action) => {
         state.value = action.payload;
      },
   },
});

// Action creators are generated for each case reducer function
export const { setBalance } = balanceSlice.actions;

export default balanceSlice.reducer;
