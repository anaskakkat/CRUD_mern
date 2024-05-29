import { configureStore } from "@reduxjs/toolkit";
import AuthSlices from "./slices/AuthSlices";
// import {apiSlice} from "./slices/apiSlices"
const store = configureStore({
  reducer: {
    auth: AuthSlices,

    
    // [apiSlice.reducerPath]: apiSlice.reducer,

  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,

});

export default store;
