import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
  });

  const navigate = useNavigate(); // Initialize the navigate function

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async () => {
    const { name, email, mobile, password } = formData;

    if (!name || !email || !mobile || !password) {
      alert('Please fill all the fields');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        name,
        email,
        mobile,
        password,
      });

      if (response.status === 200 || response.status === 201) {
        alert('User registered successfully');
        setFormData({ name: '', email: '', mobile: '', password: '' });
        navigate('/login'); // Navigate to the login page after successful registration
      } else {
        alert('Unexpected response from server');
      }
    } catch (error) {
      console.error('Registration Error:', error.response?.data || error.message);
      alert(error.response?.data?.error || 'Registration failed. Please try again.');
    }
  };

  return (
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
            onClick={() => navigate('/login')} // Use navigate to go to the login page
            className="btn btn-link p-0 ms-1"
          >
            Login here
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;
