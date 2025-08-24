// Format date utility
export const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

// Format time utility
export const formatTime = (timeString) => {
  const [hours, minutes] = timeString.split(':')
  const date = new Date()
  date.setHours(hours, minutes)
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

// Calculate percentage
export const calculatePercentage = (value, total) => {
  return Math.round((value / total) * 100)
}

// Truncate text
export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}

// Generate random ID
export const generateId = () => {
  return Math.random().toString(36).substr(2, 9)
}

// Debounce function
export const debounce = (func, wait) => {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}