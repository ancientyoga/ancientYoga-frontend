import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaLock, FaEnvelope, FaEye, FaEyeSlash } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      alert('Please enter both email and password');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`http://localhost:5000/api/auth/login`, {
        email: email.trim(),
        password: password.trim(),
      });

      if (response.status === 200) {
        const { token, user } = response.data;

        localStorage.setItem('userToken', token);
        localStorage.setItem('user', JSON.stringify(user));

        alert(`Welcome, ${user.name}`);
        navigate('/home');
      } else {
        alert(response.data.error || 'Unexpected error');
      }
    } catch (error) {
      alert(error.response?.data?.error || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-start min-vh-100 pt-5">
      <div className="card p-4 shadow" style={{ maxWidth: '400px', width: '100%' }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="text-primary">User Login</h2>
        </div>

        <div className="mb-3 position-relative">
          <FaEnvelope className="position-absolute top-50 translate-middle-y ms-2 text-muted" />
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control ps-5"
          />
        </div>

        <div className="mb-3 position-relative">
          <FaLock className="position-absolute top-50 translate-middle-y ms-2 text-muted" />
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control ps-5 pe-5"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="btn btn-link position-absolute end-0 top-50 translate-middle-y pe-3"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <button
          onClick={handleLogin}
          disabled={loading}
          className={`btn w-100 ${loading ? 'btn-secondary' : 'btn-primary'}`}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <p className="text-center mt-3">
          Don’t have an account?
          <button
            onClick={() => navigate('/register')}
            className="btn btn-link p-0 ms-1"
          >
            Register here
          </button>
        </p>
      </div>
    </div>
  );
}
