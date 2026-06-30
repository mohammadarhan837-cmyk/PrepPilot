import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, ArrowRight, CheckCircle2 } from 'lucide-react';

const Landing = () => {
  const { isDark, toggleTheme } = useTheme();

  const t = {
    bg: isDark ? 'bg-[#0c0b14]' : 'bg-white',
    bg2: isDark ? 'bg-[#13111f]' : 'bg-[#f7f5ff]',
    bg3: isDark ? 'bg-[#1d1a30]' : 'bg-[#ede9ff]',
    border: isDark ? 'border-[#252338]' : 'border-[#e5e0ff]',
    t1: isDark ? 'text-[#f0eeff]' : 'text-[#0d0b1a]',
    t2: isDark ? 'text-[#9490b0]' : 'text-[#6b6680]',
    t3: isDark ? 'text-[#5a5675]' : 'text-[#a09cb8]',
    card: isDark ? 'bg-[#13111f] border-[#252338]' : 'bg-white border-[#e5e0ff]',
  };

  return (
    <div className={`min-h-screen ${t.bg} ${t.t1} transition-colors duration-300`}>

      {/* NAV */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 border-b ${t.border} backdrop-blur-md`}
        style={{ background: isDark ? 'rgba(12,11,20,0.85)' : 'rgba(255,255,255,0.85)' }}
      >
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#5b4fcf] rounded-lg flex items-center justify-center text-white text-xs font-bold">PP</div>
          <span className={`text-sm font-bold tracking-tight ${t.t1}`}>PrepPilot</span>
        </Link>
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className={`w-8 h-8 rounded-lg border ${t.border} ${t.bg2} flex items-center justify-center ${t.t2} transition-all`}
          >
            {isDark ? <Sun size={15} /> : <Moon size={15} />}
          </button>
          <Link to="/login" className={`text-xs font-medium px-3 py-2 rounded-lg border ${t.border} ${t.t2} transition-all`}>
            Log in
          </Link>
          <Link
            to="/signup"
            className="text-xs font-semibold px-4 py-2 rounded-lg bg-[#5b4fcf] hover:bg-[#4a3fb8] text-white transition-all hover:-translate-y-px"
            style={{ boxShadow: '0 4px 14px rgba(91,79,207,0.35)' }}
          >
            Get started free →
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section
        className="pt-28 pb-0 px-8 relative overflow-hidden"
        style={{ background: isDark ? 'linear-gradient(150deg,#13111f 0%,#1d1a30 50%,#0c0b14 100%)' : 'linear-gradient(150deg,#f7f5ff 0%,#ede9ff 50%,#ffffff 100%)' }}
      >
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle,rgba(124,111,255,0.12),transparent 70%)' }}></div>
        <div className="absolute bottom-0 left-1/4 w-64 h-64 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle,rgba(91,79,207,0.08),transparent 70%)' }}></div>

        <div className="max-w-5xl mx-auto grid grid-cols-2 gap-8 items-center">
          <div className="relative z-10 pb-16">
            <div className={`inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full border mb-5 ${isDark ? 'bg-[#1e1a3a] border-[#252338] text-[#a89bff]' : 'bg-[#f0eeff] border-[#e5e0ff] text-[#5b4fcf]'}`}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#7c6fff] animate-pulse"></span>
              Built for CSE placement season 2026
            </div>

            <h1 className={`text-4xl font-extrabold leading-tight tracking-tight mb-4 ${t.t1}`}>
              One place for your<br />
              entire{' '}
              <span style={{ background: 'linear-gradient(135deg,#5b4fcf,#a89bff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                placement prep.
              </span>
            </h1>

            <p className={`text-sm leading-relaxed mb-6 max-w-sm ${t.t2}`}>
              Track DSA problems, manage job applications, and save interview notes — with a smart dashboard that shows your real progress every day.
            </p>

            <div className="flex items-center gap-3 mb-7">
              <Link
                to="/signup"
                className="flex items-center gap-2 text-xs font-bold px-5 py-2.5 bg-[#5b4fcf] hover:bg-[#4a3fb8] text-white rounded-lg transition-all hover:-translate-y-0.5"
                style={{ boxShadow: '0 4px 18px rgba(91,79,207,0.35)' }}
              >
                🚀 Start for free <ArrowRight size={13} />
              </Link>
              <Link
                to="/login"
                className={`flex items-center gap-2 text-xs font-semibold px-5 py-2.5 rounded-lg border ${t.border} ${t.bg} ${t.t1} hover:-translate-y-0.5 transition-all`}
              >
                See features →
              </Link>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex">
                {['#5b4fcf', '#059669', '#d97706', '#dc2626'].map((c, i) => (
                  <div
                    key={i}
                    className="w-7 h-7 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold text-white"
                    style={{ background: c, marginLeft: i === 0 ? 0 : -8 }}
                  >
                    {['A', 'R', 'S', 'M'][i]}
                  </div>
                ))}
              </div>
              <span className={`text-xs ${t.t3}`}>
                Joined by <span className={`font-semibold ${t.t1}`}>500+ students</span> this semester
              </span>
            </div>
          </div>

          {/* SVG ILLUSTRATION */}
          <div className="relative z-10 flex items-center justify-center pb-8">
            <svg viewBox="0 0 420 340" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-sm">
              <circle cx="210" cy="170" r="150" fill="url(#bggrad)" opacity="0.15" />
              <rect x="60" y="240" width="300" height="14" rx="7" fill="url(#deskgrad)" />
              <rect x="100" y="254" width="12" height="50" rx="4" fill="url(#leggrad)" />
              <rect x="308" y="254" width="12" height="50" rx="4" fill="url(#leggrad)" />
              <rect x="120" y="190" width="180" height="52" rx="8" fill="url(#laptopbase)" />
              <rect x="118" y="130" width="184" height="66" rx="8" fill="url(#screengrad)" />
              <rect x="126" y="138" width="168" height="50" rx="5" fill="#1e1a3a" opacity="0.9" />
              <rect x="134" y="155" width="22" height="22" rx="4" fill="#7c6fff" opacity="0.8" />
              <rect x="162" y="162" width="36" height="4" rx="2" fill="#a89bff" opacity="0.6" />
              <rect x="162" y="169" width="28" height="3" rx="2" fill="#5a5675" opacity="0.8" />
              <rect x="205" y="155" width="8" height="22" rx="3" fill="#3dd68c" opacity="0.7" />
              <rect x="217" y="162" width="8" height="15" rx="3" fill="#7c6fff" opacity="0.7" />
              <rect x="229" y="158" width="8" height="19" rx="3" fill="#f0a500" opacity="0.7" />
              <rect x="241" y="165" width="8" height="12" rx="3" fill="#3dd68c" opacity="0.7" />
              <rect x="253" y="160" width="8" height="17" rx="3" fill="#7c6fff" opacity="0.7" />
              <rect x="118" y="193" width="184" height="5" rx="2" fill="url(#hingegrad)" />
              <rect x="130" y="202" width="160" height="8" rx="3" fill="#d4caff" opacity="0.3" />
              <rect x="130" y="213" width="120" height="8" rx="3" fill="#d4caff" opacity="0.3" />
              <rect x="155" y="224" width="110" height="8" rx="3" fill="#d4caff" opacity="0.3" />
              <rect x="182" y="224" width="56" height="12" rx="4" fill="#c4baff" opacity="0.25" />
              <ellipse cx="340" cy="230" rx="32" ry="18" fill="url(#bodygrad)" />
              <path d="M320 225 Q340 220 360 225" stroke="#a89bff" strokeWidth="1.5" fill="none" opacity="0.5" />
              <circle cx="340" cy="195" r="22" fill="url(#skingrad)" />
              <path d="M318 195 Q318 173 340 173 Q362 173 362 195 Q358 185 340 183 Q322 185 318 195Z" fill="#2d1a6e" />
              <circle cx="333" cy="194" r="2.5" fill="#2d1a6e" />
              <circle cx="347" cy="194" r="2.5" fill="#2d1a6e" />
              <circle cx="334" cy="193" r="1" fill="white" opacity="0.7" />
              <circle cx="348" cy="193" r="1" fill="white" opacity="0.7" />
              <path d="M334 201 Q340 206 346 201" stroke="#2d1a6e" strokeWidth="1.5" fill="none" strokeLinecap="round" />
              <path d="M322 218 Q290 210 260 205" stroke="url(#armgrad)" strokeWidth="10" strokeLinecap="round" fill="none" />
              <circle cx="258" cy="204" r="7" fill="url(#skingrad2)" />
              <rect x="52" y="130" width="60" height="30" rx="8" fill="url(#greencard)" opacity="0.95" />
              <text x="60" y="151" fontSize="14" fill="#3dd68c">✓</text>
              <text x="76" y="150" fontSize="9" fill="#3dd68c" fontWeight="700">Solved!</text>
              <rect x="300" y="95" width="68" height="30" rx="8" fill="url(#purplecard)" opacity="0.95" />
              <text x="308" y="115" fontSize="12" fill="#a89bff">⭐</text>
              <text x="323" y="115" fontSize="9" fill="#a89bff" fontWeight="700">Interview!</text>
              <rect x="68" y="205" width="40" height="8" rx="3" fill="#7c6fff" opacity="0.7" />
              <rect x="70" y="197" width="36" height="8" rx="3" fill="#a89bff" opacity="0.7" />
              <rect x="72" y="189" width="32" height="8" rx="3" fill="#5b4fcf" opacity="0.7" />
              <rect x="75" y="192" width="18" height="1.5" rx="1" fill="white" opacity="0.4" />
              <rect x="75" y="195" width="12" height="1.5" rx="1" fill="white" opacity="0.4" />
              <rect x="368" y="222" width="20" height="18" rx="4" fill="url(#cupgrad)" />
              <path d="M388 228 Q395 228 395 235 Q395 242 388 242" stroke="#a89bff" strokeWidth="2" fill="none" />
              <ellipse cx="378" cy="222" rx="10" ry="4" fill="#7c6fff" opacity="0.6" />
              <path d="M372 217 Q374 212 372 207" stroke="#a89bff" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.5" />
              <path d="M379 215 Q381 210 379 205" stroke="#a89bff" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.5" />
              <circle cx="95" cy="165" r="4" fill="#7c6fff" opacity="0.4" />
              <circle cx="105" cy="150" r="2.5" fill="#a89bff" opacity="0.3" />
              <circle cx="85" cy="148" r="3" fill="#5b4fcf" opacity="0.3" />
              <circle cx="360" cy="155" r="4" fill="#3dd68c" opacity="0.35" />
              <circle cx="375" cy="168" r="2.5" fill="#7c6fff" opacity="0.3" />
              <circle cx="385" cy="150" r="3.5" fill="#f0a500" opacity="0.3" />
              <defs>
                <linearGradient id="bggrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#7c6fff" /><stop offset="100%" stopColor="#a89bff" /></linearGradient>
                <linearGradient id="deskgrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#d4caff" /><stop offset="100%" stopColor="#b8acf0" /></linearGradient>
                <linearGradient id="leggrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#c4baff" /><stop offset="100%" stopColor="#a090e0" /></linearGradient>
                <linearGradient id="laptopbase" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#e8e0ff" /><stop offset="100%" stopColor="#d0c8f8" /></linearGradient>
                <linearGradient id="screengrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#2d2060" /><stop offset="100%" stopColor="#1e1840" /></linearGradient>
                <linearGradient id="hingegrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#c4baff" /><stop offset="100%" stopColor="#9080e0" /></linearGradient>
                <linearGradient id="bodygrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#7c6fff" /><stop offset="100%" stopColor="#5b4fcf" /></linearGradient>
                <linearGradient id="skingrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#fcd5a0" /><stop offset="100%" stopColor="#f4b87a" /></linearGradient>
                <linearGradient id="armgrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#fcd5a0" /><stop offset="100%" stopColor="#f4b87a" /></linearGradient>
                <radialGradient id="skingrad2"><stop offset="0%" stopColor="#fcd5a0" /><stop offset="100%" stopColor="#f4b87a" /></radialGradient>
                <linearGradient id="greencard" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#0d2e1e" /><stop offset="100%" stopColor="#0a2418" /></linearGradient>
                <linearGradient id="purplecard" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#1e1a3a" /><stop offset="100%" stopColor="#16122e" /></linearGradient>
                <linearGradient id="cupgrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#5b4fcf" /><stop offset="100%" stopColor="#3b2fa8" /></linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </section>

      {/* STATS BAND */}
      <section className={`py-6 px-8 ${t.bg} border-y ${t.border}`}>
        <div className="max-w-5xl mx-auto grid grid-cols-4 gap-0">
          {[
            { val: '500+', label: 'Active students' },
            { val: '12k+', label: 'Problems tracked' },
            { val: '3k+', label: 'Applications logged' },
            { val: '94%', label: 'Placement rate' },
          ].map((s, i) => (
            <div key={i} className={`text-center px-4 ${i < 3 ? `border-r ${t.border}` : ''}`}>
              <div
                className="text-2xl font-extrabold tracking-tight"
                style={{ background: 'linear-gradient(135deg,#5b4fcf,#a89bff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
              >
                {s.val}
              </div>
              <div className={`text-xs mt-1 ${t.t3}`}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className={`py-16 px-8 ${t.bg2}`}>
        <div className="max-w-5xl mx-auto">
          <div className={`inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full mb-3 ${isDark ? 'bg-[#1e1a3a] text-[#a89bff]' : 'bg-[#f0eeff] text-[#5b4fcf]'}`}>✦ What's inside</div>
          <h2 className={`text-2xl font-extrabold tracking-tight mb-2 ${t.t1}`}>Everything built for placement season</h2>
          <p className={`text-sm mb-8 ${t.t2}`}>Four tools, one platform. Nothing you don't need.</p>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: '💻', color: isDark ? 'bg-[#1e1a3a]' : 'bg-[#f0eeff]', title: 'DSA Tracker', desc: 'Log every problem you solve. Filter by topic, difficulty, status. See your progress grow day by day.' },
              { icon: '💼', color: isDark ? 'bg-[#04342c]' : 'bg-[#ecfdf5]', title: 'Job Tracker', desc: 'Track every company from Applied to Selected. Update status in one click. Never lose track again.' },
              { icon: '📊', color: isDark ? 'bg-[#412402]' : 'bg-[#fffbeb]', title: 'Smart Dashboard', desc: 'Charts, weekly progress, and success rate. Your entire prep story in one beautiful dashboard.' },
              { icon: '📝', color: isDark ? 'bg-[#0c1a3a]' : 'bg-[#eff6ff]', title: 'Interview Notes', desc: 'Save OA patterns by company. Walk into every interview knowing exactly what to expect.' },
            ].map((f, i) => (
              <div key={i} className={`flex gap-4 items-start p-5 rounded-xl border ${t.card} transition-all hover:-translate-y-1 hover:border-[#7c6fff] cursor-default`}>
                <div className={`w-10 h-10 rounded-xl ${f.color} flex items-center justify-center text-xl flex-shrink-0`}>{f.icon}</div>
                <div>
                  <div className={`text-sm font-bold mb-1 ${t.t1}`}>{f.title}</div>
                  <div className={`text-xs leading-relaxed ${t.t2}`}>{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className={`py-16 px-8 ${t.bg}`}>
        <div className="max-w-5xl mx-auto">
          <div className={`inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full mb-3 ${isDark ? 'bg-[#1e1a3a] text-[#a89bff]' : 'bg-[#f0eeff] text-[#5b4fcf]'}`}>✦ How it works</div>
          <h2 className={`text-2xl font-extrabold tracking-tight mb-10 ${t.t1}`}>Get started in 3 steps</h2>
          <div className="grid grid-cols-3 gap-8">
            {[
              { n: '1', title: 'Create your account', desc: 'Sign up free in 30 seconds. No credit card. No setup required.' },
              { n: '2', title: 'Start tracking', desc: 'Add DSA problems, job applications, and interview notes as you go.' },
              { n: '3', title: 'Watch your progress', desc: 'See your dashboard grow with real charts and weekly stats.' },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-sm font-extrabold mx-auto mb-4 ${isDark ? 'border-[#252338] bg-[#1e1a3a] text-[#a89bff]' : 'border-[#e5e0ff] bg-[#f0eeff] text-[#5b4fcf]'}`}>{s.n}</div>
                <div className={`text-sm font-bold mb-2 ${t.t1}`}>{s.title}</div>
                <div className={`text-xs leading-relaxed ${t.t2}`}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CHECKLIST */}
      <section className={`py-16 px-8 ${t.bg2}`}>
        <div className="max-w-5xl mx-auto">
          <div className={`inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full mb-3 ${isDark ? 'bg-[#1e1a3a] text-[#a89bff]' : 'bg-[#f0eeff] text-[#5b4fcf]'}`}>✦ Everything is free</div>
          <h2 className={`text-2xl font-extrabold tracking-tight mb-8 ${t.t1}`}>No plans. No paywalls. All yours.</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              'DSA problem tracker with filters',
              'Job application tracker',
              'Interview notes by company',
              'Dashboard with real charts',
              'Weekly progress tracking',
              'Light and dark mode',
              'Secure JWT authentication',
              'Works on all devices',
            ].map((item, i) => (
              <div key={i} className={`flex items-center gap-3 px-4 py-3 rounded-xl border ${t.card} transition-all hover:border-[#7c6fff] text-xs ${t.t2}`}>
                <CheckCircle2 size={15} className="text-[#5b4fcf] flex-shrink-0" />
                {item}
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 text-sm font-bold px-8 py-3 bg-[#5b4fcf] hover:bg-[#4a3fb8] text-white rounded-xl transition-all hover:-translate-y-0.5"
              style={{ boxShadow: '0 4px 18px rgba(91,79,207,0.35)' }}
            >
              🚀 Create your free account <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-10 px-8">
        <div className="max-w-5xl mx-auto">
          <div
            className="rounded-2xl py-14 px-10 text-center relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg,#3b1fa8,#5b4fcf 50%,#7c6fff)' }}
          >
            <div className="absolute top-[-80px] right-[-80px] w-56 h-56 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}></div>
            <div className="absolute bottom-[-60px] left-[-40px] w-44 h-44 rounded-full" style={{ background: 'rgba(255,255,255,0.04)' }}></div>
            <h2 className="text-2xl font-extrabold text-white mb-2 relative z-10 tracking-tight">Ready to get placed this semester?</h2>
            <p className="text-sm text-purple-200 mb-7 relative z-10">Free forever · No credit card · Join 500+ students already using PrepPilot</p>
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 text-sm font-bold px-8 py-3 bg-white text-[#5b4fcf] rounded-xl hover:bg-purple-50 transition-all hover:-translate-y-0.5 relative z-10"
              style={{ boxShadow: '0 8px 24px rgba(0,0,0,0.15)' }}
            >
              🚀 Create your free account <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className={`px-8 py-6 border-t ${t.border} ${t.bg}`}>
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[#5b4fcf] rounded-md flex items-center justify-center text-white text-xs font-bold">PP</div>
            <span className={`text-xs font-semibold ${t.t2}`}>PrepPilot</span>
          </div>
          <p className={`text-xs ${t.t3}`}>© {new Date().getFullYear()} · Built with ❤️ for placement season</p>
          <div className="flex items-center gap-4">
            <Link to="/login" className={`text-xs ${t.t3} hover:text-[#7c6fff] transition-colors`}>Login</Link>
            <Link to="/signup" className={`text-xs ${t.t3} hover:text-[#7c6fff] transition-colors`}>Sign up</Link>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Landing;