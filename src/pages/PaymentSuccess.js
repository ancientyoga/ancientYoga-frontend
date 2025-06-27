import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './PaymentSuccess.css';
import api from '../api'; // ✅ Uses your centralized axios instance

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState(null);
  const [courseInstructor, setCourseInstructor] = useState('Your Instructor');

  useEffect(() => {
    const data = location.state?.orderData;

    if (data && data.razorpay_order_id && data.razorpay_payment_id) {
      setOrderDetails(data);

      // Optional: Fetch admin/instructor info based on courseId
      if (data.courseId) {
        api.get(`/api/courses/${data.courseId}`)
          .then(res => {
            const instructor = res.data.admin_name || 'Your Instructor';
            setCourseInstructor(instructor);
          })
          .catch(() => setCourseInstructor('Your Instructor'));
      }

    } else {
      console.warn('No payment details found. Redirecting...');
      setTimeout(() => navigate('/'), 3000);
    }
  }, [location, navigate]);

  return (
    <div className="payment-success-container">
      <br /><br /><br />

      {/* ✅ Confirmation Section */}
      <div className="payment-success-card">
        <h1>✅ Thank You for Your Purchase!</h1>
        <p>Your payment was successful. The course access link has been sent to your email.</p>
        <button onClick={() => navigate('/')} className="payment-success-button">
          Back to Home
        </button>
      </div>

      {/* ✅ Order Summary */}
      {orderDetails && (
        <div className="order-summary-card">
          <h3>🧾 Order Summary</h3>
          <p><strong>📚 Course:</strong> {orderDetails.courseTitle || 'N/A'}</p>
          <p><strong>🧾 Order ID:</strong> {orderDetails.razorpay_order_id}</p>
          <p><strong>💳 Payment ID:</strong> {orderDetails.razorpay_payment_id}</p>
          <p><strong>💰 Amount Paid:</strong> ₹{(orderDetails.amount / 100).toFixed(2)}</p>
          <p><strong>📧 Email:</strong> {orderDetails.email || 'Not provided'}</p>
        </div>
      )}

      {/* ✅ Yoga Philosophy Section */}
      <div className="payment-info-section">
        <h2>Transform Your Life with Ancient Yoga Techniques</h2>
        <p>
          At <strong>Ancient Yoga</strong>, we go beyond conventional fitness to offer a path that balances your body,
          mind, and soul. Our online course is designed for people from all walks of life—especially those dealing
          with challenges like obesity, fatigue, or anxiety.
        </p>
        <p>
          Rooted in timeless wisdom from the <em>Yoga Sutras</em> and <em>Hatha Yoga Pradipika</em>, this course is more than
          just physical exercise. It’s a journey of healing, strength, and renewal.
        </p>
        <ul>
          <li>🧘 Asanas (yoga postures) to enhance flexibility and stamina</li>
          <li>🫁 Pranayama (breathing techniques) to restore calm and focus</li>
          <li>🕉️ Meditation sessions to center your mind and reduce stress</li>
          <li>🍃 Dietary and lifestyle suggestions based on ancient Ayurvedic wisdom</li>
        </ul>
        <p>
          The best part? <strong>Lifetime access via Google Drive</strong>. No recurring fees, no hidden charges—just pure wellness,
          anytime, anywhere.
        </p>
        <p>
          Thousands of students from the UK, USA, and across the globe have found clarity, vitality, and joy through this
          course. Join us, and let your transformation begin today.
        </p>

        <p className="payment-signature">
          With love and light,<br />
          <strong>{courseInstructor}</strong><br />
          Founder & Instructor, Ancient Yoga
        </p>
      </div>
    </div>
  );
};

export default PaymentSuccess;
