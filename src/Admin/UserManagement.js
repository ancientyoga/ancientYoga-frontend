// FILE: frontend/src/Admin/UserManagement.js

import React, { useEffect, useState } from 'react';
import {
  Table,
  Button,
  Spinner,
  Alert,
  Container,
  Row,
  Col,
  Modal,
  Form,
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './UserManagement.css';
import api from '../api';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ id: '', name: '', email: '', mobile: '', password: '' });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await api.get('/api/users');
      setUsers(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError('❌ Failed to fetch users');
      setLoading(false);
    }
  };

  const handleAction = async (id, action) => {
    try {
      let url = `/api/users/${id}`;
      if (action === 'block') url = `/api/users/block/${id}`;
      if (action === 'unblock') url = `/api/users/unblock/${id}`;
      if (action === 'delete') url = `/api/users/${id}`;

      const method = action === 'delete' ? 'delete' : 'put';

      await api({ method, url });

      setMessage(`✅ User ${action}ed successfully`);
      setError(null);
      fetchUsers();
    } catch (err) {
      console.error(err);
      setError(`❌ Failed to ${action} user`);
    }
  };

  const handleEdit = (user) => {
    setFormData({
      id: user.id,
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      password: '',
    });
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      await api.put(`/api/users/${formData.id}`, formData);
      setMessage('✅ User updated and email sent with credentials');
      setError(null);
      setShowModal(false);
      fetchUsers();
    } catch (err) {
      console.error("Update error:", err.response?.data || err.message);
      setError(`❌ Failed to update user: ${err.response?.data?.error || err.message}`);
    }
  };

  return (
    <Container className="um-wrapper mt-4">
      <br/>
      <br/>
      <Row className="mb-4">
        <Col>
          <h2 className="um-title text-center text-primary">User Management</h2>
        </Col>
      </Row>

      {message && <Alert variant="success">{message}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}

      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : users.length === 0 ? (
        <Alert variant="info">No users found.</Alert>
      ) : (
        <div className="table-responsive um-table-wrapper">
          <Table striped bordered hover responsive className="um-table shadow">
            <thead className="table-dark">
              <tr>
                <th>#ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Verified</th>
                <th>Blocked</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.mobile}</td>
                  <td>{user.isverified ? 'Yes' : 'No'}</td>
                  <td>{user.isblocked ? 'Yes' : 'No'}</td>
                  <td>{new Date(user.createdat).toLocaleString()}</td>
                  <td>
                    <div className="d-flex flex-wrap gap-2 justify-content-center">
                      {user.isblocked ? (
                        <Button variant="success" size="sm" onClick={() => handleAction(user.id, 'unblock')}>
                          Unblock
                        </Button>
                      ) : (
                        <Button variant="warning" size="sm" onClick={() => handleAction(user.id, 'block')}>
                          Block
                        </Button>
                      )}
                      <Button variant="info" size="sm" onClick={() => handleEdit(user)}>
                        Edit
                      </Button>
                      <Button variant="danger" size="sm" onClick={() => handleAction(user.id, 'delete')}>
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="umName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="umEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="umMobile">
              <Form.Label>Mobile</Form.Label>
              <Form.Control type="text" name="mobile" value={formData.mobile} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="umPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} />
              <Form.Text className="text-muted">Leave blank to keep the current password.</Form.Text>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleUpdate}>Update</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default UserManagement;
