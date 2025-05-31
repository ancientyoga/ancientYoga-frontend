// src/components/SubscribeSection.js
import React from 'react';
import './SubscribeSection.css';

function SubscribeSection({ isLoggedIn, hasPurchased, subscriberCount, onSubscribeClick }) {
  return (
    <section className="subscribe-section text-center text-white">
      <div className="container py-5">
        <h2 className="display-6 mb-3">Join {subscriberCount}+ Members Transforming Their Lives</h2>
        <p className="lead">Subscribe now and get full access to life-changing yoga courses.</p>
        
        {hasPurchased ? (
          <button className="btn btn-success btn-lg mt-3" disabled>
            Subscribed ✔
          </button>
        ) : (
          <button
            className="btn btn-warning btn-lg mt-3"
            onClick={onSubscribeClick}
          >
            {isLoggedIn ? "Subscribe Now" : "Login to Subscribe"}
          </button>
        )}
      </div>
    </section>
  );
}

export default SubscribeSection;
