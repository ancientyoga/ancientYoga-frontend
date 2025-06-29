import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import './PaymentScreen.css';
import api from '../api'; // ✅ Import centralized axios instance

export default function PaymentScreen() {
  const { id: courseId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = location.state || {};

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    if (!courseId || !user) {
      navigate('/courses');
      return;
    }

    api.get(`/api/courses/${courseId}`)
      .then(res => {
        setCourse(res.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        navigate('/payment-failure', { state: { courseId, user } });
      });
  }, [courseId, user, navigate]);

  const handlePayment = async () => {
    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      alert('Razorpay SDK failed to load');
      return;
    }

    try {
      const orderRes = await api.post('/api/payment/create-order', {
        amount: course.price,
      });

      const orderData = orderRes.data;

      const options = {
        key: 'rzp_test_SO0yWkGNPJARIG', // Replace with your live key in production
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Ancient Yoga',
        description: `Payment for ${course.title}`,
        order_id: orderData.id,
        prefill: {
          name: user.name || 'Yoga User',
          email: user.email || 'no-email@example.com',
          contact: user.contact || '9999999999',
        },
        handler: async (paymentResponse) => {
          try {
            const verifyRes = await api.post('/api/payment/verify-payment', {
              razorpay_payment_id: paymentResponse.razorpay_payment_id,
              razorpay_order_id: paymentResponse.razorpay_order_id,
              razorpay_signature: paymentResponse.razorpay_signature,
              userId: user.id,
              courseId: course.id,
              amount: orderData.amount / 100,
            });

            if (verifyRes.data.success) {
              alert('✅ Payment Successful!');
              navigate('/payment-success', {
                state: {
                  orderData: {
                    razorpay_order_id: paymentResponse.razorpay_order_id,
                    razorpay_payment_id: paymentResponse.razorpay_payment_id,
                    amount: orderData.amount,
                    courseId: course.id,
                    courseTitle: course.title,
                    email: user.email,
                  },
                },
              });
            } else {
              navigate('/payment-failure', { state: { courseId, user } });
            }
          } catch (error) {
            console.error('❌ Verification failed:', error);
            navigate('/payment-failure', { state: { courseId, user } });
          }
        },
        modal: {
          ondismiss: () => navigate('/payment-failure', { state: { courseId, user } }),
        },
        theme: { color: '#5c67f2' },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      console.error('Payment error:', err);
      navigate('/payment-failure', { state: { courseId, user } });
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="payment-container">
      <br/>
      <br/>
      <h1 className="header">Course Payment Confirmation</h1>

      <div className="card">
        <p><strong>Course Title:</strong> {course.title}</p>
        <p><strong>Amount:</strong> ₹{course.price}</p>
        <p><strong>Duration:</strong> 3 Months</p>
        <p><strong>Mode:</strong> Online (Live + Recorded)</p>
        <p><strong>Language:</strong> English + Kannada</p>
      </div>

      <div className="card mt-4">
        <h4>After Payment You Will Get:</h4>
        <ul>
          <li>✅ Full course access (Videos + Notes)</li>
          <li>✅ Weekly live sessions</li>
          <li>✅ WhatsApp/Telegram group access</li>
          <li>✅ Certificate of Completion</li>
          <li>✅ 3 Months of Email Support</li>
        </ul>
      </div>

      <button className="pay-button mt-4" onClick={handlePayment}>
        Pay with Razorpay
      </button>
    </div>
  );
}
