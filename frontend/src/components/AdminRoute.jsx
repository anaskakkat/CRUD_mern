import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin;
  return adminInfo ? <Outlet /> : <Navigate to="/adminLogin" />;
};

export default AdminRoute;
