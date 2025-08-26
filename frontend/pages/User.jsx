import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";

export default function User() {
  const [users, setUsers] = useState([]);

  const fetchAPI = async () => {
    try {
      const response = await axios.get("http://localhost:8080/users");

      console.log(response.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    <>
      <div className="container">
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Interest</th>
              <th>Description</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.firstname}</td>
                <td>{user.lastname}</td>
                <td>{user.age}</td>
                <td>{user.gender}</td>
                <td>{user.interests}</td>
                <td>{user.description}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}
