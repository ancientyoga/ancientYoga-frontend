// File: C:\Users\dell\AncientYoga\frontend\src\Admin\UserManagement.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Spinner, Alert, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:5000/api/admin/users');
      setUsers(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch users');
      setLoading(false);
    }
  };

  const handleAction = async (id, action) => {
    try {
      let url = `http://localhost:5000/api/admin/users/${id}`;
      if (action === 'block') url += '/block';
      if (action === 'unblock') url += '/unblock';

      const method = action === 'delete' ? 'delete' : 'put';
      await axios({ method, url });
      setMessage(`User ${id} ${action}ed successfully`);
      fetchUsers();
    } catch (err) {
      console.error(err);
      setError(`Failed to ${action} user`);
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">User Management</h2>
      {message && <Alert variant="success">{message}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <Table striped bordered hover responsive>
          <thead className="table-dark">
            <tr>
              <th>User ID</th>
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
              <tr key={user.UserId}>
                <td>{user.UserId}</td>
                <td>{user.Name}</td>
                <td>{user.Email}</td>
                <td>{user.Mobile}</td>
                <td>{user.IsVerified ? 'Yes' : 'No'}</td>
                <td>{user.IsBlocked ? 'Yes' : 'No'}</td>
                <td>{new Date(user.CreatedAt).toLocaleString()}</td>
                <td>
                  {user.IsBlocked ? (
                    <Button variant="success" size="sm" onClick={() => handleAction(user.UserId, 'unblock')}>
                      Unblock
                    </Button>
                  ) : (
                    <Button variant="warning" size="sm" onClick={() => handleAction(user.UserId, 'block')}>
                      Block
                    </Button>
                  )}
                  {' '}
                  <Button variant="danger" size="sm" onClick={() => handleAction(user.UserId, 'delete')}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default UserManagement;
