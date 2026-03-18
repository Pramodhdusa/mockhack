import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RegistrationForm from './RegistrationForm';
import LoginForm from './LoginForm';

const HomePage = () => {
  const navigate = useNavigate();
  const [showRegistration, setShowRegistration] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="index-container">

      {/* ── Navbar ── */}
      <nav className="navbar">
        <div className="logo-container">
          <div className="logo-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="2" width="20" height="20" rx="2"/>
              <line x1="7" y1="2" x2="7" y2="22"/>
              <line x1="17" y1="2" x2="17" y2="22"/>
              <line x1="2" y1="12" x2="22" y2="12"/>
            </svg>
          </div>
          <span className="logo">CineMS</span>
        </div>

        <div className="nav-buttons">
          <button className="nav-link" onClick={() => navigate('/')}>About</button>
          <button className="nav-link" onClick={() => navigate('/Dashboard')}>Dashboard</button>
          <button className="nav-btn login-btn" onClick={() => { setShowLogin(true); setShowRegistration(false); }}>
            Login
          </button>
          <button className="nav-btn signup-btn" onClick={() => { setShowRegistration(true); setShowLogin(false); }}>
            Register
          </button>
        </div>
      </nav>

      {/* ── Login Modal ── */}
      {showLogin && (
        <div className="modal-overlay" onClick={() => setShowLogin(false)}>
          <div className="modal-container" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowLogin(false)}>✕</button>
            <LoginForm onClose={() => setShowLogin(false)} />
          </div>
        </div>
      )}

      {/* ── Registration Modal ── */}
      {showRegistration && (
        <div className="modal-overlay" onClick={() => setShowRegistration(false)}>
          <div className="modal-container" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowRegistration(false)}>✕</button>
            <RegistrationForm onClose={() => setShowRegistration(false)} />
          </div>
        </div>
      )}

      {/* ── Hero ── */}
      <div className="hero-section">
        <div className="hero-text">
          <p className="hero-eyebrow">Movie Management System</p>
          <h1 className="hero-title">
            Your complete cinema
            <span className="highlight">management platform.</span>
          </h1>
          <p className="hero-description">
            Catalog movies, manage screenings, track members, and handle bookings — all from one powerful dashboard built for modern cinemas.
          </p>
          <button className="hero-button" onClick={() => navigate('/Dashboard')}>
            Open Dashboard
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>

        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1200&q=80"
            alt="Cinema"
          />
        </div>
      </div>

      {/* ── Stats Strip ── */}
      <div className="stats-strip">
        <div className="stat-item">
          <span className="stat-number">5k+</span>
          <span className="stat-label">Movies Catalogued</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">200+</span>
          <span className="stat-label">Active Members</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">99%</span>
          <span className="stat-label">Uptime</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">24/7</span>
          <span className="stat-label">Digital Access</span>
        </div>
      </div>

      {/* ── Footer ── */}
      <footer className="footer">
        <p className="footer-text">© 2026 <span>CineMS</span> · All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;