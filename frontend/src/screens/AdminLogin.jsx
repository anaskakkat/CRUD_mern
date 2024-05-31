import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { Link, useNavigate } from "react-router-dom";
import { validateSignInForm } from "../utils/validation";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { adminLoginSuccess } from "../slices/AdminSlice";
 import AdminHeader from "../components/AdminHeader";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin;

  const submitHandler = async (e) => {
    e.preventDefault();

    const validForm = validateSignInForm(email, password);
    if (!validForm) {
      setError("Invalid email or password");
      // setLoading(false);
      return;
    }
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/admin/adminLogin",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      dispatch(adminLoginSuccess(data));
      console.log("user logined");
      navigate("/adminDashboard");
    } catch (err) {
      const message =
        err.response?.data?.message || "Invalid email or password";
      console.log(message);
      toast.error(message);
    }
  };

  return (
    <>
      <AdminHeader />
      <FormContainer>
        <h1 className="text-center">Admin Login</h1>

        <Form onSubmit={submitHandler}>
          <Form.Group className="my-2" controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group className="my-2" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          {/* {loading && <Loader />} */}
          <Button type="submit" variant="primary" className="mt-3">
            Sign In
          </Button>
        </Form>

        {/* <Row className="py-3">
          <Col>
            New Customer? <Link to={`/register`}>Register</Link>
          </Col>
        </Row> */}
      </FormContainer>
    </>
  );
};

export default AdminLogin;
