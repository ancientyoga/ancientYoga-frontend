import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminDashboard.css';

const Stats = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalPurchases: 0
  });

  useEffect(() => {
    axios.get('http://localhost:5000/api/stats')
      .then(res => setStats(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-4">
      <h3>Registration & Purchase Stats</h3>
      <div className="row g-4 mt-3">
        <div className="col-md-6">
          <div className="admin-stat-card p-4 shadow-sm text-center">
            <i className="bi bi-person-circle admin-icon"></i>
            <h5>Total Registered Users</h5>
            <p>{stats.totalUsers}</p>
          </div>
        </div>
        <div className="col-md-6">
          <div className="admin-stat-card p-4 shadow-sm text-center">
            <i className="bi bi-currency-dollar admin-icon"></i>
            <h5>Total Purchases</h5>
            <p>{stats.totalPurchases}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
