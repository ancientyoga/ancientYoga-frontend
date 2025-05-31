import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './AdminDashboard.css'; // Ensure this CSS file exists
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [adminName, setAdminName] = useState('Arjun Nandi');

  useEffect(() => {
  console.log("Admin Dashboard loaded");
}, []);
  useEffect(() => {
    const savedAdmin = localStorage.getItem('loggedInUser');
    if (savedAdmin) {
      setAdminName(savedAdmin);
    }
  }, []);

  return (
    <div className="admin-dashboard-wrapper p-3">

      <div className="container mb-4">
        <div className="welcome-card shadow rounded w-100 text-center">
          <div className="card-body py-2">
            <br />
          </div>
        </div>
      </div>

      {/* Topbar Welcome Card */}
      <div className="container mb-4">
        <div className="welcome-card shadow rounded w-100 text-center">
          <div className="card-body py-2">
            <h4 className="mb-0">Welcome, {adminName}!</h4>
          </div>
        </div>
      </div>

      {/* Dashboard Card */}
      <div className="admin-dashboard-card shadow-lg rounded">
        <div className="admin-dashboard d-flex">

          {/* Sidebar */}
          {!collapsed && (
            <div className="admin-sidebar p-3">
              <div className="admin-profile text-center mb-4">
                <img
                  src="assets\Admin.jpg"
                  alt="Admin"
                  className="admin-avatar mb-2"
                />
                <h5 className="admin-name">{adminName}</h5>
              </div>
              <ul className="nav flex-column">
                <li className="nav-item">
                  <Link className="nav-link admin-link" to="/user-management">
                    <i className="bi bi-people"></i> User Management
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link admin-link" to="/upload-sample-videos">
                    <i className="bi bi-upload"></i> Upload Sample Videos
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link admin-link" to="/upload-full-courses">
                    <i className="bi bi-play-circle"></i> Upload Full Courses
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link admin-link" to="/manage-comments">
                    <i className="bi bi-chat-dots"></i> Manage Comments
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link admin-link" to="/add-admin">
                    <i className="bi bi-person-plus"></i> Add Admin
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link admin-link" to="/manage-courses">
                    <i className="bi bi-journal-plus"></i> Manage Courses
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link admin-link" to="/offers-discounts">
                    <i className="bi bi-currency-dollar"></i> Offers & Discounts
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link admin-link" to="/purchase-reports">
                    <i className="bi bi-graph-up"></i> Purchase Reports
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link admin-link" to="/edit-homepage">
                    <i className="bi bi-house"></i> Edit Homepage
                  </Link>
                </li>
              </ul>
            </div>
          )}

          {/* Main Content */}
          <div className="admin-main p-4 flex-grow-1">
            <div className="row">
              <div className="col-1">
                <button
                  className="btn btn-outline-secondary mb-4"
                  onClick={() => setCollapsed(!collapsed)}
                >
                  <i className={`bi ${collapsed ? 'bi-list' : 'bi-x-lg'}`}></i>
                </button>
              </div>
              <div className="col-10">
                <div className="container mb-4">
                  <div className="welcome-card shadow rounded w-100 text-center">
                    <div className="card-body py-2">
                      <h4>Admin Dashboard</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row g-4">
              <div className="col-md-4">
                <div className="admin-stat-card p-3 shadow-sm">
                  <i className="bi bi-people admin-icon"></i>
                  <h5>Total Users</h5>
                  <p>1245</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="admin-stat-card p-3 shadow-sm">
                  <i className="bi bi-bell admin-icon"></i>
                  <h5>Subscribers</h5>
                  <p>378</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="admin-stat-card p-3 shadow-sm">
                  <i className="bi bi-graph-up-arrow admin-icon"></i>
                  <h5>Visitors</h5>
                  <p>1987</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="admin-stat-card p-3 shadow-sm">
                  <i className="bi bi-cloud-upload admin-icon"></i>
                  <h5>Courses Uploaded</h5>
                  <p>65</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="admin-stat-card p-3 shadow-sm">
                  <i className="bi bi-hand-thumbs-up admin-icon"></i>
                  <h5>Positive Reviews</h5>
                  <p>1023</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
