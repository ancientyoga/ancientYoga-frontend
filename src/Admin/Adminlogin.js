import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css';
import api from '../api'; // ✅ Use the configured axios instance

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    try {
      // ✅ Use `api.post` instead of `axios.post`
      const res = await api.post('/api/manageadmins/login', { email, password });

      localStorage.setItem('isAdmin', 'true');
      localStorage.setItem('adminData', JSON.stringify(res.data));
      localStorage.setItem('token', res.data.token || '');

      navigate('/admin/dashboard');
    } catch (err) {
      if (err.response?.status === 401) {
        setErrorMsg(err.response.data.message || 'Incorrect email or password');
      } else {
        setErrorMsg('Server error. Please try again later.');
      }
    }
  };

  return (
    <div className="admin-login-wrapper d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="admin-login-form card p-4 shadow-sm w-100" style={{ maxWidth: '400px' }}>
        <h2 className="text-center mb-4">Admin Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Login</button>
          {errorMsg && <p className="text-danger mt-3 text-center">{errorMsg}</p>}
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
