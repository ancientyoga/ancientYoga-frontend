import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import slugify from 'slugify';
import './VideoDetail.css';
import { BsHeart, BsHeartFill, BsShare, BsLock } from 'react-icons/bs';
import api, { BASE_URL } from '../api'; // ✅ Import centralized BASE_URL

const VideoDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [video, setVideo] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [likesData, setLikesData] = useState({ likes: 0, dislikes: 0 });
  const [userLiked, setUserLiked] = useState(null);
  const [copied, setCopied] = useState(false);
  const [showMoreDesc, setShowMoreDesc] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [courseTitle, setCourseTitle] = useState('Untitled Course');

  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const username = user?.name || '';

  useEffect(() => {
    const fetchData = async () => {
      window.scrollTo(0, 0);

      setVideo(null);
      setRelatedVideos([]);
      setCourseTitle('Untitled Course');
      setLikesData({ likes: 0, dislikes: 0 });
      setUserLiked(null);
      setIsEnrolled(false);
      setShowMoreDesc(false);

      try {
        const res = await api.get(`/api/managevideo/${id}`);
        const videoData = res.data;
        setVideo(videoData);

        if (videoData.course_id) {
          try {
            const courseRes = await api.get(`/api/courses/${videoData.course_id}`);
            setCourseTitle(courseRes.data.title || 'Untitled Course');
          } catch {
            setCourseTitle('Untitled Course');
          }
        }

        if (user?.email && videoData.course_id) {
          const enrollRes = await api.get(`/api/courses/${videoData.course_id}/is-enrolled`, {
            params: { userEmail: user.email },
          });
          setIsEnrolled(enrollRes.data.enrolled);
        }

        const relatedRes = await api.get(`/api/managevideo/bycourse/${videoData.course_id}`);
        setRelatedVideos(relatedRes.data.filter((v) => v.id !== +id));

        const likeRes = await api.get(`/api/likes/${id}?user=${username}`);
        setLikesData({ likes: likeRes.data.likes, dislikes: likeRes.data.dislikes });
        setUserLiked(likeRes.data.userLiked);
      } catch (err) {
        console.error('❌ Error loading video details:', err);
        alert('Failed to load video');
      }
    };

    fetchData();
  }, [id, username, user?.email]);

  const handleLike = async (isDislike) => {
    if (!username) return alert('Login to react');
    const action = isDislike ? 'dislike' : 'like';
    if (userLiked === action) return;

    try {
      await api.post(`/api/likes/${id}`, {
        user_name: username,
        is_dislike: isDislike,
      });
      const res = await api.get(`/api/likes/${id}?user=${username}`);
      setLikesData({ likes: res.data.likes, dislikes: res.data.dislikes });
      setUserLiked(res.data.userLiked);
    } catch (err) {
      console.error('❌ Like failed:', err);
    }
  };

  const handleCopy = () => {
    if (!username) return alert('Login to share');
    navigator.clipboard.writeText(video.youtubelink || window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCourseRedirect = () => {
    const courseSlug = slugify(courseTitle || 'course', { lower: true });
    navigate(`/course/${courseSlug}/coursedetails`, {
      state: { courseData: video.course_id },
    });
  };

  if (!video) return <div className="text-center py-5">Loading...</div>;

  return (
    <div className="container-fluid py-4">
      <div className="row mb-4 align-items-center">
        <div className="col-md-6">
          <h2 className="fw-bold mb-2">{courseTitle}</h2>
        </div>
        <div className="col-md-6">
          <div className="input-group">
            <input type="text" className="form-control" placeholder="Search" />
            <span className="input-group-text"><i className="bi bi-search"></i></span>
          </div>
        </div>
      </div>
      <hr />

      <div className="row">
        <div className="col-lg-8 mb-4">
          <div className="mb-3">
            {video.videos?.trim() ? (
              <video width="100%" controls autoPlay>
                <source src={`${BASE_URL}/uploads/${video.videos}`} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : video.youtubelink?.trim() ? (
              <iframe
                width="100%"
                height="450"
                src={
                  video.youtubelink.includes('watch?v=')
                    ? video.youtubelink.replace('watch?v=', 'embed/')
                    : video.youtubelink
                }
                frameBorder="0"
                allowFullScreen
                title="YouTube Video"
              ></iframe>
            ) : (
              <div className="alert alert-warning">No video available</div>
            )}
          </div>

          <h4 className="fw-bold mb-3">{video.title}</h4>

          <div className="d-flex flex-wrap gap-3 align-items-center mb-3">
            <div className="d-flex align-items-center gap-2">
              <img
                src={video.teacher_profile_picture ? `${BASE_URL}/uploads/${video.teacher_profile_picture}` : '/default-user.png'}
                width="40"
                height="40"
                className="rounded-circle object-fit-cover"
                alt="Teacher"
              />
              <strong>{video.teacher_name || 'Unknown Teacher'}</strong>
            </div>
            <div className="d-flex gap-2">
              <button className="btn btn-outline-danger" onClick={() => handleLike(false)} disabled={userLiked === 'like'}>
                <BsHeart /> {likesData.likes}
              </button>
              <button className="btn btn-outline-dark" onClick={() => handleLike(true)} disabled={userLiked === 'dislike'}>
                <BsHeartFill /> {likesData.dislikes}
              </button>
              <button className="btn btn-outline-secondary" onClick={handleCopy}>
                <BsShare /> {copied ? 'Copied!' : 'Share'}
              </button>
              {isEnrolled ? (
                <button className="btn btn-outline-success" disabled>✅ Subscribed</button>
              ) : (
                <button className="btn btn-success" onClick={handleCourseRedirect}>📚 Subscribe</button>
              )}
            </div>
          </div>

          <div className="bg-light rounded p-3 mb-4">
            {showMoreDesc ? video.description : `${video.description.slice(0, 200)}...`}
            {video.description.length > 200 && (
              <span
                className="text-primary ms-2"
                role="button"
                onClick={() => setShowMoreDesc((prev) => !prev)}
              >
                {showMoreDesc ? 'See less' : 'See more'}
              </span>
            )}
          </div>
        </div>

        <div className="col-lg-4">
          <h5 className="fw-bold mb-3">📂 Related Videos</h5>
          {relatedVideos.map((v, idx) => (
            <div
              key={v.id}
              className={`card mb-3 shadow-sm ${!isEnrolled && idx > 1 ? 'locked' : ''}`}
              onClick={() => {
                if (!isEnrolled && idx > 1) return alert('Subscribe to unlock more videos');
                navigate(`/video/${v.id}`);
              }}
              style={{
                cursor: !isEnrolled && idx > 1 ? 'not-allowed' : 'pointer',
                opacity: !isEnrolled && idx > 1 ? 0.6 : 1,
                borderRadius: '10px',
                overflow: 'hidden',
              }}
            >
              <img
                src={`${BASE_URL}/uploads/${v.thumbnail}`}
                className="card-img-top"
                alt={v.title}
                style={{
                  width: '100%',
                  height: '140px',
                  objectFit: 'cover',
                }}
              />
              <div className="card-body d-flex justify-content-between align-items-center">
                <h6 className="card-title text-truncate mb-0">{v.title}</h6>
                {!isEnrolled && idx > 1 && <BsLock />}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoDetails;
