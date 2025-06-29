import React, { useEffect, useState } from 'react';
import './Header.css';
import { RiAdminFill } from "react-icons/ri";
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../api';

const Header = () => {
  const [subscribed, setSubscribed] = useState(false);
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      lastScrollY = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (location.state?.subscribed) {
      setSubscribed(true);
      setCount(prev => prev + 1);
      localStorage.setItem('isSubscribed', 'true');
    }
  }, [location.state]);

  useEffect(() => {
    const fetchSubCount = async () => {
      try {
        const res = await api.get('/api/subscription/subcount');
        setCount(res.data.count || 0);
      } catch (err) {
        console.error("Failed to fetch subscription count", err);
      }
    };
    fetchSubCount();

    const isSubscribed = localStorage.getItem('isSubscribed');
    if (isSubscribed === 'true') setSubscribed(true);
  }, []);

  const handleSubscribe = () => {
    if (subscribed) return;
    alert("You need to purchase the course to subscribe.");
    navigate('/course-details', { state: { fromSubscribe: true } });
  };

  return (
    <div className={`tops-info-bar ${visible ? '' : 'hide-header'}`} id="topInfoBar">
      <div className="container-fluid d-flex flex-column flex-sm-row justify-content-between align-items-center py-1">
        {/* Left Info */}
        <div className=" d-flex flex-wrap align-items-center gap-2 text-center text-sm-start">
         
          <a href="/admin/login" className="btn btn-outline-danger btn-sm">
            <RiAdminFill /> Admin
          </a>
        </div>

        {/* Right Icons */}
        <div className="d-flex flex-wrap justify-content-center justify-content-sm-end align-items-center gap-2 mt-2 mt-sm-0">
          <a href="https://www.facebook.com/share/16WH81FP95/" target="_blank" rel="noreferrer">
            <i className="bi bi-facebook"></i>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer">
            <i className="bi bi-twitter-x"></i>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer">
            <i className="bi bi-linkedin"></i>
          </a>
          <a href="https://www.instagram.com/nandisoftechsolution?igsh=cm5xNWk2eGJpbW54" target="_blank" rel="noreferrer">
            <i className="bi bi-instagram"></i>
          </a>
          
          <button
            onClick={handleSubscribe}
            className={`btn btn-sm ${subscribed ? 'btn-success' : 'btn-outline-warning'}`}
          >
            {subscribed ? `Subscribed (${count})` : `Subscribe (${count})`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
