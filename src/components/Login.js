import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const Login = () => {
  const [values, setValues] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await api.post('/auth/adminlogin', values); // uses http://localhost:5000
      if (res.data.loginStatus) {
        localStorage.setItem('valid', true);
        navigate('/dashboard');
      } else {
        setError(res.data.Error || 'Login failed. Please try again.');
      }
    } catch (err) {
      console.error('❌ Login error:', err);
      setError('❌ Server error. Please try again later.');
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        {error && <div className="login-error">{error}</div>}
        <h2 className="login-title">Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="login-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              autoComplete="off"
              placeholder="Enter Email"
              className="login-input"
              value={values.email}
              onChange={(e) => setValues({ ...values, email: e.target.value })}
              required
            />
          </div>
          <div className="login-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              className="login-input"
              value={values.password}
              onChange={(e) => setValues({ ...values, password: e.target.value })}
              required
            />
          </div>
          <div className="login-terms mb-3">
            <input type="checkbox" id="terms" required />
            <label htmlFor="terms">I agree to the terms & conditions</label>
          </div>
          <button type="submit" className="login-button">Log In</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
