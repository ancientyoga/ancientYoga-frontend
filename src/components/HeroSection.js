import React from 'react';
import './HeroSection.css';

function HeroSection() {
  const bgImages = [
    require('../assets/heroslide/1.png'),
    require('../assets/heroslide/7.png'),
    require('../assets/heroslide/3.png'),
    require('../assets/heroslide/7.png'),
    require('../assets/heroslide/5.png'),
    require('../assets/heroslide/6.png'),
    require('../assets/heroslide/7.png'),
    require('../assets/heroslide/8.png'),
    
  ];

  return (
    <section className="ancient-hero">
      {bgImages.map((img, idx) => (
        <div
          className="bg-slide"
          style={{ backgroundImage: `url(${img})` }}
          key={idx}
        />
      ))}

      <div className="ancient-hero-content">
        <br/>
        <br/>
        <h1 className="ancient-hero-subtitle">Welcome to Ancient Yoga</h1>
        <h3 className="ancient-hero-tagline">"Transform Your Life with Ancient Yoga Techniques"</h3>
        <p className="ancient-hero-text">
          Unlock the power of ancient wisdom to rejuvenate your body, mind, and soul.
        </p>
        <a href="/login">
          <button className="ancient-hero-button">Get Started</button>
        </a>
      </div>
    </section>
  );
}

export default HeroSection;
