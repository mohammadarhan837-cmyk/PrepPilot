import { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import api from '../../api/axios';
import toast from 'react-hot-toast';
import { Plus, Search, Edit2, Trash2, X } from 'lucide-react';

const STATUSES = ['Applied', 'OA Cleared', 'Interview', 'Selected', 'Rejected'];

const statusBadge = {
  Applied: 'bg-blue-500/10 text-blue-500',
  'OA Cleared': 'bg-violet-500/10 text-violet-400',
  Interview: 'bg-amber-500/10 text-amber-500',
  Selected: 'bg-emerald-500/10 text-emerald-500',
  Rejected: 'bg-red-500/10 text-red-500',
};

const emptyForm = { company: '', role: '', status: 'Applied', appliedDate: '' };

const JobTracker = () => {
  const { isDark } = useTheme();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const fetchApplications = async () => {
    try {
      const params = {};
      if (filterStatus) params.status = filterStatus;
      if (search) params.search = search;
      const res = await api.get('/applications', { params });
      setApplications(res.data);
    } catch {
      toast.error('Failed to load applications');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [search, filterStatus]);

  const openAdd = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowModal(true);
  };

  const openEdit = (a) => {
    setForm({
      company: a.company,
      role: a.role,
      status: a.status,
      appliedDate: a.appliedDate ? a.appliedDate.split('T')[0] : '',
    });
    setEditingId(a._id);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingId(null);
    setForm(emptyForm);
  };

  const handleSave = async () => {
    if (!form.company || !form.role) {
      toast.error('Company and role are required');
      return;
    }
    try {
      setSaving(true);
      if (editingId) {
        await api.put(`/applications/${editingId}`, form);
        toast.success('Application updated');
      } else {
        await api.post('/applications', form);
        toast.success('Application added');
      }
      closeModal();
      fetchApplications();
    } catch {
      toast.error('Something went wrong');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this application?')) return;
    try {
      await api.delete(`/applications/${id}`);
      toast.success('Application deleted');
      fetchApplications();
    } catch {
      toast.error('Failed to delete');
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
    });
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
          <h1 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Job Tracker
          </h1>
          <p className={`text-sm mt-0.5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
            {applications.length} application{applications.length !== 1 ? 's' : ''} tracked
          </p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium rounded-lg transition-all"
        >
          <Plus size={16} /> Add application
        </button>
      </div>

      {/* Status summary cards */}
      <div className="grid grid-cols-5 gap-3 mb-5">
        {STATUSES.map((s) => {
          const count = applications.filter(a => a.status === s).length;
          return (
            <button
              key={s}
              onClick={() => setFilterStatus(filterStatus === s ? '' : s)}
              className={`rounded-xl border p-3 text-left transition-all hover:-translate-y-0.5 ${
                filterStatus === s
                  ? isDark ? 'border-violet-500 bg-violet-500/10' : 'border-violet-400 bg-violet-50'
                  : isDark ? 'bg-[#1a1d27] border-gray-800' : 'bg-white border-gray-200 shadow-sm'
              }`}
            >
              <div className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{count}</div>
              <div className={`text-xs mt-0.5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{s}</div>
            </button>
          );
        })}
      </div>

      {/* Filters */}
      <div className={`flex items-center gap-3 mb-5 p-3 rounded-xl border ${isDark ? 'bg-[#1a1d27] border-gray-800' : 'bg-white border-gray-200 shadow-sm'}`}>
        <div className="relative flex-1">
          <Search size={14} className={`absolute left-3 top-1/2 -translate-y-1/2 ${isDark ? 'text-gray-600' : 'text-gray-400'}`} />
          <input
            type="text"
            placeholder="Search company..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className={`w-full pl-8 pr-3 py-2 rounded-lg border text-sm outline-none ${isDark ? 'bg-gray-900 border-gray-700 text-white placeholder-gray-600 focus:border-violet-500' : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-violet-500'}`}
          />
        </div>
        <select
          value={filterStatus}
          onChange={e => setFilterStatus(e.target.value)}
          className={`px-3 py-2 rounded-lg border text-sm outline-none ${isDark ? 'bg-gray-900 border-gray-700 text-gray-300' : 'bg-gray-50 border-gray-200 text-gray-600'}`}
        >
          <option value="">All status</option>
          {STATUSES.map(s => <option key={s}>{s}</option>)}
        </select>
        {(search || filterStatus) && (
          <button
            onClick={() => { setSearch(''); setFilterStatus(''); }}
            className="text-xs text-violet-500 hover:text-violet-400 whitespace-nowrap"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Table */}
      <div className={`rounded-xl border overflow-hidden ${isDark ? 'bg-[#1a1d27] border-gray-800' : 'bg-white border-gray-200 shadow-sm'}`}>
        <div className={`grid grid-cols-12 px-4 py-3 text-xs font-semibold uppercase tracking-wider border-b ${isDark ? 'text-gray-500 border-gray-800' : 'text-gray-400 border-gray-100'}`}>
          <span className="col-span-3">Company</span>
          <span className="col-span-3">Role</span>
          <span className="col-span-2">Status</span>
          <span className="col-span-2">Applied</span>
          <span className="col-span-2 text-right">Actions</span>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="w-6 h-6 border-2 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : applications.length === 0 ? (
          <div className={`text-center py-16 text-sm ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
            No applications found. Add your first one!
          </div>
        ) : (
          applications.map((a, i) => (
            <div
              key={a._id}
              className={`grid grid-cols-12 px-4 py-3.5 items-center border-b transition-all group ${
                i === applications.length - 1 ? 'border-transparent' : isDark ? 'border-gray-800' : 'border-gray-50'
              } ${isDark ? 'hover:bg-gray-800/40' : 'hover:bg-gray-50'}`}
            >
              <div className="col-span-3">
                <div className={`text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>{a.company}</div>
              </div>
              <div className={`col-span-3 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{a.role}</div>
              <div className="col-span-2">
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusBadge[a.status]}`}>
                  {a.status}
                </span>
              </div>
              <div className={`col-span-2 text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                {formatDate(a.appliedDate)}
              </div>
              <div className="col-span-2 flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => openEdit(a)}
                  className={`p-1.5 rounded-lg border transition-all ${isDark ? 'border-gray-700 text-gray-400 hover:text-white hover:border-gray-600' : 'border-gray-200 text-gray-400 hover:text-gray-700'}`}
                >
                  <Edit2 size={13} />
                </button>
                <button
                  onClick={() => handleDelete(a._id)}
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

            <div className="flex items-center justify-between mb-5">
              <h2 className={`text-base font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {editingId ? 'Edit application' : 'Add application'}
              </h2>
              <button
                onClick={closeModal}
                className={`p-1.5 rounded-lg ${isDark ? 'text-gray-400 hover:text-white hover:bg-gray-800' : 'text-gray-400 hover:text-gray-700 hover:bg-gray-100'}`}
              >
                <X size={16} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className={labelClass}>Company name *</label>
                <input
                  type="text"
                  placeholder="e.g. Amazon"
                  value={form.company}
                  onChange={e => setForm({ ...form, company: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Role *</label>
                <input
                  type="text"
                  placeholder="e.g. SDE Intern"
                  value={form.role}
                  onChange={e => setForm({ ...form, role: e.target.value })}
                  className={inputClass}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelClass}>Status</label>
                  <select
                    value={form.status}
                    onChange={e => setForm({ ...form, status: e.target.value })}
                    className={inputClass}
                  >
                    {STATUSES.map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Applied date</label>
                  <input
                    type="date"
                    value={form.appliedDate}
                    onChange={e => setForm({ ...form, appliedDate: e.target.value })}
                    className={inputClass}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 mt-6">
              <button
                onClick={closeModal}
                className={`px-4 py-2 rounded-lg text-sm border ${isDark ? 'border-gray-700 text-gray-400 hover:text-white' : 'border-gray-200 text-gray-500 hover:text-gray-800'}`}
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-4 py-2 rounded-lg text-sm bg-violet-600 hover:bg-violet-700 text-white font-medium disabled:opacity-60 flex items-center gap-2"
              >
                {saving
                  ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  : editingId ? 'Save changes' : 'Add application'
                }
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobTracker;