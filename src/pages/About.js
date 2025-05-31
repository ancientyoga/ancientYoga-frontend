import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './About.css';

const About = () => {
  return (
    <div>
      {/* Hero Section */}
      <div
        className="intro-section text-white text-center d-flex flex-column justify-content-center align-items-center"
        style={{
          backgroundImage: "url('https://source.unsplash.com/1600x600/?yoga,nature')",
          padding: '100px 20px',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <h1 className="auto-style3 fw-bold">Transform Your Life with Ancient Yoga</h1>
        <p className="lead">Join our online course and experience the magic of traditional practices for a healthier, peaceful life.</p>
      </div>

      {/* Why Ancient Yoga Section */}
      <div className="container my-5" style={{ backgroundImage: "url('../assets/3.jpg')" }}>
        <h2 className="section-title text-center">Why Ancient Yoga?</h2>
        <div className="row align-items-center mb-5">
          <div className="col-md-6">
            <p>Our course is based on <span className="highlight">5,000-year-old techniques</span> from texts like the <strong>Yoga Sutras</strong> and <strong>Hatha Yoga Pradipika</strong>. Whether you're dealing with obesity, stress, or anxiety, ancient yoga helps you heal from within—naturally and holistically.</p>
            <p>These practices are gentle, effective, and tailored for both beginners and experienced yogis.</p>
          </div>
          <div className="col-md-6 text-center">
            <img src="assets/10.jpg" className="img-fluid rounded shadow" alt="Ancient Yoga" />
          </div>
        </div>

        {/* Course Structure */}
        <h2 className="section-title text-center">Course Structure</h2>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
          {[
            { week: 'Week 1', text: 'Foundations of Ancient Yoga & Breath Awareness' },
            { week: 'Week 2', text: 'Asanas for Strength, Flexibility, and Healing' },
            { week: 'Week 3', text: 'Pranayama & Mental Detox' },
            { week: 'Week 4+', text: 'Mindfulness, Meditation & Everyday Practice' }
          ].map(({ week, text }, index) => (
            <div className="col" key={index}>
              <div className="card module-card h-100 text-center">
                <div className="card-body">
                  <h5 className="card-title">{week}</h5>
                  <p className="card-text">{text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="row mt-5">
          <div className="col text-center">
            <h3>Bonus: Daily Tips & Lifetime Access!</h3>
            <p>Get valuable daily yoga guidance, lifestyle advice, and support even after course completion.</p>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div
        className="cta-section text-center text-white"
        style={{
          backgroundImage: "url('assets/Yoga-Background.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'bottom',
          padding: '60px 20px'
        }}
      >
        <h2 className="auto-style1 fw-bold">Ready to Begin Your Journey?</h2>
        <p className="auto-style2">Start your transformation today with the wisdom of ancient yoga.</p>
        <a href="/course-details" className="btn btn-lg btn-success shadow">
          Join the Course Now
        </a>
      </div>
    </div>
  );
};

export default About;
