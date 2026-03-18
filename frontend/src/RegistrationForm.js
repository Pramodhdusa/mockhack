import React, { useState } from 'react';
import { UserPlus } from 'lucide-react';
import './index.css';

function RegistrationForm({ onClose }) {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'USER' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const message = await response.text();
      if (response.ok) {
        alert('Registration Successful');
        onClose();
        setFormData({ name: '', email: '', password: '', role: 'USER' });
      } else {
        alert(message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration Error:', error);
      alert('Server error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="form-container1">
      <div className="header1">
        <h2><UserPlus className="icon1" /> Create account</h2>
        <p className="form-subtitle">Join to access the cinema system.</p>
      </div>
      <form onSubmit={handleSubmit} className="form1">
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full name" required />
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email address" required />
        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
        <select name="role" value={formData.role} onChange={handleChange} className="form-select">
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
        </select>
        <button type="submit" disabled={loading}>
          {loading ? 'Creating account…' : 'Create Account'}
        </button>
      </form>
      <p className="footer-text1">Already have an account? <a href="#login">Sign in</a></p>
    </div>
  );
}

export default RegistrationForm;