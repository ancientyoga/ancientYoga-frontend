// ✅ frontend/src/api.js
import axios from 'axios';

const BASE_URL = 'https://ancientyog-backend.onrender.com';

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // If using cookies/session
});

export { BASE_URL };
export default api;
