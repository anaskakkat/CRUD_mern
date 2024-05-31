import "./App.css";
import Header from "./components/header";
import AdminHeader from "./components/AdminHeader";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { userInfo } = useSelector((state) => state.auth);
  const isAdmin = userInfo && userInfo.isAdmin;

  return (
    <>
      <ToastContainer />
      <Outlet />
    </>
  );
}

export default App;
