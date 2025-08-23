import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <>
      <style>{`
        .notfound-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #f9fafb;
          padding: 3rem 1rem;
        }

        .notfound-box {
          max-width: 400px;
          width: 100%;
          text-align: center;
        }

        .notfound-icon {
          height: 96px;
          width: 96px;
          border-radius: 50%;
          background-color: #e0e7ff;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 24px auto;
        }

        .notfound-icon svg {
          height: 48px;
          width: 48px;
          color: #4f46e5;
        }

        .notfound-title {
          font-size: 2.5rem;
          font-weight: 800;
          color: #111827;
          margin-bottom: 16px;
        }

        .notfound-subtitle {
          font-size: 1.25rem;
          font-weight: 600;
          color: #111827;
          margin-bottom: 16px;
        }

        .notfound-text {
          color: #6b7280;
          margin-bottom: 32px;
        }

        .notfound-btn {
          display: inline-block;
          background-color: #4f46e5;
          color: white;
          padding: 10px 20px;
          border-radius: 6px;
          text-decoration: none;
          font-weight: 600;
          transition: background 0.3s ease;
        }

        .notfound-btn:hover {
          background-color: #4338ca;
        }
      `}</style>

      <div className="notfound-container">
        <div className="notfound-box">
          <div className="notfound-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 
                2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-
                3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h1 className="notfound-title">404</h1>
          <h2 className="notfound-subtitle">Page not found</h2>
          <p className="notfound-text">
            Sorry, we couldn't find the page you're looking for.
          </p>
          <Link to="/" className="notfound-btn">
            Go back home
          </Link>
        </div>
      </div>
    </>
  );
}

export default NotFound;
