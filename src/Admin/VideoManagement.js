import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminDashboard.css';

const VideoManagement = () => {
  const [videos, setVideos] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'sample',
    thumbnail: '',
    videoUrl: ''
  });

  // Function to fetch videos
  const fetchVideos = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/videos');
      setVideos(res.data);
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  // Handle form input changes
  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission for new video
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/videos', formData);
      fetchVideos(); // Fetch updated list of videos
      setFormData({ title: '', description: '', type: 'sample', thumbnail: '', videoUrl: '' });
    } catch (error) {
      console.error('Error adding video:', error);
    }
  };

  // Handle video deletion
  const handleDelete = async id => {
    try {
      await axios.delete(`http://localhost:5000/api/videos/${id}`);
      fetchVideos(); // Fetch updated list of videos
    } catch (error) {
      console.error('Error deleting video:', error);
    }
  };

  return (
    <div className="p-4">
      <h3>Video Management</h3>
      
      {/* Video Upload Form */}
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="form-control mb-2"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="form-control mb-2"
        />
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="form-control mb-2"
        >
          <option value="sample">Sample Video</option>
          <option value="full">Full Course</option>
        </select>
        <input
          name="thumbnail"
          placeholder="Thumbnail URL"
          value={formData.thumbnail}
          onChange={handleChange}
          className="form-control mb-2"
        />
        <input
          name="videoUrl"
          placeholder="Video URL"
          value={formData.videoUrl}
          onChange={handleChange}
          className="form-control mb-2"
        />
        <button type="submit" className="btn btn-primary">Upload</button>
      </form>

      {/* Display Videos */}
      <div className="row">
        {videos.length > 0 ? (
          videos.map(video => (
            <div className="col-md-4 mb-3" key={video.id}>
              <div className="card">
                <img
                  src={video.thumbnail}
                  className="card-img-top"
                  alt={video.title}
                />
                <div className="card-body">
                  <h5 className="card-title">{video.title}</h5>
                  <p>{video.description}</p>
                  <p className="text-muted">Type: {video.type}</p>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(video.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No videos found.</p>
        )}
      </div>
    </div>
  );
};

export default VideoManagement;
