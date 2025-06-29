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
    <section className="subscribe-sec-wrapper">
      <h2 className="subscribe-sec-heading">
        Join {subscriberCount}+ Members Transforming Their Lives
      </h2>
      <p className="subscribe-sec-text">
        Subscribe now and get full access to life-changing yoga courses. 
        Unlock your best self with our guided practices and community support.
      </p>
      <button className="subscribe-sec-btn">Subscribe Now</button>
    </section>
  );
}

export default SubscribeSection;
