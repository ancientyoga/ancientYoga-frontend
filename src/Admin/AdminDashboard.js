// 📁 src/pages/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './AdminDashboard.css';
import api from '../api';
import ManageVideoLearning from './manageVideoLearning';



         


const statLinks = {
  totalUsers: '/admin/users',
  totalSubscribers: '/purchase-reports',
  OrderList: '/order-list',
  ManageBlogs: '/manage-videos',
  totalBlogVideos: '/upload-sample-videos',
  currentOffers: '/manage-pricing',
  totalAdmins: '/manageadmins',
  ManageCourse: '/manage-course',
  ManageInfo: '/admin/manage-info',
  managelearn: '/managevideo',
  ManageUser: '/admin/users'
};

const AdminDashboard = () => {
  const [stats, setStats] = useState({});
  const [collapsed, setCollapsed] = useState(false);
  const [adminData, setAdminData] = useState({
    name: 'Admin',
    profile_picture: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    const savedAdmin = localStorage.getItem('adminData');
    if (savedAdmin) {
      try {
        const parsed = JSON.parse(savedAdmin);
        setAdminData({
          name: parsed.name || 'Admin',
          profile_picture: parsed.profile_picture || ''
        });
      } catch (err) {
        console.error('Error parsing adminData', err);
      }
    }

    api.get('/api/stats')
      .then((res) => {
        setStats(res.data || {});
      })
      .catch((err) => {
        console.error('Failed to fetch stats', err);
      });
  }, []);

  const renderCard = (title, value, icon, linkKey) => (
    <div className="admindash-col col-6 col-md-4 col-lg-3" key={linkKey}>
      <div
        className="admindash-card card border-0 shadow-sm h-100"
        onClick={() => navigate(statLinks[linkKey])}
        style={{ cursor: 'pointer' }}
      >
        <div className="card-body text-center">
          <i className={`bi ${icon} fs-1 text-primary`}></i>
          <h6 className="mt-3 fw-semibold">{title}</h6>
          <p className="fs-5 fw-bold text-dark mb-0">{value}</p>
        </div>
      </div>
    </div>
  );

  const getProfileImageUrl = () => {
    if (!adminData.profile_picture) return '/assets/Admin.jpg';

    const path = adminData.profile_picture.startsWith('/')
      ? adminData.profile_picture
      : `/${adminData.profile_picture}`;

    return `http://localhost:5000${path}`;
  };

  return (
    <div className="admindash-wrapper container-fluid bg-light py-5 min-vh-100">
      <br/>
      <br/>
      <div className="admindash-header text-center mb-4">
        <h2 className="fw-bold text-dark">
          Welcome to Admin Panel, <span className="text-primary">{adminData.name}</span>
        </h2>
      </div>

      <div className="row">
        <div className="col-lg-3 mb-4">
          {!collapsed && (
            <aside className="admindash-sidebar p-3 text-white rounded shadow-sm">
              <div className="admindash-profile text-center mb-4">
                <img
                  src={getProfileImageUrl()}
                  alt="Admin"
                  className="admindash-profile-img rounded-circle border border-white shadow"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/assets/Admin.jpg';
                  }}
                />
                <h5 className="mt-3 fw-bold">{adminData.name}</h5>
              </div>
              <ul className="nav flex-column">
                {Object.entries(statLinks).map(([key, link]) => (
                  <li className="nav-item mb-2" key={key}>
                    <Link className="nav-link text-white admindash-link" to={link}>
                      <i className="bi bi-chevron-right me-2"></i>
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </Link>
                  </li>
                ))}
              </ul>
            </aside>
          )}
        </div>

        <div className="col-lg-9">
          <main className="admindash-main p-4 bg-white rounded shadow-sm">
            <div className="d-flex justify-content-end mb-4">
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={() => setCollapsed(prev => !prev)}
              >
                <i className={`bi ${collapsed ? 'bi-list' : 'bi-x-lg'}`}></i>
              </button>
            </div>

            <div className="row g-4">
              {renderCard('Total Users', stats.totalUsers || 0, 'bi-people', 'totalUsers')}
              {renderCard('Subscribers', stats.totalSubscribers || 0, 'bi-bell', 'totalSubscribers')}
              {renderCard('Revenue', `₹${stats.totalRevenue || 0}`, 'bi-currency-rupee', 'totalRevenue')}
              {renderCard('Courses Uploaded', stats.totalCourses || 0, 'bi-play-circle', 'totalCourses')}
              {renderCard('Blog Videos', stats.totalBlogVideos || 0, 'bi-camera-video', 'totalBlogVideos')}
              {renderCard('Current Offers', stats.currentOffers || 0, 'bi-tag', 'currentOffers')}
              {renderCard('Total Admins', stats.totalAdmins || 0, 'bi-person-badge', 'totalAdmins')}
              
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
