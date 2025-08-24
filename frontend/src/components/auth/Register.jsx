import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('student');
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!name || !email || !password || !confirmPassword) {
    setError('Please fill in all fields');
    return;
  }

  if (password !== confirmPassword) {
    setError('Passwords do not match');
    return;
  }

  try {
    const response = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, role })
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.message || 'Registration failed');
      return;
    }

    // Save token & user in localStorage
    localStorage.setItem('token', data.token);
    login(data.user, data.token); // update context with user info

    navigate('/');
  } catch (err) {
    setError('Something went wrong');
  }
};

  return (
    <div className="register-container">
      <div className="register-box">
        <div className="logo-circle">
          <span className="logo-text">E</span>
        </div>
        <h2 className="title">Create your account</h2>
        <p className="subtitle">
          Or{' '}
          <Link to="/login" className="link">
            sign in to your existing account
          </Link>
        </p>

        <form onSubmit={handleSubmit} className="form">
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              id="confirm-password"
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="role">Role</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="student">Student</option>
              <option value="admin">Club Admin</option>
            </select>
          </div>

          <button type="submit" className="submit-btn">Register</button>
        </form>
      </div>

      {/* Inline CSS */}
      <style jsx>{`
        .register-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f9fafb;
          padding: 20px;
        }

        .register-box {
          max-width: 400px;
          width: 100%;
          background: #fff;
          padding: 30px;
          border-radius: 8px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
          text-align: center;
        }

        .logo-circle {
          width: 50px;
          height: 50px;
          background: #4f46e5;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto;
        }

        .logo-text {
          color: white;
          font-weight: bold;
          font-size: 20px;
        }

        .title {
          font-size: 24px;
          font-weight: bold;
          margin: 15px 0;
          color: #111827;
        }

        .subtitle {
          font-size: 14px;
          color: #6b7280;
          margin-bottom: 20px;
        }

        .link {
          color: #4f46e5;
          text-decoration: none;
        }

        .form {
          text-align: left;
        }

        .form-group {
          margin-bottom: 15px;
        }

        label {
          display: block;
          font-size: 14px;
          margin-bottom: 5px;
          color: #374151;
        }

        input, select {
          width: 100%;
          padding: 10px;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          font-size: 14px;
        }

        .error-message {
          background: #fee2e2;
          color: #b91c1c;
          padding: 10px;
          border-radius: 6px;
          margin-bottom: 15px;
          text-align: center;
        }

        .submit-btn {
          width: 100%;
          background: #4f46e5;
          color: #fff;
          padding: 12px;
          border: none;
          border-radius: 6px;
          font-size: 16px;
          cursor: pointer;
          margin-top: 10px;
        }

        .submit-btn:hover {
          background: #4338ca;
        }
      `}</style>
    </div>
  );
}

export default Register;
