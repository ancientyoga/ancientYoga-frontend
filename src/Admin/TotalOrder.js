// frontend/components/TotalOrder.js
import React, { useEffect, useState } from 'react';
import api from '../api';
import * as XLSX from 'xlsx';
import './TotalOrder.css';

const TotalOrder = () => {
  const [orders, setOrders] = useState([]);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({ userid: '', courseid: '', amount: '' });

  const fetchOrders = async () => {
    try {
      const res = await api.get("/api/totalorders");
      setOrders(res.data);
    } catch (err) {
      console.error("Fetch error:", err.message);
    }
  };

  const deleteOrder = async (id) => {
    try {
      await api.delete(`/api/totalorders/${id}`);
      fetchOrders();
    } catch (err) {
      console.error("Delete error:", err.message);
    }
  };

  const handleEditClick = (order) => {
    setEditId(order.id);
    setFormData({
      userid: order.userid || '',
      courseid: order.courseid || '',
      amount: order.amount || '',
    });
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  const handleUpdate = async () => {
    try {
      await api.put(`/api/totalorders/${editId}`, formData);
      setEditId(null);
      setFormData({ userid: '', courseid: '', amount: '' });
      fetchOrders();
    } catch (err) {
      console.error("Update error:", err.message);
    }
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(orders);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");
    XLSX.writeFile(workbook, "orders.xlsx");
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="order-container">
        <br/>
        <br/>
      <h2 className="title">📦 Total Orders</h2>
      <button className="export-btn" onClick={exportToExcel}>📁 Export to Excel</button>

      <div className="table-responsive">
        <table className="order-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Course Name</th>
              <th>Amount</th>
              <th>Purchase Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td>{order.name}</td>
                <td>{order.email}</td>
                <td>{order.mobile}</td>
                <td>{order.course_name}</td>
                <td>₹{order.amount}</td>
                <td>{new Date(order.purchase_date).toLocaleString()}</td>
                <td>
                  <button className="btn delete" onClick={() => deleteOrder(order.id)}>🗑️</button>
                  <button className="btn edit" onClick={() => handleEditClick(order)}>✏️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editId && (
        <div className="edit-form">
          <h3>✏️ Edit Order #{editId}</h3>
          <div className="form-group">
            <label>User ID:</label>
            <input
              type="number"
              value={formData.userid}
              onChange={e => setFormData({ ...formData, userid: e.target.value })}
              placeholder="Enter User ID"
            />
          </div>
          <div className="form-group">
            <label>Course ID:</label>
            <input
              type="number"
              value={formData.courseid}
              onChange={e => setFormData({ ...formData, courseid: e.target.value })}
              placeholder="Enter Course ID"
            />
          </div>
          <div className="form-group">
            <label>Amount:</label>
            <input
              type="number"
              value={formData.amount}
              onChange={e => setFormData({ ...formData, amount: e.target.value })}
              placeholder="Enter Amount"
            />
          </div>
          <div className="edit-buttons">
            <button className="btn update" onClick={handleUpdate}>✅ Update</button>
            <button className="btn cancel" onClick={() => setEditId(null)}>❌ Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TotalOrder;
