import { useEffect, useState } from "react";
import axios from "axios";
import { Table, Spinner, Alert, Button } from "react-bootstrap";

export default function UserTable() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  return (
    <div className="container">
      <h3>Users</h3>

      {/* ✅ แสดงสถานะ */}
      {loading && <Spinner animation="border" />}
      {error && <Alert variant="danger">{error}</Alert>}

      {!loading && !error && (
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
      )}

      {/* ปุ่ม reload */}
      <Button onClick={fetchUsers} disabled={loading}>
        Reload
      </Button>
    </div>
  );
}
