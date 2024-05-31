import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { Link, useNavigate } from "react-router-dom";
import { logout, setCredentials } from "../slices/AuthSlices";
import { validateSignInForm } from "../utils/validation";
import { useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import Header from "../components/header";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [error, setError] = useState("");
  // const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // console.log(email, password);
  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    // setError("");
    // setLoading(true);

    const validForm = validateSignInForm(email, password);
    if (!validForm) {
      setError("Invalid email or password");
      // setLoading(false);
      return;
    }
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/users/auth",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      // console.log("data::;", data);
      dispatch(setCredentials(data));
      console.log("user logined");
      navigate("/home");
    } catch (err) {
      const message =
        err.response?.data?.message || "Invalid email or password";

      console.log(message);
      toast.error(message);
    }
  };

  return (
    <>
      <Header />
      <FormContainer>
        <h1>Sign In</h1>

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

        <Row className="py-3">
          <Col>
            New Customer? <Link to={`/register`}>Register</Link>
          </Col>
        </Row>
      </FormContainer>
    </>
  );
};

export default LoginScreen;
