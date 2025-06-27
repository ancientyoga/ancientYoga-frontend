// src/components/SubscribeSection.js
import React, { useEffect, useState } from 'react';
import './SubscribeSection.css';
import api from '../api';

function SubscribeSection() {
  const [subscriberCount, setSubscriberCount] = useState(0);

  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const res = await api.get('/api/subcount');
        setSubscriberCount(res.data.count || 0);
      } catch (err) {
        console.error('❌ Failed to load subscription count:', err);
      }
    };
    fetchSubscribers();
  }, []);

  return (
    <section className="subscribe-section text-center text-white">
      <div className="container py-5">
        <h2 className="display-6 mb-3">
          Join {subscriberCount}+ Members Transforming Their Lives
        </h2>
        <p className="lead">
          Subscribe now and get full access to life-changing yoga courses.
        </p>
        <button className="btn btn-warning btn-lg mt-3">Subscribe Now</button>
      </div>
    </section>
  );
}

export default SubscribeSection;
