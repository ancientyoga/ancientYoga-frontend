import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminDashboard.css';

const CommentManagement = () => {
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null); // State for handling errors

  // Fetch comments from the server
  const fetchComments = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/comments');
      setComments(res.data);
    } catch (err) {
      // Handle error if the request fails
      setError("Failed to fetch comments. Please try again later.");
      console.error(err); // Log the error for debugging
    }
  };

  // Delete a comment
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/comments/${id}`);
      fetchComments(); // Reload comments after deletion
    } catch (err) {
      setError("Failed to delete comment. Please try again later.");
      console.error(err); // Log the error for debugging
    }
  };

  // Use effect hook to load comments when component mounts
  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div className="p-4">
      <h3>Comment Management</h3>

      {/* Error handling */}
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="table-responsive">
        <table className="table table-striped">
          <thead className="table-dark">
            <tr>
              <th>User</th>
              <th>Comment</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {comments.map((c) => (
              <tr key={c.id}>
                <td>{c.username}</td>
                <td>{c.message}</td>
                <td>{new Date(c.createdAt).toLocaleString()}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(c.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {/* Show a message if no comments are found */}
            {comments.length === 0 && (
              <tr>
                <td colSpan="4">No comments found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CommentManagement;
