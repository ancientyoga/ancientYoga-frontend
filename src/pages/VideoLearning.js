import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './VideoLearning.css';
import api from '../api'; // ✅ imported custom axios instance
import coursebg from '../assets/coursebg.png'; // Hero background image

function VideoLearning() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const [videos, setVideos] = useState([]);
  const [enrolledMap, setEnrolledMap] = useState({});
  const [courseTitles, setCourseTitles] = useState({});

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await api.get('/api/managevideo');
        setVideos(res.data);

        const courseIds = [...new Set(res.data.map(v => v.course_id).filter(Boolean))];

        const titleMap = {};
        await Promise.all(courseIds.map(async (id) => {
          try {
            const { data } = await api.get(`/api/courses/${id}`);
            titleMap[id] = data.title;
          } catch (err) {
            console.error(`❌ Error fetching course ${id}`, err);
          }
        }));
        setCourseTitles(titleMap);

        if (user?.email) {
          const enrollmentStatus = {};
          await Promise.all(courseIds.map(async (courseId) => {
            try {
              const { data } = await api.get(`/api/courses/${courseId}/is-enrolled`, {
                params: { userEmail: user.email },
              });
              enrollmentStatus[courseId] = data.enrolled;
            } catch (err) {
              console.error(`Enrollment check failed for course ${courseId}:`, err);
            }
          }));
          setEnrolledMap(enrollmentStatus);
        }

      } catch (error) {
        console.error('❌ Error fetching videos:', error);
      }
    };

    fetchVideos();
  }, [user?.email]);

  const groupedVideos = videos.reduce((acc, video) => {
    const courseId = video.course_id || 'uncategorized';
    if (!acc[courseId]) acc[courseId] = [];
    acc[courseId].push(video);
    return acc;
  }, {});

  if (!videos.length) return <div className="text-center py-5">Loading videos...</div>;

  return (
    <>
      {/* Hero Section */}
      <br />
      <br />
      <br />
      <div
        className="video-hero text-white text-center p-5 mb-5"
        style={{
          background: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${coursebg}) center center/cover no-repeat`,
          height: "200px"
        }}
      ></div>

      <div className="container py-5">
        {Object.entries(groupedVideos).map(([courseId, courseVideos], idx) => {
          const title = courseTitles[courseId] || 'Uncategorized';
          const isEnrolled = enrolledMap[courseId] || false;

          return (
            <div key={courseId || idx} className="mb-5">
              <h2 className="fw-bold text-dark border-bottom pb-2">{title}</h2>
              <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                {courseVideos.map((video, index) => {
                  const isUnlocked = isEnrolled || index < 2;

                  return (
                    <div key={video.id} className="col">
                      <div className="video-card h-100 shadow-sm rounded overflow-hidden">
                        <div className="position-relative">
                          <img
                            src={video.thumbnail ? `http://localhost:5000/uploads/${video.thumbnail}` : '/default-thumbnail.jpg'}
                            alt={video.title}
                            className="w-100"
                            style={{ objectFit: 'cover', height: '200px' }}
                          />
                          {isUnlocked ? (
                            <div
                              onClick={() => navigate(`/video/${video.id}`)}
                              className="position-absolute top-50 start-50 translate-middle"
                              style={{ cursor: 'pointer' }}
                            >
                              <i className="bi bi-play-circle-fill text-white fs-2"></i>
                            </div>
                          ) : (
                            <div
                              className="locked-overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
                              style={{
                                backgroundColor: 'rgba(0,0,0,0.5)',
                                color: '#fff',
                                fontSize: '2rem',
                                cursor: 'pointer'
                              }}
                              onClick={() => navigate('/purchase')}
                            >
                              <i className="bi bi-lock-fill"></i>
                            </div>
                          )}
                        </div>
                        <div className="p-3 d-flex flex-column">
                          <h5 className="fw-semibold text-dark mb-2">{video.title}</h5>
                          <p className="text-muted mb-3 flex-grow-1">
                            {video.description?.slice(0, 80)}...
                          </p>
                          {user?.email ? (
                            isUnlocked ? (
                              <button className="btn btn-info fw-semibold" onClick={() => navigate(`/video/${video.id}`)}>
                                🎓 Learn More
                              </button>
                            ) : (
                              <button className="btn btn-outline-secondary fw-semibold" onClick={() => navigate('/purchase')}>
                                🔒 Subscribe to unlock
                              </button>
                            )
                          ) : (
                            <p className="text-muted text-center mt-2">🔒 Login to explore content</p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <hr className="mt-5 border-dark" />
            </div>
          );
        })}
      </div>
    </>
  );
}

export default VideoLearning;
