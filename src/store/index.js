import { configureStore } from "@reduxjs/toolkit";
import numberKarmaReducer from "./numberKarma";
import numberNameReducer from "./numberName";

const store = configureStore({
  reducer: {
    numberKarmaMain: numberKarmaReducer,
    numberName: numberNameReducer,
  },
});

export default store;
