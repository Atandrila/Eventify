import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

function AdminDashboard() {
  const { currentUser } = useAuth()
  const [events, setEvents] = useState([])
  const [stats, setStats] = useState({
    totalEvents: 0,
    upcomingEvents: 0,
    totalRegistrations: 0,
    certificatesIssued: 0
  })

  useEffect(() => {
    // Simulate fetching events
    const mockEvents = [
      {
        id: 1,
        title: "Web Development Workshop",
        category: "workshop",
        date: "2023-12-15",
        time: "14:00",
        location: "Computer Lab A",
        maxParticipants: 30,
        registeredParticipants: 25,
        status: "upcoming",
        createdBy: currentUser?.id
      },
      {
        id: 2,
        title: "Annual Sports Meet",
        category: "sports",
        date: "2023-12-20",
        time: "09:00",
        location: "University Stadium",
        maxParticipants: 200,
        registeredParticipants: 180,
        status: "upcoming",
        createdBy: currentUser?.id
      },
      {
        id: 3,
        title: "Cultural Festival",
        category: "cultural",
        date: "2023-11-25",
        time: "18:00",
        location: "Main Auditorium",
        maxParticipants: 500,
        registeredParticipants: 450,
        status: "completed",
        createdBy: currentUser?.id
      },
      {
        id: 4,
        title: "AI & Machine Learning Seminar",
        category: "academic",
        date: "2023-12-25",
        time: "10:00",
        location: "Lecture Hall B",
        maxParticipants: 100,
        registeredParticipants: 75,
        status: "upcoming",
        createdBy: currentUser?.id
      }
    ]
    
    setEvents(mockEvents)
    
    // Calculate stats
    const totalEvents = mockEvents.length
    const upcomingEvents = mockEvents.filter(e => e.status === 'upcoming').length
    const totalRegistrations = mockEvents.reduce((sum, event) => sum + event.registeredParticipants, 0)
    const certificatesIssued = mockEvents.filter(e => e.status === 'completed').length * 25
    
    setStats({
      totalEvents,
      upcomingEvents,
      totalRegistrations,
      certificatesIssued
    })
  }, [currentUser])

  const handleDeleteEvent = (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      // Simulate deletion
      setEvents(events.filter(event => event.id !== id))
      alert('Event deleted successfully!')
    }
  }

  const handleToggleStatus = (id) => {
    // Simulate status toggle
    setEvents(events.map(event => {
      if (event.id === id) {
        return {
          ...event,
          status: event.status === 'upcoming' ? 'completed' : 'upcoming'
        }
      }
      return event
    }))
  }

  return (
    <div className="py-8">
      <div className="container">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-lg font-semibold mb-4">Admin Panel</h2>
              <ul className="space-y-2">
                <li>
                  <Link 
                    to="/dashboard/admin" 
                    className="flex items-center text-indigo-600 bg-indigo-50 px-4 py-2 rounded-lg"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/create-event" className="flex items-center text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Create Event
                  </Link>
                </li>
                <li>
                  <Link to="/events" className="flex items-center text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Manage Events
                  </Link>
                </li>
                <li>
                  <Link to="#" className="flex items-center text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Manage Users
                  </Link>
                </li>
                <li>
                  <Link to="#" className="flex items-center text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    Analytics
                  </Link>
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <Link to="/create-event" className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-300 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Create Event
                </Link>
                <button className="w-full border border-indigo-600 text-indigo-600 py-2 rounded-lg hover:bg-indigo-50 transition duration-300 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Export Data
                </button>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="flex-1">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
              <p className="text-gray-600">Manage events and view analytics</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Total Events</p>
                    <p className="text-2xl font-bold text-gray-800">{stats.totalEvents}</p>
                  </div>
                  <div className="bg-indigo-100 p-3 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                <div className="mt-4">
                  <span className="text-green-500 text-sm font-medium">+2 from last month</span>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Upcoming Events</p>
                    <p className="text-2xl font-bold text-gray-800">{stats.upcomingEvents}</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div className="mt-4">
                  <span className="text-green-500 text-sm font-medium">+1 from last week</span>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Total Registrations</p>
                    <p className="text-2xl font-bold text-gray-800">{stats.totalRegistrations}</p>
                  </div>
                  <div className="bg-green-100 p-3 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                </div>
                <div className="mt-4">
                  <span className="text-green-500 text-sm font-medium">+24 from last week</span>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Certificates Issued</p>
                    <p className="text-2xl font-bold text-gray-800">{stats.certificatesIssued}</p>
                  </div>
                  <div className="bg-yellow-100 p-3 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                </div>
                <div className="mt-4">
                  <span className="text-green-500 text-sm font-medium">+12 from last week</span>
                </div>
              </div>
            </div>

            {/* Recent Events */}
            <div className="bg-white rounded-lg shadow mb-8">
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-800">Recent Events</h2>
                <Link to="/events" className="text-indigo-600 hover:text-indigo-800 text-sm">View All</Link>
              </div>
              <div className="overflow-x-auto">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Event</th>
                      <th>Date</th>
                      <th>Registrations</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {events.map(event => (
                      <tr key={event.id}>
                        <td>
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <img className="h-10 w-10 rounded-full" src="/src/assets/images/event1.jpg" alt="" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{event.title}</div>
                              <div className="text-sm text-gray-500">{event.location}</div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="text-sm text-gray-900">{new Date(event.date).toLocaleDateString()}</div>
                          <div className="text-sm text-gray-500">{event.time}</div>
                        </td>
                        <td>
                          <div className="text-sm text-gray-900">{event.registeredParticipants}/{event.maxParticipants}</div>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                            <div className="bg-indigo-600 h-2 rounded-full" style={{ width: `${(event.registeredParticipants / event.maxParticipants) * 100}%` }}></div>
                          </div>
                        </td>
                        <td>
                          <span className={`badge ${event.status === 'completed' ? 'badge-green' : 'badge-blue'}`}>
                            {event.status}
                          </span>
                        </td>
                        <td className="text-sm font-medium">
                          <Link to={`/events/${event.id}`} className="text-indigo-600 hover:text-indigo-900 mr-3">Edit</Link>
                          <button 
                            onClick={() => handleDeleteEvent(event.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Registration Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Event Categories</h2>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">Academic</span>
                      <span className="text-sm font-medium text-gray-700">35%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '35%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">Sports</span>
                      <span className="text-sm font-medium text-gray-700">25%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '25%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">Cultural</span>
                      <span className="text-sm font-medium text-gray-700">20%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '20%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">Workshop</span>
                      <span className="text-sm font-medium text-gray-700">20%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '20%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Monthly Registrations</h2>
                <div className="flex items-end h-40">
                  <div className="flex-1 flex flex-col items-center">
                    <div className="bg-indigo-600 w-8 rounded-t" style={{ height: '40%' }}></div>
                    <span className="text-xs text-gray-500 mt-1">Aug</span>
                  </div>
                  <div className="flex-1 flex flex-col items-center">
                    <div className="bg-indigo-600 w-8 rounded-t" style={{ height: '60%' }}></div>
                    <span className="text-xs text-gray-500 mt-1">Sep</span>
                  </div>
                  <div className="flex-1 flex flex-col items-center">
                    <div className="bg-indigo-600 w-8 rounded-t" style={{ height: '75%' }}></div>
                    <span className="text-xs text-gray-500 mt-1">Oct</span>
                  </div>
                  <div className="flex-1 flex flex-col items-center">
                    <div className="bg-indigo-600 w-8 rounded-t" style={{ height: '90%' }}></div>
                    <span className="text-xs text-gray-500 mt-1">Nov</span>
                  </div>
                  <div className="flex-1 flex flex-col items-center">
                    <div className="bg-indigo-600 w-8 rounded-t" style={{ height: '100%' }}></div>
                    <span className="text-xs text-gray-500 mt-1">Dec</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard