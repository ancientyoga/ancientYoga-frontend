import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './About.css';

// Importing background and content images
import aboutbg1 from '../assets/aboutbg1.png';
import aboutbg2 from '../assets/aboutbg2.png';


const About = () => {
  return (
    <div className="ay-container">
      {/* Hero Section */}
      <div
        className="ay-hero text-white text-center d-flex flex-column justify-content-center align-items-center"
        style={{
          backgroundImage: `url(${aboutbg1})`
        }}
      >
        <div className="ay-hero-content">
          <h1 className="fw-bold">Transform Your Life with Ancient Yoga</h1>
          <p className="lead">
            Join our online course and experience the magic of traditional practices for a healthier, peaceful life.
          </p>
        </div>
      </div>

      {/* Why Ancient Yoga Section */}
      <div
        className="container my-5 p-4 rounded ay-philosophy"
        style={{
          backgroundImage: `url(${aboutbg2})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <h2 className="text-center mb-4">Why Ancient Yoga?</h2>
        <div className="row align-items-center mb-5">
          <div className="col-md-6">
            <p>
              Our course is based on <span className="highlight">5,000-year-old techniques</span> from texts like the <strong>Yoga Sutras</strong> and <strong>Hatha Yoga Pradipika</strong>.
              Whether you're dealing with obesity, stress, or anxiety, ancient yoga helps you heal from within—naturally and holistically.
            </p>
            <p>These practices are gentle, effective, and tailored for both beginners and experienced yogis.</p>
          </div>
          <div className="row mt-5">
          <div className="col text-center">
            <h3>Bonus: Daily Tips & Lifetime Access!</h3>
            <p>Get valuable daily yoga guidance, lifestyle advice, and support even after course completion.</p>
          </div>
        </div>

         
        </div>

        

        
      </div>

      {/* Call to Action Section */}
      <div
        className="text-center ay-cta text-white"
        style={{
          backgroundImage: `url(${aboutbg2})`,
          backgroundSize: 'cover',
          backgroundPosition: 'bottom',
          padding: '60px 20px'
        }}
      >
        <h2 className="fw-bold">Ready to Begin Your Journey?</h2>
        <p>Start your transformation today with the wisdom of ancient yoga.</p>
        <a href="/course-details" className="btn btn-lg btn-success shadow">
          Join the Course Now
        </a>
      </div>
    </div>
  );
};

export default About;
