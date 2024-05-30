import { configureStore } from "@reduxjs/toolkit";
import AuthSlices from "./slices/AuthSlices";
import AdminSlice from "./slices/AdminSlice";
const store = configureStore({
  reducer: {
    auth: AuthSlices,
    adminLogin: AdminSlice,

  },
  devTools: true,
});

export default store;
