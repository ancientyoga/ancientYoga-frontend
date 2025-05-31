import React from 'react';
import './ContactSection.css';
import { FaMapMarkerAlt, FaPhoneAlt, FaPaperPlane, FaGlobe } from 'react-icons/fa';

const ContactSection = () => {
  return (
    <section className="contact-section">     
                <br></br> 
             <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
      <div className="top-card">
        Get in Touch With Us
      </div>
     </div>
        <div className="contact-contentthree">
          <div className=" card contact-formone">
            <h2>Our Office</h2>
            <p><strong>Ancient Yoga Wellness Center</strong></p>
            <p>2nd Floor, Nandi Complex,</p>
            <p>MG Road, Vijayapura, Karnataka, India</p>
            <p>Pin Code: 586101</p>
            <p>Phone: +91 98765 43210</p>
            <p>Email: support@ancientyoga.com</p>
          </div>
         <div className="contact-formtwo">
            <h2>Send Us a Message</h2>
            <form>
              <input type="text" placeholder="Your Name" required />
              <input type="email" placeholder="Your Email" required />
              <input type="text" placeholder="Subject" />
              <textarea placeholder="Your Message" rows="2" required></textarea>
              <button type="submit">Send Query</button>
            </form>
          </div>
        </div>
    </section>
  );
};

export default ContactSection;
