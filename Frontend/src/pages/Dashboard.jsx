// frontend/src/pages/Dashboard.jsx
// STYLES UPDATED, logic is identical

import { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth.js';
import api from '../lib/api.js';
import Loader from '../components/Loader.jsx';
import { LogOut } from 'lucide-react';

const Dashboard = () => {
  const { user, logout, accessToken } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      console.log('Dashboard useEffect - Fetching profile. Token:', accessToken);
      try {
        const { data } = await api.get('/api/user/profile');
        setProfile(data);
        console.log('Dashboard useEffect - Profile fetched successfully:', data);
      } catch (error) {
        console.error('Dashboard useEffect - Failed to fetch profile:', error);
      } finally {
        setLoading(false);
      }
    };

    if (accessToken) {
      fetchProfile();
    } else {
      console.log('Dashboard useEffect - No access token, skipping fetch.');
      setLoading(false);
    }
  }, [accessToken]);

  return (
    <div className="flex min-h-screen flex-col bg-brand-black p-4 text-white">
      {/* Header */}
      <header className="flex items-center justify-between rounded-lg bg-brand-gray-dark p-4">
        <h1 className="font-heading text-2xl font-semibold tracking-wider text-brand-red">
          SSTRAESS
        </h1>
        <button
          onClick={logout}
          className="flex items-center gap-2 rounded-lg bg-brand-red px-4 py-2 text-sm font-medium transition-all duration-300 hover:bg-secondary hover:shadow-glow-red focus:outline-none focus:ring-2 focus:ring-brand-red focus:ring-offset-2 focus:ring-offset-brand-gray-dark"
        >
          <LogOut size={16} />
          <span>Logout</span>
        </button>
      </header>

      {/* Main Content */}
      <main className="mt-8 flex-1 rounded-lg bg-brand-gray-dark p-8">
        <h2 className="text-3xl font-semibold text-gray-100">
          Welcome, {user?.email || 'User'}!
        </h2>
        <p className="mt-2 text-gray-400">
          This is a protected area. Your session is managed by JWT.
        </p>

        <div className="mt-8 rounded-lg border border-brand-gray-light bg-brand-black p-6">
          <h3 className="text-lg font-semibold text-brand-red">
            Protected API Data (/api/user/profile)
          </h3>
          <p className="mt-2 text-sm text-gray-400">
            Attempting to fetch fresh profile data using your access token...
          </p>
          {loading ? (
            <div className="mt-4">
              <Loader />
            </div>
          ) : profile ? (
            <pre className="mt-4 overflow-x-auto rounded-md bg-brand-gray-dark p-4 text-sm text-gray-300">
              {JSON.stringify(profile, null, 2)}
            </pre>
          ) : (
            <p className="mt-4 text-sm text-yellow-400">
              Could not load profile data.
            </p>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;