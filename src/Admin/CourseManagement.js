import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminDashboard.css';

const CourseManagement = () => {
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    duration: '',
    offer: ''
  });

  const fetchCourses = async () => {
    const res = await axios.get('http://localhost:5000/api/courses');
    setCourses(res.data);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/courses', formData);
    fetchCourses();
    setFormData({ title: '', description: '', price: '', duration: '', offer: '' });
  };

  const handleDelete = async id => {
    await axios.delete(`http://localhost:5000/api/courses/${id}`);
    fetchCourses();
  };

  return (
    <div className="p-4">
      <h3>Course Management</h3>
      <form onSubmit={handleSubmit} className="mb-4">
        <input name="title" placeholder="Title" value={formData.title} onChange={handleChange} className="form-control mb-2" />
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="form-control mb-2" />
        <input name="price" placeholder="Price" value={formData.price} onChange={handleChange} className="form-control mb-2" />
        <input name="duration" placeholder="Duration" value={formData.duration} onChange={handleChange} className="form-control mb-2" />
        <input name="offer" placeholder="Offer / Discount" value={formData.offer} onChange={handleChange} className="form-control mb-2" />
        <button className="btn btn-success">Save Course</button>
      </form>

      <div className="row">
        {courses.map(course => (
          <div className="col-md-4 mb-3" key={course.id}>
            <div className="card p-3">
              <h5>{course.title}</h5>
              <p>{course.description}</p>
              <p><strong>Price:</strong> ₹{course.price}</p>
              <p><strong>Duration:</strong> {course.duration}</p>
              <p className="text-success"><strong>Offer:</strong> {course.offer}</p>
              <button className="btn btn-danger mt-2" onClick={() => handleDelete(course.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseManagement;
