import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';


const Navbar = () => {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) setUser(storedUser.name);

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/course-details', label: 'Courses' },
    { to: '/our-blogs', label: 'Our Blogs' },
    { to: '/learn', label: 'Learn' },
    { to: '/contact', label: 'Contact' },
    ...(!user ? [{ to: '/login', label: 'Login' }] : []),
  ];

  return (
    <nav className={`main-navbar ${scrolled ? 'fixed' : ''} ${isHome ? 'white-navbar' : ''}`}>
      <div className="container-fluid d-flex flex-column flex-sm-row justify-content-between align-items-center py-1">
        <div className="d-flex align-items-center">
          <NavLink to="/" className="navbar-brand d-flex align-items-center text-decoration-none">
            
            <div className="brand-text text-center">
              <h4 className="brand-main">ANCIENT YOGA</h4>
              <small className="brand-sub">Transform Your Life with Ancient Yoga</small>
            </div>
          </NavLink>
        </div>

        <div className="menu-toggle d-lg-none" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>

        <div className={`navbar-links d-lg-flex align-items-center ${menuOpen ? 'active' : ''}`}>
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className="nav-link ms-lg-3 mt-2 mt-lg-0"
              onClick={toggleMenu}
            >
              {label}
            </NavLink>
          ))}

          {user && (
            <>
              <button className="nav-link btn btn-link text-danger" onClick={handleLogout}>
                Logout
              </button>
              <div className="user-info ms-3 mt-2 mt-lg-0">
                <span className="badge bg-primary">Hi, {user}</span>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
