import React from 'react';
import './Footer.css';
import { FaTwitter, FaFacebookF, FaInstagram, FaMapMarkerAlt, FaPhoneAlt, FaPaperPlane } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* Brand Info */}
        <div className="footer-section">
          <h2 className="footer-logo">Ancient Yoga</h2>
          <p className="footer-description">Far far away, behind the word mountains, far from the countries.</p>
          <div className="footer-socials">
            <FaTwitter className="footer-icon" />
            <FaFacebookF className="footer-icon" />
            <FaInstagram className="footer-icon" />
          </div>
        </div>

        {/* Recent Blog */}
        <div className="footer-section">
          <h2 className="footer-title">Recent Blog</h2>
          <div className="footer-blog">
            <img src="https://preview.colorlib.com/theme/yogalax/images/image_1.jpg" alt="blog1" />
            <div>
              <p>Yoga practices to boost happiness</p>
              <small>Oct. 06, 2020 • Admin • 19</small>
            </div>
          </div>
          <div className="footer-blog">
            <img src="https://preview.colorlib.com/theme/yogalax/images/image_2.jpg" alt="blog2" />
            <div>
              <p>Yoga practices to boost happiness</p>
              <small>Oct. 06, 2020 • Admin • 19</small>
            </div>
          </div>
        </div>

        {/* Explore */}
        <div className="footer-section">
          <h2 className="footer-title">Explore</h2>
          <ul className="footer-links">
            <li>&#8250; About</li>
            <li>&#8250; Contact</li>
            <li>&#8250; Classes</li>
            <li>&#8250; Schedule</li>
            <li>&#8250; Blog</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-section">
          <h2 className="footer-title">Have a Questions?</h2>
          <ul className="footer-contact">
            <li><FaMapMarkerAlt className="footer-contact-icon" />203 Fake St. Mountain View, San Francisco, California, USA</li>
            <li><FaPhoneAlt className="footer-contact-icon" />+2 392 3929 210</li>
            <li><FaPaperPlane className="footer-contact-icon" />info@yourdomain.com</li>
          </ul>
        </div>

      </div>

      <div className="footer-bottom">
        <p>Copyright © 2025 All rights reserved | This Website is made with ♥ by Nandi Softech Solutions</p>
      </div>
    </footer>
  );
};

export default Footer;
