import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';

import Home from './pages/Home';
import About from './pages/About';
import CourseDetails from './pages/CourseDetails';
import PaymentScreen from './pages/PaymentScreen';
import Contact from './pages/Contact';
import Register from './pages/Register';
import LoginPage from './pages/LoginPage';


import Adminlogin from './Admin/Adminlogin';
import AdminDashboard from './Admin/AdminDashboard';
import UserManagement from './Admin/UserManagement';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import './App.css';

// ProtectedRoute component to handle admin access
const ProtectedRoute = ({ element }) => {
  const isAdmin = localStorage.getItem('isAdmin') === 'true'; // Check localStorage for isAdmin flag
  if (!isAdmin) return <Navigate to="/admin/login" replace />; // Redirect if not an admin
  return element;
};

function App() {
  const [scrollingDown, setScrollingDown] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [user, setUser] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setScrollingDown(true);
      } else {
        setScrollingDown(false);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const savedUser = localStorage.getItem('loggedInUser');
    if (savedUser) setUser(savedUser);
  }, []);

  return (
    <Router>
      <div className="overlay-wrapper">
        <Navbar fixed={scrollingDown} user={user} />
        {!scrollingDown && <Header />}
      </div>

      <div className="container-fluid px-0">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/course-details" element={<CourseDetails />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/payment" element={<PaymentScreen/>}/>


          {/* Admin Panel Routes */}
          <Route path="/admin/login" element={<Adminlogin />} />
          <Route path="/admin/dashboard" element={<ProtectedRoute element={<AdminDashboard />} />} />
          <Route path="/admin/users" element={<ProtectedRoute element={<UserManagement />} />} />
        </Routes>
      </div>

      <Footer />
    </Router>
  );
}

export default App;
