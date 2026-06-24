import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard, Code2, Briefcase, StickyNote,
  Sun, Moon, LogOut, Rocket
} from 'lucide-react';
import toast from 'react-hot-toast';

const navItems = [
  { label: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={18} /> },
  { label: 'DSA Tracker', path: '/dsa', icon: <Code2 size={18} /> },
  { label: 'Job Tracker', path: '/jobs', icon: <Briefcase size={18} /> },
  { label: 'Notes', path: '/notes', icon: <StickyNote size={18} /> },
];

const Sidebar = () => {
  const { isDark, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <aside className={`w-56 flex-shrink-0 h-screen flex flex-col border-r ${
      isDark
        ? 'bg-[#1a1d27] border-gray-800'
        : 'bg-[#fafafa] border-gray-200'
    }`}>

      {/* Logo */}
      <div className={`px-4 py-5 border-b ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
            <Rocket size={15} className="text-white" />
          </div>
          <div>
            <div className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              PrepPilot
            </div>
            <div className={`text-[10px] ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
              Placement tracker
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        <p className={`text-[10px] font-semibold uppercase tracking-widest px-2 mb-3 ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
          Main
        </p>
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all relative ${
                isActive
                  ? isDark
                    ? 'bg-violet-500/10 text-violet-400'
                    : 'bg-violet-600 text-white shadow-sm'
                  : isDark
                    ? 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
                    : 'text-gray-500 hover:bg-gray-200/70 hover:text-gray-900'
              }`}
            >
              {isActive && !isDark && (
                <span className="absolute right-2 w-1.5 h-1.5 rounded-full bg-white/70"></span>
              )}
              {isActive && isDark && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-violet-500 rounded-r-full"></span>
              )}
              <span>{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className={`px-3 py-4 border-t ${isDark ? 'border-gray-800' : 'border-gray-200'} space-y-1`}>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
            isDark
              ? 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
              : 'text-gray-500 hover:bg-gray-200/70 hover:text-gray-900'
          }`}
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
          {isDark ? 'Light mode' : 'Dark mode'}
        </button>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
            isDark
              ? 'text-gray-400 hover:bg-red-500/10 hover:text-red-400'
              : 'text-gray-500 hover:bg-red-50 hover:text-red-500'
          }`}
        >
          <LogOut size={18} />
          Logout
        </button>

        {/* User info */}
        <div className={`flex items-center gap-3 px-3 py-3 mt-1 rounded-lg ${
          isDark ? 'bg-gray-800/60' : 'bg-gray-200/60'
        }`}>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-violet-700 flex items-center justify-center flex-shrink-0 shadow-sm">
            <span className="text-white text-xs font-semibold">{getInitials(user?.name)}</span>
          </div>
          <div className="min-w-0">
            <div className={`text-xs font-medium truncate ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
              {user?.name || 'User'}
            </div>
            <div className={`text-[10px] truncate ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
              {user?.email || ''}
            </div>
          </div>
        </div>
      </div>

    </aside>
  );
};

export default Sidebar;