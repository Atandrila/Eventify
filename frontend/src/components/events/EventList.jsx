import React, { useState, useEffect } from 'react';
import EventCard from './EventCard';
import axios from 'axios';

function EventList() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [category, setCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  
  const API_URL = process.env.VITE_API_BASE_URL|| 'http://localhost:5000/api';

  // Fetch events from backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(`${API_URL}/events`);
        setEvents(res.data);
        setFilteredEvents(res.data);
      } catch (err) {
        console.error('Error fetching events:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, [API_URL]);

  // Filter events based on category and search term
  useEffect(() => {
    let result = events;

    if (category !== 'all') {
      result = result.filter(event => event.category === category);
    }

    if (searchTerm) {
      result = result.filter(event =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredEvents(result);
  }, [category, searchTerm, events]);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <p>Loading events...</p>
      </div>
    );
  }

  return (
    <div className="event-list-section">
      <div className="event-container">
        <h1 className="event-title">All Events</h1>

        {/* Filter and search */}
        <div className="filter-bar">
          <div className="category-buttons">
            {['all', 'academic', 'sports', 'cultural', 'workshop'].map(cat => (
              <button
                key={cat}
                className={`filter-btn ${category === cat ? 'active' : ''}`}
                onClick={() => setCategory(cat)}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>

          <div className="search-box">
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="search-icon">🔍</span>
          </div>
        </div>

        {/* Event cards */}
        {filteredEvents.length === 0 ? (
          <div className="no-events">
            <span className="icon">😔</span>
            <h3>No events found</h3>
            <p>Try adjusting your filters or search terms</p>
          </div>
        ) : (
          <div className="event-grid">
            {filteredEvents.map(event => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        )}
      </div>

      {/* Internal CSS */}
      <style>{`
        .event-list-section { padding: 40px 0; }
        .event-container { width: 90%; max-width: 1200px; margin: 0 auto; }
        .event-title { font-size: 2rem; font-weight: bold; margin-bottom: 20px; }
        .filter-bar { display: flex; flex-direction: column; gap: 20px; margin-bottom: 30px; }
        @media (min-width: 768px) {
          .filter-bar { flex-direction: row; justify-content: space-between; align-items: center; }
        }
        .category-buttons { display: flex; flex-wrap: wrap; gap: 10px; }
        .filter-btn {
          padding: 10px 16px;
          border-radius: 6px;
          border: none;
          background: #e5e7eb;
          color: #374151;
          font-weight: 500;
          cursor: pointer;
          transition: 0.3s ease;
        }
        .filter-btn:hover { background: #d1d5db; }
        .filter-btn.active { background: #4f46e5; color: #fff; }
        .search-box { position: relative; width: 100%; max-width: 250px; }
        .search-box input {
          width: 100%;
          padding: 10px 35px 10px 12px;
          border: 1px solid #ccc;
          border-radius: 6px;
          font-size: 14px;
        }
        .search-box input:focus { outline: none; border-color: #4f46e5; }
        .search-icon {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #888;
        }
        .no-events { text-align: center; padding: 40px 0; color: #555; }
        .no-events .icon { font-size: 3rem; display: block; margin-bottom: 10px; }
        .event-grid { display: grid; grid-template-columns: 1fr; gap: 20px; }
        @media (min-width: 768px) { .event-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 1024px) { .event-grid { grid-template-columns: repeat(3, 1fr); } }
      `}</style>
    </div>
  );
}

export default EventList;
