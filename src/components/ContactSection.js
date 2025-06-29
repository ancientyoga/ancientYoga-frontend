import React, { useState } from 'react';
import './ContactSection.css';
import { FaPaperPlane } from 'react-icons/fa';
import api from '../api';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

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
        <div className="contact-formtwo">
          <h2><FaPaperPlane style={{ marginRight: '3px' }} /> Send Us a Message</h2>
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
              rows="4"
              required
              value={formData.message}
              onChange={handleChange}
            />
            <button type="submit">
              <FaPaperPlane style={{ marginRight: '3px' }} />
              Send Query
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
