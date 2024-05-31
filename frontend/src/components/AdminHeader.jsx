import React from "react";
import { Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { adminLogout } from "../slices/AdminSlice"; // Assuming you have a logout action
import { useNavigate } from "react-router-dom";
import axios from "axios";
const AdminHeader = () => {
  const navigate = useNavigate();
  const { adminInfo } = useSelector((state) => state.adminLogin);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    axios
      .post("http://localhost:5000/api/admin/adminLogout",{}, {
        AdminHeaders: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((res) => console.log(res.data))
      .catch((err) => console.error(err));
    dispatch(adminLogout());
    navigate("/adminLogin");
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>MERN App-Admin</Navbar.Brand>
          </LinkContainer>
          {adminInfo ? (
            <Button onClick={logoutHandler}>
              {" "}
              <FaSignOutAlt /> Logout
            </Button>
          ) : (
            <></>
          )}
        </Container>
      </Navbar>
    </header>
  );
};

export default AdminHeader;
