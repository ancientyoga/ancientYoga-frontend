import React, { useState, useEffect } from 'react';
import api from '../api'; // Use shared axios instance

const CourseManagement = () => {
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    duration: '',
    offer: '',
    googledrivelink: ''
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const fetchCourses = async () => {
    try {
      const res = await api.get("/api/courses");
      setCourses(res.data);
    } catch (err) {
      console.error('❌ Error fetching courses:', err);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (isEditMode) {
        await api.put(`/api/courses/${editingId}`, formData);
        alert('✅ Course updated successfully');
      } else {
        await api.post("/api/courses", formData);
        alert('✅ Course added successfully');
      }
      fetchCourses();
      resetForm();
    } catch (err) {
      console.error('❌ Error saving course:', err);
      alert('Something went wrong. Please try again.');
    }
  };

  const handleEdit = (course) => {
    setFormData({
      title: course.title,
      description: course.description,
      price: course.price,
      duration: course.duration,
      offer: course.offer,
      googledrivelink: course.googledrivelink
    });
    setEditingId(course.id);
    setIsEditMode(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async id => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    try {
      await api.delete(`/api/courses/${id}`);
      fetchCourses();
    } catch (err) {
      console.error('❌ Error deleting course:', err);
      alert('Failed to delete course.');
    }
  };

  const handleCancelEdit = () => {
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      price: '',
      duration: '',
      offer: '',
      googledrivelink: ''
    });
    setIsEditMode(false);
    setEditingId(null);
  };

  return (
    <div className="p-4">
      <br />
      <br />
      <h3 className="mb-4">{isEditMode ? 'Edit Course' : 'Add Course'}</h3>

      <form
        onSubmit={handleSubmit}
        className="mb-5 card p-4 shadow-sm"
        style={{ maxWidth: '600px', margin: 'auto' }}
      >
        <input
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="form-control mb-2"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="form-control mb-2"
          required
        />
        <div className="row g-2">
          <div className="col-md-6">
            <input
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              className="form-control mb-2"
            />
          </div>
          <div className="col-md-6">
            <input
              name="duration"
              placeholder="Duration"
              value={formData.duration}
              onChange={handleChange}
              className="form-control mb-2"
            />
          </div>
        </div>
        <input
          name="offer"
          placeholder="Offer / Discount"
          value={formData.offer}
          onChange={handleChange}
          className="form-control mb-2"
        />
        <input
          name="googledrivelink"
          placeholder="Google Drive Link"
          value={formData.googledrivelink}
          onChange={handleChange}
          className="form-control mb-3"
        />
        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-success">
            {isEditMode ? 'Update Course' : 'Save Course'}
          </button>
          {isEditMode && (
            <button type="button" className="btn btn-secondary" onClick={handleCancelEdit}>
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      <div className="row">
        {courses.map(course => (
          <div className="col-md-4 mb-3" key={course.id}>
            <div className="card p-3 h-100 shadow-sm">
              <h5>{course.title}</h5>
              <p>{course.description}</p>
              <p><strong>Price:</strong> ₹{course.price}</p>
              <p><strong>Duration:</strong> {course.duration}</p>
              <p className="text-success"><strong>Offer:</strong> {course.offer}</p>
              {course.googledrivelink && (
                <p>
                  <a
                    href={course.googledrivelink}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-sm btn-outline-primary"
                  >
                    Google Drive Link
                  </a>
                </p>
              )}
              <div className="d-flex justify-content-between">
                <button
                  className="btn btn-outline-primary btn-sm"
                  onClick={() => handleEdit(course)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => handleDelete(course.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseManagement;
