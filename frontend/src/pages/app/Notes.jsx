import { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import api from '../../api/axios';
import toast from 'react-hot-toast';
import { Plus, Search, Trash2, Edit2, X, StickyNote } from 'lucide-react';

const emptyForm = { company: '', content: '' };

const cardColors = [
  { bg: 'bg-violet-500/10', text: 'text-violet-400' },
  { bg: 'bg-emerald-500/10', text: 'text-emerald-500' },
  { bg: 'bg-amber-500/10', text: 'text-amber-500' },
  { bg: 'bg-blue-500/10', text: 'text-blue-500' },
  { bg: 'bg-red-500/10', text: 'text-red-400' },
];

const Notes = () => {
  const { isDark } = useTheme();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState('');

  const fetchNotes = async () => {
    try {
      const res = await api.get('/notes');
      setNotes(res.data);
    } catch {
      toast.error('Failed to load notes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const openAdd = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowModal(true);
  };

  const openEdit = (note) => {
    setForm({ company: note.company || '', content: note.content || '' });
    setEditingId(note._id);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingId(null);
    setForm(emptyForm);
  };

  const handleSave = async () => {
    if (!form.company || !form.content) {
      toast.error('Company and note content are required');
      return;
    }
    try {
      setSaving(true);
      if (editingId) {
        await api.put(`/notes/${editingId}`, form);
        toast.success('Note updated');
      } else {
        await api.post('/notes', form);
        toast.success('Note added');
      }
      closeModal();
      fetchNotes();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this note?')) return;
    try {
      await api.delete(`/notes/${id}`);
      toast.success('Note deleted');
      fetchNotes();
    } catch {
      toast.error('Failed to delete');
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const filteredNotes = notes.filter(n =>
    (n.company || '').toLowerCase().includes(search.toLowerCase()) ||
    (n.content || '').toLowerCase().includes(search.toLowerCase())
  );

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
             Notes
          </h1>
          <p className={`text-sm mt-0.5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
            {notes.length} note{notes.length !== 1 ? 's' : ''} saved
          </p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium rounded-lg transition-all"
        >
          <Plus size={16} /> Add note
        </button>
      </div>

      {/* Search */}
      <div className={`flex items-center gap-3 mb-5 p-3 rounded-xl border ${isDark ? 'bg-[#1a1d27] border-gray-800' : 'bg-white border-gray-200 shadow-sm'}`}>
        <div className="relative flex-1">
          <Search size={14} className={`absolute left-3 top-1/2 -translate-y-1/2 ${isDark ? 'text-gray-600' : 'text-gray-400'}`} />
          <input
            type="text"
            placeholder="Search by company or content..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className={`w-full pl-8 pr-3 py-2 rounded-lg border text-sm outline-none ${isDark ? 'bg-gray-900 border-gray-700 text-white placeholder-gray-600 focus:border-violet-500' : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-violet-500'}`}
          />
        </div>
        {search && (
          <button
            onClick={() => setSearch('')}
            className="text-xs text-violet-500 hover:text-violet-400 whitespace-nowrap"
          >
            Clear search
          </button>
        )}
      </div>

      {/* Notes grid */}
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <div className="w-6 h-6 border-2 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : filteredNotes.length === 0 ? (
        <div className={`flex flex-col items-center justify-center py-20 rounded-xl border ${isDark ? 'bg-[#1a1d27] border-gray-800' : 'bg-white border-gray-200 shadow-sm'}`}>
          <StickyNote size={32} className={isDark ? 'text-gray-700' : 'text-gray-300'} />
          <p className={`text-sm mt-3 ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
            {search ? 'No notes match your search' : 'No notes yet — add your first one!'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {filteredNotes.map((note, i) => {
            const color = cardColors[i % cardColors.length];
            return (
              <div
                key={note._id}
                className={`relative rounded-xl border p-5 transition-all hover:-translate-y-1 group ${isDark ? 'bg-[#1a1d27] border-gray-800 hover:border-gray-700' : 'bg-white border-gray-200 shadow-sm hover:shadow-md'}`}
              >
                <div className="absolute top-3 right-3 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all">
                  <button
                    onClick={() => openEdit(note)}
                    className={`p-1.5 rounded-lg ${isDark ? 'text-gray-500 hover:text-white hover:bg-gray-800' : 'text-gray-400 hover:text-gray-700 hover:bg-gray-100'}`}
                  >
                    <Edit2 size={14} />
                  </button>
                  <button
                    onClick={() => handleDelete(note._id)}
                    className={`p-1.5 rounded-lg ${isDark ? 'text-gray-500 hover:text-red-400 hover:bg-red-500/10' : 'text-gray-400 hover:text-red-500 hover:bg-red-50'}`}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>

                <span className={`text-xs font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full ${color.bg} ${color.text}`}>
                  {note.company || 'Unknown'}
                </span>

                <p className={`text-sm leading-relaxed mt-3 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {note.content || ''}
                </p>

                <p className={`text-xs mt-4 ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
                  {formatDate(note.createdAt)}
                </p>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={closeModal}></div>
          <div className={`relative w-full max-w-md rounded-2xl border shadow-2xl p-6 z-10 ${isDark ? 'bg-[#1a1d27] border-gray-700' : 'bg-white border-gray-200'}`}>

            <div className="flex items-center justify-between mb-5">
              <h2 className={`text-base font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {editingId ? 'Edit note' : 'Add note'}
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
                <label className={labelClass}>Note *</label>
                <textarea
                  rows={4}
                  placeholder="e.g. OA had 2 DSA questions on trees and graphs. 90 mins. Focus on edge cases."
                  value={form.content}
                  onChange={e => setForm({ ...form, content: e.target.value })}
                  className={`${inputClass} resize-none`}
                />
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
                  : editingId ? 'Save changes' : 'Add note'
                }
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notes;