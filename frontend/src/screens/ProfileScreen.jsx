import React, { useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../slices/AuthSlices";
import { toast } from "react-toastify";
import { validateSignUpForm } from "../utils/validation";
import image from "../assets/def_icon_profile.jpg";
import Header from "../components/header";

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const fileInputRef = useRef(null);
  const [profilePicture, setProfilePicture] = useState(null);

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const validForm = validateSignUpForm(
      name,
      email,
      password,
      confirmPassword
    );
    if (!validForm) {
      toast.error("Invalid form data");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    let imageUrl = userInfo.image; // Default to current image if no new image is uploaded
    const imageFile = fileInputRef.current.files[0];

    if (imageFile) {
      const formData = new FormData();
      formData.append("file", imageFile);
      formData.append("upload_preset", "xyou11gc");

      try {
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/dvq7oswim/image/upload`,
          formData
        );
        imageUrl = response.data.secure_url;
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error("Error uploading image");
        setLoading(false);
        return;
      }
    }

    try {
      const { data } = await axios.put(
        "http://localhost:5000/api/users/profile",
        { name, email, password, image: imageUrl,userInfo },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      dispatch(setCredentials(data));
      navigate("/home");
      toast.success("Profile updated successfully");
    } catch (err) {
      const message = err.response?.data?.message || "An error occurred";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleProfilePictureClick = () => {
    fileInputRef.current.click();
  };

  const handleProfilePic = (e) => {
    const file = e.target.files[0];
    setProfilePicture(URL.createObjectURL(file));
  };

  return (
    <>
      <Header />
      <FormContainer>
        <h1 className="mb-3 d-flex justify-content-center mb-5">Profile</h1>
        <Form onSubmit={submitHandler}>
          {image && (
            <>
              <div className=" d-flex justify-content-center">
                <img
                  src={profilePicture ? profilePicture : userInfo.image}
                  alt="Profile"
                  className="img-thumbnail rounded-circle"
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                  }}
                />
              </div>
              <p
                style={{ fontSize: "12px", cursor: "pointer" }}
                className="mt-1 d-flex justify-content-center text-primary"
                onClick={handleProfilePictureClick}
              >
                Change profile picture
              </p>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                accept=".png, .jpg, .jpeg, .gif"
                onChange={handleProfilePic}
              />
            </>
          )}
          <Form.Group className="my-2 " controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="my-2" controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="my-2" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="my-2" controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>

          <Button
            type="submit"
            variant="primary"
            className="mt-3"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update"}
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default ProfileScreen;
