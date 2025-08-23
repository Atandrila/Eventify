import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function StudentDashboard() {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('upcoming');
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    // Simulate fetching user registrations
    const mockRegistrations = [
      {
        id: 1,
        event: {
          id: 1,
          title: "Web Development Workshop",
          category: "workshop",
          date: "2023-12-15",
          time: "14:00",
          location: "Computer Lab A",
          image: "/src/assets/images/event1.jpg",
          status: "upcoming",
          description: "Learn the basics of web development with hands-on experience."
        },
        registrationDate: "2023-11-20",
        status: "registered"
      },
      {
        id: 2,
        event: {
          id: 2,
          title: "Annual Sports Meet",
          category: "sports",
          date: "2023-12-20",
          time: "09:00",
          location: "University Stadium",
          image: "/src/assets/images/event2.jpg",
          status: "upcoming",
          description: "Join the annual sports event and showcase your athletic talent."
        },
        registrationDate: "2023-11-15",
        status: "registered"
      },
      {
        id: 3,
        event: {
          id: 3,
          title: "Cultural Festival",
          category: "cultural",
          date: "2023-11-25",
          time: "18:00",
          location: "Main Auditorium",
          image: "/src/assets/images/event3.jpg",
          status: "completed",
          description: "Experience a night full of cultural performances and festivities."
        },
        registrationDate: "2023-11-01",
        status: "attended"
      }
    ];

    setRegistrations(mockRegistrations);
  }, []);

  const upcomingEvents = registrations.filter(reg =>
    reg.event.status === 'upcoming' && reg.status === 'registered'
  );

  const completedEvents = registrations.filter(reg =>
    reg.event.status === 'completed' && reg.status === 'attended'
  );

  const handleUnregister = (id) => {
    alert('Successfully unregistered from the event!');
    setRegistrations(registrations.filter(reg => reg.id !== id));
  };

  return (
    <>
      <style>{`
        .dashboard-container {
          padding: 20px;
          background: #f8f9fa;
          font-family: Arial, sans-serif;
        }
        .dashboard-layout {
          display: flex;
          gap: 20px;
        }
        .sidebar {
          width: 250px;
        }
        .sidebar-section {
          background: #fff;
          padding: 20px;
          margin-bottom: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
        }
        .sidebar-title {
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 15px;
        }
        .sidebar-menu {
          list-style: none;
          padding: 0;
        }
        .sidebar-menu li {
          margin-bottom: 10px;
        }
        .sidebar-menu a {
          text-decoration: none;
          color: #555;
          display: block;
          padding: 10px;
          border-radius: 5px;
        }
        .sidebar-menu a:hover,
        .sidebar-menu .active-link {
          background: #eef2ff;
          color: #4f46e5;
          font-weight: bold;
        }
        .stats-box {
          display: grid;
          gap: 10px;
        }
        .stat-item {
          background: #f3f4f6;
          padding: 10px;
          border-radius: 5px;
          display: flex;
          justify-content: space-between;
        }
        .main-content {
          flex: 1;
          background: #fff;
          border-radius: 8px;
          padding: 20px;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
        }
        .main-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }
        .main-header h1 {
          font-size: 24px;
          margin: 0;
        }
        .main-header p {
          color: #666;
        }
        .welcome-text h2 {
          margin: 0;
        }
        .tabs {
          display: flex;
          border-bottom: 2px solid #ddd;
          margin-bottom: 20px;
        }
        .tab {
          padding: 10px 20px;
          border: none;
          background: none;
          cursor: pointer;
          font-weight: bold;
          color: #666;
        }
        .tab.active {
          color: #4f46e5;
          border-bottom: 3px solid #4f46e5;
        }
        .empty-state {
          text-align: center;
          padding: 40px 0;
        }
        .empty-state h3 {
          margin-bottom: 10px;
        }
        .empty-state p {
          color: #777;
          margin-bottom: 20px;
        }
        .event-card {
          display: flex;
          gap: 20px;
          border: 1px solid #eee;
          border-radius: 8px;
          margin-bottom: 20px;
          overflow: hidden;
          background: #fff;
        }
        .event-card img {
          width: 200px;
          height: 150px;
          object-fit: cover;
        }
        .event-info {
          flex: 1;
          padding: 15px;
        }
        .event-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .event-header h3 {
          margin: 0;
        }
        .event-info p {
          margin: 10px 0;
          color: #555;
        }
        .event-meta {
          font-size: 14px;
          color: #666;
          display: grid;
          gap: 5px;
          margin-bottom: 15px;
        }
        .badge {
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          color: #fff;
        }
        .badge.blue {
          background: #4f46e5;
        }
        .badge.green {
          background: #16a34a;
        }
        .btn-primary,
        .btn-danger,
        .btn-success {
          display: inline-block;
          padding: 8px 14px;
          border-radius: 5px;
          text-decoration: none;
          font-weight: bold;
          font-size: 14px;
          margin-right: 8px;
        }
        .btn-primary {
          background: #4f46e5;
          color: #fff;
        }
        .btn-danger {
          background: #dc2626;
          color: #fff;
          border: none;
        }
        .btn-success {
          background: #16a34a;
          color: #fff;
        }
        /* Responsive */
        @media (max-width: 768px) {
          .dashboard-layout {
            flex-direction: column;
          }
          .sidebar {
            width: 100%;
          }
          .event-card {
            flex-direction: column;
          }
          .event-card img {
            width: 100%;
            height: auto;
          }
        }
      `}</style>

      <div className="dashboard-container">
        <div className="dashboard-layout">
          {/* Sidebar */}
          <div className="sidebar">
            <div className="sidebar-section">
              <h2 className="sidebar-title">Dashboard</h2>
              <ul className="sidebar-menu">
                <li><Link to="/dashboard/student" className="active-link">My Events</Link></li>
                <li><Link to="/events">Browse Events</Link></li>
                <li><Link to="/certificate">My Certificates</Link></li>
                <li><Link to="#">My Profile</Link></li>
              </ul>
            </div>

            <div className="sidebar-section">
              <h2 className="sidebar-title">Quick Stats</h2>
              <div className="stats-box">
                <div className="stat-item">
                  <span>Registered Events</span>
                  <strong>{upcomingEvents.length}</strong>
                </div>
                <div className="stat-item">
                  <span>Completed Events</span>
                  <strong>{completedEvents.length}</strong>
                </div>
                <div className="stat-item">
                  <span>Total Events</span>
                  <strong>{registrations.length}</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="main-content">
            <div className="main-header">
              <div>
                <h1>My Events</h1>
                <p>Events you have registered for</p>
              </div>
              <div className="welcome-text">
                <p>Welcome back,</p>
                <h2>{currentUser?.name}</h2>
              </div>
            </div>

            {/* Tabs */}
            <div className="tabs">
              <button
                className={activeTab === 'upcoming' ? 'tab active' : 'tab'}
                onClick={() => setActiveTab('upcoming')}
              >
                Upcoming
              </button>
              <button
                className={activeTab === 'completed' ? 'tab active' : 'tab'}
                onClick={() => setActiveTab('completed')}
              >
                Completed
              </button>
            </div>

            {/* Upcoming Events */}
            {activeTab === 'upcoming' && (
              <div>
                {upcomingEvents.length === 0 ? (
                  <div className="empty-state">
                    <h3>No upcoming events</h3>
                    <p>You haven't registered for any upcoming events.</p>
                    <Link to="/events" className="btn-primary">Browse Events</Link>
                  </div>
                ) : (
                  upcomingEvents.map(registration => (
                    <div key={registration.id} className="event-card">
                      <img src={registration.event.image} alt={registration.event.title} />
                      <div className="event-info">
                        <div className="event-header">
                          <h3>{registration.event.title}</h3>
                          <span className="badge blue">{registration.event.status}</span>
                        </div>
                        <p>{registration.event.description}</p>
                        <div className="event-meta">
                          <span>{new Date(registration.event.date).toLocaleDateString()} at {registration.event.time}</span>
                          <span>{registration.event.location}</span>
                          <span>Registered on: {new Date(registration.registrationDate).toLocaleDateString()}</span>
                          <span>Category: {registration.event.category}</span>
                        </div>
                        <div className="event-actions">
                          <Link to={`/events/${registration.event.id}`} className="btn-primary">View Details</Link>
                          <button onClick={() => handleUnregister(registration.id)} className="btn-danger">Unregister</button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Completed Events */}
            {activeTab === 'completed' && (
              <div>
                {completedEvents.length === 0 ? (
                  <div className="empty-state">
                    <h3>No completed events</h3>
                    <p>You haven't attended any events yet.</p>
                  </div>
                ) : (
                  completedEvents.map(registration => (
                    <div key={registration.id} className="event-card">
                      <img src={registration.event.image} alt={registration.event.title} />
                      <div className="event-info">
                        <div className="event-header">
                          <h3>{registration.event.title}</h3>
                          <span className="badge green">{registration.event.status}</span>
                        </div>
                        <p>{registration.event.description}</p>
                        <div className="event-meta">
                          <span>{new Date(registration.event.date).toLocaleDateString()} at {registration.event.time}</span>
                          <span>{registration.event.location}</span>
                          <span>Attended on: {new Date(registration.event.date).toLocaleDateString()}</span>
                          <span>Category: {registration.event.category}</span>
                        </div>
                        <div className="event-actions">
                          <Link to={`/events/${registration.event.id}`} className="btn-primary">View Details</Link>
                          <Link to="/certificate" className="btn-success">Certificate</Link>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default StudentDashboard;
