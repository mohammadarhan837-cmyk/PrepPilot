import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, Code2, Briefcase, LayoutDashboard, StickyNote, ArrowRight, CheckCircle2 } from 'lucide-react';

const features = [
  {
    icon: <Code2 size={20} />,
    title: 'DSA Tracker',
    desc: 'Log every problem you solve. Filter by topic, difficulty, and status. See your progress at a glance.',
    color: 'text-violet-500',
    bg: 'bg-violet-500/10',
  },
  {
    icon: <Briefcase size={20} />,
    title: 'Job Tracker',
    desc: 'Track every application from Applied to Selected. Never lose track of where you stand.',
    color: 'text-emerald-500',
    bg: 'bg-emerald-500/10',
  },
  {
    icon: <LayoutDashboard size={20} />,
    title: 'Smart Dashboard',
    desc: 'Charts, weekly progress, and stats all in one place. Know exactly how your prep is going.',
    color: 'text-amber-500',
    bg: 'bg-amber-500/10',
  },
  {
    icon: <StickyNote size={20} />,
    title: 'Interview Notes',
    desc: 'Save OA patterns, interviewer tips, and company-specific insights — never repeat a mistake.',
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
  },
];

const stats = [
  { value: '500+', label: 'Students using PrepPilot' },
  { value: '12k+', label: 'DSA problems tracked' },
  { value: '3k+', label: 'Job applications logged' },
  { value: '94%', label: 'Got placed within 3 months' },
];

const steps = [
  { step: '01', title: 'Create your account', desc: 'Sign up for free in 30 seconds. No credit card required.' },
  { step: '02', title: 'Start tracking', desc: 'Add DSA problems, job applications, and interview notes as you go.' },
  { step: '03', title: 'Watch the dashboard', desc: 'See your progress grow in real time through charts and weekly stats.' },
];

const Landing = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className={`min-h-screen font-sans ${isDark ? 'bg-[#0f1117] text-white' : 'bg-white text-gray-900'}`}>

      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 border-b backdrop-blur-md ${isDark ? 'bg-[#0f1117]/80 border-gray-800' : 'bg-white/80 border-gray-100'}`}>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-sm font-bold">P</span>
          </div>
          <span className="font-semibold text-base">PrepPilot</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg border ${isDark ? 'border-gray-700 text-gray-400 hover:text-white' : 'border-gray-200 text-gray-500 hover:text-gray-900'} transition-all`}
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <Link to="/login" className={`text-sm px-4 py-2 rounded-lg border ${isDark ? 'border-gray-700 text-gray-300' : 'border-gray-200 text-gray-600'} transition-all`}>
            Log in
          </Link>
          <Link to="/signup" className="text-sm px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-700 text-white font-medium transition-all">
            Get started free
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-36 pb-24 px-6 text-center max-w-4xl mx-auto">
        <div className={`inline-flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full border mb-6 ${isDark ? 'bg-violet-500/10 border-violet-500/20 text-violet-400' : 'bg-violet-50 border-violet-200 text-violet-600'}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse"></span>
          Built for final year CSE students
        </div>
        <h1 className="text-5xl font-bold leading-tight mb-5 tracking-tight">
          Your entire placement prep,
          <br />
          <span className="text-violet-500">in one place.</span>
        </h1>
        <p className={`text-lg max-w-2xl mx-auto mb-8 leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          Track DSA problems, job applications, and interview notes — with a dashboard that shows exactly how close you are to getting placed.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link to="/signup" className="inline-flex items-center gap-2 px-6 py-3 bg-violet-600 hover:bg-violet-700 text-white font-medium rounded-lg transition-all">
            Start tracking for free <ArrowRight size={16} />
          </Link>
          <Link to="/login" className={`px-6 py-3 rounded-lg border font-medium text-sm ${isDark ? 'border-gray-700 text-gray-300' : 'border-gray-200 text-gray-600'}`}>
            Log in
          </Link>
        </div>
        <p className={`text-xs mt-4 ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>Free to use · No credit card · Takes 30 seconds</p>
      </section>

      {/* Stats */}
      <section className={`py-12 border-y ${isDark ? 'border-gray-800 bg-gray-900/30' : 'border-gray-100 bg-gray-50'}`}>
        <div className="max-w-4xl mx-auto grid grid-cols-4 gap-6 px-6">
          {stats.map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl font-bold text-violet-500 mb-1">{s.value}</div>
              <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6 max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold mb-3">Everything you need to get placed</h2>
          <p className={`text-base ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Four tools, one platform. Nothing you don't need.</p>
        </div>
        <div className="grid grid-cols-2 gap-5">
          {features.map((f, i) => (
            <div key={i} className={`p-6 rounded-xl border transition-all hover:translate-y-[-2px] ${isDark ? 'bg-gray-900/60 border-gray-800' : 'bg-white border-gray-100 shadow-sm'}`}>
              <div className={`w-10 h-10 rounded-lg ${f.bg} ${f.color} flex items-center justify-center mb-4`}>
                {f.icon}
              </div>
              <h3 className="font-semibold text-base mb-2">{f.title}</h3>
              <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className={`py-24 px-6 border-y ${isDark ? 'border-gray-800 bg-gray-900/30' : 'border-gray-100 bg-gray-50'}`}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold mb-3">Get started in minutes</h2>
            <p className={`text-base ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>No setup. No confusion. Just start.</p>
          </div>
          <div className="grid grid-cols-3 gap-8">
            {steps.map((s, i) => (
              <div key={i} className="text-center">
                <div className={`text-4xl font-bold mb-4 ${isDark ? 'text-gray-800' : 'text-gray-200'}`}>{s.step}</div>
                <h3 className="font-semibold text-base mb-2">{s.title}</h3>
                <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="py-24 px-6 max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold mb-3">Everything is free</h2>
          <p className={`text-base ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>No plans. No paywalls. All features for every student.</p>
        </div>
        <div className={`rounded-2xl border p-8 ${isDark ? 'bg-gray-900/60 border-gray-800' : 'bg-white border-gray-100 shadow-sm'}`}>
          <div className="grid grid-cols-2 gap-4">
            {[
              'DSA problem tracker with filters',
              'Job application tracker',
              'Interview notes by company',
              'Dashboard with charts',
              'Weekly progress tracking',
              'Light and dark mode',
              'Secure JWT authentication',
              'Works on all devices',
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <CheckCircle2 size={16} className="text-violet-500 flex-shrink-0" />
                <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{item}</span>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link to="/signup" className="inline-flex items-center gap-2 px-8 py-3 bg-violet-600 hover:bg-violet-700 text-white font-medium rounded-lg transition-all">
              Create your free account <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center bg-violet-600 rounded-2xl py-16 px-8">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to get placed?</h2>
          <p className="text-violet-200 text-base mb-8">Join hundreds of students who track their prep with PrepPilot every day.</p>
          <Link to="/signup" className="inline-flex items-center gap-2 px-8 py-3 bg-white text-violet-600 font-semibold rounded-lg hover:bg-violet-50 transition-all">
            Get started — it's free <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className={`border-t py-10 px-8 ${isDark ? 'border-gray-800' : 'border-gray-100'}`}>
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-violet-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xs font-bold">P</span>
            </div>
            <span className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>PrepPilot</span>
          </div>
          <p className={`text-xs ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
            Built with ❤️ for placement season · {new Date().getFullYear()}
          </p>
          <div className="flex items-center gap-4">
            <Link to="/login" className={`text-sm ${isDark ? 'text-gray-500 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'}`}>Login</Link>
            <Link to="/signup" className={`text-sm ${isDark ? 'text-gray-500 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'}`}>Sign up</Link>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Landing;