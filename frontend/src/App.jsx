import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Footer from './components/common/Footer'
import Header from './components/common/header'
import Home from './pages/Home'
import About from './pages/About'
import Login from './components/auth/login'
import Register from './components/auth/Register'
import StudentDashboard from './components/dashboard/StudentDashboard'
import AdminDashboard from './components/dashboard/AdminDashboard'
import EventList from './components/events/EventList'
import Chatbot from './components/chatbot/Chatbot'
import EventDetails from './components/events/EventDetails'
import CreateEvent from './components/events/CreateEvent'
import CertificateGenerator from './components/certificate/CertificateGenerator'
import NotFound from './pages/NotFound'
import ProtectedRoute from './utils/ProtectedRoute'
import AdminRoute from './utils/AdminRoute'
import Analytics from './pages/analytics'

function App() {
  return (
    <AuthProvider>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/events" element={<EventList />} />
            <Route path="/events/:id" element={<EventDetails />} />
            <Route path="/certificate" element={<CertificateGenerator />} />
            
            <Route 
              path="/dashboard/student" 
              element={
                <ProtectedRoute>
                  <StudentDashboard />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/dashboard/admin" 
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              } 
            />
            
            <Route 
              path="/create-event" 
              element={
                <AdminRoute>
                  <CreateEvent />
                </AdminRoute>
              } 
            />
               <Route path="analytics" element={<Analytics />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  )
}

export default App