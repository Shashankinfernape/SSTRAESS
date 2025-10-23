// frontend/src/components/PublicLayout.jsx
// This new component wraps your public pages to give them the Navbar and Footer.
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const PublicLayout = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      {/* Outlet renders the matched child route (e.g., LandingPage) */}
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;