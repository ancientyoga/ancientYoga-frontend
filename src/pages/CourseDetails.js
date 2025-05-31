import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const CourseDetails = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Fetch courses from backend
  const fetchCourses = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/courses`);
      setCourses(response.data);
    } catch (error) {
      console.error('Failed to fetch courses:', error);
      setError('Something went wrong while loading courses.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // Handle Buy Now click
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

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary"></div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      {error && <div className="alert alert-danger">{error}</div>}

      {courses.length === 0 ? (
        <p>No courses available.</p>
      ) : (
        courses.map((course) => (
          <div key={course.id} className="card mb-4 shadow-sm">
            <div className="card-body">
              <h3 className="card-title text-success">{course.title}</h3>
              <p className="card-text text-muted">{course.description}</p>

              <h5>🌿 What You’ll Learn</h5>
              <ul className="mb-3">
                <li>🧘‍♀️ Traditional Asanas & Postures</li>
                <li>🫁 Pranayama (Breathing Techniques)</li>
                <li>🕉️ Meditation & Mindfulness Practices</li>
                <li>🍃 Yogic Diet & Lifestyle Guidance</li>
                <li>📜 History & Philosophy of Ancient Yoga</li>
              </ul>

              {/* Optional course-specific topics */}
              {course.topics && course.topics.length > 0 && (
                <ul className="mb-3">
                  {course.topics.map((topic, index) => (
                    <li key={index}>{topic}</li>
                  ))}
                </ul>
              )}

              <p className="fw-bold">
                💰 Price: <span className="text-danger">₹{course.price}</span>
              </p>

              <button className="btn btn-warning fw-bold" onClick={() => handleBuyNow(course)}>
                Buy Full Course Now
              </button>

              <div className="alert alert-info mt-3">
                📥 Note: Once you complete the purchase, you’ll receive lifetime access via Google Drive.
              </div>
            </div>

            <div className="bg-light text-center py-4 rounded-bottom">
              <h5>Ancient Wisdom, Timeless Health 🧘‍♂️</h5>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default CourseDetails;
