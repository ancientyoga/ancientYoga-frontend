import React, { useState } from 'react';
import axios from 'axios';
import './AdminDashboard.css';

function UploadSampleVideo() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);

  const handleUpload = async () => {
    if (!videoFile || !title) {
      alert('Title and video file are required');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('video', videoFile);
    formData.append('thumbnail', thumbnail);

    try {
      await axios.post('http://localhost:5000/api/videos/sample', formData);
      alert('Sample video uploaded successfully');
      setTitle('');
      setDescription('');
      setVideoFile(null);
      setThumbnail(null);
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed.');
    }
  };

  return (
    <div className="container mt-4">
      <div className="card p-4 shadow">
        <h4>Upload Sample Video</h4>
        <input type="text" className="form-control my-2" placeholder="Video Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea className="form-control my-2" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <label className="form-label">Select Video File</label>
        <input type="file" className="form-control mb-2" onChange={(e) => setVideoFile(e.target.files[0])} />
        <label className="form-label">Select Thumbnail Image</label>
        <input type="file" className="form-control mb-3" onChange={(e) => setThumbnail(e.target.files[0])} />
        <button className="btn btn-primary" onClick={handleUpload}>Upload</button>
      </div>
    </div>
  );
}

export default UploadSampleVideo;
