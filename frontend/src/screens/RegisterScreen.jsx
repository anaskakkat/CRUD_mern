import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../slices/AuthSlices";
import { toast } from "react-toastify";
import { validateSignUpForm } from "../utils/validation";
import Header from "../components/header";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [image, setImage] = useState(null);
  console.log("image:::>", image);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  const submitHandler = async (e) => {
    e.preventDefault();
    const validForm = validateSignUpForm(
      name,
      email,
      password,
      confirmPassword
    );

    if (validForm) {
      if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }

      let imageUrl = "";

      // Upload image to Cloudinary
      if (image) {
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", "xyou11gc");
        console.log("formdata::", formData);

        try {
          const response = await axios.post(
            `https://api.cloudinary.com/v1_1/dvq7oswim/image/upload`,
            formData
          );
          imageUrl = response.data.secure_url;
          console.log("Uploaded image URL:", imageUrl);
        } catch (error) {
          console.error("Error uploading image:", error);
          toast.error("Error uploading image");
          return;
        }
      }

      try {
        const { data } = await axios.post("http://localhost:5000/api/users", {
          name,
          email,
          password,
          image: imageUrl,
        });
        // console.log("data::", data);
        dispatch(setCredentials(data));
        navigate("/");
        toast.success("Registration successful");
      } catch (err) {
        const message = err.response?.data?.message || "An error occurred";
        toast.error(message);
      }
    }
  };

  return (
    <>
      <Header />
      <FormContainer>
        <h1>Register</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group className="my-2" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

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

          <Form.Group className="my-2" controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group className="my-2" controlId="image">
            <Form.Label>Profile Image</Form.Label>
            <Form.Control
              type="file"
              accept=".png, .jpg, .jpeg, .gif"
              onChange={(e) => setImage(e.target.files[0])}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary" className="mt-3">
            Register
          </Button>
        </Form>

        <Row className="py-3">
          <Col>
            Already have an account? <Link to="/login">Login</Link>
          </Col>
        </Row>
      </FormContainer>
    </>
  );
};

export default RegisterScreen;
