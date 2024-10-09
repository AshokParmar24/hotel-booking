import { configureStore } from "@reduxjs/toolkit";
import userProfileReducer from "@/redux-toolkit/slices/user/index";

export const store = configureStore({
  reducer: {
    userProfileReducer,
  },
});
