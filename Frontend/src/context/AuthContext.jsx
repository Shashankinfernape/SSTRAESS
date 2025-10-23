// frontend/src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import api from '../lib/api.js';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true); // Start loading true to check session

  useEffect(() => {
    // Try to get a new access token on initial load
    const checkUserSession = async () => {
      try {
        const { data } = await api.post('/api/auth/refresh');
        setAccessToken(data.accessToken);
        // You might want to fetch user data here too
        // For this demo, we'll fetch it on the dashboard
      } catch (error) {
        console.log('No active session'); // Expected error on initial load without cookie
      } finally {
        setLoading(false);
      }
    };
    checkUserSession();
  }, []);

  const login = async (email, password) => {
    try {
      const { data } = await api.post('/api/auth/login', { email, password });
      setUser(data.user);
      setAccessToken(data.accessToken);
      toast.success('Login successful!');
      return data;
    } catch (error) {
      console.error('Login failed', error);
      toast.error(error.response?.data?.message || 'Login failed');
      throw error;
    }
  };

  const signup = async (email, password) => {
    try {
      const { data } = await api.post('/api/auth/signup', { email, password });
      setUser(data.user);
      setAccessToken(data.accessToken);
      toast.success('Signup successful!');
      return data;
    } catch (error) {
      console.error('Signup failed', error);
      toast.error(error.response?.data?.message || 'Signup failed');
      throw error;
    }
  };

  const logout = async () => {
    try {
      await api.post('/api/auth/logout');
      setUser(null);
      setAccessToken(null);
      toast.success('Logged out');
    } catch (error) {
      console.error('Logout failed', error);
      toast.error('Logout failed');
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, accessToken, setAccessToken, login, signup, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;