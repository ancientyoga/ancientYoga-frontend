import React from "react";

const ContactPage = () => {
  return (
    <div>
      {/* Hero Section */}
      <div
        className="contact-hero text-white text-center p-5"
        style={{
          background:
            "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('images/yoga/bg.jpg') center center/cover no-repeat",
        }}
      >
        <h1 className="display-4">Contact Us</h1>
        <p className="lead">
          We'd love to hear from you! Reach out for any questions, support, or
          collaboration opportunities.
        </p>
      </div>

      {/* Contact Form & Info */}
      <div className="container my-5">
        <div className="row g-4">
          {/* Contact Form */}
          <div className="col-lg-6">
            <div className="contact-card p-4 rounded shadow-sm bg-white">
              <h3 className="mb-4">Get In Touch</h3>
              <form>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Your Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="your@example.com"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="subject" className="form-label">
                    Subject
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="subject"
                    placeholder="Query about course / feedback"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="message" className="form-label">
                    Your Message
                  </label>
                  <textarea
                    className="form-control"
                    id="message"
                    rows="5"
                    placeholder="Write your message here..."
                    required
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
            <div className="contact-card p-4 rounded shadow-sm bg-white">
              <h3 className="mb-4">Contact Information</h3>
              <p>
                <i className="bi bi-geo-alt info-icon"></i>
                <strong>Address:</strong> Nandi Yoga Studio, Vijayapura, Karnataka
              </p>
              <p>
                <i className="bi bi-envelope info-icon"></i>
                <strong>Email:</strong> support@ancientyoga.com
              </p>
              <p>
                <i className="bi bi-telephone info-icon"></i>
                <strong>Phone:</strong> +91 98765 43210
              </p>
              <hr />
              <h5>Follow Us</h5>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-primary btn-sm me-2"
              >
                <i className="bi bi-facebook me-1"></i>Facebook
              </a>
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-danger btn-sm me-2"
              >
                <i className="bi bi-youtube me-1"></i>YouTube
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-info btn-sm"
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
