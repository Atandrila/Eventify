import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import ThemeToggle from "./ThemeToggle";

// Import images
import logo from "../../assets/images/logo.png";
import dropdownArrow from "../../assets/images/dropdown-arrow.png";
import menuIcon from "../../assets/images/menu.png";
import closeIcon from "../../assets/images/close.png";

function Header() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      {/* Inline CSS */}
      <style>{`
        .header {
          position: sticky;
          top: 0;
          z-index: 50;
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(10px);
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }
        .header-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 16px;
        }
        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 64px;
        }
        .logo {
          display: flex;
          align-items: center;
          text-decoration: none;
        }
        .logo-img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }
        .logo-text {
          font-size: 20px;
          font-weight: bold;
          color: #333;
          margin-left: 8px;
        }
        .nav {
          display: none;
        }
        .nav-link {
          position: relative;
          margin: 0 12px;
          font-weight: 500;
          color: #444;
          text-decoration: none;
        }
        .nav-link:hover {
          color: #4f46e5;
        }
        .right-section {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .user-menu {
          position: relative;
        }
        .user-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #444;
          background: none;
          border: none;
          cursor: pointer;
        }
        .user-btn:hover {
          color: #4f46e5;
        }
        .user-name {
          font-weight: 500;
        }
        .icon {
          width: 20px;
          height: 20px;
        }
        .dropdown {
          position: absolute;
          right: 0;
          top: 40px;
          width: 160px;
          background: white;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          display: none;
        }
        .user-menu:hover .dropdown {
          display: block;
        }
        .logout-btn {
          width: 100%;
          text-align: left;
          padding: 8px 12px;
          color: red;
          background: none;
          border: none;
          cursor: pointer;
          border-radius: 6px;
        }
        .logout-btn:hover {
          background: #f5f5f5;
        }
        .auth-links {
          display: flex;
          gap: 8px;
        }
        .login-btn {
          padding: 8px 16px;
          border-radius: 6px;
          background: #4f46e5;
          color: white;
          text-decoration: none;
        }
        .login-btn:hover {
          background: #4338ca;
        }
        .register-btn {
          padding: 8px 16px;
          border: 1px solid #4f46e5;
          border-radius: 6px;
          color: #4f46e5;
          text-decoration: none;
        }
        .register-btn:hover {
          background: #eef2ff;
        }
        .menu-btn {
          background: none;
          border: none;
          cursor: pointer;
        }
        .menu-icon {
          width: 28px;
          height: 28px;
        }
        .mobile-nav {
          display: none;
          margin-top: 8px;
          background: white;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          padding: 16px;
        }
        .mobile-nav-link {
          display: block;
          padding: 8px 12px;
          color: #444;
          text-decoration: none;
          border-radius: 6px;
        }
        .mobile-nav-link:hover {
          background: #f5f5f5;
          color: #4f46e5;
        }
        @media (min-width: 768px) {
          .nav {
            display: flex;
          }
          .menu-btn {
            display: none;
          }
          .mobile-nav {
            display: none !important;
          }
        }
      `}</style>

      <header className="header">
        <div className="header-container">
          <div className="header-content">
            {/* Logo */}
            <Link to="/" className="logo">
              <img src={logo} alt="Eventify Logo" className="logo-img" />
              <span className="logo-text">Eventify</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="nav">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/events">Events</NavLink>

              {currentUser && (
                <>
                  <NavLink
                    to={
                      currentUser.role === "admin"
                        ? "/dashboard/admin"
                        : "/dashboard/student"
                    }
                  >
                    Dashboard
                  </NavLink>

                  {currentUser.role === "admin" && (
                    <NavLink to="/create-event">Create Event</NavLink>
                  )}
                </>
              )}
            </nav>

            {/* Right Section */}
            <div className="right-section">
              <ThemeToggle />

              {currentUser ? (
                <div className="user-menu">
                  <button className="user-btn">
                    <span className="user-name">
                      Hello, {currentUser.name}
                    </span>
                    <img src={dropdownArrow} alt="Dropdown" className="icon" />
                  </button>

                  {/* Dropdown */}
                  <div className="dropdown">
                    <button onClick={handleLogout} className="logout-btn">
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <div className="auth-links">
                  <Link to="/login" className="login-btn">
                    Login
                  </Link>
                  <Link to="/register" className="register-btn">
                    Register
                  </Link>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                className="menu-btn"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <img src={closeIcon} alt="Close Menu" className="menu-icon" />
                ) : (
                  <img src={menuIcon} alt="Open Menu" className="menu-icon" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="mobile-nav">
              <MobileNavLink to="/" onClick={() => setMobileMenuOpen(false)}>
                Home
              </MobileNavLink>
              <MobileNavLink to="/events" onClick={() => setMobileMenuOpen(false)}>
                Events
              </MobileNavLink>

              {currentUser ? (
                <>
                  <MobileNavLink
                    to={
                      currentUser.role === "admin"
                        ? "/dashboard/admin"
                        : "/dashboard/student"
                    }
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Dashboard
                  </MobileNavLink>

                  {currentUser.role === "admin" && (
                    <MobileNavLink
                      to="/create-event"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Create Event
                    </MobileNavLink>
                  )}

                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="logout-btn"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <MobileNavLink
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </MobileNavLink>
                  <MobileNavLink
                    to="/register"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Register
                  </MobileNavLink>
                </>
              )}
            </div>
          )}
        </div>
      </header>
    </>
  );
}

/* Reusable Link Styles */
const NavLink = ({ to, children }) => (
  <Link to={to} className="nav-link">
    {children}
  </Link>
);

const MobileNavLink = ({ to, children, onClick }) => (
  <Link to={to} onClick={onClick} className="mobile-nav-link">
    {children}
  </Link>
);

export default Header;
