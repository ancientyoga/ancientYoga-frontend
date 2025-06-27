import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import BASE_URL from '../api'; // ✅ Make sure this points to your API root

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async () => {
    const { name, email, mobile, password } = formData;

    if (!name || !email || !mobile || !password) {
      alert('Please fill all the fields');
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/api/auth/register`, {
        name,
        email,
        mobile,
        password,
      });

      if (response.status === 200 || response.status === 201) {
        alert('✅ Registration successful! You can now login.');
        setFormData({ name: '', email: '', mobile: '', password: '' });
        navigate('/login');
      } else {
        alert('Unexpected server response');
      }
    } catch (error) {
      console.error('❌ Registration Error:', error.response?.data || error.message);
      alert(error.response?.data?.error || 'Registration failed. Please try again.');
    }
  };

  return (
    <>
      <br />
      <br />
      <div className="register-container">
        <div className="form-box">
          <h2>Create Account</h2>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="tel"
            name="mobile"
            placeholder="Mobile Number"
            value={formData.mobile}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          <button className="register-button" onClick={handleRegister}>
            Register
          </button>
          <p className="text-center mt-3">
            Already have an account?
            <button
              onClick={() => navigate('/login')}
              className="btn btn-link p-0 ms-1 text-decoration-none"
            >
              Login here
            </button>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
