import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Header from "./components/header";
import HomeScreen from "./screens/HomeScreen";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {

  
  return (
    <>
      <Header />
      <ToastContainer />
      <Container className="my-2">
        <Outlet />
      </Container>
    </>
  );
}

export default App;
