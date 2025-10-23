// frontend/src/pages/Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth.js'; // Imports hook
import { Loader2, Lock, Mail } from 'lucide-react'; // Imports icons
// Import Link for the signup navigation
import { Link } from 'react-router-dom'; // <-- ADD THIS IMPORT

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth(); // <-- Back to using login function
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(email, password); // <-- Back to calling login function
      navigate('/dashboard'); // Navigate to dashboard on successful login
    } catch (error) {
      // Error is already handled by toast in AuthContext
      console.error('Login attempt failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-base p-4">
      <div className="w-full max-w-md">
        {/* Glassmorphism Card */}
        <div className="relative rounded-xl border border-white/10 bg-black/30 p-8 shadow-xl backdrop-blur-lg">
          <div className="text-center">
            {/* Login heading */}
            <h1 className="text-3xl font-semibold text-white">Welcome Back</h1>
            {/* Login paragraph */}
            <p className="mt-2 text-sm text-gray-400">Sign in to your secure account.</p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            {/* Email Input */}
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Mail size={18} />
              </span>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-lg border border-white/10 bg-overlay p-3 pl-10 text-white placeholder-gray-500 transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Lock size={18} />
              </span>
              <input
                type="password"
                placeholder="Password" // No length hint needed for login
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                // minLength removed, not usually needed for login
                className="w-full rounded-lg border border-white/10 bg-overlay p-3 pl-10 text-white placeholder-gray-500 transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full items-center justify-center rounded-lg bg-gradient-primary p-3 font-semibold text-white transition-all hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-base disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" />
              ) : (
                'Sign In' // <-- Back to Sign In text
              )}
            </button>
          </form>

          {/* --- Sign Up Link --- */}
          <p className="mt-6 text-center text-sm text-gray-400">
            Don't have an account yet?{' '}
            {/* You'll need to create a /signup route later */}
            <Link to="/signup" className="font-semibold text-primary hover:underline">
              Create an account
            </Link>
             {/* TEMPORARY: Since /signup doesn't exist yet, this link won't work perfectly.
                 You'll need to create a Signup page component and add a route for '/signup' in App.jsx later.
                 For now, clicking it might lead to the ErrorPage or just stay here depending on router setup.
             */}
          </p>
          {/* --- End Sign Up Link --- */}

        </div>
      </div>
    </div>
  );
};

export default Login;