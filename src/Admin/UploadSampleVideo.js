import React, { useState, useEffect } from 'react';
import axios from 'axios';
import api from '../api'; // Assuming this contains BASE_URL

function UploadSampleVideo() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [isSample, setIsSample] = useState(true);
  const [isFullCourse, setIsFullCourse] = useState(false);
  const [youtubeLink, setYoutubeLink] = useState('');
  const [loading, setLoading] = useState(false);
  const [videos, setVideos] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const BASE_URL = api.BASE_URL || 'http://localhost:5000';

  const fetchVideos = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/videos`);
      setVideos(res.data);
    } catch (err) {
      console.error('❌ Error fetching videos:', err);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const handleUpload = async () => {
    if (!videoFile && !editingId) {
      alert('Video file is required for new uploads');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    if (videoFile) formData.append('videoFile', videoFile);
    if (thumbnail) formData.append('thumbnail', thumbnail);
    formData.append('is_sample', isSample);
    formData.append('is_fullcourse', isFullCourse);
    formData.append('youtube_link', youtubeLink);

    try {
      setLoading(true);
      if (editingId) {
        await axios.put(`${BASE_URL}/api/videos/${editingId}`, formData);
        alert('✅ Video updated successfully!');
      } else {
        await axios.post(`${BASE_URL}/api/videos`, formData);
        alert('✅ Video uploaded successfully!');
      }
      resetForm();
      fetchVideos();
    } catch (error) {
      console.error('❌ Upload error:', error.response?.data || error.message);
      alert('❌ Upload failed. Check server logs.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setVideoFile(null);
    setThumbnail(null);
    setIsSample(true);
    setIsFullCourse(false);
    setYoutubeLink('');
    setEditingId(null);
  };

  const handleEdit = (video) => {
    setTitle(video.title);
    setDescription(video.description);
    setYoutubeLink(video.youtube_link || '');
    setIsSample(video.is_sample);
    setIsFullCourse(video.is_fullcourse);
    setEditingId(video.id);
    setThumbnail(null);
    setVideoFile(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure to delete this video?')) {
      try {
        await axios.delete(`${BASE_URL}/api/videos/${id}`);
        fetchVideos();
      } catch (err) {
        console.error('❌ Delete error:', err);
      }
    }
  };

  return (
    <div className="container py-5">
      <br/>
      <br/>
      <div className="card shadow p-4 mx-auto mb-5" style={{ maxWidth: '600px' }}>
        <h4 className="mb-4 text-center">🎥 {editingId ? 'Edit Video' : 'Upload Course Video'}</h4>

        <input
          type="text"
          className="form-control mb-3"
          placeholder="Video Title *"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="form-control mb-3"
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="text"
          className="form-control mb-3"
          placeholder="YouTube Link (optional)"
          value={youtubeLink}
          onChange={(e) => setYoutubeLink(e.target.value)}
        />

        <label className="form-label">📁 Video File {editingId ? '(optional)' : '*'}</label>
        <input
          type="file"
          className="form-control mb-3"
          accept="video/*"
          onChange={(e) => setVideoFile(e.target.files[0])}
        />

        <label className="form-label">🖼️ Thumbnail Image (optional)</label>
        <input
          type="file"
          className="form-control mb-3"
          accept="image/*"
          onChange={(e) => setThumbnail(e.target.files[0])}
        />

        {thumbnail && (
          <div className="mb-3 text-center">
            <img
              src={URL.createObjectURL(thumbnail)}
              alt="Thumbnail Preview"
              style={{ maxHeight: '150px', borderRadius: '8px' }}
            />
          </div>
        )}

        <div className="form-check form-switch mb-2">
          <input
            className="form-check-input"
            type="checkbox"
            checked={isSample}
            onChange={(e) => setIsSample(e.target.checked)}
            id="sampleCheck"
          />
          <label className="form-check-label" htmlFor="sampleCheck">
            Mark as Sample Video
          </label>
        </div>

        <div className="form-check form-switch mb-4">
          <input
            className="form-check-input"
            type="checkbox"
            checked={isFullCourse}
            onChange={(e) => setIsFullCourse(e.target.checked)}
            id="fullCourseCheck"
          />
          <label className="form-check-label" htmlFor="fullCourseCheck">
            Mark as Full Course Video
          </label>
        </div>

        <button
          className="btn btn-primary w-100"
          onClick={handleUpload}
          disabled={loading}
        >
          {loading ? 'Uploading...' : editingId ? 'Update Video' : 'Upload Video'}
        </button>
      </div>

      <div className="row row-cols-1 row-cols-md-3 g-4">
        {videos.map(video => (
          <div className="col" key={video.id}>
            <div className="card h-100">
              {video.thumbnail && (
                <img
                  src={`${BASE_URL}/uploads/videos/${video.thumbnail}`}
                  className="card-img-top"
                  alt="Thumbnail"
                />
              )}
              <div className="card-body">
                <h5 className="card-title">{video.title}</h5>
                <p className="card-text">{video.description}</p>
                {video.youtube_link && (
                  <p className="text-primary">🎬 <a href={video.youtube_link} target="_blank" rel="noreferrer">YouTube</a></p>
                )}
                <p className="mb-0"><strong>Sample:</strong> {video.is_sample ? 'Yes' : 'No'}</p>
                <p><strong>Full Course:</strong> {video.is_fullcourse ? 'Yes' : 'No'}</p>
                <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(video)}>Edit</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(video.id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UploadSampleVideo;
