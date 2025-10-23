// frontend/src/pages/ErrorPage.jsx
// STYLES UPDATED, logic is identical

import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-brand-black text-white">
      <h1 className="font-heading text-8xl font-bold tracking-wider text-brand-red">
        404
      </h1>
      <p className="mt-4 text-2xl font-semibold">Page Not Found</p>
      <p className="mt-2 text-gray-400">
        The page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="btn-primary mt-8 px-6 py-3" // Using new custom class
      >
        Go Home
      </Link>
    </div>
  );
};

export default ErrorPage;