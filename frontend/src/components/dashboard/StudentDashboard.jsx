import React, { useEffect, useState } from "react";
import { registrationAPI } from "../../services/api";
import { Link } from "react-router-dom";
import './StudentDashboard.css';

function StudentDashboard() {
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const fetchRegistrations = async () => {
    try {
      const res = await registrationAPI.getUserRegistrations();
      // Filter out registrations that might not have event data
      const validRegistrations = res.data.filter(reg => reg.event !== null);
      setRegisteredEvents(validRegistrations);
    } catch (err) {
      console.error("Error fetching registrations:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleUnregister = async (id) => {
    try {
      await registrationAPI.unregisterFromEvent(id);
      setRegisteredEvents((prev) => prev.filter((reg) => reg._id !== id));
      alert('Successfully unregistered!');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to unregister');
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  if (loading) return (
    <div className="loading-section">
      <div className="spinner-container">
        <div className="spinner"></div>
      </div>
      <p>Loading your events...</p>
    </div>
  );

  return (
    <div className="dashboard-container">
      <div className="dashboard-layout">
        {/* Sidebar */}
        <div className="sidebar">
          <div className="sidebar-title">
            <i className="fas fa-graduation-cap"></i>
            Student Portal
          </div>
          <ul className="sidebar-menu">
            <li>
              <a href="#" className="active-link">
                <i className="fas fa-calendar-check"></i>
                My Events
              </a>
            </li>
            
          </ul>
        </div>

        {/* Main Content */}
        <div className="main-content">
          <div className="main-header">
            <h1>
              <i className="fas fa-calendar-alt"></i>
              Your Registered Events
            </h1>
          </div>

          <div className="tabs">
            <button className="tab active">
              <i className="fas fa-list"></i>
              Upcoming Events
            </button>
            <button className="tab">
              <i className="fas fa-history"></i>
              Past Events
            </button>
          </div>

          {registeredEvents.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">
                <i className="fas fa-calendar-plus"></i>
              </div>
              <h3>No registrations yet</h3>
              <p>Browse events to get started</p>
              <Link to="/events" className="btn btn-primary">
                <i className="fas fa-search"></i>
                Browse Events
              </Link>
            </div>
          ) : (
            <div className="events-grid">
              {registeredEvents.map((reg) => (
                <div key={reg._id} className="event-card">
                  <div className="event-image-container">
                    {reg.event.image && (
                      <img src={reg.event.image} alt={reg.event.title} />
                    )}
                    <div className="event-status">
                      <span className={`status ${reg.event.status}`}>{reg.event.status}</span>
                    </div>
                  </div>
                  
                  <div className="event-content">
                    <h3>{reg.event.title}</h3>
                    <p className="event-description">{reg.event.description}</p>
                    
                    <div className="event-details">
                      <div className="event-meta-item">
                        <i className="fas fa-calendar-day"></i>
                        <span>{new Date(reg.event.date).toLocaleDateString()}</span>
                      </div>
                      <div className="event-meta-item">
                        <i className="fas fa-clock"></i>
                        <span>{reg.event.time}</span>
                      </div>
                      <div className="event-meta-item">
                        <i className="fas fa-map-marker-alt"></i>
                        <span>{reg.event.location}</span>
                      </div>
                    </div>
                    
                    <div className="event-actions">
                      <button 
                        onClick={() => handleUnregister(reg._id)}
                        className="btn btn-danger"
                      >
                        <i className="fas fa-times-circle"></i>
                        Unregister
                      </button>
                      <Link to={`/events/${reg.event._id}`} className="btn btn-outline">
                        <i className="fas fa-info-circle"></i>
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;