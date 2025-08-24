import React from 'react'
import { Link } from 'react-router-dom'

function EventCard({ event }) {
  const registeredPercentage = (event.registered / event.maxParticipants) * 100
  const statusClass =
    event.status === 'completed'
      ? 'status completed'
      : 'status ongoing'

  return (
    <div className="event-card">
      <img src={event.image} alt={event.title} className="event-image" />
      <div className="event-content">
        <div className="header">
          <h3>{event.title}</h3>
          <span className={statusClass}>{event.status}</span>
        </div>
        <p className="description">{event.description.substring(0, 100)}...</p>

        <div className="info">
          <div className="info-item">
            <svg xmlns="http://www.w3.org/2000/svg" className="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {new Date(event.date).toLocaleDateString()} at {event.time}
          </div>
          <div className="info-item">
            <svg xmlns="http://www.w3.org/2000/svg" className="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {event.location}
          </div>
        </div>

        <div className="progress-section">
          <div className="progress-header">
            <span>Registered</span>
            <span className="count">{event.registered}/{event.maxParticipants}</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${registeredPercentage}%` }}></div>
          </div>
        </div>

       
<Link to={`/events/${event._id}`} className="view-details">
  View Details
</Link>


      </div>

      <style>{`
        .event-card {
          background: #fff;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 8px rgba(0,0,0,0.08);
          display: flex;
          flex-direction: column;
        }
        .event-image {
          width: 100%;
          height: 200px;
          object-fit: cover;
        }
        .event-content {
          padding: 16px;
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: start;
          margin-bottom: 10px;
        }
        .header h3 {
          font-size: 18px;
          font-weight: bold;
          color: #333;
          margin: 0;
        }
        .status {
          padding: 4px 8px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 600;
          text-transform: capitalize;
        }
        .status.completed {
          background: #d1fae5;
          color: #065f46;
        }
        .status.ongoing {
          background: #dbeafe;
          color: #1e40af;
        }
        .description {
          color: #555;
          font-size: 14px;
          margin-bottom: 12px;
        }
        .info {
          display: flex;
          flex-direction: column;
          gap: 8px;
          font-size: 14px;
          color: #666;
          margin-bottom: 16px;
        }
        .info-item {
          display: flex;
          align-items: center;
        }
        .icon {
          width: 16px;
          height: 16px;
          margin-right: 6px;
          color: #666;
        }
        .progress-section {
          margin-bottom: 16px;
        }
        .progress-header {
          display: flex;
          justify-content: space-between;
          font-size: 14px;
          margin-bottom: 6px;
          color: #555;
        }
        .count {
          font-weight: 600;
        }
        .progress-bar {
          background: #e5e7eb;
          border-radius: 8px;
          height: 8px;
          width: 100%;
        }
        .progress-fill {
          background: #4f46e5;
          height: 8px;
          border-radius: 8px;
        }
        .view-details {
          display: block;
          text-align: center;
          background: #4f46e5;
          color: #fff;
          padding: 10px 0;
          border-radius: 6px;
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          transition: background 0.3s;
        }
        .view-details:hover {
          background: #4338ca;
        }
      `}</style>
    </div>
  )
}

export default EventCard
