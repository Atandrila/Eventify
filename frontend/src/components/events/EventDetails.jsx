import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { eventAPI, registrationAPI } from '../../services/api';
import '@fortawesome/fontawesome-free/css/all.min.css';
function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isRegistered, setIsRegistered] = useState(false);
  const [registrationId, setRegistrationId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await eventAPI.getEventById(id);
        setEvent(res.data);
      
        const regRes = await registrationAPI.getUserRegistrations();
        const registeredEvent = regRes.data.find(reg => reg.event && reg.event._id === id);
        if (registeredEvent) {
          setIsRegistered(true);
          setRegistrationId(registeredEvent._id);
        }
      } catch (error) {
        console.error('Error fetching event:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  const handleRegister = async () => {
    try {
      const res = await registrationAPI.registerForEvent(id);
      alert('Successfully registered!');
      setIsRegistered(true);
      setRegistrationId(res.data.registration._id);
      const eventRes = await eventAPI.getEventById(id);
      setEvent(eventRes.data);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to register');
    }
  };

  const handleUnregister = async () => {
    try {
      if (registrationId) {
        await registrationAPI.unregisterFromEvent(registrationId);
        alert('Successfully unregistered!');
        setIsRegistered(false);
        setRegistrationId(null);
        // Refresh event data
        const eventRes = await eventAPI.getEventById(id);
        setEvent(eventRes.data);
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to unregister');
    }
  };

  const handleDownloadCertificate = () => {
    navigate('/certificate');
  };

  if (loading) {
    return (
      <div className="loading-section">
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
        <p>Loading event details...</p>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="not-found">
        <div className="not-found-icon">
          <i className="fas fa-calendar-times"></i>
        </div>
        <h3>Event not found</h3>
        <p>We couldn't find the event you're looking for.</p>
        <Link to="/events" className="btn btn-outline">
          <i className="fas fa-arrow-left"></i> Browse Events
        </Link>
      </div>
    );
  }

  const registeredPercentage = ((event.registered || 0) / event.maxParticipants) * 100;
  const statusClass =
    event.status === 'completed'
      ? 'status completed'
      : event.status === 'canceled'
      ? 'status canceled'
      : 'status upcoming';

  return (
    <div className="event-details-container">
      <div className="event-details">
        <Link to="/events" className="back-link">
          <i className="fas fa-arrow-left"></i> Back to Events
        </Link>
        
        <div className="event-card">
          <div className="event-image-container">
            <img src={event.image} alt={event.title} />
            <div className="event-overlay">
              <span className={statusClass}>{event.status}</span>
            </div>
            <div className="event-text-overlay">
              <div className="event-header">
                <h1>{event.title}</h1>
                <div className="event-meta">
                  <span className="event-category">
                    <i className="fas fa-tag"></i> {event.category}
                  </span>
                </div>
              </div>
              
              <div className="event-info">
                <div className="info-item">
                  <div className="info-icon">
                    <i className="fas fa-calendar-alt"></i>
                  </div>
                  <div className="info-text">
                    <p className="info-label">Date & Time</p>
                    <p>{new Date(event.date).toLocaleDateString()} at {event.time}</p>
                  </div>
                </div>
                
                <div className="info-item">
                  <div className="info-icon">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div className="info-text">
                    <p className="info-label">Location</p>
                    <p>{event.location}</p>
                  </div>
                </div>
                
                <div className="info-item">
                  <div className="info-icon">
                    <i className="fas fa-users"></i>
                  </div>
                  <div className="info-text">
                    <p className="info-label">Attendees</p>
                    <p>{event.registered || 0}/{event.maxParticipants}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="event-content">
            <div className="description">
              <h3>About this event</h3>
              <p>{event.description}</p>
            </div>
            
            <div className="registration-progress">
              <div className="progress-info">
                <span>Registration Progress</span>
                <span>{Math.round(registeredPercentage)}%</span>
              </div>
              <div className="progress-container">
                <div 
                  className="progress-bar" 
                  style={{ width: `${registeredPercentage}%` }}
                ></div>
              </div>
            </div>
            
            <div className="action-buttons">
              {event.status === 'upcoming' ? (
                <>
                  {!isRegistered ? (
                    <button onClick={handleRegister} className="btn btn-primary">
                      <i className="fas fa-check-circle"></i> Register Now
                    </button>
                  ) : (
                    <button onClick={handleUnregister} className="btn btn-danger">
                      <i className="fas fa-times-circle"></i> Cancel Registration
                    </button>
                  )}
                </>
              ) : (
                <button onClick={handleDownloadCertificate} className="btn btn-success">
                  <i className="fas fa-download"></i> Download Certificate
                </button>
              )}
              
              <button className="btn btn-outline">
                <i className="fas fa-share-alt"></i> Share Event
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
       .event-details-container {
  min-height: 100vh;
  background: transparent; /* Remove solid background */
  padding: 2rem 1rem;
}

        
        .event-details {
          max-width: 900px;
          margin: 0 auto;
        }
        
        .back-link {
          display: inline-flex;
          align-items: center;
          color: #4a6cf7;
          text-decoration: none;
          font-weight: 600;
          margin-bottom: 1.5rem;
          transition: all 0.3s ease;
        }
        
        .back-link:hover {
          color: #3451d4;
          transform: translateX(-5px);
        }
        
        .back-link i {
          margin-right: 0.5rem;
        }
        
        .event-card {
          background: white;
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          display: flex;
          flex-direction: column;
        }
        
        .event-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
        }
        
        .event-image-container {
          position: relative;
          height: 450px;
          overflow: hidden;
        }
        
        .event-image-container img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        
        .event-card:hover .event-image-container img {
          transform: scale(1.05);
        }
        
        .event-overlay {
          position: absolute;
          top: 20px;
          right: 20px;
          z-index: 2;
        }
        
        .status {
          padding: 0.5rem 1rem;
          border-radius: 30px;
          font-size: 0.85rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .status.upcoming {
          background-color: #e3f2fd;
          color: #1976d2;
        }
        
        .status.completed {
          background-color: #e8f5e9;
          color: #388e3c;
        }
        
        .status.canceled {
          background-color: #ffebee;
          color: #d32f2f;
        }
        
        .event-text-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 2rem;
          background: linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.4) 60%, transparent);
          color: white;
          z-index: 1;
        }
        
        .event-header {
          margin-bottom: 1.5rem;
        }
        
        .event-header h1 {
          font-size: 2rem;
          color: white;
          margin-bottom: 0.5rem;
          text-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }
        
        .event-meta {
          display: flex;
          align-items: center;
        }
        
        .event-category {
          display: inline-flex;
          align-items: center;
          background-color: rgba(255, 255, 255, 0.2);
          color: white;
          padding: 0.4rem 0.8rem;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 600;
          backdrop-filter: blur(5px);
        }
        
        .event-category i {
          margin-right: 0.4rem;
          font-size: 0.8rem;
        }
        
        .event-info {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
        }
        
        .info-item {
          display: flex;
          align-items: flex-start;
        }
        
        .info-icon {
          background-color: rgba(255, 255, 255, 0.2);
          width: 40px;
          height: 40px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 1rem;
          color: white;
          backdrop-filter: blur(5px);
        }
        
        .info-text {
          flex: 1;
        }
        
        .info-label {
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.8);
          margin: 0 0 0.25rem 0;
        }
        
        .info-text p:last-child {
          margin: 0;
          font-weight: 600;
          color: white;
          text-shadow: 0 1px 2px rgba(0,0,0,0.3);
        }
        
        .event-content {
          padding: 2rem;
        }
        
        .description {
          margin-bottom: 2rem;
        }
        
        .description h3 {
          font-size: 1.25rem;
          color: #2d3748;
          margin-bottom: 0.75rem;
          position: relative;
          padding-bottom: 0.5rem;
        }
        
        .description h3:after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 50px;
          height: 3px;
          background: linear-gradient(90deg, #4a6cf7, #8b5cf6);
          border-radius: 3px;
        }
        
        .description p {
          color: #4a5568;
          line-height: 1.6;
        }
        
        .registration-progress {
          margin-bottom: 2rem;
        }
        
        .progress-info {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.5rem;
          font-size: 0.9rem;
          color: #4a5568;
        }
        
        .progress-container {
          height: 10px;
          background-color: #edf2f7;
          border-radius: 10px;
          overflow: hidden;
        }
        
        .progress-bar {
          height: 100%;
          background: linear-gradient(90deg, #4a6cf7, #8b5cf6);
          border-radius: 10px;
          transition: width 0.5s ease;
        }
        
        .action-buttons {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }
        
        .btn {
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: none;
          transition: all 0.3s ease;
          text-decoration: none;
          font-size: 1rem;
        }
        
        .btn i {
          margin-right: 0.5rem;
        }
        
        .btn-primary {
          background: linear-gradient(135deg, #4a6cf7, #3b5bdb);
          color: white;
          box-shadow: 0 4px 15px rgba(74, 108, 247, 0.3);
        }
        
        .btn-primary:hover {
          background: linear-gradient(135deg, #3b5bdb, #2c4fd8);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(74, 108, 247, 0.4);
        }
        
        .btn-danger {
          background: linear-gradient(135deg, #f56565, #e53e3e);
          color: white;
          box-shadow: 0 4px 15px rgba(245, 101, 101, 0.3);
        }
        
        .btn-danger:hover {
          background: linear-gradient(135deg, #e53e3e, #c53030);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(245, 101, 101, 0.4);
        }
        
        .btn-success {
          background: linear-gradient(135deg, #48bb78, #38a169);
          color: white;
          box-shadow: 0 4px 15px rgba(72, 187, 120, 0.3);
        }
        
        .btn-success:hover {
          background: linear-gradient(135deg, #38a169, #2f855a);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(72, 187, 120, 0.4);
        }
        
        .btn-outline {
          background-color: transparent;
          border: 2px solid #cbd5e0;
          color: #4a5568;
        }
        
        .btn-outline:hover {
          background-color: #f7fafc;
          border-color: #a0aec0;
          transform: translateY(-2px);
        }
        
        .loading-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 50vh;
        }
        
        .spinner-container {
          width: 60px;
          height: 60px;
          margin-bottom: 1.5rem;
        }
        
        .spinner {
          width: 100%;
          height: 100%;
          border: 4px solid rgba(74, 108, 247, 0.2);
          border-radius: 50%;
          border-top: 4px solid #4a6cf7;
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .not-found {
          text-align: center;
          padding: 3rem;
          background: white;
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          max-width: 500px;
          margin: 0 auto;
        }
        
        .not-found-icon {
          font-size: 4rem;
          color: #cbd5e0;
          margin-bottom: 1rem;
        }
        
        .not-found h3 {
          font-size: 1.5rem;
          color: #2d3748;
          margin-bottom: 0.5rem;
        }
        
        .not-found p {
          color: #718096;
          margin-bottom: 1.5rem;
        }
        
        @media (max-width: 768px) {
          .event-image-container {
            height: 250px;
          }
          
          .event-header h1 {
            font-size: 1.5rem;
          }
          
          .event-info {
            grid-template-columns: 1fr;
          }
          
          .action-buttons {
            flex-direction: column;
          }
          
          .btn {
            width: 100%;
          }
        }
        
        @media (min-width: 769px) {
          .event-card {
            flex-direction: row;
          }
          
          .event-image-container {
            width: 60%;
            height: auto;
            min-height: 500px;
          }
          
          .event-content {
            width: 40%;
            padding: 2.5rem;
          }
        }
        
        @media (min-width: 1024px) {
          .event-image-container {
            min-height: 600px;
          }
        }
      `}</style>
    </div>
  );
}
export default EventDetails;