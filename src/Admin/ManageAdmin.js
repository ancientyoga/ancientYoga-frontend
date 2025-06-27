import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import api from "../api";

function ManageAdmin() {
  const [admins, setAdmins] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    profile_picture: null,
    profile_picture_url: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchAdmins = async () => {
    try {
      const res = await api.get("/api/manageadmins");
      setAdmins(res.data);
    } catch (err) {
      console.error("❌ Error fetching admins:", err);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profile_picture") {
      setFormData({ ...formData, profile_picture: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key]) data.append(key, formData[key]);
    });

    try {
      if (editingId) {
        await api.put(`/api/manageadmins/${editingId}`, data);
      } else {
        await api.post("/api/manageadmins", data);
      }

      setFormData({
        name: "",
        email: "",
        password: "",
        role: "",
        profile_picture: null,
        profile_picture_url: "",
      });
      setEditingId(null);
      setShowModal(false);
      fetchAdmins();
    } catch (err) {
      console.error("❌ Error submitting admin:", err);
    }
  };

  const handleEdit = (admin) => {
    setEditingId(admin.id);
    setFormData({
      name: admin.name,
      email: admin.email,
      password: "",
      role: admin.role,
      profile_picture: null,
      profile_picture_url: admin.profile_picture,
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this admin?")) {
      try {
        await api.delete(`/api/manageadmins/${id}`);
        fetchAdmins();
      } catch (err) {
        console.error("❌ Error deleting admin:", err);
      }
    }
  };

  const getImageUrl = (path) =>
    path ? `${api.defaults.baseURL}/${path.startsWith("/") ? path.slice(1) : path}` : "/assets/Admin.jpg";

  return (
    <div className="container py-5">
      <br />
      <br />
      <div className="text-center mb-4">
        <h2 className="text-primary fw-bold">Admin Management</h2>
        <button className="btn btn-outline-primary mt-3" onClick={() => setShowModal(true)}>
          + Add Admin
        </button>
      </div>

      <div className="card shadow-sm">
        <div className="card-body table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th scope="col">Photo</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Role</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((admin) => (
                <tr key={admin.id}>
                  <td>
                    <img
                      src={getImageUrl(admin.profile_picture)}
                      alt={admin.name}
                      className="rounded-circle border"
                      style={{ width: "45px", height: "45px", objectFit: "cover" }}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/assets/Admin.jpg";
                      }}
                    />
                  </td>
                  <td>{admin.name}</td>
                  <td>{admin.email}</td>
                  <td>
                    <span className="badge bg-secondary">{admin.role}</span>
                  </td>
                  <td>
                    <div className="d-flex gap-2">
                      <button className="btn btn-sm btn-outline-success" onClick={() => handleEdit(admin)}>
                        Edit
                      </button>
                      <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(admin.id)}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {admins.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-muted">
                    No admins found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          role="dialog"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <form onSubmit={handleSubmit}>
                <div className="modal-header bg-primary text-white">
                  <h5 className="modal-title mb-0">{editingId ? "Edit Admin" : "Add Admin"}</h5>
                  <button
                    type="button"
                    className="btn-close btn-close-white"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>
                <div className="modal-body row g-3 p-4">
                  <div className="col-md-6">
                    <label className="form-label">Full Name</label>
                    <input
                      className="form-control"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Email</label>
                    <input
                      className="form-control"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Password</label>
                    <input
                      className="form-control"
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required={!editingId}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Role</label>
                    <input
                      className="form-control"
                      type="text"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      placeholder="e.g., Super Admin"
                    />
                  </div>
                  <div className="col-md-12">
                    <label className="form-label">Photo</label>
                    <input
                      className="form-control"
                      type="file"
                      name="profile_picture"
                      onChange={handleChange}
                    />
                    {formData.profile_picture_url && (
                      <div className="mt-3">
                        <img
                          src={getImageUrl(formData.profile_picture_url)}
                          alt="Preview"
                          className="img-thumbnail"
                          width="100"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/assets/Admin.jpg";
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="submit" className="btn btn-success">
                    {editingId ? "Update Admin" : "Add Admin"}
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageAdmin;
