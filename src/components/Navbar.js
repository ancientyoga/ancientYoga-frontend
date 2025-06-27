import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import logo from '../assets/Ancient Yoga.png';

const Navbar = ({ fixed }) => {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) setUser(storedUser.name);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className={`yoga-navbar-wrapper ${fixed ? 'yoga-navbar-fixed' : ''}`}>
      <div className="yoga-navbar-container container d-flex justify-content-between align-items-center">
        <Link to="/" className="d-flex align-items-center">
          <img src={logo} alt="Logo" className="yoga-navbar-logo me-2" />
        </Link>

        <button className="yoga-navbar-toggle d-lg-none" onClick={toggleMenu} aria-label="Toggle menu">
          <span className="yoga-navbar-bar"></span>
          <span className="yoga-navbar-bar"></span>
          <span className="yoga-navbar-bar"></span>
        </button>

        <div className={`yoga-navbar-links d-lg-flex align-items-center ${menuOpen ? 'active' : ''}`}>
          <Link to="/" className="yoga-nav-link" onClick={toggleMenu}>Home</Link>
          <Link to="/about" className="yoga-nav-link" onClick={toggleMenu}>About</Link>
          <Link to="/course-details" className="yoga-nav-link" onClick={toggleMenu}>Courses</Link>
          <Link to="/our-blogs" className="yoga-nav-link" onClick={toggleMenu}>Our Blogs</Link>
          <Link to="/learn" className="yoga-nav-link" onClick={toggleMenu}>Learn</Link>
          <Link to="/contact" className="yoga-nav-link" onClick={toggleMenu}>Contact</Link>

          {!user ? (
            <Link to="/login" className="yoga-nav-link" onClick={toggleMenu}>Login</Link>
          ) : (
            <button
              className="yoga-nav-link btn btn-link text-danger p-0 ms-2"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}

          

          {user && (
            <div className="yoga-user-info ms-3">
              <span className="badge bg-primary">Hi, {user}</span>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
