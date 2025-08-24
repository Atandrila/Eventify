import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateEvent() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    date: '',
    time: '',
    location: '',
    maxParticipants: '',
    image: ''
  });
  const [loading, setLoading] = useState(false);
  const { title, description, category, date, time, location, maxParticipants, image } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
      });
      if (!res.ok) {
        throw new Error("Failed to create event");
      }
      await res.json();
      alert("Event created successfully!");
      navigate("/dashboard/admin");
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-event-page">
      <div className="container">
        <div className="form-wrapper">
          <div className="page-header">
            <h1>Create New Event</h1>
            <p className="subtitle">Fill in the details below to create a new event</p>
          </div>
          
          <div className="form-card">
            <form onSubmit={onSubmit}>
              <div className="form-section">
                <h2 className="section-title">Event Information</h2>
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="title">Event Title *</label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={title}
                      onChange={onChange}
                      placeholder="Enter event title"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="category">Category *</label>
                    <select
                      id="category"
                      name="category"
                      value={category}
                      onChange={onChange}
                      required
                    >
                      <option value="">Select a category</option>
                      <option value="academic">Academic</option>
                      <option value="sports">Sports</option>
                      <option value="cultural">Cultural</option>
                      <option value="workshop">Workshop</option>
                    </select>
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="description">Description *</label>
                  <textarea
                    id="description"
                    name="description"
                    value={description}
                    onChange={onChange}
                    rows="4"
                    placeholder="Enter event description"
                    required
                  ></textarea>
                </div>
              </div>
              
              <div className="form-section">
                <h2 className="section-title">Date & Location</h2>
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="date">Date *</label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={date}
                      onChange={onChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="time">Time *</label>
                    <input
                      type="time"
                      id="time"
                      name="time"
                      value={time}
                      onChange={onChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="location">Location *</label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={location}
                      onChange={onChange}
                      placeholder="Enter event location"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="maxParticipants">Max Participants *</label>
                    <input
                      type="number"
                      id="maxParticipants"
                      name="maxParticipants"
                      value={maxParticipants}
                      onChange={onChange}
                      placeholder="Enter maximum participants"
                      min="1"
                      required
                    />
                  </div>
                </div>
              </div>
              
              <div className="form-section">
                <h2 className="section-title">Media</h2>
                <div className="form-group">
                  <label htmlFor="image">Event Image URL</label>
                  <input
                    type="text"
                    id="image"
                    name="image"
                    value={image}
                    onChange={onChange}
                    placeholder="Enter image URL (optional)"
                  />
                  <div className="field-help">Provide a URL to an image that represents your event</div>
                </div>
              </div>
              
              <div className="button-group">
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => navigate('/dashboard/admin')}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? "Creating..." : "Create Event"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        :root {
          --primary: #4f46e5;
          --primary-light: #6366f1;
          --primary-dark: #4338ca;
          --secondary: #f8fafc;
          --text: #1e293b;
          --text-light: #64748b;
          --border: #e2e8f0;
          --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
          --radius: 12px;
        }
        
        .create-event-page {
          padding: 40px 20px;
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          min-height: 100vh;
        }
        
        .container {
          max-width: 900px;
          margin: 0 auto;
        }
        
        .form-wrapper {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        
        .page-header {
          text-align: center;
          margin-bottom: 8px;
        }
        
        .page-header h1 {
          font-size: 32px;
          font-weight: 800;
          color: var(--text);
          margin: 0 0 8px;
        }
        
        .subtitle {
          color: var(--text-light);
          font-size: 16px;
          margin: 0;
        }
        
        .form-card {
          background: white;
          border-radius: var(--radius);
          box-shadow: var(--shadow-lg);
          padding: 32px;
          transition: box-shadow 0.3s ease;
        }
        
        .form-card:hover {
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
        
        .form-section {
          margin-bottom: 32px;
        }
        
        .form-section:last-child {
          margin-bottom: 0;
        }
        
        .section-title {
          font-size: 18px;
          font-weight: 700;
          color: var(--text);
          margin: 0 0 20px;
          padding-bottom: 12px;
          border-bottom: 1px solid var(--border);
          display: flex;
          align-items: center;
        }
        
        .section-title::before {
          content: '';
          display: inline-block;
          width: 4px;
          height: 20px;
          background: var(--primary);
          margin-right: 12px;
          border-radius: 2px;
        }
        
        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          margin-bottom: 24px;
        }
        
        .form-group {
          margin-bottom: 20px;
        }
        
        .form-group:last-child {
          margin-bottom: 0;
        }
        
        label {
          display: block;
          font-weight: 600;
          margin-bottom: 8px;
          color: var(--text);
          font-size: 14px;
        }
        
        input, select, textarea {
          width: 100%;
          padding: 12px 16px;
          border: 1px solid var(--border);
          border-radius: 8px;
          font-size: 15px;
          color: var(--text);
          background: white;
          transition: all 0.2s ease;
          outline: none;
        }
        
        input:focus, select:focus, textarea:focus {
          border-color: var(--primary);
          box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.15);
        }
        
        textarea {
          resize: vertical;
          min-height: 100px;
        }
        
        .field-help {
          margin-top: 6px;
          font-size: 13px;
          color: var(--text-light);
        }
        
        .button-group {
          display: flex;
          justify-content: flex-end;
          gap: 16px;
          margin-top: 32px;
          padding-top: 24px;
          border-top: 1px solid var(--border);
        }
        
        .btn {
          padding: 12px 24px;
          font-size: 15px;
          font-weight: 600;
          border-radius: 8px;
          cursor: pointer;
          border: none;
          transition: all 0.2s ease;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 120px;
        }
        
        .btn:active {
          transform: translateY(1px);
        }
        
        .btn-primary {
          background: var(--primary);
          color: white;
        }
        
        .btn-primary:hover {
          background: var(--primary-dark);
          box-shadow: 0 4px 6px -1px rgba(79, 70, 229, 0.3);
        }
        
        .btn-primary:disabled {
          background: #a5b4fc;
          cursor: not-allowed;
        }
        
        .btn-outline {
          background: white;
          border: 1px solid var(--border);
          color: var(--text);
        }
        
        .btn-outline:hover {
          background: var(--secondary);
          border-color: var(--primary);
          color: var(--primary);
        }
        
        @media (max-width: 768px) {
          .form-grid {
            grid-template-columns: 1fr;
          }
          
          .form-card {
            padding: 24px;
          }
          
          .button-group {
            flex-direction: column;
            gap: 12px;
          }
          
          .btn {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}

export default CreateEvent;