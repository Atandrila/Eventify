import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const mockEvents = [
      {
        id: 1,
        title: "Web Development Workshop",
        category: "workshop",
        date: "2023-12-15",
        time: "14:00",
        location: "Computer Lab A",
        description: "Learn modern web development techniques including HTML5, CSS3, and JavaScript. This hands-on workshop will cover responsive design and interactive web applications. Perfect for beginners and intermediate learners looking to enhance their web development skills.",
        maxParticipants: 30,
        registered: 25,
        image: "/src/assets/images/event1.jpg",
        status: "upcoming"
      },
      {
        id: 2,
        title: "Annual Sports Meet",
        category: "sports",
        date: "2023-12-20",
        time: "09:00",
        location: "University Stadium",
        description: "Join us for the annual sports meet featuring various athletic competitions, team sports, and fun activities for all students. Participate in track and field events, team sports, and enjoy a day of healthy competition and camaraderie.",
        maxParticipants: 200,
        registered: 180,
        image: "/src/assets/images/event2.jpg",
        status: "upcoming"
      },
      {
        id: 3,
        title: "Cultural Festival",
        category: "cultural",
        date: "2023-11-25",
        time: "18:00",
        location: "Main Auditorium",
        description: "Experience diverse cultural performances, music, dance, and art exhibitions from around the world. Celebrate the rich cultural diversity of our university community through performances, food, and interactive exhibits.",
        maxParticipants: 500,
        registered: 450,
        image: "/src/assets/images/event3.jpg",
        status: "completed"
      },
      {
        id: 4,
        title: "AI & Machine Learning Seminar",
        category: "academic",
        date: "2023-12-25",
        time: "10:00",
        location: "Lecture Hall B",
        description: "Explore the latest trends in Artificial Intelligence and Machine Learning with industry experts and researchers. Learn about cutting-edge applications, ethical considerations, and future directions in AI and ML.",
        maxParticipants: 100,
        registered: 75,
        image: "/src/assets/images/event4.jpg",
        status: "upcoming"
      }
    ];

    const foundEvent = mockEvents.find(e => e.id === parseInt(id));
    setEvent(foundEvent);
    setLoading(false);
  }, [id]);

  const handleRegister = () => {
    if (!currentUser) {
      navigate('/login', { state: { from: `/events/${id}` } });
      return;
    }
    alert('Successfully registered for the event!');
  };

  const handleUnregister = () => {
    alert('Successfully unregistered from the event!');
  };

  const handleDownloadCertificate = () => {
    navigate('/certificate');
  };

  if (loading) {
    return (
      <div className="loading-section">
        <div className="spinner"></div>
        <p>Loading event details...</p>
        <style>{`
          .loading-section {
            text-align: center;
            padding: 80px;
          }
          .spinner {
            border: 4px solid #f3f3f3;
            border-top: 4px solid #4f46e5;
            border-radius: 50%;
            width: 48px;
            height: 48px;
            animation: spin 1s linear infinite;
            margin: 0 auto;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="not-found">
        <h3>Event not found</h3>
        <p>The event you're looking for doesn't exist or has been removed.</p>
        <Link to="/events" className="btn">Browse Events</Link>
        <style>{`
          .not-found {
            text-align: center;
            padding: 80px;
          }
          .not-found h3 {
            font-size: 1.5rem;
            margin-bottom: 10px;
          }
          .not-found p {
            color: #666;
            margin-bottom: 20px;
          }
          .btn {
            background: #4f46e5;
            color: #fff;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 6px;
          }
        `}</style>
      </div>
    );
  }

  const registeredPercentage = (event.registered / event.maxParticipants) * 100;
  const statusColor = event.status === 'completed' ? 'green' : 'blue';

  return (
    <div className="event-details">
      <Link to="/events" className="back-link">← Back to Events</Link>
      <div className="event-card">
        <img src={event.image} alt={event.title} />
        <div className="event-content">
          <div className="event-header">
            <h1>{event.title}</h1>
            <span className={`status ${statusColor}`}>{event.status}</span>
          </div>
          <div className="event-info">
            <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()} at {event.time}</p>
            <p><strong>Location:</strong> {event.location}</p>
            <p><strong>Participants:</strong> {event.registered}/{event.maxParticipants}</p>
            <p><strong>Category:</strong> {event.category}</p>
          </div>
          <div className="description">
            <h3>Description</h3>
            <p>{event.description}</p>
          </div>
          <div className="progress">
            <div className="progress-bar" style={{ width: `${registeredPercentage}%` }}></div>
          </div>
          <div className="buttons">
            {event.status === 'upcoming' ? (
              <>
                <button onClick={handleRegister} className="btn primary">Register</button>
                <button onClick={handleUnregister} className="btn danger">Unregister</button>
              </>
            ) : (
              <button onClick={handleDownloadCertificate} className="btn success">Download Certificate</button>
            )}
            <button className="btn outline">Share Event</button>
          </div>
        </div>
      </div>
      <style>{`
        .event-details {
          padding: 40px;
          max-width: 1000px;
          margin: 0 auto;
        }
        .back-link {
          display: inline-block;
          margin-bottom: 20px;
          color: #4f46e5;
          text-decoration: none;
          font-weight: 500;
        }
        .event-card {
          background: #fff;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        }
        .event-card img {
          width: 100%;
          height: 300px;
          object-fit: cover;
        }
        .event-content {
          padding: 20px;
        }
        .event-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }
        .event-header h1 {
          font-size: 2rem;
          margin: 0;
        }
        .status {
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: bold;
        }
        .status.blue {
          background: #e0e7ff;
          color: #1e40af;
        }
        .status.green {
          background: #d1fae5;
          color: #065f46;
        }
        .event-info p {
          margin: 8px 0;
          color: #555;
        }
        .description h3 {
          margin: 20px 0 10px;
        }
        .description p {
          line-height: 1.6;
          color: #444;
        }
        .progress {
          background: #e5e7eb;
          height: 8px;
          border-radius: 4px;
          margin: 20px 0;
        }
        .progress-bar {
          background: #4f46e5;
          height: 8px;
          border-radius: 4px;
        }
        .buttons {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }
        .btn {
          padding: 10px 16px;
          border-radius: 6px;
          border: none;
          cursor: pointer;
          font-size: 14px;
          font-weight: 500;
        }
        .btn.primary {
          background: #4f46e5;
          color: #fff;
        }
        .btn.danger {
          background: #dc2626;
          color: #fff;
        }
        .btn.success {
          background: #059669;
          color: #fff;
        }
        .btn.outline {
          border: 1px solid #ccc;
          background: transparent;
          color: #333;
        }
      `}</style>
    </div>
  );
}

export default EventDetails;
