import React from 'react';
import './AboutSection.css';
import bgImage from '../assets/6.jpg'; // Replace with your actual image path

const AboutSection = () => {
  return (
    <section
      className="about-section"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="overlay"></div>
      <div className="content">
        <div className="about-text">
          <h4 className="subheading">Relish in Nature's Natural Gift</h4>
          <h1 className="main-heading">LIFE IN DIVINE YOGA</h1>
          <blockquote>
            “I am standing on my own altar, The Poses are my prayers”
          </blockquote>
          <p>
            At Ancient Yoga, we are dedicated to helping you unlock the wisdom of yoga to transform your life. 
            Whether you're new to yoga or an experienced practitioner, our courses help improve your health, mind, and overall well-being.
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

          <div className="cta-section">
            <p>Ready to take your yoga practice to the next level?</p>
            <a href="/login">
              <button className="cta-button">Get Started Today</button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
