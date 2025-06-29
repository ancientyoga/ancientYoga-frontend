import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Home from './pages/Home';
import About from './pages/About';
import CourseDetails from './pages/CourseDetails';
import Contact from './pages/Contact';
import Register from './pages/Register';
import LoginPage from './pages/LoginPage';
import PaymentScreen from './pages/PaymentScreen';
import PaymentSuccess from './pages/PaymentSuccess';
import OurBlog from './pages/OurBlog';
import VideoLearning from './pages/VideoLearning';
import VideoDetail from './pages/VideoDetail';

import AdminLogin from './Admin/Adminlogin';
import AdminDashboard from './Admin/AdminDashboard';

import Header from './components/Header';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import './App.css';

const ProtectedRoute = ({ element }) => {
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  return isAdmin ? element : <Navigate to="/admin/login" replace />;
};

function App() {
  const [scrollY, setScrollY] = useState(0);
  const [scrollDir, setScrollDir] = useState('up');

  useEffect(() => {
    let lastY = window.scrollY;

    const onScroll = () => {
      const currentY = window.scrollY;
      setScrollY(currentY);

      if (currentY > lastY) {
        setScrollDir('down');
      } else {
        setScrollDir('up');
      }

      lastY = currentY;
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <Router>
      <div className="overlay-wrapper">
        {/* Header hides on scroll down */}
        <div className={`header-wrapper ${scrollDir === 'down' && scrollY > 50 ? 'hide' : ''}`}>
          <Header />
        </div>
        {/* Navbar becomes card on scroll */}
        <Navbar isScrolled={scrollY > 50} />
      </div>

      <div className="page-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/course-details" element={<CourseDetails />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/payment/:id" element={<PaymentScreen />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/our-blogs" element={<OurBlog />} />
          <Route path="/learn" element={<VideoLearning />} />
          <Route path="/video/:id" element={<VideoDetail />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<ProtectedRoute element={<AdminDashboard />} />} />
        </Routes>
      </div>

      <Footer />
    </Router>
  );
}

export default App;
