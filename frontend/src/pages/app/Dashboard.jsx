import { useEffect, useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import api from '../../api/axios';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import {
  Code2, Briefcase, MessageSquare, TrendingUp,
  ArrowUp, Clock
} from 'lucide-react';

const DIFFICULTY_COLORS = {
  Easy: '#22d07a',
  Medium: '#f5a623',
  Hard: '#ff5c7c',
};

const CustomTooltip = ({ active, payload, label, isDark }) => {
  if (active && payload && payload.length) {
    return (
      <div className={`px-3 py-2 rounded-lg text-xs shadow-lg border ${isDark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200 text-gray-800'}`}>
        <p className="font-medium">{label}</p>
        <p className="text-violet-500">{payload[0].value} solved</p>
      </div>
    );
  }
  return null;
};

const StatCard = ({ icon, label, value, sub, subColor, isDark }) => (
  <div className={`rounded-xl border p-5 transition-all hover:translate-y-[-2px] ${isDark ? 'bg-[#1a1d27] border-gray-800' : 'bg-white border-gray-200 shadow-sm'}`}>
    <div className="flex items-start justify-between mb-4">
      <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
        {icon}
      </div>
    </div>
    <div className={`text-2xl font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>{value}</div>
    <div className={`text-xs mb-2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{label}</div>
    {sub && (
      <div className={`text-xs font-medium flex items-center gap-1 ${subColor}`}>
        <ArrowUp size={11} />{sub}
      </div>
    )}
  </div>
);

const Dashboard = () => {
  const { isDark } = useTheme();
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/dashboard');
        setStats(res.data);
      } catch (err) {
        console.error('Failed to fetch dashboard stats', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="w-8 h-8 border-4 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const overview = stats?.overview || {};
  const charts = stats?.charts || {};
  const recentActivity = stats?.recentActivity || {};
  const weeklyProgress = stats?.weeklyProgress || {};

  const topicData = charts.problemsByTopic || [];
  const difficultyData = (charts.problemsByDifficulty || []).map(d => ({
    name: d.difficulty,
    value: d.count,
  }));

  const maxWeek = Math.max(
    weeklyProgress.problemsThisWeek || 0,
    weeklyProgress.problemsLastWeek || 0,
    weeklyProgress.applicationsThisWeek || 0,
    weeklyProgress.applicationsLastWeek || 0,
    1
  );

  const weekBars = [
    { label: 'DSA this week', value: weeklyProgress.problemsThisWeek || 0, color: '#7c6fff' },
    { label: 'DSA last week', value: weeklyProgress.problemsLastWeek || 0, color: '#a78bff' },
    { label: 'Apps this week', value: weeklyProgress.applicationsThisWeek || 0, color: '#22d07a' },
    { label: 'Apps last week', value: weeklyProgress.applicationsLastWeek || 0, color: '#1a6645' },
  ];

  return (
    <div className="p-6 space-y-6">

      {/* Header */}
      <div>
        <h1 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Welcome back, {user?.name?.split(' ')[0]} 👋
        </h1>
        <p className={`text-sm mt-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
          Here's your placement prep at a glance
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard
          isDark={isDark}
          icon={<Code2 size={17} className="text-violet-500" />}
          label="Problems solved"
          value={overview.totalSolved ?? 0}
          sub={`of ${overview.totalProblems ?? 0} total`}
          subColor="text-violet-400"
        />
        <StatCard
          isDark={isDark}
          icon={<Briefcase size={17} className="text-emerald-500" />}
          label="Applications sent"
          value={overview.totalApplications ?? 0}
          sub="tracked so far"
          subColor="text-emerald-400"
        />
        <StatCard
          isDark={isDark}
          icon={<MessageSquare size={17} className="text-amber-500" />}
          label="Interviews"
          value={overview.totalInterviews ?? 0}
          sub={`${overview.totalOffers ?? 0} offers received`}
          subColor="text-amber-400"
        />
        <StatCard
          isDark={isDark}
          icon={<TrendingUp size={17} className="text-blue-500" />}
          label="Success rate"
          value={`${overview.successRate ?? 0}%`}
          sub="offers ÷ applications"
          subColor="text-blue-400"
        />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-5 gap-4">

        {/* Bar chart — problems by topic */}
        <div className={`col-span-3 rounded-xl border p-5 ${isDark ? 'bg-[#1a1d27] border-gray-800' : 'bg-white border-gray-200 shadow-sm'}`}>
          <div className="mb-4">
            <h2 className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Problems by topic</h2>
            <p className={`text-xs mt-0.5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Solved problems only</p>
          </div>
          {topicData.length === 0 ? (
            <div className={`flex items-center justify-center h-40 text-sm ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
              No data yet — start solving problems!
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={topicData} barSize={28}>
                <XAxis dataKey="topic" tick={{ fontSize: 11, fill: isDark ? '#6b7280' : '#9ca3af' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: isDark ? '#6b7280' : '#9ca3af' }} axisLine={false} tickLine={false} allowDecimals={false} />
                <Tooltip content={<CustomTooltip isDark={isDark} />} cursor={{ fill: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)' }} />
                <Bar dataKey="count" fill="#7c6fff" radius={[5, 5, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Donut chart — difficulty */}
        <div className={`col-span-2 rounded-xl border p-5 ${isDark ? 'bg-[#1a1d27] border-gray-800' : 'bg-white border-gray-200 shadow-sm'}`}>
          <div className="mb-4">
            <h2 className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Difficulty split</h2>
            <p className={`text-xs mt-0.5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>All problems</p>
          </div>
          {difficultyData.length === 0 ? (
            <div className={`flex items-center justify-center h-40 text-sm ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
              No data yet
            </div>
          ) : (
            <div className="relative">
              <ResponsiveContainer width="100%" height={160}>
                <PieChart>
                  <Pie
                    data={difficultyData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {difficultyData.map((entry, index) => (
                      <Cell key={index} fill={DIFFICULTY_COLORS[entry.name] || '#7c6fff'} />
                    ))}
                  </Pie>
                  <Legend
                    iconType="circle"
                    iconSize={8}
                    formatter={(value) => (
                      <span style={{ fontSize: 11, color: isDark ? '#9ca3af' : '#6b7280' }}>{value}</span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute top-[38px] left-1/2 -translate-x-1/2 text-center pointer-events-none">
                <div className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {overview.totalProblems ?? 0}
                </div>
                <div className={`text-[10px] ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>total</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-2 gap-4">

        {/* Weekly progress */}
        <div className={`rounded-xl border p-5 ${isDark ? 'bg-[#1a1d27] border-gray-800' : 'bg-white border-gray-200 shadow-sm'}`}>
          <h2 className={`text-sm font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Weekly progress</h2>
          <div className="space-y-3">
            {weekBars.map((bar, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className={`text-xs w-28 flex-shrink-0 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{bar.label}</span>
                <div className={`flex-1 h-2 rounded-full overflow-hidden ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${(bar.value / maxWeek) * 100}%`, background: bar.color }}
                  ></div>
                </div>
                <span className={`text-xs font-semibold w-4 text-right ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{bar.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent activity */}
        <div className={`rounded-xl border p-5 ${isDark ? 'bg-[#1a1d27] border-gray-800' : 'bg-white border-gray-200 shadow-sm'}`}>
          <h2 className={`text-sm font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Recent activity</h2>
          <div className="space-y-3">
            {[
              ...(recentActivity.recentProblems || []).map(p => ({
                type: 'problem',
                title: `${p.status === 'Solved' ? 'Solved' : 'Added'} — ${p.title}`,
                sub: `${p.topic} • ${p.difficulty}`,
                color: '#7c6fff',
              })),
              ...(recentActivity.recentApplications || []).map(a => ({
                type: 'application',
                title: `Applied — ${a.company}`,
                sub: `${a.role} • ${a.status}`,
                color: '#22d07a',
              })),
            ]
              .slice(0, 5)
              .map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: item.color }}></div>
                  <div>
                    <div className={`text-xs font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>{item.title}</div>
                    <div className={`text-[11px] mt-0.5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{item.sub}</div>
                  </div>
                </div>
              ))}
            {(!recentActivity.recentProblems?.length && !recentActivity.recentApplications?.length) && (
              <div className={`text-sm ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
                No activity yet — start adding problems!
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;