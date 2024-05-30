import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  adminInfo: localStorage.getItem("adminInfo")
    ? JSON.parse(localStorage.getItem("adminInfo"))
    : null,
};

const adminLoginSlice = createSlice({
  name: "adminLogin",
  initialState,
  reducers: {
    adminLoginSuccess: (state, action) => {
      state.adminInfo = action.payload;
      localStorage.setItem("adminInfo", JSON.stringify(action.payload));
    },
    adminLogout: (state, action) => {
      state.adminInfo = null;
      localStorage.removeItem("adminInfo");
    },
  },
});
export const { adminLoginSuccess, adminLogout } = adminLoginSlice.actions;
export default adminLoginSlice.reducer;
