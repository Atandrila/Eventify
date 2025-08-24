import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!email || !password) {
    setError('Please fill in all fields');
    return;
  }

  try {
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.message || 'Login failed');
      return;
    }

    // Save token & user in localStorage
    localStorage.setItem('token', data.token);
    login(data.user, data.token); // update context with user info

    navigate(from, { replace: true });
  } catch (err) {
    setError('Something went wrong');
  }
};


  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <div className="logo">
            <span>E</span>
          </div>
          <h2>Sign in to your account</h2>
          <p>
            Or{' '}
            <Link to="/register" className="link">
              create a new account
            </Link>
          </p>
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          {error && (
            <div className="error-box">
              {error}
            </div>
          )}
          <div className="input-group">
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="options">
            <label className="remember">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              Remember me
            </label>
            <div>
              <a href="#" className="link">Forgot your password?</a>
            </div>
          </div>

          <div>
            <button type="submit" className="submit-btn">
              <span className="icon">
                <svg className="lock-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              </span>
              Sign in
            </button>
          </div>
        </form>
      </div>

      {/* ✅ Internal CSS */}
      <style>{`
        .login-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #f9fafb;
          padding: 2rem;
        }
        .login-container {
          max-width: 400px;
          width: 100%;
          background: #fff;
          padding: 2rem;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        .login-header {
          text-align: center;
          margin-bottom: 2rem;
        }
        .logo {
          margin: 0 auto;
          height: 48px;
          width: 48px;
          border-radius: 50%;
          background-color: #4f46e5;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.25rem;
          font-weight: bold;
          color: #fff;
        }
        .login-header h2 {
          margin-top: 1rem;
          font-size: 1.75rem;
          font-weight: bold;
          color: #111827;
        }
        .login-header p {
          margin-top: 0.5rem;
          color: #6b7280;
          font-size: 0.9rem;
        }
        .link {
          color: #4f46e5;
          font-weight: 500;
          text-decoration: none;
        }
        .link:hover {
          color: #4338ca;
        }
        .error-box {
          background-color: #fef2f2;
          color: #b91c1c;
          padding: 0.75rem;
          border-radius: 6px;
          margin-bottom: 1rem;
          font-size: 0.9rem;
        }
        .login-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .input-group {
          display: flex;
          flex-direction: column;
        }
        .input-group input {
          padding: 0.75rem;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          font-size: 1rem;
          margin-bottom: 0.75rem;
        }
        .input-group input:focus {
          outline: none;
          border-color: #4f46e5;
        }
        .options {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.9rem;
        }
        .remember {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #111827;
        }
        .submit-btn {
          width: 100%;
          background-color: #4f46e5;
          color: #fff;
          border: none;
          padding: 0.75rem;
          font-size: 1rem;
          border-radius: 6px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          transition: background 0.3s ease;
        }
        .submit-btn:hover {
          background-color: #4338ca;
        }
        .icon {
          display: flex;
          align-items: center;
        }
        .lock-icon {
          width: 20px;
          height: 20px;
          color: #c7d2fe;
        }
      `}</style>
    </div>
  );
}

export default Login;
