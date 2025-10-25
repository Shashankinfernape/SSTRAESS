// frontend/src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import api from '../lib/api.js';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // Read initial token from localStorage
  const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If we have a token in state, set it in localStorage
    // (This syncs state to localStorage on initial load)
    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
    }

    const checkUserSession = async () => {
      try {
        const { data } = await api.post('/api/auth/refresh');
        // Save new token to state AND localStorage
        setAccessToken(data.accessToken);
        localStorage.setItem('accessToken', data.accessToken);
      } catch (error) {
        console.log('No active session');
        // If refresh fails, clear any invalid token
        setAccessToken(null);
        localStorage.removeItem('accessToken');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    // If we don't have an access token, try to get one
    if (!accessToken) {
      checkUserSession();
    } else {
      // If we do have a token, we can skip the refresh for now
      setLoading(false);
    }
  }, []); // Only run on initial mount

  const login = async (email, password) => {
    try {
      const { data } = await api.post('/api/auth/login', { email, password });
      setUser(data.user);
      // Save new token to state AND localStorage
      setAccessToken(data.accessToken);
      localStorage.setItem('accessToken', data.accessToken);
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
      // Save new token to state AND localStorage
      setAccessToken(data.accessToken);
      localStorage.setItem('accessToken', data.accessToken);
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
    } catch (error) {
      console.error('Logout API call failed', error);
      // We log out the frontend regardless of API success
    } finally {
      // Clear token from state AND localStorage
      setUser(null);
      setAccessToken(null);
      localStorage.removeItem('accessToken');
      toast.success('Logged out');
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