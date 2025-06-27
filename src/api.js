// ✅ frontend/src/api.js
import axios from 'axios';

// ✅ Change this for live hosting (e.g., 'https://yourdomain.com')
const BASE_URL = 'http://localhost:5000'; // Replace with your actual domain

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export { BASE_URL }; // ✅ Export this for use in image/video src
export default api;
