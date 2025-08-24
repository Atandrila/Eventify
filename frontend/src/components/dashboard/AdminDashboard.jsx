import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './AdminDashboard.css';

function AdminDashboard() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [stats, setStats] = useState({
    totalEvents: 0,
    upcomingEvents: 0,
    totalRegistrations: 0,
    certificatesIssued: 0
  });
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  // Inline editing states
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    const fetchEvents = async () => {
      try {
        const res = await fetch('/api/events');
        if (!res.ok) throw new Error(`Server returned ${res.status}`);
        const data = await res.json();
        setEvents(data);
        calculateStats(data);
      } catch (err) {
        console.error('Failed to fetch events', err);
        alert('Failed to load events. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [currentUser, navigate]);

  const calculateStats = (data) => {
    const totalEvents = data.length;
    const upcomingEvents = data.filter(e => e.status === 'upcoming').length;
    const totalRegistrations = data.reduce((sum, e) => sum + (e.registeredParticipants || 0), 0);
    const certificatesIssued = data.filter(e => e.status === 'completed').length * 25;
    setStats({ totalEvents, upcomingEvents, totalRegistrations, certificatesIssued });
  };

  // Inline delete
  const handleDeleteEvent = async (id) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/events/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete event');
      const updatedEvents = events.filter(e => e._id !== id);
      setEvents(updatedEvents);
      calculateStats(updatedEvents);
      alert('Event deleted successfully!');
    } catch (err) {
      console.error(err);
      alert('Error deleting event');
    } finally {
      setDeletingId(null);
    }
  };

  // Toggle status
  const handleToggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'upcoming' ? 'completed' : 'upcoming';
    try {
      const res = await fetch(`/api/events/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (!res.ok) throw new Error('Failed to update status');
      const updatedEvent = await res.json();
      setEvents(events.map(e => (e._id === id ? updatedEvent : e)));
      calculateStats(events.map(e => (e._id === id ? updatedEvent : e)));
    } catch (err) {
      console.error(err);
      alert('Error updating status');
    }
  };

  // Start editing
  const handleEdit = (event) => {
    setEditingId(event._id);
    setEditForm({
      title: event.title,
      date: event.date.split('T')[0],
      time: event.time,
      location: event.location,
      maxParticipants: event.maxParticipants,
      status: event.status
    });
  };

  // Save inline edit
  const handleSaveEdit = async (id) => {
    try {
      const res = await fetch(`/api/events/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm)
      });
      if (!res.ok) throw new Error('Failed to update event');
      const updatedEvent = await res.json();
      setEvents(events.map(e => (e._id === id ? updatedEvent : e)));
      calculateStats(events.map(e => (e._id === id ? updatedEvent : e)));
      setEditingId(null);
      alert('Event updated successfully!');
    } catch (err) {
      console.error(err);
      alert('Error updating event');
    }
  };

  return (
    <div className="admin-root">
      <div className="admin-container">
        <div className="admin-layout">

          {/* Sidebar */}
          <aside className="sidebar">
            <div className="card sidebar-card">
              <h2 className="card-title">Admin Panel</h2>
              <ul className="nav-list">
                <li><Link to="/dashboard/admin" className="nav-link nav-link-active">🏠 Dashboard</Link></li>
                <li><Link to="/create-event" className="nav-link">➕ Create Event</Link></li>
                <li><Link to="/events" className="nav-link">📅 Manage Events</Link></li>
                <li><Link to="/analytics" className="nav-link">📊 Analytics</Link></li>
              </ul>
            </div>

           
          </aside>

          {/* Main */}
          <main className="main">
            <header className="page-header">
              <h1 className="page-title">Admin Dashboard</h1>
              <p className="muted">Manage events and view analytics</p>
            </header>

            {/* Stats */}
            <section className="grid grid-4 gap">
              <div className="card stat-card"><div className="stat-row"><div><p className="muted small">Total Events</p><p className="stat-value">{stats.totalEvents}</p></div><div className="stat-icon">🗓️</div></div></div>
              <div className="card stat-card"><div className="stat-row"><div><p className="muted small">Upcoming Events</p><p className="stat-value">{stats.upcomingEvents}</p></div><div className="stat-icon">⏰</div></div></div>
              <div className="card stat-card"><div className="stat-row"><div><p className="muted small">Total Registrations</p><p className="stat-value">{stats.totalRegistrations}</p></div><div className="stat-icon">👥</div></div></div>
              <div className="card stat-card"><div className="stat-row"><div><p className="muted small">Certificates Issued</p><p className="stat-value">{stats.certificatesIssued}</p></div><div className="stat-icon">✅</div></div></div>
            </section>

           
            <section className="card table-card">
              <div className="table-header">
                <h2 className="card-title">Recent Events</h2>
              </div>
              <div className="table-scroll">
                {loading ? <p>Loading events...</p> :
                  events.length === 0 ? <p>No events found.</p> :
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Location</th>
                        <th>Max Participants</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {events.map(event => (
                        <tr key={event._id}>
                          <td>{editingId === event._id ? <input type="text" value={editForm.title} onChange={e => setEditForm({ ...editForm, title: e.target.value })} /> : event.title}</td>
                          <td>{editingId === event._id ? <input type="date" value={editForm.date} onChange={e => setEditForm({ ...editForm, date: e.target.value })} /> : new Date(event.date).toLocaleDateString()}</td>
                          <td>{editingId === event._id ? <input type="time" value={editForm.time} onChange={e => setEditForm({ ...editForm, time: e.target.value })} /> : event.time}</td>
                          <td>{editingId === event._id ? <input type="text" value={editForm.location} onChange={e => setEditForm({ ...editForm, location: e.target.value })} /> : event.location}</td>
                          <td>{editingId === event._id ? <input type="number" value={editForm.maxParticipants} onChange={e => setEditForm({ ...editForm, maxParticipants: e.target.value })} /> : event.maxParticipants}</td>
                          <td>{editingId === event._id ? (
                            <select value={editForm.status} onChange={e => setEditForm({ ...editForm, status: e.target.value })}>
                              <option value="upcoming">upcoming</option>
                              <option value="completed">completed</option>
                              <option value="cancelled">cancelled</option>
                            </select>
                          ) : <span className={`badge ${event.status === 'completed' ? 'badge-green' : event.status === 'cancelled' ? 'badge-red' : 'badge-blue'}`}>{event.status}</span>}</td>
                          <td>
                            {editingId === event._id ? (
                              <>
                                <button className="link link-primary" onClick={() => handleSaveEdit(event._id)}>Save</button>
                                <button className="link link-muted" onClick={() => setEditingId(null)}>Cancel</button>
                              </>
                            ) : (
                              <>
                                <button className="link link-primary" onClick={() => handleEdit(event)}>Edit</button>
                                <button className="link link-danger" onClick={() => handleDeleteEvent(event._id)} disabled={deletingId === event._id}>
                                  {deletingId === event._id ? 'Deleting...' : 'Delete'}
                                </button>
                                <button className="link link-muted" onClick={() => handleToggleStatus(event._id, event.status)}>Toggle</button>
                              </>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                }
              </div>
            </section>
            
            
            
          </main>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
