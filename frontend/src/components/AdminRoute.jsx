import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = () => {
  const { adminInfo } = useSelector((state) => state.adminLogin);
  return adminInfo ? <Outlet /> : <Navigate to="/adminLogin" replace />;
};

export default AdminRoute;
