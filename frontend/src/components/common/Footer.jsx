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
                <div className="brand-logo">E</div>
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
                {[
                  { href: "#", icon: "M22 12c0-5.523..." }, 
                  { href: "#", icon: "M8.29 20.251c..." },
                  { href: "#", icon: "M12 2.163c..." },
                  { href: "#", icon: "M19 0h-14c..." }
                ].map((item, i) => (
                  <a key={i} href={item.href} className="social-link">
                    <svg className="social-svg" fill="currentColor" viewBox="0 0 24 24">
                      <path d={item.icon} />
                    </svg>
                  </a>
                ))}
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
          background-color: #111827;
          color: #d1d5db;
          padding: 3rem 1rem;
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
          background-color: #4f46e5;
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
          background-color: #1f2937;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #9ca3af;
          transition: all 0.3s;
        }
        .social-link:hover {
          background-color: #4f46e5;
          color: white;
        }
        .social-svg {
          width: 20px;
          height: 20px;
        }
        .footer-bottom {
          border-top: 1px solid #374151;
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
