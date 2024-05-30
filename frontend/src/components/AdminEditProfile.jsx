import React, { useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../slices/AuthSlices";
import { toast } from "react-toastify";
import { validateSignUpForm } from "../utils/validation";
import image from "../assets/def_icon_profile.jpg";
import AdminHeader from "./AdminHeader";

const AdminEditProfile = () => {
  let { userId } = useParams();
  //   console.log("userId:", userId);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  
  const [profilePicture, setProfilePicture] = useState("");
  const fileInputRef = useRef(profilePicture);
  //   console.log("profilePicture:::>", profilePicture);
  //   console.log("user.img", userInfo.image);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/admin/userData/${userId}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        const userData = response.data;
        setName(userData.name);
        setEmail(userData.email);
        setProfilePicture(userData.image);
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Error fetching user data");
      }
    };

    fetchUserData();
  }, [userId]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const validForm = validateSignUpForm(name, email);
    if (!validForm) {
      toast.error("Invalid form data");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      await axios
        .put(
          `http://localhost:5000/api/admin/profileUpdate`,
          { userId, name, email },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        )
        .then((res) => {
          console.log("upadted data::", res.data);
        })
        .catch((err) => console.log(err));
      navigate("/adminDashboard");
      toast.success("Profile updated successfully");
    } catch (err) {
      const message = err.response?.data?.message || "An error occurred";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };
//   const handleProfilePictureClick = () => {
//     fileInputRef.current.click();
//   };
  const handleProfilePic = (e) => {
    // console.log(e.target.files[0]);
    const file = e.target.files[0];
    setProfilePicture(URL.createObjectURL(file));
  };
  return (
    <>
      <AdminHeader />
      <FormContainer>
        <h1 className="mb-3 d-flex justify-content-center mb-5">Profile</h1>
        <Form onSubmit={submitHandler}>
          {image && (
            <>
              <div className=" d-flex justify-content-center">
                <img
                  src={profilePicture}
                  alt="Profile"
                  className="img-thumbnail rounded-circle"
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                  }}
                />
              </div>
              {/* <p
                style={{ fontSize: "12px", cursor: "pointer" }}
                className="mt-1 d-flex justify-content-center text-primary"
                onClick={handleProfilePictureClick}
              >
                Change profile picture
              </p> */}
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
          {/* 
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
          </Form.Group> */}

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

export default AdminEditProfile;
