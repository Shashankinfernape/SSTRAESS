// frontend/src/lib/api.js
import axios from 'axios';

// Get the API URL from environment variables
const VITE_API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: VITE_API_URL,
  withCredentials: true, // IMPORTANT: This sends cookies (like the refresh token)
});

// ADD THIS INTERCEPTOR
api.interceptors.request.use(
  (config) => {
    // Read the token from localStorage on every request
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;