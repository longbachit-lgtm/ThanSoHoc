import { createSlice } from "@reduxjs/toolkit";

const initialNumberState = {
  destiny: 0,
  name: 0,
  inner: "0",
  express: 0,
  soul: 0,
  mature: 0,
  full_name_number: "",
  full_name_list: "",
};

const numberNameSlice = createSlice({
  name: "numberName",
  initialState: initialNumberState,
  reducers: {
    setNumberDestiny(state, action) {
      state.destiny = action.payload;
    },
    setNumberName(state, action) {
      state.name = action.payload;
    },
    setNumberSoul(state, action) {
      state.soul = action.payload;
    },
    setNumberInner(state, action) {
      state.inner = action.payload;
    },
    setNumberExpress(state, action) {
      state.express = action.payload;
    },
    setNumberMature(state, action) {
      state.mature = action.payload;
    },
    setFullNameNumber(state, action) {
      state.full_name_number = action.payload;
    },
    setFullNameList(state, action) {
      state.full_name_list = action.payload;
    },
  },
});

export const numberNameActions = numberNameSlice.actions;
export default numberNameSlice.reducer;
