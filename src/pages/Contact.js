import React, { useEffect, useState } from "react";
import api from "../api"; // ✅ Using custom Axios instance
import contactbg from "../assets/contactbg.png";
import contactInfoBg from "../assets/contactbg1.png";

const ContactPage = () => {
  const [contactInfo, setContactInfo] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const res = await api.get("/api/contact/info");
        setContactInfo(res.data);
      } catch (err) {
        console.error("❌ Failed to load contact info:", err);
      }
    };
    fetchContactInfo();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/contact/message", formData);
      alert("✅ Message sent successfully!");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error("❌ Error sending message:", err);
      alert("❌ Failed to send message. Please try again later.");
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <div
        className="contact-hero text-white text-center p-5"
        style={{
          background: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${contactbg}) center center/cover no-repeat`,
          height: "400px"
        }}
      />

      {/* Contact Form & Info */}
      <div className="container my-5">
        <div className="row g-4">
          {/* Contact Form */}
          <div className="col-lg-6">
            <div className="contact-card p-4 rounded shadow-sm bg-white">
              <h3 className="mb-4">Get In Touch</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Your Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    placeholder="Enter your full name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="your@example.com"
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="subject" className="form-label">Subject</label>
                  <input
                    type="text"
                    className="form-control"
                    id="subject"
                    name="subject"
                    placeholder="Query about course / feedback"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="message" className="form-label">Your Message</label>
                  <textarea
                    className="form-control"
                    id="message"
                    name="message"
                    rows="5"
                    placeholder="Write your message here..."
                    required
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Send Message
                </button>
              </form>
            </div>
          </div>

          {/* Contact Info */}
          <div className="col-lg-6">
            <div
              className="contact-card p-4 rounded shadow-sm text-white"
              style={{
                background: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${contactInfoBg}) center center/cover no-repeat`,
                height: "600px"
              }}
            >
              <h3 className="mb-4">Contact Information</h3>
              <p>
                <i className="bi bi-geo-alt info-icon"></i>
                <strong>Address:</strong>{" "}
                {contactInfo.address_line1 || "Nandi Yoga Studio"},{" "}
                {contactInfo.city || "Vijayapura"},{" "}
                {contactInfo.state || "Karnataka"},{" "}
                {contactInfo.country || "India"} -{" "}
                {contactInfo.pincode || "586101"}
              </p>
              <p>
                <i className="bi bi-envelope info-icon"></i>
                <strong>Email:</strong>{" "}
                {contactInfo.email || "support@ancientyoga.com"}
              </p>
              <p>
                <i className="bi bi-telephone info-icon"></i>
                <strong>Phone:</strong>{" "}
                {contactInfo.phone || "+91 98765 43210"}
              </p>

              {/* Spacer for vertical alignment */}
              <div style={{ height: "120px" }} />

              <h5 className="mt-4">Follow Us</h5>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-light btn-sm me-2"
              >
                <i className="bi bi-facebook me-1"></i>Facebook
              </a>
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-light btn-sm me-2"
              >
                <i className="bi bi-youtube me-1"></i>YouTube
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-light btn-sm"
              >
                <i className="bi bi-instagram me-1"></i>Instagram
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Google Map */}
      <div className="container-fluid px-0">
        <iframe
          className="w-100 border-0"
          style={{ height: "450px" }}
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15543.271303341392!2d75.7138882!3d16.8319997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc65507b236b69f%3A0xf1a8a83d7886fa2!2sVijayapura%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1716042488550"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Vijayapura Map"
        ></iframe>
      </div>
    </div>
  );
};

export default ContactPage;
