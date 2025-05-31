import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import logo from '../assets/logo.png'; // Make sure the logo path is correct

const Navbar = ({ fixed }) => {
  const [user, setUser] = useState(null);
  const [subscriberCount, setSubscriberCount] = useState(1200);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [hasPurchased, setHasPurchased] = useState(false); // Replace with real logic
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser.name); // Storing just the user's name in the state
    }
  }, []);

  const handleSubscribe = () => {
    if (!hasPurchased) {
      alert("You need to buy the course to subscribe.");
      return;
    }
    if (!isSubscribed) {
      setSubscriberCount(subscriberCount + 1);
      setIsSubscribed(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('user');
    setUser(null);
    window.location.href = '/'; // Force refresh to home after logout
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className={`main-navbar ${fixed ? 'fixed' : ''}`}>
      <div className="container d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <img src={logo} alt="Logo" className="navbar-logo me-2" />
        </div>

        <div className="menu-toggle d-lg-none" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>

        <div className={`navbar-links d-lg-flex align-items-center ${menuOpen ? 'active' : ''}`}>
          <Link to="/" className="nav-link" onClick={toggleMenu}>Home</Link>
          <Link to="/about" className="nav-link" onClick={toggleMenu}>About</Link>
          <Link to="/course-details" className="nav-link" onClick={toggleMenu}>Courses</Link>
          <Link to="/videos" className="nav-link" onClick={toggleMenu}>Videos</Link>
          <Link to="/contact" className="nav-link" onClick={toggleMenu}>Contact</Link>
          {!user ? (
            <Link to="/login" className="nav-link" onClick={toggleMenu}>Login</Link>
          ) : (
            <button className="nav-link btn btn-link text-danger p-0 ms-2" onClick={handleLogout}>
              Logout
            </button>
          )}
          <Link to="/Admin" className="nav-link" onClick={toggleMenu}>Admin</Link>

          <button
            onClick={handleSubscribe}
            className={`subscribe-btn ms-lg-3 ${isSubscribed ? 'subscribed' : ''}`}
          >
            {isSubscribed ? '✔ Subscribed' : `Subscribe (${subscriberCount})`}
          </button>

          {user && (
            <div className="user-info ms-3">
              <span className="badge bg-primary">Hi, {user}</span>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
