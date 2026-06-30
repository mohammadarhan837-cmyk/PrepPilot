import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  const { isDark } = useTheme();

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center px-6 ${isDark ? 'bg-[#0c0b14] text-white' : 'bg-white text-gray-900'}`}>
      <div className={`text-7xl font-extrabold mb-4 ${isDark ? 'text-violet-500' : 'text-violet-600'}`}>
        404
      </div>
      <h1 className="text-xl font-bold mb-2">Page not found</h1>
      <p className={`text-sm mb-8 text-center max-w-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
        The page you're looking for doesn't exist or may have been moved.
      </p>
      <div className="flex items-center gap-3">
        <Link
          to="/"
          className="flex items-center gap-2 px-5 py-2.5 bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium rounded-lg transition-all"
        >
          <Home size={15} /> Go home
        </Link>
        <button
          onClick={() => window.history.back()}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-lg border text-sm font-medium transition-all ${isDark ? 'border-gray-700 text-gray-300 hover:text-white' : 'border-gray-200 text-gray-600 hover:text-gray-900'}`}
        >
          <ArrowLeft size={15} /> Go back
        </button>
      </div>
    </div>
  );
};

export default NotFound;