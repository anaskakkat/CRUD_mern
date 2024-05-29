import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Table, Button, Form, FormControl } from "react-bootstrap";
import "./AdminHome.css";
const AdminHome = () => {
  const users = [
    {
      id: 1,
      name: "Michael Holz",
      email: "michael.holz@example.com",
      role: "Admin",
      status: "Active",
    },
    {
      id: 2,
      name: "Paula Wilson",
      email: "paula.wilson@example.com",
      role: "Publisher",
      status: "Active",
    },
  ];

  return (
    <div className="container mt-5 text-center">
      <h2 className="mb-4">User Management</h2>
      <div className="d-flex justify-content-between mb-3">
        <Button variant="primary">Add New User</Button>
        <Form className="d-flex">
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-success">Search</Button>
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
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>

              <td className="d-flex justify-content-center">
                <Button variant="" className="custom-button text-primary">
                  <FaEdit /> {/* Edit Icon */}
                </Button>
                <Button variant="" className="custom-button text-danger">
                  <FaTrash /> {/* Delete Icon */}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AdminHome;
