import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function CreateEvent() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    date: '',
    time: '',
    location: '',
    maxParticipants: '',
    image: ''
  })

  const { title, description, category, date, time, location, maxParticipants, image } = formData

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    
    console.log('Event created:', formData)
    alert('Event created successfully!')
    navigate('/dashboard/admin')
  }

  return (
    <div className="create-event-page">
      <div className="container">
        <div className="form-wrapper">
          <h1>Create New Event</h1>
          
          <div className="form-card">
            <form onSubmit={onSubmit}>
              <div className="form-grid">
                <div>
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
                <div>
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

              <div className="form-grid">
                <div>
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
                <div>
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
                <div>
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
                <div>
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
              </div>

              <div className="button-group">
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => navigate('/dashboard/admin')}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  Create Event
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        .create-event-page {
          padding: 40px 20px;
          background: #f9fafb;
        }
        .container {
          max-width: 900px;
          margin: 0 auto;
        }
        .form-wrapper h1 {
          font-size: 28px;
          font-weight: bold;
          margin-bottom: 20px;
          text-align: center;
          color: #333;
        }
        .form-card {
          background: #fff;
          border-radius: 8px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.08);
          padding: 24px;
        }
        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 20px;
        }
        .form-group {
          margin-bottom: 20px;
        }
        label {
          display: block;
          font-weight: 500;
          margin-bottom: 8px;
          color: #444;
        }
        input, select, textarea {
          width: 100%;
          padding: 10px 12px;
          border: 1px solid #ccc;
          border-radius: 6px;
          font-size: 14px;
          color: #333;
          outline: none;
        }
        input:focus, select:focus, textarea:focus {
          border-color: #4f46e5;
          box-shadow: 0 0 0 2px rgba(79,70,229,0.2);
        }
        textarea {
          resize: vertical;
        }
        .button-group {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
        }
        .btn {
          padding: 10px 18px;
          font-size: 14px;
          font-weight: 500;
          border-radius: 6px;
          cursor: pointer;
          border: none;
        }
        .btn-primary {
          background: #4f46e5;
          color: #fff;
        }
        .btn-outline {
          background: #fff;
          border: 1px solid #ccc;
          color: #333;
        }
        .btn-outline:hover {
          background: #f3f4f6;
        }
        .btn-primary:hover {
          background: #4338ca;
        }
        @media (max-width: 768px) {
          .form-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  )
}

export default CreateEvent
