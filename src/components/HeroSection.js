import React from 'react';
import './HeroSection.css';

function HeroSection() {
  return (
    <section className="hero-section d-flex align-items-center justify-content-center">
      <div className="hero-overlay"></div>
      <div className="content text-center animate__animated animate__fadeIn">
        
        <h1 className="hero-subtitle animate__animated animate__fadeInDown animate__delay-1s">
          Ancient Yoga
        </h1>
        <h3 className="hero-tagline animate__animated animate__fadeInUp animate__delay-2s">
          Transform Your Life with Ancient Yoga Techniques
        </h3>
        <p className="hero-text animate__animated animate__fadeInUp animate__delay-3s">
          Unlock the power of ancient wisdom to rejuvenate your body, mind, and soul.
        </p>
        <a href="/login">
          <button className="cta-button animate__animated animate__zoomIn animate__delay-4s">
            Get Started
          </button>
        </a>
      </div>
    </section>
  );
}

export default HeroSection;
