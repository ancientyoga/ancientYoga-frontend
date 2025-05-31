import React from 'react';
import './SampleVideoCard.css';

const SampleVideoCard = ({ video }) => {
  if (!video) return null;

  const { thumbnail, title, description, videoUrl } = video;

  return (
    <a
      className="sample-video-card"
      href={videoUrl}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="video-thumb-container">
        <img src={thumbnail} alt={title} className="video-thumb" />
      </div>
      <div className="video-info">
        <h5>{title}</h5>
        <p>{description}</p>
        <span className="see-more-btn">See More</span>
      </div>
    </a>
  );
};

export default SampleVideoCard;
