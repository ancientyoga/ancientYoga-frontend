import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminDashboard.css';

const HomepageContentManagement = () => {
  const [cards, setCards] = useState([]);
  const [formData, setFormData] = useState({ title: '', description: '', videoUrl: '', thumbnailUrl: '' });

  const fetchCards = () => {
    axios.get('http://localhost:5000/api/homepage')
      .then(res => setCards(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchCards();
  }, []);

  const handleAdd = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/homepage', formData)
      .then(() => {
        fetchCards();
        setFormData({ title: '', description: '', videoUrl: '', thumbnailUrl: '' });
      })
      .catch(err => console.error(err));
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this content?')) {
      axios.delete(`http://localhost:5000/api/homepage/${id}`)
        .then(fetchCards)
        .catch(err => console.error(err));
    }
  };

  return (
    <div className="p-4">
      <h3>Homepage Content Management</h3>

      <form onSubmit={handleAdd} className="row g-3 mt-3 mb-4">
        <div className="col-md-3">
          <input type="text" className="form-control" placeholder="Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
        </div>
        <div className="col-md-3">
          <input type="text" className="form-control" placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })} required />
        </div>
        <div className="col-md-3">
          <input type="text" className="form-control" placeholder="Video URL"
            value={formData.videoUrl}
            onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })} required />
        </div>
        <div className="col-md-3">
          <input type="text" className="form-control" placeholder="Thumbnail URL"
            value={formData.thumbnailUrl}
            onChange={(e) => setFormData({ ...formData, thumbnailUrl: e.target.value })} required />
        </div>
        <div className="col-12">
          <button className="btn btn-success w-100" type="submit">Add Content</button>
        </div>
      </form>

      <div className="row">
        {cards.map((card) => (
          <div key={card.id} className="col-md-4 mb-4">
            <div className="card shadow-sm h-100">
              <img src={card.thumbnailUrl} className="card-img-top" alt={card.title} />
              <div className="card-body">
                <h5 className="card-title">{card.title}</h5>
                <p className="card-text">{card.description}</p>
                <a href={card.videoUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-primary">Preview</a>
                <button onClick={() => handleDelete(card.id)} className="btn btn-sm btn-danger ms-2">Delete</button>
              </div>
            </div>
          </div>
        ))}
        {cards.length === 0 && <p className="text-center">No homepage content found.</p>}
      </div>
    </div>
  );
};

export default HomepageContentManagement;
