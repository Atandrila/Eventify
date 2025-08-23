import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

function StudentDashboard() {
  const { currentUser } = useAuth()
  const [activeTab, setActiveTab] = useState('upcoming')
  const [registrations, setRegistrations] = useState([])

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
          status: "upcoming"
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
          status: "upcoming"
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
          status: "completed"
        },
        registrationDate: "2023-11-01",
        status: "attended"
      }
    ]
    
    setRegistrations(mockRegistrations)
  }, [])

  const upcomingEvents = registrations.filter(reg => 
    reg.event.status === 'upcoming' && reg.status === 'registered'
  )
  
  const completedEvents = registrations.filter(reg => 
    reg.event.status === 'completed' && reg.status === 'attended'
  )

  const handleUnregister = (id) => {
    // Simulate unregistration
    alert('Successfully unregistered from the event!')
    setRegistrations(registrations.filter(reg => reg.id !== id))
  }

  return (
    <div className="py-8">
      <div className="container">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-lg font-semibold mb-4">Dashboard</h2>
              <ul className="space-y-2">
                <li>
                  <Link 
                    to="/dashboard/student" 
                    className="flex items-center text-indigo-600 bg-indigo-50 px-4 py-2 rounded-lg"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    My Events
                  </Link>
                </li>
                <li>
                  <Link to="/events" className="flex items-center text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    Browse Events
                  </Link>
                </li>
                <li>
                  <Link to="/certificate" className="flex items-center text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    My Certificates
                  </Link>
                </li>
                <li>
                  <Link to="#" className="flex items-center text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    My Profile
                  </Link>
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4">Quick Stats</h2>
              <div className="space-y-3">
                <div className="bg-indigo-50 p-3 rounded-lg">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Registered Events</span>
                    <span className="font-semibold text-indigo-600">{upcomingEvents.length}</span>
                  </div>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Completed Events</span>
                    <span className="font-semibold text-green-600">{completedEvents.length}</span>
                  </div>
                </div>
                <div className="bg-yellow-50 p-3 rounded-lg">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Events</span>
                    <span className="font-semibold text-yellow-600">{registrations.length}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h1 className="text-3xl font-bold text-gray-800">My Events</h1>
                  <p className="text-gray-600">Events you have registered for</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-600">Welcome back,</p>
                  <p className="text-xl font-semibold">{currentUser?.name}</p>
                </div>
              </div>
              
              {/* Tabs */}
              <div className="border-b border-gray-200 mb-6">
                <ul className="flex flex-wrap -mb-px text-sm font-medium text-center">
                  <li className="mr-2">
                    <button
                      className={`inline-block p-4 border-b-2 rounded-t-lg ${
                        activeTab === 'upcoming'
                          ? 'border-indigo-600 text-indigo-600'
                          : 'border-transparent text-gray-500 hover:text-gray-600 hover:border-gray-300'
                      }`}
                      onClick={() => setActiveTab('upcoming')}
                    >
                      Upcoming
                    </button>
                  </li>
                  <li className="mr-2">
                    <button
                      className={`inline-block p-4 border-b-2 rounded-t-lg ${
                        activeTab === 'completed'
                          ? 'border-indigo-600 text-indigo-600'
                          : 'border-transparent text-gray-500 hover:text-gray-600 hover:border-gray-300'
                      }`}
                      onClick={() => setActiveTab('completed')}
                    >
                      Completed
                    </button>
                  </li>
                </ul>
              </div>

              {/* Upcoming Events */}
              {activeTab === 'upcoming' && (
                <div className="space-y-6">
                  {upcomingEvents.length === 0 ? (
                    <div className="text-center py-12">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <h3 className="text-xl font-semibold text-gray-600 mb-2">No upcoming events</h3>
                      <p className="text-gray-500 mb-4">You haven't registered for any upcoming events.</p>
                      <Link to="/events" className="btn btn-primary">Browse Events</Link>
                    </div>
                  ) : (
                    upcomingEvents.map(registration => (
                      <div key={registration.id} className="card">
                        <div className="p-6">
                          <div className="flex flex-col md:flex-row gap-6">
                            <div className="md:w-1/4">
                              <img 
                                src={registration.event.image} 
                                alt={registration.event.title} 
                                className="w-full h-32 object-cover rounded-lg"
                              />
                            </div>
                            <div className="md:w-3/4">
                              <div className="flex justify-between items-start mb-2">
                                <h3 className="text-xl font-bold text-gray-800">{registration.event.title}</h3>
                                <span className="badge badge-blue">
                                  {registration.event.status}
                                </span>
                              </div>
                              <p className="text-gray-600 mb-4">{registration.event.description.substring(0, 100)}...</p>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div className="text-sm text-gray-600">
                                  <div className="flex items-center mb-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    {new Date(registration.event.date).toLocaleDateString()} at {registration.event.time}
                                  </div>
                                  <div className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    {registration.event.location}
                                  </div>
                                </div>
                                <div className="text-sm text-gray-600">
                                  <div className="flex items-center mb-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    Registered on: {new Date(registration.registrationDate).toLocaleDateString()}
                                  </div>
                                  <div className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                    </svg>
                                    Category: {registration.event.category}
                                  </div>
                                </div>
                              </div>
                              <div className="flex space-x-3">
                                <Link 
                                  to={`/events/${registration.event.id}`} 
                                  className="btn btn-primary"
                                >
                                  View Details
                                </Link>
                                <button 
                                  onClick={() => handleUnregister(registration.id)}
                                  className="btn btn-danger"
                                >
                                  Unregister
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* Completed Events */}
              {activeTab === 'completed' && (
                <div className="space-y-6">
                  {completedEvents.length === 0 ? (
                    <div className="text-center py-12">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <h3 className="text-xl font-semibold text-gray-600 mb-2">No completed events</h3>
                      <p className="text-gray-500">You haven't attended any events yet.</p>
                    </div>
                  ) : (
                    completedEvents.map(registration => (
                      <div key={registration.id} className="card">
                        <div className="p-6">
                          <div className="flex flex-col md:flex-row gap-6">
                            <div className="md:w-1/4">
                              <img 
                                src={registration.event.image} 
                                alt={registration.event.title} 
                                className="w-full h-32 object-cover rounded-lg"
                              />
                            </div>
                            <div className="md:w-3/4">
                              <div className="flex justify-between items-start mb-2">
                                <h3 className="text-xl font-bold text-gray-800">{registration.event.title}</h3>
                                <span className="badge badge-green">
                                  {registration.event.status}
                                </span>
                              </div>
                              <p className="text-gray-600 mb-4">{registration.event.description.substring(0, 100)}...</p>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div className="text-sm text-gray-600">
                                  <div className="flex items-center mb-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    {new Date(registration.event.date).toLocaleDateString()} at {registration.event.time}
                                  </div>
                                  <div className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    {registration.event.location}
                                  </div>
                                </div>
                                <div className="text-sm text-gray-600">
                                  <div className="flex items-center mb-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    Attended on: {new Date(registration.event.date).toLocaleDateString()}
                                  </div>
                                  <div className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                    </svg>
                                    Category: {registration.event.category}
                                  </div>
                                </div>
                              </div>
                              <div className="flex space-x-3">
                                <Link 
                                  to={`/events/${registration.event.id}`} 
                                  className="btn btn-primary"
                                >
                                  View Details
                                </Link>
                                <Link 
                                  to="/certificate" 
                                  className="btn btn-success"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                  </svg>
                                  Certificate
                                </Link>
                              </div>
                            </div>
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
      </div>
    </div>
  )
}

export default StudentDashboard