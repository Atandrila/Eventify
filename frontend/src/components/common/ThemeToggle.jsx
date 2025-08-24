import React, { useState, useEffect } from 'react'

function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true'
    setDarkMode(isDarkMode)
    if (isDarkMode) {
      document.body.classList.add('dark-mode')
    }
  }, [])

  const toggleTheme = () => {
    const newDarkMode = !darkMode
    setDarkMode(newDarkMode)
    localStorage.setItem('darkMode', newDarkMode)

    if (newDarkMode) {
      document.body.classList.add('dark-mode')
    } else {
      document.body.classList.remove('dark-mode')
    }
  }

  return (
    <>
      <button onClick={toggleTheme} className="theme-toggle-btn">
        {darkMode ? (
          // Sun Icon
          <svg xmlns="http://www.w3.org/2000/svg" className="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        ) : (
          // Moon Icon
          <svg xmlns="http://www.w3.org/2000/svg" className="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        )}
      </button>

      <style>{`
        .theme-toggle-btn {
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 8px;
          border-radius: 50%;
          transition: background 0.3s;
        }
        .theme-toggle-btn:hover {
          background: rgba(0, 0, 0, 0.05);
        }
        .icon {
          width: 24px;
          height: 24px;
          stroke: #555;
          transition: stroke 0.3s;
        }
        body.dark-mode {
          background-color: #1a202c;
          color: #f9fafb;
        }
        body.dark-mode .icon {
          stroke: #f9fafb;
        }
      `}</style>
    </>
  )
}

export default ThemeToggle
