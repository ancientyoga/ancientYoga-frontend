import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import api from '../api';

const CourseDetails = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [allCourses, setAllCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const courseId = id || location.state?.courseData;

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const allRes = await api.get('/api/courses');
        setAllCourses(allRes.data);

        if (courseId) {
          const selectedRes = await api.get(`/api/courses/${courseId}`);
          setSelectedCourse(selectedRes.data);
        }
      } catch (err) {
        console.error('❌ Failed to load course data:', err);
        setError('Something went wrong while loading course data.');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [courseId]);

  // 🔥 NEW: this loads course details without changing route
  const handleViewDetails = async (course) => {
    try {
      setLoading(true);
      const selectedRes = await api.get(`/api/courses/${course.id}`);
      setSelectedCourse(selectedRes.data);
    } catch (err) {
      console.error('❌ Failed to load course data:', err);
      setError('Could not load course details.');
    } finally {
      setLoading(false);
    }
  };

  const handleBuyNow = (course) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.email) {
      if (window.confirm('You must be logged in to buy a course. Login now?')) {
        navigate('/login');
      }
      return;
    }

    navigate(`/payment/${course.id}`, { state: { user } });
  };

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container py-4">
      <br />
      <br />
      <br />
      <br />
      <br />

      {/* 🌿 Selected Course Section */}
      {selectedCourse ? (
        <div className="row mb-5">
          <div className="col-lg-6 mb-4">
            <div className="p-4 rounded shadow course-card bg-white">
              <h2 className="text-success fw-bold">{selectedCourse.title}</h2>
              <p className="text-muted fs-5">{selectedCourse.description}</p>
              <hr />
              <h4>🌿 What You’ll Learn</h4>
              <ul className="list-group list-group-flush mb-3">
                <li className="list-group-item">🧘‍♀️ Traditional Asanas & Postures</li>
                <li className="list-group-item">🫁 Pranayama (Breathing Techniques)</li>
                <li className="list-group-item">🕉️ Meditation & Mindfulness Practices</li>
                <li className="list-group-item">🍃 Yogic Diet & Lifestyle Guidance</li>
                <li className="list-group-item">📜 History & Philosophy of Ancient Yoga</li>
              </ul>
              <h5>💰 Price: <span className="text-danger fw-bold">₹{selectedCourse.price}</span></h5>
              <button className="btn btn-warning fw-bold px-4 py-2 mt-3" onClick={() => handleBuyNow(selectedCourse)}>
                Buy Full Course Now
              </button>
              <div className="alert alert-info mt-4" role="alert">
                📥 <strong>Note:</strong> Once purchased, you’ll receive lifetime access via Google Drive.
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div
              className="bg-section d-flex align-items-center justify-content-center text-black text-center rounded"
              style={{
                background: `url('/assets/hero/bg1.png') center center/cover no-repeat`,
                minHeight: '400px',
                borderRadius: '1rem',
              }}
            >
              <h2 className="display-6 fw-bold text-shadow">Ancient Wisdom, Timeless Health 🧘‍♂️</h2>
            </div>
          </div>
        </div>
      ) : (
        <div className="alert alert-info text-center">🎓 Please select a course to view details or buy.</div>
      )}

      {/* 🧘 All Courses Below */}
      <h4 className="mb-4">{selectedCourse ? '📚 Explore More Courses' : '📚 All Available Courses'}</h4>

      <div className="row">
        {allCourses
          .filter(course => course.id !== selectedCourse?.id)
          .map((course) => (
            <div key={course.id} className="col-md-6 col-lg-4 mb-4">
              <div className="p-3 shadow course-card rounded h-100 d-flex flex-column">
                <h5 className="text-primary fw-bold">{course.title}</h5>
                <p className="text-muted flex-grow-1">{course.description}</p>
                <p className="mb-2">💰 <strong>₹{course.price}</strong></p>
                <div className="d-flex justify-content-between mt-auto">
                  <button
                    className="btn btn-outline-primary me-2"
                    onClick={() => handleViewDetails(course)}
                  >
                    View Details
                  </button>
                  <button className="btn btn-success" onClick={() => handleBuyNow(course)}>
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>

      <style>{`
        .course-card {
          background: rgba(255, 255, 255, 0.95);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
          border-radius: 1rem;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .course-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
        }
        .text-shadow {
          text-shadow: 2px 2px 8px rgba(0,0,0,0.6);
        }
      `}</style>
    </div>
  );
};

export default CourseDetails;
