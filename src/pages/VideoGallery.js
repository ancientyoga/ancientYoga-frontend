import React from 'react';
import './VideoGallery.css';

// Dummy data for video gallery (replace this with actual data from your backend or API)
const videos = [
  {
    id: 1,
    thumbnailUrl: 'path/to/thumbnail1.jpg',
    title: 'Yoga for Beginners',
    description: 'A beginner-friendly yoga session.',
  },
  {
    id: 2,
    thumbnailUrl: 'path/to/thumbnail2.jpg',
    title: 'Advanced Yoga Techniques',
    description: 'Deep dive into advanced yoga techniques.',
  },
  // Add more video objects here
];

const VideoGallery = () => {
  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center fw-bold">Yoga Video Gallery</h2>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
        {videos.map((video) => (
          <div key={video.id} className="col">
            <a href={`/PlayVideo?id=${video.id}`} style={{ textDecoration: 'none' }}>
              <div className="card video-card h-100">
                <img
                  className="card-img-top"
                  src={video.thumbnailUrl}
                  alt="Thumbnail"
                />
                <div className="card-body">
                  <h5 className="card-title">{video.title}</h5>
                  <p className="card-text">{video.description}</p>
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoGallery;
