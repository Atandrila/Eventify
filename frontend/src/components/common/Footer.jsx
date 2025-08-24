import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="footer-container">
          {/* Top Grid */}
          <div className="footer-grid">
            
            {/* Brand */}
            <div>
              <div className="brand">
               
                <span className="brand-name">Eventify</span>
              </div>
              <p className="brand-text">
                The ultimate event management platform for university clubs.  
                Organize, connect, and celebrate seamlessly.
              </p>
            </div>
            
            {/* Quick Links */}
            <div>
              <h3 className="footer-title">Quick Links</h3>
              <ul className="footer-list">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/events">Events</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/contact">Contact</Link></li>
              </ul>
            </div>
            
            {/* Resources */}
            <div>
              <h3 className="footer-title">Resources</h3>
              <ul className="footer-list">
                <li><Link to="/help">Help Center</Link></li>
                <li><Link to="/faq">FAQs</Link></li>
                <li><Link to="/privacy">Privacy Policy</Link></li>
                <li><Link to="/terms">Terms of Service</Link></li>
              </ul>
            </div>
            
            {/* Social Media */}
            <div>
              <h3 className="footer-title">Connect With Us</h3>
              <div className="social-icons">
                {/* Facebook */}
                <a href="#" className="social-link" aria-label="Facebook">
                  <svg className="social-svg" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                
                {/* Twitter */}
                <a href="#" className="social-link" aria-label="Twitter">
                  <svg className="social-svg" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>
                
                {/* Instagram */}
                <a href="#" className="social-link" aria-label="Instagram">
                  <svg className="social-svg" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z" />
                  </svg>
                </a>
                
                {/* LinkedIn */}
                <a href="#" className="social-link" aria-label="LinkedIn">
                  <svg className="social-svg" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          {/* Bottom */}
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} Eventify. All rights reserved.</p>
          </div>
        </div>
      </footer>
      
      {/* CSS inside same file */}
      <style>{`
        .footer {
          background-color: rgba(17, 24, 39, 0.8);
          backdrop-filter: blur(10px);
          color: #d1d5db;
          padding: 3rem 1rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
        .footer-container {
          max-width: 1200px;
          margin: auto;
        }
        .footer-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2.5rem;
        }
        .brand {
          display: flex;
          align-items: center;
          margin-bottom: 1rem;
        }
        .brand-logo {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background-color: rgba(79, 70, 229, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 0.75rem;
          color: white;
          font-weight: bold;
          font-size: 1.5rem;
          box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        }
        .brand-name {
          font-size: 1.5rem;
          font-weight: bold;
          color: white;
        }
        .brand-text {
          font-size: 0.875rem;
          color: #9ca3af;
          line-height: 1.6;
        }
        .footer-title {
          font-size: 1.125rem;
          font-weight: 600;
          color: white;
          margin-bottom: 1rem;
        }
        .footer-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .footer-list li {
          margin-bottom: 0.5rem;
        }
        .footer-list a {
          color: #d1d5db;
          text-decoration: none;
          transition: color 0.3s;
        }
        .footer-list a:hover {
          color: #6366f1;
        }
        .social-icons {
          display: flex;
          gap: 1rem;
        }
        .social-link {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: rgba(31, 41, 55, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #9ca3af;
          transition: all 0.3s;
        }
        .social-link:hover {
          background-color: rgba(79, 70, 229, 0.8);
          color: white;
          transform: translateY(-3px);
        }
        .social-svg {
          width: 20px;
          height: 20px;
        }
        .footer-bottom {
          border-top: 1px solid rgba(55, 65, 81, 0.5);
          margin-top: 2.5rem;
          padding-top: 1.5rem;
          text-align: center;
          font-size: 0.875rem;
          color: #6b7280;
        }
      `}</style>
    </>
  );
}

export default Footer;