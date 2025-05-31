import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function CourseLinkManager() {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    axios.get('/api/admin/course-links').then(res => setLinks(res.data));
  }, []);

  const handleUpdate = (id, updated) => {
    axios.put(`/api/admin/course-links/${id}`, updated)
      .then(() => alert('Updated'))
      .catch(() => alert('Error updating'));
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Course Link Manager</h2>
      {links.map(link => (
        <div key={link.id} className="border p-3 mb-4 rounded shadow">
          <input
            className="w-full mb-2 p-2 border"
            value={link.googleDriveLink || ''}
            onChange={(e) => setLinks(prev => prev.map(l => l.id === link.id ? { ...l, googleDriveLink: e.target.value } : l))}
          />
          <input
            type="date"
            className="mb-2 p-2 border"
            value={link.expiryDate ? link.expiryDate.split('T')[0] : ''}
            onChange={(e) => setLinks(prev => prev.map(l => l.id === link.id ? { ...l, expiryDate: e.target.value } : l))}
          />
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={link.isActive}
              onChange={(e) => setLinks(prev => prev.map(l => l.id === link.id ? { ...l, isActive: e.target.checked } : l))}
              className="mr-2"
            />
            Active
          </label>
          <button
            className="bg-blue-500 text-white px-4 py-1 rounded mt-2"
            onClick={() => handleUpdate(link.id, link)}
          >
            Update
          </button>
        </div>
      ))}
    </div>
  );
}
