import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminDashboard.css';

const AdminManagement = () => {
  const [admins, setAdmins] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const fetchAdmins = () => {
    axios.get('http://localhost:5000/api/admins')
      .then(res => setAdmins(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleAddAdmin = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/admins', formData)
      .then(() => {
        fetchAdmins();
        setFormData({ name: '', email: '', password: '' });
      })
      .catch(err => console.error(err));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this admin?")) {
      axios.delete(`http://localhost:5000/api/admins/${id}`)
        .then(fetchAdmins)
        .catch(err => console.error(err));
    }
  };

  return (
    <div className="p-4">
      <h3>Admin Management</h3>

      <form onSubmit={handleAddAdmin} className="row g-3 mb-4 mt-3">
        <div className="col-md-3">
          <input type="text" className="form-control" placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required />
        </div>
        <div className="col-md-3">
          <input type="email" className="form-control" placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required />
        </div>
        <div className="col-md-3">
          <input type="password" className="form-control" placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required />
        </div>
        <div className="col-md-3">
          <button className="btn btn-primary w-100" type="submit">Add Admin</button>
        </div>
      </form>

      <table className="table table-bordered shadow-sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Joined</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin, idx) => (
            <tr key={admin.id}>
              <td>{idx + 1}</td>
              <td>{admin.name}</td>
              <td>{admin.email}</td>
              <td>{new Date(admin.createdAt).toLocaleDateString()}</td>
              <td>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(admin.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {admins.length === 0 && (
            <tr><td colSpan="5" className="text-center">No admins found.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminManagement;
