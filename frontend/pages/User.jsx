import { useEffect, useState } from "react";
import axios from "axios";
import { Table, Spinner, Alert, Button, Modal, Form } from "react-bootstrap";

export default function UserTable() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showedit, setShowEdit] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // ✅ ฟังก์ชัน fetch แยกออกมา
  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get("http://localhost:8080/users");
      setUsers(response.data);
    } catch (err) {
      setError("ไม่สามารถโหลดข้อมูลได้");
    } finally {
      setLoading(false);
    }
  };

  // ✅ เรียกครั้งแรกตอน mount
  useEffect(() => {
    fetchUsers();
  }, []);

  //เปิด modal edit
  const handleEdit = (user) => {
    setCurrentUser({ ...user }); // clone object กัน input เปลี่ยน state ตรง ๆ
    setShowEdit(true);
  };

  const handleChange = (e) => {
    setCurrentUser({
      ...currentUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      await axios.put(
        `http://localhost:8080/users/${currentUser.id}`,
        currentUser
      );
      setShowEdit(false);
      fetchUsers(); //โหลดใหม้
    } catch (error) {
      console.log("Update failed", error);
      alert("Update failed");
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("แน่ใจนะว่าจะลบ User นี้ ?")) return;
    try {
      await axios.delete(`http://localhost:8080/users/${id}`);
      fetchUsers();
    } catch (error) {
      console.log("Delete failed", error);
      alert("Delete failed");
    }
  };

  return (
    <div className="container">
      <h3>Users</h3>

      {/* ✅ แสดงสถานะ */}
      {loading && <Spinner animation="border" />}
      {error && <Alert variant="danger">{error}</Alert>}

      {!loading && !error && (
        <>
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
                <th>Action</th>
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
                  <td>
                    {" "}
                    <button
                      variant="warning"
                      size="sm"
                      onClick={() => handleEdit(user)}
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    {" "}
                    <button
                      variant="danger"
                      size="sm"
                      onClick={() => deleteUser(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Modal show={showedit} onHide={() => setShowEdit(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Edit User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {currentUser && (
                <Form>
                  <Form.Group className="mb-2">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="firstname"
                      value={currentUser.firstname}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-2">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="lastname"
                      value={currentUser.lastname}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-2">
                    <Form.Label>Age</Form.Label>
                    <Form.Control
                      type="number"
                      name="age"
                      value={currentUser.age}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-2">
                    <Form.Label>Gender</Form.Label>
                    <Form.Control
                      type="text"
                      name="gender"
                      value={currentUser.gender}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-2">
                    <Form.Label>Interest</Form.Label>
                    <Form.Control
                      type="text"
                      name="interests"
                      value={currentUser.interests}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-2">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="description"
                      value={currentUser.description}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Form>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowEdit(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleSave}>
                Save
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}

      {/* ปุ่ม reload */}
      <Button onClick={fetchUsers} disabled={loading}>
        Reload
      </Button>
    </div>
  );
}
