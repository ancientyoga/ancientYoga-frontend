// src/components/SampleVideosSection.js
import React from 'react';
import SampleVideoCard from './SampleVideoCard';

const sampleVideos = [
  {
    id: 1,
    title: "Morning Yoga for Beginners",
    shortDesc: "Start your day with positivity and energy.",
    thumbnail: "https://img.youtube.com/vi/v7AYKMP6rOE/0.jpg",
  },
  {
    id: 2,
    title: "Stress Relief Yoga",
    shortDesc: "Unwind your stress with gentle poses.",
    thumbnail: "https://img.youtube.com/vi/4pKly2JojMw/0.jpg",
  },
  {
    id: 3,
    title: "Evening Relaxation Flow",
    shortDesc: "Perfect routine to calm down before bed.",
    thumbnail: "https://img.youtube.com/vi/sTANio_2E0Q/0.jpg",
  },
];

function SampleVideosSection() {
  return (
    <section className="bg-light py-5">
      <div className="container text-center">
        <h2 className="mb-4">Explore Sample Videos</h2>
        <div className="d-flex flex-wrap justify-content-center">
          {sampleVideos.map((video) => (
            <SampleVideoCard key={video.id} video={video} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default SampleVideosSection;
