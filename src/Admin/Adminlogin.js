import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css';

const AdminLogin = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Hardcoded credentials
  const validUsername = 'admin';
  const validPassword = 'admin123';

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === validUsername && password === validPassword) {
      localStorage.setItem('isAdmin', 'true'); // Save to localStorage
      navigate('/admin/dashboard'); // Redirect to dashboard
    } else {
      setErrorMsg('Invalid username or password');
    }
  };

  return (
    <div className="admin-login-wrapper">
      <form className="admin-login-form" onSubmit={handleLogin}>
        <h2>Admin Login</h2>
        <input
          type="text"
          placeholder="Enter Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        {errorMsg && <p className="admin-error-msg">{errorMsg}</p>}
      </form>
    </div>
  );
};

export default AdminLogin;
