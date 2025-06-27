import React, { useEffect, useState } from 'react';
import api from '../api';
import './ManageInfo.css';

const ManageInfo = () => {
  const [infoList, setInfoList] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    address_line1: '',
    address_line2: '',
    city: '',
    state: '',
    country: '',
    pincode: '',
    phone: '',
    email: '',
    facebook_url: '',
    youtube_url: '',
    instagram_url: ''
  });

  const [isEditMode, setIsEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const getToken = () => {
    const adminData = localStorage.getItem('adminData');
    try {
      return adminData ? JSON.parse(adminData).token : '';
    } catch (err) {
      console.error('❌ Token parse error:', err);
      return '';
    }
  };

  const fetchData = async () => {
    const token = getToken();
    if (!token) {
      console.warn('⚠️ No token found');
      return;
    }

    try {
      const res = await api.get('/api/contact/manage', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setInfoList(res.data);
    } catch (err) {
      console.error('❌ Error fetching data:', err);
      if (err.response?.status === 401) {
        alert('Session expired. Please login again.');
        localStorage.removeItem('adminData');
        window.location.href = '/admin-login';
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = getToken();
    const url = isEditMode
      ? `/api/contact/manage/${editingId}`
      : `/api/contact/manage`;

    try {
      await api[isEditMode ? 'put' : 'post'](url, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert(isEditMode ? 'Updated successfully!' : 'Added successfully!');
      resetForm();
      fetchData();
    } catch (err) {
      console.error('❌ Submit failed:', err);
      alert('Operation failed. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    const token = getToken();
    if (!window.confirm('Are you sure you want to delete this contact info?')) return;

    try {
      await api.delete(`/api/contact/manage/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchData();
    } catch (err) {
      console.error('❌ Delete failed:', err);
      alert('Delete failed. Please try again.');
    }
  };

  const handleEdit = (entry) => {
    setFormData({ ...entry });
    setIsEditMode(true);
    setEditingId(entry.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setFormData({
      name: '',
      address_line1: '',
      address_line2: '',
      city: '',
      state: '',
      country: '',
      pincode: '',
      phone: '',
      email: '',
      facebook_url: '',
      youtube_url: '',
      instagram_url: ''
    });
    setIsEditMode(false);
    setEditingId(null);
  };

  return (
    <div className="manage-info-container d-flex flex-column align-items-center">
      <br />
      <br />
      <h2 className="text-center mb-4">{isEditMode ? 'Update' : 'Add'} Contact Info</h2>

      <div className="card p-4 shadow-sm w-100" style={{ maxWidth: '720px' }}>
        <form className="row g-3" onSubmit={handleSubmit} autoComplete="off">
          {Object.entries(formData).map(([key, value]) => (
            <div key={key} className="col-md-6">
              <label className="form-label">
                {key.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
              </label>
              <input
                type="text"
                className="form-control"
                name={key}
                value={value}
                onChange={handleChange}
                required={key !== 'address_line2'}
                placeholder={`Enter ${key.replace(/_/g, ' ')}`}
              />
            </div>
          ))}

          <div className="col-12 d-flex justify-content-end gap-2">
            <button type="submit" className="btn btn-primary">
              {isEditMode ? 'Update Info' : 'Add Info'}
            </button>
            {isEditMode && (
              <button type="button" className="btn btn-secondary" onClick={resetForm}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <h3 className="text-center mt-5">All Contact Entries</h3>
      <div className="table-responsive w-100 mt-3" style={{ maxWidth: '95vw' }}>
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>City</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Socials</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {infoList.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center">
                  No contact info available
                </td>
              </tr>
            ) : (
              infoList.map((entry) => (
                <tr key={entry.id}>
                  <td>{entry.name}</td>
                  <td>{entry.city}</td>
                  <td>{entry.phone}</td>
                  <td>{entry.email}</td>
                  <td>
                    <a href={entry.facebook_url} target="_blank" rel="noreferrer">FB</a> |{' '}
                    <a href={entry.youtube_url} target="_blank" rel="noreferrer">YT</a> |{' '}
                    <a href={entry.instagram_url} target="_blank" rel="noreferrer">IG</a>
                  </td>
                  <td>
                    <button className="btn btn-sm btn-outline-success me-2" onClick={() => handleEdit(entry)}>
                      Edit
                    </button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(entry.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageInfo;
