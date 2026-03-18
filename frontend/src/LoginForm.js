import React, { useState } from 'react';
import { LogIn } from 'lucide-react';
import './index.css';

function LoginForm({ onClose }) {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const response = await fetch('http://localhost:8080/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginData),
    });

    const data = await response.json(); // 👈 changed

    console.log(data)
    if (data.message === 'Login Success') {
      alert('Login Successful');

      // ✅ Store role (optional but useful)
      localStorage.setItem('role', data.role);

      // ✅ Role-based routing
      if (data.role === 'ADMIN') {
        window.location.href = '/admin-dashboard';
      } else {
        window.location.href = '/user-dashboard';
      }

      onClose();
      setLoginData({ email: '', password: '' });
    } else {
      alert(data.message || 'Invalid Email or Password');
    }

  } catch (error) {
    console.error('Login Error:', error);
    alert('Server error. Please try again.');
  } finally {
    setLoading(false);
  }
};

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  return (
    <div className="form-container1">
      <div className="header1">
        <h2><LogIn className="icon1" /> Welcome back</h2>
        <p className="form-subtitle">Sign in to your account to continue.</p>
      </div>
      <form onSubmit={handleSubmit} className="form1">
        <input type="email" name="email" value={loginData.email} onChange={handleChange} placeholder="Email address" required />
        <input type="password" name="password" value={loginData.password} onChange={handleChange} placeholder="Password" required />
        <button type="submit" disabled={loading}>
          {loading ? 'Signing in…' : 'Sign In'}
        </button>
      </form>
      <p className="footer-text1">New here? <a href="#register">Create an account</a></p>
    </div>
  );
}

export default LoginForm;