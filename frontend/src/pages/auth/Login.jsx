import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { Sun, Moon, Eye, EyeOff, ArrowRight } from 'lucide-react';
import api from '../../api/axios';
import toast from 'react-hot-toast';

const Login = () => {
  const { isDark, toggleTheme } = useTheme();
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
      const res = await api.post('/auth/login', form);
      login(
        { _id: res.data._id, name: res.data.name, email: res.data.email },
        res.data.token
      );
      toast.success(`Welcome back, ${res.data.name}!`);
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex ${isDark ? 'bg-[#0f1117]' : 'bg-gray-50'}`}>

      {/* Left side — form */}
      <div className="flex-1 flex flex-col justify-center px-8 py-12 max-w-md mx-auto w-full">

        {/* Top bar */}
        <div className="flex items-center justify-between mb-12">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">P</span>
            </div>
            <span className={`font-semibold text-base ${isDark ? 'text-white' : 'text-gray-900'}`}>PrepPilot</span>
          </Link>
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg border ${isDark ? 'border-gray-700 text-gray-400 hover:text-white' : 'border-gray-200 text-gray-500 hover:text-gray-900'} transition-all`}
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>

        {/* Heading */}
        <div className="mb-8">
          <h1 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Welcome back
          </h1>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Log in to continue your placement prep
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Email */}
          <div>
            <label className={`block text-sm font-medium mb-1.5 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Email address
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className={`w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition-all ${
                isDark
                  ? 'bg-gray-900 border-gray-700 text-white placeholder-gray-600 focus:border-violet-500'
                  : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-violet-500'
              }`}
            />
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Password
              </label>
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className={`w-full px-4 py-2.5 pr-10 rounded-lg border text-sm outline-none transition-all ${
                  isDark
                    ? 'bg-gray-900 border-gray-700 text-white placeholder-gray-600 focus:border-violet-500'
                    : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-violet-500'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute right-3 top-1/2 -translate-y-1/2 ${isDark ? 'text-gray-500 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'}`}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-2.5 bg-violet-600 hover:bg-violet-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium rounded-lg text-sm transition-all mt-2"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>Log in <ArrowRight size={15} /></>
            )}
          </button>
        </form>

        {/* Signup link */}
        <p className={`text-sm text-center mt-6 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
          Don't have an account?{' '}
          <Link to="/signup" className="text-violet-500 hover:text-violet-400 font-medium">
            Sign up free
          </Link>
        </p>
      </div>

      {/* Right side — decorative panel (hidden on small screens) */}
      <div className="hidden lg:flex flex-1 bg-violet-600 flex-col justify-center px-16 relative overflow-hidden">
        {/* Background circles */}
        <div className="absolute top-[-80px] right-[-80px] w-64 h-64 rounded-full bg-violet-500/40"></div>
        <div className="absolute bottom-[-60px] left-[-60px] w-48 h-48 rounded-full bg-violet-700/40"></div>

        <div className="relative z-10">
          <h2 className="text-3xl font-bold text-white mb-4 leading-snug">
            Track smarter,<br />get placed faster.
          </h2>
          <p className="text-violet-200 text-sm leading-relaxed mb-10">
            PrepPilot brings your DSA practice, job applications, and interview notes into one clean dashboard.
          </p>

          {/* Mini stats */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: '500+', label: 'Students using PrepPilot' },
              { value: '12k+', label: 'Problems tracked' },
              { value: '94%', label: 'Placement rate' },
              { value: '3k+', label: 'Applications logged' },
            ].map((s, i) => (
              <div key={i} className="bg-white/10 rounded-xl p-4">
                <div className="text-2xl font-bold text-white mb-1">{s.value}</div>
                <div className="text-xs text-violet-200">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default Login;