import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api'; 

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
     
      const response = await api.post('/auth/register', { name, email, password, role });
      const data = response.data;

      // Save token & user in localStorage
      localStorage.setItem('token', data.token);
      login(data.user, data.token); 

      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
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
      <style jsx>{`
        .register-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          padding: 20px;
        }
        .register-box {
          max-width: 600px;
          width: 100%;
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(10px);
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.3);
          text-align: center;
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
          font-weight: 500;
        }
        .link:hover {
          color: #4338ca;
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
          font-weight: 500;
        }
        input, select {
          width: 100%;
          padding: 12px;
          border: 1px solid rgba(209, 213, 219, 0.5);
          border-radius: 8px;
          font-size: 14px;
          background: rgba(255, 255, 255, 0.5);
          transition: all 0.2s ease;
        }
        input:focus, select:focus {
          outline: none;
          border-color: #4f46e5;
          background: rgba(255, 255, 255, 0.8);
          box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
        }
        .error-message {
          background: rgba(254, 226, 226, 0.7);
          color: #b91c1c;
          padding: 12px;
          border-radius: 8px;
          margin-bottom: 20px;
          text-align: center;
          backdrop-filter: blur(5px);
        }
        .submit-btn {
          width: 100%;
          background: rgba(79, 70, 229, 0.8);
          color: #fff;
          padding: 14px;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          margin-top: 10px;
          transition: all 0.3s ease;
        }
        .submit-btn:hover {
          background: rgba(67, 56, 202, 0.9);
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
        }
      `}</style>
    </div>
  );
}

export default Register;