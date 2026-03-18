import React, { useEffect, useState } from 'react';
import './UserDashboard.css';

function UserDashboard() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    const res = await fetch('http://localhost:8080/api/movies');
    const data = await res.json();
    setMovies(data);
  };

  const handleSearch = async () => {
    if (!search.trim()) { fetchMovies(); return; }
    const res = await fetch(`http://localhost:8080/api/movies/search?name=${search}`);
    const data = await res.json();
    setMovies(data);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div className="user-wrapper">

      {/* ── Header ── */}
      <div className="user-header">
        <div>
          <h1 className="user-title">Movies</h1>
          <p className="user-subtitle">{movies.length} titles available</p>
        </div>

        <div className="search-bar">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            placeholder="Search movies…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button className="search-btn" onClick={handleSearch}>Search</button>
        </div>
      </div>

      {/* ── Grid ── */}
      {movies.length === 0 ? (
        <div className="empty-state">No movies found.</div>
      ) : (
        <div className="movies-grid">
          {movies.map(m => (
            <div className="movie-card" key={m.id}>
              <div className="card-top">
                <span className="card-genre">{m.genre || 'General'}</span>
                {m.rating && <span className="card-rating">⭐ {m.rating}</span>}
              </div>
              <h3 className="card-title">{m.name}</h3>
              <p className="card-actors">{m.actors || '—'}</p>
              <p className="card-description">{m.description || 'No description available.'}</p>
              {m.reviews && (
                <div className="card-review">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
                  </svg>
                  {m.reviews}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserDashboard;