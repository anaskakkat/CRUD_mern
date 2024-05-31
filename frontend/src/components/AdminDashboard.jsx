import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Table, Button, Form, FormControl, Modal } from "react-bootstrap";
import "./AdminHome.css";
import AdminHeader from "./AdminHeader";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    profilePic: null,
  });
  const [editUserId, setEditUserId] = useState(null);
  const [editUser, setEditUser] = useState({
    name: "",
    email: "",
    password: "",
    profilePic: null,
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios
      .get("http://localhost:5000/api/admin/loadUsers", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((res) => {
        // console.log(res.data);
        setUsers(res.data);
      })
      .catch((err) => console.error(err));
  };

  const deleteUser = (userId) => {
    axios
      .delete(`http://localhost:5000/api/admin/deleteUser/${userId}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((res) => {
        // console.log(res.data);
        // Remove the deleted user from the users array
        setUsers(users.filter((user) => user._id !== userId));
      })
      .catch((err) => console.error(err));
  };

  // Function to show confirmation dialog
  const handleDeleteClick = (userId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUser(userId);
        Swal.fire("Deleted!", "User has been deleted.", "success");
      }
    });
  };

  const handleFileChange = (e) => {
    setNewUser({ ...newUser, profilePic: e.target.files[0] });
  };
  const handleEditClick = (user) => {
    setEditUserId(user._id);
    setEditUser({
      name: user.name,
      email: user.email,
      password: user.password,
      profilePic: null,
    });
    setShowAddUserModal(true);
  };

  const addUser = async () => {
    // Upload image to Cloudinary
    let imageUrl = "";
    if (newUser.profilePic) {
      const formData = new FormData();
      formData.append("file", newUser.profilePic);
      formData.append("upload_preset", "xyou11gc");

      try {
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/dvq7oswim/image/upload`,
          formData
        );
        imageUrl = response.data.secure_url;
        // console.log("Uploaded image URL:", imageUrl);
      } catch (error) {
        console.error("Error uploading image:", error);
        return;
      }
    }

    if (newUser.name.length < 2) {
      // console.log("length",newUser.name.length);

      toast.error("Pleae enter propper name");
      return;
    }
    if (!/^[A-Za-z]+(?:[-' ][A-Za-z]+)*$/.test(newUser.name)) {
      toast.error("Pleae enter propper name");
      return;
    }
    // console.log(newUser.name);
    const userData = {
      name: newUser.name,
      email: newUser.email,
      password: newUser.password,
      image: imageUrl,
    };

    axios
      .post("http://localhost:5000/api/users", userData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((res) => {
        // console.log(res.data);
        setUsers([...users, res.data]);
        setShowAddUserModal(false);
        setNewUser({ name: "", email: "", password: "", profilePic: null });
        Swal.fire("Added!", "New user has been added.", "success");
      })
      .catch((err) => console.error(err));
  };
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <AdminHeader />
      <div className="container mt-5 text-center">
        <h2 className="mb-4">User Management</h2>
        <div className="d-flex justify-content-between mb-3">
          <Button variant="primary" onClick={() => setShowAddUserModal(true)}>
            Add New User
          </Button>
          <Form className="d-flex">
            <FormControl
              type="text"
              placeholder="Search"
              className="mr-sm-2"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Form>
        </div>
        <Table striped bordered hover responsive className="shadow-sm">
          <thead className="thead-dark">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td className="d-flex justify-content-center">
                  <Link to={`/adminEditProfile/${user._id}`}>
                    <Button variant="" className="custom-button mx-2">
                      <FaEdit className="text-primary" />
                      Profile
                    </Button>
                  </Link>
                  <Button
                    variant=""
                    className="custom-button text-danger"
                    onClick={() => handleDeleteClick(user._id)}
                  >
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <Modal show={showAddUserModal} onHide={() => setShowAddUserModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={newUser.name}
                onChange={(e) =>
                  setNewUser({ ...newUser, name: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={newUser.password}
                onChange={(e) =>
                  setNewUser({ ...newUser, password: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formProfilePic">
              <Form.Label>Profile Picture</Form.Label>
              <Form.Control
                type="file"
                accept=".png, .jpg, .jpeg, .gif"
                onChange={handleFileChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowAddUserModal(false)}
          >
            Close
          </Button>
          <Button variant="primary" onClick={addUser}>
            Add User
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AdminDashboard;
