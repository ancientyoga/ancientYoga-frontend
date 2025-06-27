// ✅ App.js
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
import UserManagement from './Admin/UserManagement';
import ManageAdmin from './Admin/ManageAdmin';
import ManageInfo from './Admin/ManageInfo';
import CourseManagement from './Admin/CourseManagement';
import UploadSampleVideo from './Admin/UploadSampleVideo';
import AdminPricingManager from './Admin/AdminPricingManager';
import TotalOrder from './Admin/TotalOrder';
import ManageVideo from './Admin/manageVideoLearning';

import Header from './components/Header';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import './App.css';

// ✅ Admin route guard
const ProtectedRoute = ({ element }) => {
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  return isAdmin ? element : <Navigate to="/admin/login" replace />;
};

function App() {
  const [scrollingDown, setScrollingDown] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [user, setUser] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollingDown(currentScrollY > lastScrollY && currentScrollY > 50);
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
        {!scrollingDown && <Header />}
        <Navbar fixed={scrollingDown} user={user} />
      </div>

      <div className="container-fluid px-0">
        <Routes>
          {/* Public Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/course-details" element={<CourseDetails />} />
          <Route path="/course/:courseSlug/coursedetails" element={<CourseDetails />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/payment/:id" element={<PaymentScreen />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/our-blogs" element={<OurBlog />} />
          <Route path="/learn" element={<VideoLearning />} />
          <Route path="/video/:id" element={<VideoDetail />} />
          <Route path="/learn/:id" element={<VideoDetail />} />

          {/* Admin Pages */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<ProtectedRoute element={<AdminDashboard />} />} />
          <Route path="/admin/users" element={<ProtectedRoute element={<UserManagement />} />} />
          <Route path="/manageadmins" element={<ProtectedRoute element={<ManageAdmin />} />} />
          <Route path="/admin/manage-info" element={<ProtectedRoute element={<ManageInfo />} />} />
          <Route path="/manage-course" element={<ProtectedRoute element={<CourseManagement />} />} />
          <Route path="/manage-videos" element={<ProtectedRoute element={<UploadSampleVideo />} />} />
          <Route path="/manage-pricing" element={<ProtectedRoute element={<AdminPricingManager />} />} />
          <Route path="/order-list" element={<ProtectedRoute element={<TotalOrder />} />} />
          <Route path="/managevideo" element={<ProtectedRoute element={<ManageVideo />} />} />
        </Routes>
      </div>

      <Footer />
    </Router>
  );
}

export default App;
