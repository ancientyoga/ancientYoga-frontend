import React from 'react';
import './MissionSection.css';

const MissionSection = () => {
  return (
    <section className="mission-section">
      <div className="mission-container">
        <div className="left-section mission-card">
          <h2 className="center-title">Our Mission</h2>
          <p>
            Our mission is to empower individuals to unlock their full potential through the transformative practice of yoga. We aim to offer accessible and high-quality online courses that guide individuals toward holistic health and wellness.
          </p>
          <p>
            We believe that yoga is not just about physical postures—it’s a complete lifestyle transformation that brings peace to the mind, body, and soul.
          </p>
          <h3>Our Core Values</h3>
              <h4>Wellness</h4>
              <p>Focusing on the overall well-being of our students.</p>
              <h4>Authenticity</h4>
              <p>Providing genuine teachings that are rooted in ancient wisdom.</p>
              <h4>Inclusivity</h4>
              <p>Welcoming individuals from all walks of life, regardless of experience level.</p>
              <h4>Mindfulness</h4>
              <p>Helping individuals live a balanced and mindful life.</p>
          <div className="cta-section">
            <p>Ready to start your yoga journey with us?</p>
            <a href="/login">
              <button className="cta-button">Get Started</button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
