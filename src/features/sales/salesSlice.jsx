import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  header: {},
  details: [],
  lastSubmittedVoucher: null, 
};

const salesSlice = createSlice({
  name: "sales",
  initialState,
  reducers: {
       saveSaleData: (state, action) => {
      state.header = action.payload.header;
      state.details = action.payload.details;
      state.lastSubmittedVoucher = action.payload;
    },
  },
});

export const { saveSaleData } = salesSlice.actions;

export default salesSlice.reducer;
