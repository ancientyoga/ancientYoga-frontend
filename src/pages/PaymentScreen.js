import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Razorpay from 'razorpay';
import './PaymentScreen.css';

export default function PaymentScreen() {
  const location = useLocation();
  const navigate = useNavigate();
  const { courseId, user } = location.state;
  
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/api/courses/${courseId}`)
      .then(res => res.json())
      .then(data => {
        setCourse(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        // Navigate to the failure screen if the course fetching fails.
        navigate('/payment-failure', { state: { courseId, user } });
      });
  }, [courseId, navigate]);

  const handlePayment = async () => {
    try {
      const orderResponse = await fetch(`http://localhost:5000/api/payment/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: course.price }),
      });

      if (!orderResponse.ok) {
        const errorText = await orderResponse.text();
        throw new Error(errorText || 'Failed to fetch order details');
      }

      const orderData = await orderResponse.json();
      if (orderData.error) throw new Error(orderData.error);

      const options = {
        description: `Payment for ${course.title}`,
        image: "https://your_logo_url.png",
        currency: orderData.currency,
        key: "rzp_test_SO0yWkGNPJARIG",
        amount: orderData.amount,
        order_id: orderData.id,
        name: "Ancient Yoga",
        prefill: {
          email: user.email || "no-email@example.com",
          contact: user.contact || "1234567890",
          name: user.name || "Yoga User",
        },
        theme: { color: "#5c67f2" },
      };

      const razorpay = new Razorpay(options);
      razorpay.open();

      razorpay.on('payment.success', (paymentResponse) => {
        verifyPayment(paymentResponse, orderData);
      });

      razorpay.on('payment.error', (error) => {
        console.error("Payment failed:", error);
        navigate('/payment-failure', { state: { courseId, user } });
      });

    } catch (error) {
      console.error("Payment initialization failed:", error);
      navigate('/payment-failure', { state: { courseId, user } });
    }
  };

  const verifyPayment = async (paymentResponse, orderData) => {
    try {
      const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = paymentResponse;

      const verifyResponse = await fetch(`http://localhost:5000/api/payment/verify-payment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          razorpay_payment_id,
          razorpay_order_id,
          razorpay_signature,
          userId: user.id,
          courseId: course.id,
          amount: orderData.amount / 100,
        }),
      });

      const verifyData = await verifyResponse.json();

      if (verifyData.success) {
        alert("Success", "Payment was successful!");
        navigate('/payment-success', {
          state: {
            user: user,
            course: course,
            paymentDetails: {
              paymentId: razorpay_payment_id,
              amount: orderData.amount / 100,
            },
          }
        });
      } else {
        navigate('/payment-failure', { state: { courseId, user } });
      }
    } catch (error) {
      console.error("Payment verification failed:", error);
      navigate('/payment-failure', { state: { courseId, user } });
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="payment-container">
      <h2 className="header">Course Payment Confirmation</h2>

      <div className="card">
        <p><strong>Course Title:</strong> {course.title}</p>
        <p><strong>Amount (INR):</strong> ₹{course.price}</p>
        <p><strong>Duration:</strong> 3 Months</p>
        <p><strong>Mode:</strong> Online (Live + Recorded)</p>
        <p><strong>Language:</strong> English + Kannada</p>
      </div>

      <div className="card">
        <h3>After payment, you will receive:</h3>
        <ul>
          <li>- Access to full course content (videos + notes)</li>
          <li>- Weekly live sessions with expert trainers</li>
          <li>- Certificate of completion</li>
          <li>- Exclusive access to student WhatsApp/Telegram group</li>
          <li>- Email support for 3 months</li>
        </ul>
      </div>

      <button className="pay-button" onClick={handlePayment}>Pay with Razorpay</button>
    </div>
  );
}
