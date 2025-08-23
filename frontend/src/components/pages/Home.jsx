import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import EventList from "../components/events/EventList";
import Chatbot from "../components/chatbot/ChatBot";

function Home() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const mockEvents = [
      {
        id: 1,
        title: "Web Development Workshop",
        category: "workshop",
        date: "2023-12-15",
        time: "14:00",
        location: "Computer Lab A",
        description:
          "Learn modern web development techniques including HTML5, CSS3, and JavaScript.",
        maxParticipants: 30,
        registered: 25,
        image: "/src/assets/images/event1.jpg",
        status: "upcoming",
      },
      {
        id: 2,
        title: "Annual Sports Meet",
        category: "sports",
        date: "2023-12-20",
        time: "09:00",
        location: "University Stadium",
        description:
          "Join us for the annual sports meet featuring various athletic competitions.",
        maxParticipants: 200,
        registered: 180,
        image: "/src/assets/images/event2.jpg",
        status: "upcoming",
      },
      {
        id: 3,
        title: "Cultural Festival",
        category: "cultural",
        date: "2023-11-25",
        time: "18:00",
        location: "Main Auditorium",
        description:
          "Experience diverse cultural performances, music, dance, and art exhibitions.",
        maxParticipants: 500,
        registered: 450,
        image: "/src/assets/images/event3.jpg",
        status: "completed",
      },
      {
        id: 4,
        title: "AI & Machine Learning Seminar",
        category: "academic",
        date: "2023-12-25",
        time: "10:00",
        location: "Lecture Hall B",
        description:
          "Explore the latest trends in Artificial Intelligence and Machine Learning.",
        maxParticipants: 100,
        registered: 75,
        image: "/src/assets/images/event4.jpg",
        status: "upcoming",
      },
    ];

    setEvents(mockEvents);
  }, []);

const styles = {
    page: {
      fontFamily: "Arial, sans-serif",
    },
    hero: {
      position: "relative",
      background: "linear-gradient(to right, #4f46e5, #7c3aed)",
      color: "#fff",
      padding: "6rem 1rem",
      textAlign: "center",
      overflow: "hidden",
    },
    heroTitle: {
      fontSize: "3rem",
      fontWeight: "800",
      marginBottom: "1.5rem",
      lineHeight: "1.2",
    },
    heroHighlight: {
      color: "#facc15", // Yellow-300
    },
    heroText: {
      fontSize: "1.2rem",
      maxWidth: "700px",
      margin: "0 auto 2rem",
      color: "#e0e7ff",
    },
    heroButtons: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "1rem",
    },
    heroButtonPrimary: {
      padding: "0.8rem 1.5rem",
      backgroundColor: "#facc15",
      color: "#312e81",
      fontWeight: "600",
      borderRadius: "10px",
      textDecoration: "none",
      transition: "background 0.3s",
    },
    heroButtonPrimaryHover: {
      backgroundColor: "#fde047",
    },
    heroButtonSecondary: {
      padding: "0.8rem 1.5rem",
      border: "2px solid #fff",
      color: "#fff",
      fontWeight: "600",
      borderRadius: "10px",
      textDecoration: "none",
      transition: "background 0.3s, color 0.3s",
    },
    features: {
      padding: "5rem 1rem",
      backgroundColor: "#f9fafb",
      textAlign: "center",
    },
    featuresTitle: {
      fontSize: "2rem",
      fontWeight: "700",
      marginBottom: "3rem",
    },
    featureGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
      gap: "2rem",
      maxWidth: "1200px",
      margin: "0 auto",
    },
    featureCard: {
      background: "#fff",
      borderRadius: "15px",
      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      padding: "2rem",
      textAlign: "center",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
    },
    featureIconWrapper: {
      width: "64px",
      height: "64px",
      borderRadius: "50%",
      backgroundColor: "#eef2ff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "0 auto 1rem",
    },
    upcoming: {
      padding: "5rem 1rem",
      backgroundColor: "#fff",
    },
    upcomingHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "2rem",
      maxWidth: "1200px",
      marginLeft: "auto",
      marginRight: "auto",
    },
    upcomingTitle: {
      fontSize: "2rem",
      fontWeight: "700",
    },
    upcomingButton: {
      padding: "0.6rem 1.2rem",
      border: "2px solid #4f46e5",
      color: "#4f46e5",
      borderRadius: "8px",
      textDecoration: "none",
      fontWeight: "600",
      transition: "background 0.3s, color 0.3s",
    },
    chatbot: {
      position: "fixed",
      bottom: "20px",
      right: "20px",
      zIndex: "1000",
    },
  };


const features = [
    {
      title: "Event Discovery",
      desc: "Browse and register for exciting events happening across your university.",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 
             00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
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
          d="M12 15v2m-6 4h12a2 2 0 
             002-2v-6a2 2 0 
             00-2-2H6a2 2 0 
             00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 
             00-8 0v4h8z"
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
          d="M9 12l2 2 4-4m5.618-4.016A11.955 
             11.955 0 0112 2.944a11.955 
             11.955 0 01-8.618 3.04A12.02 
             12.02 0 003 9c0 5.591 3.824 
             10.29 9 11.622 5.176-1.332 9-6.03 
             9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      ),
    },
  ];

  return (
    <div style={styles.page}>
      {/* Hero Section */}
      <section style={styles.hero}>
        <h1 style={styles.heroTitle}>
          Welcome to <span style={styles.heroHighlight}>Eventify</span>
        </h1>
        <p style={styles.heroText}>
          The ultimate platform for managing university events. Discover,
          participate, and organize with ease.
        </p>
        <div style={styles.heroButtons}>
          <Link to="/events" style={styles.heroButtonPrimary}>
            Explore Events
          </Link>
          <Link to="/register" style={styles.heroButtonSecondary}>
            Join Now
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section style={styles.features}>
        <h2 style={styles.featuresTitle}>
          Why Choose <span style={{ color: "#4f46e5" }}>Eventify?</span>
        </h2>
        <div style={styles.featureGrid}>
          {features.map((feature, i) => (
            <div key={i} style={styles.featureCard}>
              <div style={styles.featureIconWrapper}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  style={{ color: "#4f46e5" }}
                >
                  {feature.icon}
                </svg>
              </div>
              <h3 style={{ fontSize: "1.2rem", fontWeight: "600" }}>
                {feature.title}
              </h3>
              <p style={{ color: "#555" }}>{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Upcoming Events */}
      <section style={styles.upcoming}>
        <div style={styles.upcomingHeader}>
          <h2 style={styles.upcomingTitle}>
            Upcoming <span style={{ color: "#4f46e5" }}>Events</span>
          </h2>
          <Link to="/events" style={styles.upcomingButton}>
            View All
          </Link>
        </div>
        <EventList
          events={events.filter((event) => event.status === "upcoming")}
        />
      </section>

      {/* Floating Chatbot */}
      <div style={styles.chatbot}>
        <Chatbot />
      </div>
    </div>
  );
}

export default Home;