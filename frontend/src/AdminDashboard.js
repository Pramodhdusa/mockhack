import React, { useEffect, useState } from 'react';
import './AdminDashboard.css';

function AdminDashboard() {
  const [movies, setMovies] = useState([]);
  const [form, setForm] = useState({
    name: '', actors: '', description: '', genre: '', rating: '', reviews: ''
  });
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    const res = await fetch('http://localhost:8080/api/movies');
    const data = await res.json();
    setMovies(data);
  };

  const handleSubmit = async () => {
    if (editId) {
      await fetch(`http://localhost:8080/api/movies/${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
    } else {
      await fetch('http://localhost:8080/api/movies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
    }
    setForm({ name: '', actors: '', description: '', genre: '', rating: '', reviews: '' });
    setEditId(null);
    setShowForm(false);
    fetchMovies();
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this movie?')) return;
    await fetch(`http://localhost:8080/api/movies/${id}`, { method: 'DELETE' });
    fetchMovies();
  };

  const handleEdit = (movie) => {
    setForm(movie);
    setEditId(movie.id);
    setShowForm(true);
  };

  const handleCancel = () => {
    setForm({ name: '', actors: '', description: '', genre: '', rating: '', reviews: '' });
    setEditId(null);
    setShowForm(false);
  };

  return (
    <div className="admin-wrapper">

      {/* ── Header ── */}
      <div className="admin-header">
        <div>
          <h1 className="admin-title">Admin Dashboard</h1>
          <p className="admin-subtitle">Manage your movie catalog</p>
        </div>
        {!showForm && (
          <button className="add-btn" onClick={() => setShowForm(true)}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Add Movie
          </button>
        )}
      </div>

      {/* ── Form ── */}
      {showForm && (
        <div className="admin-form-card">
          <h2 className="form-heading">{editId ? 'Edit Movie' : 'Add New Movie'}</h2>
          <div className="form-grid">
            <input
              className="admin-input"
              placeholder="Movie name"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
            />
            <input
              className="admin-input"
              placeholder="Genre"
              value={form.genre}
              onChange={e => setForm({ ...form, genre: e.target.value })}
            />
            <input
              className="admin-input"
              placeholder="Actors"
              value={form.actors}
              onChange={e => setForm({ ...form, actors: e.target.value })}
            />
            <input
              className="admin-input"
              placeholder="Rating (e.g. 8.5)"
              value={form.rating}
              onChange={e => setForm({ ...form, rating: e.target.value })}
            />
            <input
              className="admin-input full-width"
              placeholder="Description"
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
            />
            <input
              className="admin-input full-width"
              placeholder="Reviews"
              value={form.reviews}
              onChange={e => setForm({ ...form, reviews: e.target.value })}
            />
          </div>
          <div className="form-actions">
            <button className="btn-cancel" onClick={handleCancel}>Cancel</button>
            <button className="btn-submit" onClick={handleSubmit}>
              {editId ? 'Update Movie' : 'Add Movie'}
            </button>
          </div>
        </div>
      )}

      {/* ── Table ── */}
      <div className="table-card">
        <div className="table-header-row">
          <span className="table-count">{movies.length} Movies</span>
        </div>
        <table className="movie-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Genre</th>
              <th>Actors</th>
              <th>Rating</th>
              <th>Description</th>
              <th>Reviews</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {movies.length === 0 ? (
              <tr>
                <td colSpan="8" className="empty-row">No movies found. Add one above.</td>
              </tr>
            ) : (
              movies.map((m, i) => (
                <tr key={m.id}>
                  <td className="td-muted">{i + 1}</td>
                  <td className="td-bold">{m.name}</td>
                  <td>{m.genre || '—'}</td>
                  <td className="td-muted">{m.actors || '—'}</td>
                  <td>
                    {m.rating ? (
                      <span className="rating-badge">⭐ {m.rating}</span>
                    ) : '—'}
                  </td>
                  <td className="td-truncate">{m.description || '—'}</td>
                  <td className="td-truncate">{m.reviews || '—'}</td>
                  <td>
                    <div className="action-btns">
                      <button className="btn-edit" onClick={() => handleEdit(m)}>Edit</button>
                      <button className="btn-delete" onClick={() => handleDelete(m.id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminDashboard;