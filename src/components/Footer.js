import React from 'react';
import { NavLink } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer bg-dark text-light pt-5 pb-4 mt-auto">
      <div className="container">

        {/* Admin Login Button */}
        <div className="text-center mb-4">
          <NavLink to="/admin/login">
            <button className="btn btn-outline-light px-4 py-2">
              <i className="bi bi-lock-fill me-2"></i> Admin Login
            </button>
          </NavLink>
        </div>

        <hr className="bg-light" />

        {/* Grid Layout */}
        <div className="row text-center text-md-start">

          {/* Brand Info */}
          <div className="col-12 col-md-3 mb-4">
            <h5 className="footer-title">Ancient Yoga</h5>
            <p className="small">
              Embrace timeless yoga practices that restore harmony to mind, body, and spirit. Ancient Yoga brings authentic traditions to the modern world.
            </p>
            <div className="d-flex justify-content-center justify-content-md-start gap-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-light">
                <i className="bi bi-facebook fs-5"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-light">
                <i className="bi bi-instagram fs-5"></i>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-light">
                <i className="bi bi-youtube fs-5"></i>
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-light">
                <i className="bi bi-github fs-5"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-12 col-md-3 mb-4">
            <h6 className="footer-title">Quick Links</h6>
            <ul className="list-unstyled">
              <li><NavLink to="/" className="footer-link d-block py-1">Home</NavLink></li>
              <li><NavLink to="/about" className="footer-link d-block py-1">About</NavLink></li>
              <li><NavLink to="/classes" className="footer-link d-block py-1">Classes</NavLink></li>
              <li><NavLink to="/schedule" className="footer-link d-block py-1">Schedule</NavLink></li>
              <li><NavLink to="/blog" className="footer-link d-block py-1">Blog</NavLink></li>
            </ul>
          </div>

          {/* Yoga Offerings */}
          <div className="col-12 col-md-3 mb-4">
            <h6 className="footer-title">Yoga Offerings</h6>
            <ul className="list-unstyled">
              <li className="py-1">Online Yoga Classes</li>
              <li className="py-1">Meditation Guides</li>
              <li className="py-1">Breathing Techniques</li>
              <li className="py-1">Ayurvedic Tips</li>
              <li className="py-1">Workshops & Retreats</li>
            </ul>
          </div>

          {/* Call to Action */}
          <div className="col-12 col-md-3 mb-4">
            <h6 className="footer-title">Join the Journey</h6>
            <p className="small">Ready to transform your life with Ancient Yoga?</p>
            <NavLink to="/login">
              <button className="btn btn-outline-light w-100">Get Started</button>
            </NavLink>
          </div>
        </div>

        <hr className="bg-light" />

        {/* Footer Bottom */}
        <div className="text-center small mt-3">
          © {new Date().getFullYear()} Ancient Yoga. All rights reserved.
          <br />
          <a
            href="https://nandisofetchsolution.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-light text-decoration-underline fw-bold"
          >
            Crafted with ❤️ by Nandi Softech Solutions
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
