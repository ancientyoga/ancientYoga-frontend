import React from 'react';
import { FaInstagram, FaYoutube, FaTwitter, FaFacebookF } from 'react-icons/fa';
import './Header.css';

const Header = () => {
  return (
    <header className="custom-header">
      <div className="container d-flex justify-content-between align-items-center">
        <div className="social-icons">
          
          <a href="#"><FaInstagram /></a>
          <a href="#"><FaYoutube /></a>
          <a href="#"><FaTwitter /></a>
          <a href="#"><FaFacebookF /></a>
        </div>
        <button className="join-us-btn">Join Us</button>
      </div>
    </header>
  );
};

export default Header;
