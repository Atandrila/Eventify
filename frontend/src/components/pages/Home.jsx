import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import EventList from "../components/events/EventList";
import Chatbot from "../components/chatbot/ChatBot";

function Home() {
  const [events, setEvents] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Background images for carousel
  const heroImages = [
    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
  ];

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [heroImages.length]);

  // Simulate loading
  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 300);
  }, []);

  const features = [
    {
      title: "Event Discovery",
      desc: "Browse and register for exciting events happening across your university.",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      ),
    },
    {
      title: "Role-Based Access",
      desc: "Students and admins get different access levels for seamless management.",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
        />
      ),
    },
    {
      title: "Certificates",
      desc: "Automatically generate participation certificates for completed events.",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      ),
    },
  ];

  return (
    <div className="home-page">
      {/* Hero Section with Image Carousel */}
      <section className="hero">
        {/* Background Images */}
        <div className="hero-background">
          {heroImages.map((img, index) => (
            <div 
              key={index}
              className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
              style={{ backgroundImage: `url(${img})` }}
            />
          ))}
          <div className="hero-overlay"></div>
        </div>
        
        {/* Floating Shapes */}
        <div className="floating-shapes">
          {[...Array(6)].map((_, i) => (
            <div key={i} className={`shape shape-${i+1}`}></div>
          ))}
        </div>
        
        {/* Hero Content */}
        <div className={`hero-content ${isLoaded ? 'loaded' : ''}`}>
          <h1 className="hero-title">
            Welcome to <span className="hero-highlight">Eventify</span>
          </h1>
          <p className="hero-text">
            The ultimate platform for managing university events. Discover,
            participate, and organize with ease.
          </p>
          <div className="hero-buttons">
            <Link to="/events" className="hero-button-primary">
              Explore Events
            </Link>
            <Link to="/register" className="hero-button-secondary">
              Join Now
            </Link>
          </div>
        </div>
        
        {/* Carousel Indicators */}
        <div className="carousel-indicators">
          {heroImages.map((_, index) => (
            <button 
              key={index} 
              className={`indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </section>
      
      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2 className="features-title">
            Why Choose <span className="text-primary">Eventify?</span>
          </h2>
          <div className="feature-grid">
            {features.map((feature, i) => (
              <div key={i} className={`feature-card ${isLoaded ? 'loaded' : ''}`} style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="feature-icon-wrapper">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {feature.icon}
                  </svg>
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-desc">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Upcoming Events */}
      <section className="upcoming">
        <div className="container">
          <div className="upcoming-header">
            <h2 className="upcoming-title">
              Upcoming <span className="text-primary">Events</span>
            </h2>
            <Link to="/events" className="upcoming-button">
              View All
            </Link>
          </div>
          <div className={`events-container ${isLoaded ? 'loaded' : ''}`}>
            <EventList
              events={events.filter((event) => event.status === "upcoming")}
            />
          </div>
        </div>
      </section>
      
      {/* Floating Chatbot */}
      <div className="chatbot">
        <Chatbot />
      </div>
      
      <style jsx>{`
        :root {
          --primary: #4f46e5;
          --primary-light: #818cf8;
          --primary-dark: #4338ca;
          --accent: #f97316;
          --accent-light: #fdba74;
          --text: #1e293b;
          --text-light: #64748b;
          --white: #ffffff;
          --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }
        
        .home-page {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          overflow-x: hidden;
        }
        
        /* Hero Section */
        .hero {
          position: relative;
          height: 100vh;
          min-height: 600px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        
        .hero-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -2;
        }
        
        .hero-slide {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
          opacity: 0;
          transition: opacity 1.5s ease-in-out;
        }
        
        .hero-slide.active {
          opacity: 1;
        }
        
        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, rgba(79, 70, 229, 0.85) 0%, rgba(124, 58, 237, 0.85) 100%);
          z-index: -1;
        }
        
        .hero-content {
          text-align: center;
          color: var(--white);
          padding: 0 1rem;
          max-width: 800px;
          z-index: 1;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .hero-content.loaded {
          opacity: 1;
          transform: translateY(0);
        }
        
        .hero-title {
          font-size: clamp(2.5rem, 8vw, 4rem);
          font-weight: 800;
          margin-bottom: 1.5rem;
          line-height: 1.2;
        }
        
        .hero-highlight {
          color: #facc15;
          position: relative;
          display: inline-block;
        }
        
        .hero-highlight::after {
          content: '';
          position: absolute;
          bottom: 5px;
          left: 0;
          width: 100%;
          height: 8px;
          background-color: rgba(250, 204, 21, 0.3);
          z-index: -1;
          border-radius: 4px;
        }
        
        .hero-text {
          font-size: 1.2rem;
          max-width: 700px;
          margin: 0 auto 2rem;
          color: rgba(255, 255, 255, 0.9);
        }
        
        .hero-buttons {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }
        
        .hero-button-primary {
          padding: 0.8rem 2rem;
          background-color: #facc15;
          color: #312e81;
          font-weight: 600;
          border-radius: 50px;
          text-decoration: none;
          transition: all 0.3s ease;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          position: relative;
          overflow: hidden;
        }
        
        .hero-button-primary::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: rgba(255, 255, 255, 0.2);
          transition: left 0.5s ease;
        }
        
        .hero-button-primary:hover::before {
          left: 100%;
        }
        
        .hero-button-primary:hover {
          background-color: #fde047;
          transform: translateY(-2px);
          box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
        }
        
        .hero-button-secondary {
          padding: 0.8rem 2rem;
          border: 2px solid var(--white);
          color: var(--white);
          font-weight: 600;
          border-radius: 50px;
          text-decoration: none;
          transition: all 0.3s ease;
        }
        
        .hero-button-secondary:hover {
          background-color: var(--white);
          color: var(--primary-dark);
          transform: translateY(-2px);
        }
        
        .carousel-indicators {
          position: absolute;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 10px;
          z-index: 2;
        }
        
        .indicator {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.4);
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .indicator.active {
          background-color: var(--white);
          transform: scale(1.2);
        }
        
        /* Floating Shapes */
        .floating-shapes {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          z-index: 0;
        }
        
        .shape {
          position: absolute;
          border-radius: 50%;
          opacity: 0.1;
          animation: float 15s infinite ease-in-out;
        }
        
        .shape-1 {
          width: 80px;
          height: 80px;
          background-color: #facc15;
          top: 10%;
          left: 10%;
          animation-delay: 0s;
        }
        
        .shape-2 {
          width: 120px;
          height: 120px;
          background-color: #818cf8;
          top: 70%;
          left: 5%;
          animation-delay: 1s;
        }
        
        .shape-3 {
          width: 60px;
          height: 60px;
          background-color: #f97316;
          top: 20%;
          right: 10%;
          animation-delay: 2s;
        }
        
        .shape-4 {
          width: 100px;
          height: 100px;
          background-color: #818cf8;
          bottom: 10%;
          right: 15%;
          animation-delay: 3s;
        }
        
        .shape-5 {
          width: 40px;
          height: 40px;
          background-color: #facc15;
          top: 40%;
          left: 30%;
          animation-delay: 4s;
        }
        
        .shape-6 {
          width: 70px;
          height: 70px;
          background-color: #f97316;
          bottom: 30%;
          right: 30%;
          animation-delay: 5s;
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(10deg);
          }
        }
        
        /* Features Section */
        .features {
          padding: 5rem 1rem;
          background: linear-gradient(to bottom, #f9fafb, #f3f4f6);
        }
        
        .container {
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .features-title {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 3rem;
          text-align: center;
          position: relative;
        }
        
        .features-title::after {
          content: '';
          position: absolute;
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
          width: 80px;
          height: 4px;
          background: linear-gradient(to right, var(--primary), var(--primary-light));
          border-radius: 2px;
        }
        
        .text-primary {
          color: var(--primary);
        }
        
        .feature-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }
        
        .feature-card {
          background: var(--white);
          border-radius: 16px;
          box-shadow: var(--shadow);
          padding: 2rem;
          text-align: center;
          transition: all 0.3s ease;
          opacity: 0;
          transform: translateY(20px);
        }
        
        .feature-card.loaded {
          opacity: 1;
          transform: translateY(0);
        }
        
        .feature-card:hover {
          transform: translateY(-10px);
          box-shadow: var(--shadow-lg);
        }
        
        .feature-icon-wrapper {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--primary-light), var(--primary));
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.5rem;
          color: var(--white);
          box-shadow: 0 4px 10px rgba(79, 70, 229, 0.3);
        }
        
        .feature-title {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 1rem;
          color: var(--text);
        }
        
        .feature-desc {
          color: var(--text-light);
          line-height: 1.6;
        }
        
        /* Upcoming Events */
        .upcoming {
          padding: 5rem 1rem;
          background: var(--white);
        }
        
        .upcoming-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          flex-wrap: wrap;
          gap: 1rem;
        }
        
        .upcoming-title {
          font-size: 2.5rem;
          font-weight: 700;
          position: relative;
        }
        
        .upcoming-title::after {
          content: '';
          position: absolute;
          bottom: -10px;
          left: 0;
          width: 60px;
          height: 4px;
          background: linear-gradient(to right, var(--primary), var(--primary-light));
          border-radius: 2px;
        }
        
        .upcoming-button {
          padding: 0.6rem 1.5rem;
          border: 2px solid var(--primary);
          color: var(--primary);
          border-radius: 50px;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
        }
        
        .upcoming-button:hover {
          background-color: var(--primary);
          color: var(--white);
          transform: translateY(-2px);
          box-shadow: 0 4px 6px rgba(79, 70, 229, 0.3);
        }
        
        .events-container {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .events-container.loaded {
          opacity: 1;
          transform: translateY(0);
        }
        
        /* Chatbot */
        .chatbot {
          position: fixed;
          bottom: 20px;
          right: 20px;
          z-index: 1000;
        }
        
        /* Responsive */
        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.5rem;
          }
          
          .features-title, .upcoming-title {
            font-size: 2rem;
          }
          
          .feature-grid {
            grid-template-columns: 1fr;
          }
          
          .upcoming-header {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </div>
  );
}

export default Home;