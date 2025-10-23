// frontend/src/App.jsx
// MODIFIED to add LandingPage and PublicLayout

import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import useAxiosInterceptors from './hooks/useAxiosInterceptors.js';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Dashboard from './pages/Dashboard.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

// --- NEW IMPORTS ---
import LandingPage from './pages/LandingPage.jsx';
import PublicLayout from './components/PublicLayout.jsx';
// --- END NEW IMPORTS ---

function App() {
  // Activate the interceptors
  useAxiosInterceptors();

  return (
    <>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            // Updated toast to match new theme
            background: '#141414',
            color: '#f5f5f5',
            border: '1px solid #222222',
          },
        }}
      />
      <Routes>
        {/* --- NEW PUBLIC ROUTES --- */}
        {/* These routes use the PublicLayout (Navbar + Footer) */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<LandingPage />} />
          {/* You can add more public pages like /about here */}
        </Route>
        {/* --- END NEW PUBLIC ROUTES --- */}

        {/* Auth Routes (no layout) */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          {/* Default route when logged in (from original file) */}
          <Route path="/" element={<Dashboard />} />
          {/* Explicit dashboard route */}
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        {/* Catch-all / 404 */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}
// Note: I've kept your original <Route path="/" element={<Dashboard />}>
// inside ProtectedRoute. This means if a user is LOGGED IN,
// visiting "/" will correctly show them the Dashboard.
// If they are LOGGED OUT, ProtectedRoute will redirect them,
// and React Router will instead match the *public*
// <Route path="/" element={<LandingPage />} />.
// This matches the logic from your original file perfectly.

export default App;