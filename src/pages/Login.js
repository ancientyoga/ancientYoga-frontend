// src/pages/Login.js
import React from 'react';

const Login = () => {
  return (
    <div>
      <h1>Login</h1>
      <form>
        <div className="form-group">
          <label>Email</label>
          <input type="email" className="form-control" placeholder="Enter your email" />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" className="form-control" placeholder="Enter your password" />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
};

export default Login;
