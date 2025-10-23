// frontend/src/hooks/useAxiosInterceptors.js
import { useEffect } from 'react';
import api from '../lib/api.js';
import useAuth from './useAuth.js';
import { toast } from 'react-hot-toast';

const useAxiosInterceptors = () => {
  const { accessToken, setAccessToken, logout } = useAuth();

  useEffect(() => {
    
   // Request interceptor
const requestIntercept = api.interceptors.request.use(
  (config) => {
    console.log('Request Interceptor - Token:', accessToken); // <-- ADD LOG
    console.log('Request Interceptor - URL:', config.url); // <-- ADD LOG
    if (accessToken && !config.headers['Authorization']) {
      console.log('Request Interceptor - Adding Auth Header'); // <-- ADD LOG
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    } else if (config.headers['Authorization']) {
        console.log('Request Interceptor - Auth Header already exists'); // <-- ADD LOG
    } else {
        console.log('Request Interceptor - No token found in context'); // <-- ADD LOG
    }
    return config;
  },
  (error) => Promise.reject(error)
);

    // Response interceptor
const responseIntercept = api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
  
      // Check if the error is 401, not already retried, AND not the refresh endpoint itself
      if (
        error.response?.status === 401 &&
        !originalRequest._retry &&
        originalRequest.url !== '/api/auth/refresh' // <-- ADD THIS CHECK
      ) {
        originalRequest._retry = true; // Mark as retried
  
        try {
          // Attempt to refresh the token
          console.log('Attempting token refresh...'); // Add for debugging
          const { data } = await api.post('/api/auth/refresh');
          const newAccessToken = data.accessToken;
          console.log('Token refresh successful!'); // Add for debugging
  
          // Update the auth context
          setAccessToken(newAccessToken);
  
          // Update the header of the original request
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
  
          // Retry the original request with the new token
          return api(originalRequest);
  
        } catch (refreshError) {
          // Refresh failed (e.g., refresh token invalid or expired)
          console.error('Token refresh failed:', refreshError.response?.data || refreshError.message); // Log the specific error
  
          // Only logout if the refresh attempt specifically failed
           if (refreshError.response?.status === 401 || refreshError.response?.status === 403) {
             toast.error('Session expired. Please log in again.');
             logout(); // Call logout from context
           }
  
          return Promise.reject(refreshError);
        }
      }
  
      // If it's not a 401 we should handle, or if it's the refresh endpoint failing, just reject
      return Promise.reject(error);
    }
  );

    // Eject interceptors on cleanup
    return () => {
      api.interceptors.request.eject(requestIntercept);
      api.interceptors.response.eject(responseIntercept);
    };
  }, [accessToken, setAccessToken, logout]);
};

export default useAxiosInterceptors;