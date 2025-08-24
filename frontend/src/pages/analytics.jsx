import React from 'react';

function Analytics() {
  const categories = [
    { name: 'Academic', value: 35, color: '#4f46e5' },
    { name: 'Sports', value: 25, color: '#10b981' },
    { name: 'Cultural', value: 20, color: '#f59e0b' },
    { name: 'Workshop', value: 20, color: '#3b82f6' }
  ];

  const monthlyRegistrations = [
    { month: 'Aug', height: 80 },
    { month: 'Sep', height: 40 },
    { month: 'Oct', height: 70 },
    { month: 'Nov', height: 150 },
    { month: 'Dec', height: 100 }
  ];

  return (
    <div className="analytics-root">
      <style>{`
        .analytics-root {
          padding: 40px 80px; /* Increased padding from both sides */
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background-color: #f8fafc;
          color: #334155;
          min-height: 100vh;
        }
        
        .analytics-title {
          font-size: 2.5rem;
          margin-bottom: 40px; /* Increased margin */
          text-align: center;
          color: #1e293b;
          font-weight: 700;
          position: relative;
          padding-bottom: 20px; /* Increased padding */
        }
        
        .analytics-title::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 100px; /* Increased width */
          height: 4px;
          background: linear-gradient(90deg, #4f46e5, #3b82f6);
          border-radius: 2px;
        }
        
        .analytics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 30px; /* Increased gap */
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .card {
          background-color: #ffffff;
          padding: 30px; /* Increased padding */
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
          transition: all 0.3s ease;
          border: 1px solid #e2e8f0;
        }
        
        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.08);
        }
        
        .card-title {
          font-size: 1.4rem;
          margin-bottom: 25px; /* Increased margin */
          color: #1e293b;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 12px; /* Increased gap */
        }
        
        .card-title::before {
          content: '';
          width: 6px; /* Increased width */
          height: 26px; /* Increased height */
          background: linear-gradient(to bottom, #4f46e5, #3b82f6);
          border-radius: 3px;
        }
        
        .spacey > div {
          margin-bottom: 22px; /* Increased margin */
        }
        
        .spacey > div:last-child {
          margin-bottom: 0;
        }
        
        .row-between {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px; /* Increased margin */
        }
        
        .text-strong {
          font-weight: 600;
        }
        
        .small {
          font-size: 0.9rem;
        }
        
        .progress {
          height: 14px; /* Increased height */
          background-color: #f1f5f9;
          border-radius: 7px; /* Increased border radius */
          overflow: hidden;
          position: relative;
        }
        
        .progress-bar {
          height: 100%;
          border-radius: 7px; /* Increased border radius */
          position: relative;
          overflow: hidden;
        }
        
        .progress-bar::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.3) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          animation: shimmer 2s infinite;
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .bar-chart {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          height: 280px; /* Increased height */
          gap: 20px; /* Increased gap */
          padding: 30px 20px; /* Increased padding */
          background-color: #f8fafc;
          border-radius: 10px; /* Increased border radius */
          position: relative;
        }
        
        .bar-chart::before {
          content: '';
          position: absolute;
          left: 15px; /* Adjusted position */
          top: 15px; /* Adjusted position */
          bottom: 45px; /* Adjusted position */
          width: 1px;
          background-color: #e2e8f0;
        }
        
        .bar-col {
          display: flex;
          flex-direction: column;
          align-items: center;
          flex: 1;
        }
        
        .bar {
          width: 100%;
          background: linear-gradient(to top, #4f46e5, #6366f1);
          border-radius: 8px 8px 0 0; /* Increased border radius */
          transition: height 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
          position: relative;
          min-height: 8px; /* Increased min height */
        }
        
        .bar:hover {
          opacity: 0.9;
        }
        
        .bar-label {
          margin-top: 12px; /* Increased margin */
          font-size: 0.9rem;
          color: #64748b;
          text-align: center;
          font-weight: 500;
        }
        
        .stats-summary {
          display: flex;
          justify-content: space-between;
          margin-top: 25px; /* Increased margin */
          padding-top: 20px; /* Increased padding */
          border-top: 1px solid #e2e8f0;
        }
        
        .stat-item {
          text-align: center;
          padding: 0 15px; /* Added padding */
        }
        
        .stat-value {
          font-size: 1.6rem; /* Increased font size */
          font-weight: 700;
          color: #1e293b;
        }
        
        .stat-label {
          font-size: 0.85rem;
          color: #64748b;
          margin-top: 8px; /* Increased margin */
        }
        
        @media (max-width: 768px) {
          .analytics-root {
            padding: 30px 40px; /* Increased mobile padding */
          }
          
          .analytics-title {
            font-size: 2rem;
            margin-bottom: 30px; /* Adjusted margin */
          }
          
          .analytics-grid {
            grid-template-columns: 1fr;
          }
          
          .bar-chart {
            height: 220px; /* Adjusted height */
            gap: 15px; /* Adjusted gap */
            padding: 20px 15px; /* Adjusted padding */
          }
          
          .card {
            padding: 25px; /* Adjusted padding */
          }
        }
      `}</style>
      
      <h1 className="analytics-title">Registration Analytics</h1>
      
      <section className="analytics-grid">
        {/* Event Categories */}
        <div className="card">
          <h2 className="card-title">Event Categories</h2>
          <div className="spacey">
            {categories.map(cat => (
              <div key={cat.name}>
                <div className="row-between">
                  <span className="text-strong small">{cat.name}</span>
                  <span className="text-strong small">{cat.value}%</span>
                </div>
                <div className="progress">
                  <div 
                    className="progress-bar" 
                    style={{ 
                      width: `${cat.value}%`, 
                      backgroundColor: cat.color 
                    }} 
                  />
                </div>
              </div>
            ))}
          </div>
          
          <div className="stats-summary">
            <div className="stat-item">
              <div className="stat-value">4</div>
              <div className="stat-label">Categories</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">100%</div>
              <div className="stat-label">Total</div>
            </div>
          </div>
        </div>
        
        {/* Monthly Registrations */}
        <div className="card">
          <h2 className="card-title">Monthly Registrations</h2>
          <div className="bar-chart">
            {monthlyRegistrations.map(({ month, height }) => (
              <div className="bar-col" key={month}>
                <div 
                  className="bar" 
                  style={{ 
                    height: `${height}px`,
                    background: `linear-gradient(to top, #4f46e5, ${height > 100 ? '#818cf8' : '#6366f1'})`
                  }} 
                />
                <span className="bar-label">{month}</span>
              </div>
            ))}
          </div>
          
          <div className="stats-summary">
            <div className="stat-item">
              <div className="stat-value">440</div>
              <div className="stat-label">Total</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">88</div>
              <div className="stat-label">Avg/Month</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Analytics;