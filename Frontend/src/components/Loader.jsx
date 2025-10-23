// frontend/src/components/Loader.jsx
// STYLES UPDATED, logic is identical

import { Loader2 } from 'lucide-react';

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-full">
      {/* Updated to use new brand-red color */}
      <Loader2 className="h-8 w-8 animate-spin text-brand-red" />
    </div>
  );
};

export default Loader;