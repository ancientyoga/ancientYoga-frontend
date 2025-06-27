import React from 'react';
import './AboutSection.css';

import bgImage from '../assets/aboutbg2.png'; // fallback if aboutbg1.jpg not found
 // ✅ Make sure this file exists

const AboutSection = () => {
  return (
    <section
      className="yoga-about-section"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="yoga-overlay"></div>
      <div className="yoga-about-content">
        <div className="yoga-about-text">
          <h4 className="yoga-about-subheading">Relish in Nature's Natural Gift</h4>
          <h1 className="yoga-about-heading">LIFE IN DIVINE YOGA</h1>
          <blockquote>
            “I am standing on my own altar, The Poses are my prayers”
          </blockquote>
          <p>
            At Ancient Yoga, we are dedicated to helping you unlock the wisdom of yoga to transform your life.
          </p>
          <ul>
            <li>Improved flexibility and strength</li>
            <li>Reduced stress and anxiety</li>
            <li>Enhanced mental clarity and focus</li>
            <li>Balanced emotional health and mindfulness</li>
          </ul>
          <p>
            Start your yoga journey today and take control of your health and well-being.
          </p>
          <div className="yoga-about-cta">
            <p>Ready to take your yoga practice to the next level?</p>
            <a href="/login">
              <button className="yoga-about-button">Get Started Today</button>
            </a>
          </div>
        </div>

        <div className="yoga-about-images">
          
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
