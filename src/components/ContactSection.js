import React, { useEffect, useState } from 'react';
import './ContactSection.css';
import {  FaPhoneAlt, FaPaperPlane } from 'react-icons/fa';
import api from '../api';

const ContactSection = () => {
  const [contactInfo, setContactInfo] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  // 🔹 Fetch contact info on mount
  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const res = await api.get('/api/contact/info');
        setContactInfo(res.data);
      } catch (err) {
        console.error('❌ Failed to load contact info:', err);
      }
    };
    fetchContactInfo();
  }, []);

  // 🔹 Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // 🔹 Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/contact/message', formData);
      alert('✅ Message sent successfully!');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (err) {
      console.error('❌ Error sending message:', err);
      alert('❌ Failed to send message. Please try again later.');
    }
  };

  return (
    <section className="contact-section">
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
        <div className="top-card">📩 Get in Touch With Us</div>
      </div>

      <div className="contact-contentthree">
        {/* 🔹 Left Card - Contact Info */}
        <div className="card contact-formone">
          <h2>📍 Our Office</h2>
          <p><strong>{contactInfo.name || 'Ancient Yoga Wellness Center'}</strong></p>
          {contactInfo.address_line1 && <p>{contactInfo.address_line1}</p>}
          {contactInfo.address_line2 && <p>{contactInfo.address_line2}</p>}
          {contactInfo.city && <p>{contactInfo.city}, {contactInfo.state}</p>}
          {contactInfo.country && <p>{contactInfo.country}</p>}
          {contactInfo.pincode && <p>Pin Code: {contactInfo.pincode}</p>}
          <p><FaPhoneAlt /> Phone: {contactInfo.phone || '+91 98765 43210'}</p>
          <p><FaPaperPlane /> Email: {contactInfo.email || 'support@ancientyoga.com'}</p>
        </div>

        {/* 🔹 Right Card - Contact Form */}
        <div className="contact-formtwo">
          <h2>✉️ Send Us a Message</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              value={formData.name}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
            />
            <textarea
              name="message"
              placeholder="Your Message"
              rows="3"
              required
              value={formData.message}
              onChange={handleChange}
            />
            <button type="submit">Send Query</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
