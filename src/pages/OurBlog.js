import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import api from '../api'; // ✅ import shared Axios instance

function OurBlog() {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    api.get('/api/videos') // ✅ use api instead of axios
      .then(res => setVideos(res.data))
      .catch(err => console.error('❌ Error fetching videos:', err));
  }, []);

  const handleShow = (video) => {
    setSelectedVideo(video);
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    setSelectedVideo(null);
  };

  return (
    <div className="container mt-5">
      <br />
      <br />
      <h2 className="text-center mb-4">🎥 Our Video Blog</h2>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {videos.map(video => (
          <div className="col" key={video.id}>
            <div className="card h-100 shadow-sm">
              <img
                src={
                  video.thumbnail
                    ? `${api.defaults.baseURL}/uploads/videos/${video.thumbnail}`
                    : 'https://via.placeholder.com/300x180.png?text=No+Thumbnail'
                }
                className="card-img-top"
                alt={video.title}
                style={{ cursor: 'pointer' }}
                onClick={() => handleShow(video)}
              />
              <div className="card-body">
                <h5 className="card-title">{video.title}</h5>
                {video.description && (
                  <p className="card-text">{video.description}</p>
                )}
                {video.is_sample && <span className="badge bg-info me-2">Sample</span>}
                {video.is_fullcourse && <span className="badge bg-success">Full Course</span>}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Popup */}
      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{selectedVideo?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedVideo?.youtube_link ? (
            <div className="ratio ratio-16x9">
              <iframe
                src={selectedVideo.youtube_link}
                title="YouTube Video"
                allowFullScreen
              ></iframe>
            </div>
          ) : (
            <video
              controls
              width="100%"
              src={`${api.defaults.baseURL}/uploads/videos/${selectedVideo?.videofile}`}
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          {selectedVideo?.youtube_link && (
            <a
              href={selectedVideo.youtube_link}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline-primary"
            >
              Open on YouTube
            </a>
          )}
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default OurBlog;
