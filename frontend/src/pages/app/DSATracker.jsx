import { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import api from '../../api/axios';
import toast from 'react-hot-toast';
import { Plus, Search, Edit2, Trash2, X, Check } from 'lucide-react';

const TOPICS = ['Arrays', 'Strings', 'Linked List', 'Trees', 'Graphs', 'DP', 'Recursion', 'Sorting', 'Binary Search', 'Stacks', 'Queues', 'Heaps', 'Greedy', 'Backtracking', 'Math'];
const DIFFICULTIES = ['Easy', 'Medium', 'Hard'];
const STATUSES = ['Pending', 'Solved'];

const diffBadge = {
  Easy: 'bg-emerald-500/10 text-emerald-500',
  Medium: 'bg-amber-500/10 text-amber-500',
  Hard: 'bg-red-500/10 text-red-500',
};

const statusBadge = {
  Solved: 'bg-emerald-500/10 text-emerald-500',
  Pending: 'bg-gray-500/10 text-gray-500',
};

const emptyForm = { title: '', topic: '', difficulty: 'Easy', status: 'Pending', link: '' };

const DSATracker = () => {
  const { isDark } = useTheme();
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState('');
  const [filterTopic, setFilterTopic] = useState('');
  const [filterDiff, setFilterDiff] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const fetchProblems = async () => {
    try {
      const params = {};
      if (filterTopic) params.topic = filterTopic;
      if (filterDiff) params.difficulty = filterDiff;
      if (filterStatus) params.status = filterStatus;
      if (search) params.search = search;
      const res = await api.get('/problems', { params });
      setProblems(res.data);
    } catch {
      toast.error('Failed to load problems');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProblems();
  }, [search, filterTopic, filterDiff, filterStatus]);

  const openAdd = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowModal(true);
  };

  const openEdit = (p) => {
    setForm({ title: p.title, topic: p.topic, difficulty: p.difficulty, status: p.status, link: p.link || '' });
    setEditingId(p._id);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingId(null);
    setForm(emptyForm);
  };

  const handleSave = async () => {
    if (!form.title || !form.topic) {
      toast.error('Title and topic are required');
      return;
    }
    try {
      setSaving(true);
      if (editingId) {
        await api.put(`/problems/${editingId}`, form);
        toast.success('Problem updated');
      } else {
        await api.post('/problems', form);
        toast.success('Problem added');
      }
      closeModal();
      fetchProblems();
    } catch {
      toast.error('Something went wrong');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this problem?')) return;
    try {
      await api.delete(`/problems/${id}`);
      toast.success('Problem deleted');
      fetchProblems();
    } catch {
      toast.error('Failed to delete');
    }
  };

  const toggleStatus = async (p) => {
    const newStatus = p.status === 'Solved' ? 'Pending' : 'Solved';
    try {
      await api.put(`/problems/${p._id}`, { status: newStatus });
      toast.success(newStatus === 'Solved' ? 'Marked as solved! 🎉' : 'Marked as pending');
      fetchProblems();
    } catch {
      toast.error('Failed to update status');
    }
  };

  const inputClass = `w-full px-3 py-2 rounded-lg border text-sm outline-none transition-all ${
    isDark
      ? 'bg-gray-900 border-gray-700 text-white placeholder-gray-600 focus:border-violet-500'
      : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-violet-500'
  }`;

  const labelClass = `block text-xs font-medium mb-1.5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`;

  return (
    <div className="p-6">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>DSA Tracker</h1>
          <p className={`text-sm mt-0.5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
            {problems.length} problem{problems.length !== 1 ? 's' : ''} tracked
          </p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium rounded-lg transition-all"
        >
          <Plus size={16} /> Add problem
        </button>
      </div>

      {/* Filters */}
      <div className={`flex items-center gap-3 mb-5 p-3 rounded-xl border ${isDark ? 'bg-[#1a1d27] border-gray-800' : 'bg-white border-gray-200 shadow-sm'}`}>
        <div className="relative flex-1">
          <Search size={14} className={`absolute left-3 top-1/2 -translate-y-1/2 ${isDark ? 'text-gray-600' : 'text-gray-400'}`} />
          <input
            type="text"
            placeholder="Search problems..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className={`w-full pl-8 pr-3 py-2 rounded-lg border text-sm outline-none ${isDark ? 'bg-gray-900 border-gray-700 text-white placeholder-gray-600 focus:border-violet-500' : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-violet-500'}`}
          />
        </div>
        <select value={filterTopic} onChange={e => setFilterTopic(e.target.value)} className={`px-3 py-2 rounded-lg border text-sm outline-none ${isDark ? 'bg-gray-900 border-gray-700 text-gray-300' : 'bg-gray-50 border-gray-200 text-gray-600'}`}>
          <option value="">All topics</option>
          {TOPICS.map(t => <option key={t}>{t}</option>)}
        </select>
        <select value={filterDiff} onChange={e => setFilterDiff(e.target.value)} className={`px-3 py-2 rounded-lg border text-sm outline-none ${isDark ? 'bg-gray-900 border-gray-700 text-gray-300' : 'bg-gray-50 border-gray-200 text-gray-600'}`}>
          <option value="">All difficulty</option>
          {DIFFICULTIES.map(d => <option key={d}>{d}</option>)}
        </select>
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className={`px-3 py-2 rounded-lg border text-sm outline-none ${isDark ? 'bg-gray-900 border-gray-700 text-gray-300' : 'bg-gray-50 border-gray-200 text-gray-600'}`}>
          <option value="">All status</option>
          {STATUSES.map(s => <option key={s}>{s}</option>)}
        </select>
        {(search || filterTopic || filterDiff || filterStatus) && (
          <button onClick={() => { setSearch(''); setFilterTopic(''); setFilterDiff(''); setFilterStatus(''); }} className="text-xs text-violet-500 hover:text-violet-400 whitespace-nowrap">
            Clear filters
          </button>
        )}
      </div>

      {/* Table */}
      <div className={`rounded-xl border overflow-hidden ${isDark ? 'bg-[#1a1d27] border-gray-800' : 'bg-white border-gray-200 shadow-sm'}`}>
        {/* Table header */}
        <div className={`grid grid-cols-12 px-4 py-3 text-xs font-semibold uppercase tracking-wider border-b ${isDark ? 'text-gray-500 border-gray-800' : 'text-gray-400 border-gray-100'}`}>
          <span className="col-span-4">Problem</span>
          <span className="col-span-2">Topic</span>
          <span className="col-span-2">Difficulty</span>
          <span className="col-span-2">Status</span>
          <span className="col-span-2 text-right">Actions</span>
        </div>

        {/* Rows */}
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="w-6 h-6 border-2 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : problems.length === 0 ? (
          <div className={`text-center py-16 text-sm ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
            No problems found. Add your first one!
          </div>
        ) : (
          problems.map((p, i) => (
            <div
              key={p._id}
              className={`grid grid-cols-12 px-4 py-3.5 items-center border-b transition-all group ${
                i === problems.length - 1 ? 'border-transparent' : isDark ? 'border-gray-800' : 'border-gray-50'
              } ${isDark ? 'hover:bg-gray-800/40' : 'hover:bg-gray-50'}`}
            >
              <div className="col-span-4 pr-4">
                <div className={`text-sm font-medium truncate ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>{p.title}</div>
                {p.link && (
                  <a href={p.link} target="_blank" rel="noreferrer" className="text-[11px] text-violet-400 hover:underline">
                    View problem ↗
                  </a>
                )}
              </div>
              <div className={`col-span-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{p.topic}</div>
              <div className="col-span-2">
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${diffBadge[p.difficulty]}`}>
                  {p.difficulty}
                </span>
              </div>
              <div className="col-span-2">
                <button
                  onClick={() => toggleStatus(p)}
                  className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full transition-all ${statusBadge[p.status]} hover:opacity-80`}
                >
                  {p.status === 'Solved' && <Check size={11} />}
                  {p.status}
                </button>
              </div>
              <div className="col-span-2 flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => openEdit(p)}
                  className={`p-1.5 rounded-lg border transition-all ${isDark ? 'border-gray-700 text-gray-400 hover:text-white hover:border-gray-600' : 'border-gray-200 text-gray-400 hover:text-gray-700'}`}
                >
                  <Edit2 size={13} />
                </button>
                <button
                  onClick={() => handleDelete(p._id)}
                  className={`p-1.5 rounded-lg border transition-all ${isDark ? 'border-gray-700 text-gray-400 hover:text-red-400 hover:border-red-400/30' : 'border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-200'}`}
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={closeModal}></div>
          <div className={`relative w-full max-w-md rounded-2xl border shadow-2xl p-6 z-10 ${isDark ? 'bg-[#1a1d27] border-gray-700' : 'bg-white border-gray-200'}`}>

            {/* Modal header */}
            <div className="flex items-center justify-between mb-5">
              <h2 className={`text-base font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {editingId ? 'Edit problem' : 'Add problem'}
              </h2>
              <button onClick={closeModal} className={`p-1.5 rounded-lg ${isDark ? 'text-gray-400 hover:text-white hover:bg-gray-800' : 'text-gray-400 hover:text-gray-700 hover:bg-gray-100'}`}>
                <X size={16} />
              </button>
            </div>

            {/* Form */}
            <div className="space-y-4">
              <div>
                <label className={labelClass}>Problem title *</label>
                <input
                  type="text"
                  placeholder="e.g. Two Sum"
                  value={form.title}
                  onChange={e => setForm({ ...form, title: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Topic *</label>
                <select value={form.topic} onChange={e => setForm({ ...form, topic: e.target.value })} className={inputClass}>
                  <option value="">Select topic</option>
                  {TOPICS.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelClass}>Difficulty</label>
                  <select value={form.difficulty} onChange={e => setForm({ ...form, difficulty: e.target.value })} className={inputClass}>
                    {DIFFICULTIES.map(d => <option key={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Status</label>
                  <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} className={inputClass}>
                    {STATUSES.map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className={labelClass}>Problem link (optional)</label>
                <input
                  type="url"
                  placeholder="https://leetcode.com/problems/..."
                  value={form.link}
                  onChange={e => setForm({ ...form, link: e.target.value })}
                  className={inputClass}
                />
              </div>
            </div>

            {/* Modal footer */}
            <div className="flex items-center justify-end gap-3 mt-6">
              <button onClick={closeModal} className={`px-4 py-2 rounded-lg text-sm border ${isDark ? 'border-gray-700 text-gray-400 hover:text-white' : 'border-gray-200 text-gray-500 hover:text-gray-800'}`}>
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-4 py-2 rounded-lg text-sm bg-violet-600 hover:bg-violet-700 text-white font-medium disabled:opacity-60 flex items-center gap-2"
              >
                {saving ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : editingId ? 'Save changes' : 'Add problem'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DSATracker;