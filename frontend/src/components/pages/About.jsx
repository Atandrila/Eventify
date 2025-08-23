import React from 'react';

function About() {
  const styles = {
    page: {
      padding: '4rem 1rem',
      backgroundColor: '#f9fafb',
      fontFamily: 'Arial, sans-serif',
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
    },
    title: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      marginBottom: '2rem',
      textAlign: 'center',
    },
    section: {
      background: '#fff',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      padding: '2rem',
      marginBottom: '3rem',
    },
    sectionTitle: {
      fontSize: '1.8rem',
      fontWeight: '600',
      marginBottom: '1rem',
      color: '#333',
    },
    text: {
      color: '#555',
      lineHeight: '1.6',
      marginBottom: '1.5rem',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '2rem',
      marginBottom: '3rem',
    },
    card: {
      background: '#fff',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      padding: '2rem',
    },
    list: {
      listStyle: 'none',
      padding: 0,
    },
    listItem: {
      marginBottom: '0.8rem',
      color: '#444',
      fontSize: '1rem',
    },
    teamGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '2rem',
      marginTop: '2rem',
    },
    teamMember: {
      textAlign: 'center',
    },
    avatar: {
      width: '80px',
      height: '80px',
      borderRadius: '50%',
      background: '#e0e7ff',
      color: '#4f46e5',
      fontSize: '1.5rem',
      fontWeight: 'bold',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 1rem',
    },
    checkIcon: {
      color: 'green',
      marginRight: '8px',
    },
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>About Eventify</h1>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Our Mission</h2>
          <p style={styles.text}>
            Eventify is dedicated to revolutionizing how university clubs manage and promote their events.
            We believe that every student should have easy access to exciting events and opportunities for growth,
            while club organizers should have powerful tools to streamline their event management processes.
          </p>

          <h2 style={styles.sectionTitle}>Our Vision</h2>
          <p style={styles.text}>
            We envision a campus where event participation is seamless, rewarding, and accessible to all students.
            By providing a centralized platform for event discovery, registration, and management, we aim to
            foster a more connected and engaged university community.
          </p>
        </div>

        <div style={styles.grid}>
          <div style={styles.card}>
            <h2 style={styles.sectionTitle}>For Students</h2>
            <ul style={styles.list}>
              <li style={styles.listItem}>✔️ Discover and register for exciting events across campus</li>
              <li style={styles.listItem}>✔️ Manage your event registrations in one place</li>
              <li style={styles.listItem}>✔️ Receive certificates for completed events</li>
              <li style={styles.listItem}>✔️ Get personalized event recommendations</li>
            </ul>
          </div>

          <div style={styles.card}>
            <h2 style={styles.sectionTitle}>For Club Organizers</h2>
            <ul style={styles.list}>
              <li style={styles.listItem}>✔️ Create and manage events with ease</li>
              <li style={styles.listItem}>✔️ Track event registrations and attendance</li>
              <li style={styles.listItem}>✔️ Generate certificates for participants</li>
              <li style={styles.listItem}>✔️ Access analytics and insights about your events</li>
            </ul>
          </div>
        </div>

<div style={styles.section}>
          <h2 style={styles.sectionTitle}>Our Team</h2>
          <p style={styles.text}>
            Eventify is developed by a team of passionate students and developers who understand the challenges
            of event management in a university setting. We're committed to creating a platform that makes
            event organization and participation a seamless experience for everyone.
          </p>

          <div style={styles.teamGrid}>
            <div style={styles.teamMember}>
              <div style={styles.avatar}>JD</div>
              <h3>John Doe</h3>
              <p>Project Lead</p>
            </div>

            <div style={styles.teamMember}>
              <div style={styles.avatar}>JS</div>
              <h3>Jane Smith</h3>
              <p>Frontend Developer</p>
            </div>

            <div style={styles.teamMember}>
              <div style={styles.avatar}>MJ</div>
              <h3>Mike Johnson</h3>
              <p>Backend Developer</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;