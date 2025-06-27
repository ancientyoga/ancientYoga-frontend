// 📁 frontend/src/components/PricingSection.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import 'bootstrap/dist/css/bootstrap.min.css';

const PricingSection = () => {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    api.get('/api/pricing')
      .then(res => setPlans(res.data))
      .catch(err => console.error('❌ Failed to load pricing plans:', err));
  }, []);

  return (
    <section className="pricing-section bg-light py-5">
      <div className="container text-center">
        <h2 className="mb-4 display-5 fw-bold text-dark">Simple, Transparent Pricing</h2>
        <p className="text-muted mb-5 fs-5">
          Get lifetime access to all yoga courses instantly via Google Drive – no monthly fees, no hidden charges.
        </p>

        <div className="row justify-content-center g-4">
            <div className="col-md-5">
            <div className="pricing-card border rounded-4 shadow-sm p-4 h-100 bg-white">
              <h3 className="fw-bold text-secondary">Free Plan</h3>
              <p className="text-muted">Try before you buy. Access sample yoga videos to experience our style.</p>
              <h4 className="text-primary fw-bold mb-3">₹0</h4>
              <Link to="/register" className="btn btn-outline-primary rounded-pill px-4">
                Try for Free
              </Link>
            </div>
          </div>
          {plans.map(plan => (
            <div key={plan.id} className="col-md-5 col-sm-10">
              <div className={`pricing-card border rounded-4 p-4 h-100 bg-white position-relative ${plan.badge === 'Best Value' ? 'border-success shadow' : 'shadow-sm'}`}>
                {plan.badge && (
                  <div className="badge bg-success position-absolute top-0 end-0 m-3 px-3 py-1 rounded-pill text-white">
                    {plan.badge}
                  </div>
                )}
                <h3 className="fw-bold text-dark">{plan.name}</h3>
                <p className="text-muted">{plan.description}</p>
                <h4 className={`fw-bold mb-3 ${plan.badge === 'Best Value' ? 'text-success' : 'text-primary'}`}>
                  ₹{plan.price} <small className="fw-normal text-muted">/ One-Time</small>
                </h4>
                <Link to={plan.route} className={`btn rounded-pill px-4 py-2 ${plan.badge === 'Best Value' ? 'btn-success' : 'btn-outline-primary'}`}>
                  {plan.name === 'Free Plan' ? 'Try for Free' : 'Get Lifetime Access'}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .pricing-section {
          background: linear-gradient(to right, #f5f7fa, #e4ecf3);
        }
        .pricing-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          border-width: 2px;
        }
        .pricing-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 30px rgba(0, 0, 0, 0.08);
        }
        @media (max-width: 768px) {
          .pricing-card h3 { font-size: 1.4rem; }
          .pricing-card h4 { font-size: 1.5rem; }
          .btn { width: 100%; font-size: 1rem; }
        }
      `}</style>
    </section>
  );
};

export default PricingSection;
