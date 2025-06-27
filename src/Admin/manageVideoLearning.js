import React, { useEffect, useState, useRef } from 'react';
import api, { BASE_URL } from '../api'; // 🔥 import BASE_URL here
import './ManageVideoLearning.css';

export default function ManageVideoLearning() {
  const [videos, setVideos] = useState([]);
  const [courses, setCourses] = useState([]);
  const [admins, setAdmins] = useState([]);

  const [form, setForm] = useState({
    title: '',
    description: '',
    youtubeLink: '',
    thumbnail: null,
    videos: null,
    course_id: '',
    admin_id: ''
  });

  const [editId, setEditId] = useState(null);
  const formRef = useRef(null);

  useEffect(() => {
    fetchVideos();
    fetchCourses();
    fetchAdmins();
  }, []);

  const fetchVideos = async () => {
    try {
      const res = await api.get('/api/managevideo');
      const initialized = res.data.map(video => ({
        ...video,
        showVideo: !!video.videos
      }));
      setVideos(initialized);
    } catch (err) {
      console.error('❌ Fetch videos error:', err);
    }
  };

  const fetchCourses = async () => {
    try {
      const res = await api.get('/api/courses');
      setCourses(res.data);
    } catch (err) {
      console.error('❌ Fetch courses error:', err);
    }
  };

  const fetchAdmins = async () => {
    try {
      const res = await api.get('/api/manageadmins');
      setAdmins(res.data);
    } catch (err) {
      console.error('❌ Fetch admins error:', err);
    }
  };

  const handleChange = e => {
    const { name, value, files } = e.target;
    if (name === 'thumbnail' || name === 'videos') {
      setForm(prev => ({ ...prev, [name]: files[0] }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(form).forEach(([key, val]) => data.append(key, val || ''));

    try {
      if (editId) {
        await api.put(`/api/managevideo/${editId}`, data);
      } else {
        await api.post('/api/managevideo', data);
      }
      resetForm();
      fetchVideos();
    } catch (err) {
      console.error('❌ Submit error:', err);
    }
  };

  const handleEdit = video => {
    setEditId(video.id);
    setForm({
      title: video.title || '',
      description: video.description || '',
      youtubeLink: video.youtubelink || '',
      thumbnail: null,
      videos: null,
      course_id: video.course_id || '',
      admin_id: video.admin_id || ''
    });
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleDelete = async id => {
    if (window.confirm('Delete this video?')) {
      try {
        await api.delete(`/api/managevideo/${id}`);
        fetchVideos();
      } catch (err) {
        console.error('❌ Delete error:', err);
      }
    }
  };

  const resetForm = () => {
    setForm({
      title: '',
      description: '',
      youtubeLink: '',
      thumbnail: null,
      videos: null,
      course_id: '',
      admin_id: ''
    });
    setEditId(null);
  };

  return (
    <div className="mv-container">
      <br /><br />
      <h2 className="mv-heading">Manage Course Videos</h2>
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="mv-form"
        encType="multipart/form-data"
      >
        <div className="mv-form-grid">
          <input
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            required
          />
          <input
            name="youtubeLink"
            placeholder="YouTube Link (optional)"
            value={form.youtubeLink}
            onChange={handleChange}
          />
          <select
            name="course_id"
            value={form.course_id}
            onChange={handleChange}
            required
          >
            <option value="">Choose Course</option>
            {courses.map(c => (
              <option key={c.id} value={c.id}>
                {c.title}
              </option>
            ))}
          </select>
          <select
            name="admin_id"
            value={form.admin_id}
            onChange={handleChange}
            required
          >
            <option value="">Choose Admin</option>
            {admins.map(a => (
              <option key={a.id} value={a.id}>
                {a.name}
              </option>
            ))}
          </select>
          <input
            type="file"
            name="thumbnail"
            accept="image/*"
            onChange={handleChange}
          />
          <input
            type="file"
            name="videos"
            accept="video/*"
            onChange={handleChange}
          />
        </div>
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
        />
        <div className="mv-submit-wrap">
          <button type="submit" className="mv-btn-submit">
            {editId ? 'Update' : 'Add'} Video
          </button>
        </div>
      </form>

      <div className="mv-grid">
        {videos.map(v => (
          <div className="mv-card" key={v.id}>
            <div className="mv-thumbnail">
              {!v.showVideo && v.thumbnail && (
                <img
                  src={`${BASE_URL}/uploads/${v.thumbnail}`}
                  alt={v.title}
                  className="mv-thumbnail-img"
                />
              )}
              {v.showVideo && v.videos && (
                <video autoPlay muted controls className="mv-video">
                  <source
                    src={`${BASE_URL}/uploads/${v.videos}`}
                    type="video/mp4"
                  />
                </video>
              )}
            </div>
            <div className="mv-card-body">
              <h5>{v.title}</h5>
              <p>{(v.description || '').slice(0, 80)}...</p>
              <div className="mv-card-actions">
                <button className="mv-btn-edit" onClick={() => handleEdit(v)}>
                  Edit
                </button>
                <button className="mv-btn-delete" onClick={() => handleDelete(v.id)}>
                  Delete
                </button>
              </div>
              {!v.videos && v.youtubelink && (
                <div className="mv-yt-link">
                  <a
                    href={v.youtubelink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mv-btn-learn"
                  >
                    ▶ Play YouTube
                  </a>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
