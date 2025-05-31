// src/pages/VideoPlayerPage.js
import React from 'react';
import { useParams } from 'react-router-dom';
import './VideoPlayerPage.css';

const sampleVideoData = {
  1: {
    title: "Morning Yoga for Beginners",
    videoUrl: "https://www.youtube.com/embed/v7AYKMP6rOE",
    description: "This video helps you start your day with basic yoga techniques for flexibility and calmness. Perfect for beginners!",
  },
  2: {
    title: "Stress Relief Yoga",
    videoUrl: "https://www.youtube.com/embed/4pKly2JojMw",
    description: "Unwind your mind and body after a long day with this stress-relief yoga session.",
  },
  3: {
    title: "Evening Relaxation Flow",
    videoUrl: "https://www.youtube.com/embed/sTANio_2E0Q",
    description: "This evening yoga routine helps you relax and sleep better. Do it before bed for the best results.",
  },
};

const VideoPlayerPage = () => {
  const { id } = useParams();
  const video = sampleVideoData[id];

  if (!video) {
    return <div className="container text-center mt-5">Video not found</div>;
  }

  return (
    <div className="video-player-container container my-5">
      <h2>{video.title}</h2>
      <div className="video-wrapper mb-4">
        <iframe
          width="100%"
          height="450"
          src={video.videoUrl}
          title={video.title}
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
      <p className="lead">{video.description}</p>

      <div className="action-buttons mt-4">
        <button className="btn btn-outline-dark me-2">👍 Like</button>
        <button className="btn btn-outline-primary me-2">💬 Comment</button>
        <button className="btn btn-outline-success">🔗 Share</button>
      </div>
    </div>
  );
};

export default VideoPlayerPage;
