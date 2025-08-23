import React, { useState, useRef, useEffect } from 'react'

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi! I'm Eventify bot. How can I help you?", sender: 'bot' }
  ])
  const [inputValue, setInputValue] = useState('')
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return

    const userMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user'
    }

    setMessages([...messages, userMessage])
    setInputValue('')

    setTimeout(() => {
      const botResponse = getBotResponse(inputValue)
      const botMessage = {
        id: messages.length + 2,
        text: botResponse,
        sender: 'bot'
      }
      setMessages(prev => [...prev, botMessage])
    }, 500)
  }

  const getBotResponse = (message) => {
    const lowerMessage = message.toLowerCase()

    if (lowerMessage.includes('register')) {
      return "To register for an event, go to the event details page and click the 'Register for Event' button. You'll need to be logged in first."
    } else if (lowerMessage.includes('certificate')) {
      return "Certificates are available for download after an event has ended. You can find them in your dashboard or on the event details page."
    } else if (lowerMessage.includes('cancel') || lowerMessage.includes('unregister')) {
      return "To cancel your registration, go to your dashboard and click 'Unregister' for the event you want to cancel."
    } else if (lowerMessage.includes('create') || lowerMessage.includes('organize')) {
      return "Club admins can create events by clicking the 'Create Event' button on the homepage. You'll need to be logged in as an admin."
    } else if (lowerMessage.includes('login')) {
      return "You can login by clicking the 'Login' button in the top right corner of the page."
    } else if (lowerMessage.includes('help')) {
      return "I can help you with questions about registering for events, certificates, canceling registrations, creating events, and logging in. What would you like to know?"
    } else {
      return "I'm not sure how to answer that. You can ask me about registering for events, certificates, canceling registrations, creating events, or logging in."
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="chatbot-wrapper">
      {/* Chatbot Button */}
      {!isOpen && (
        <button onClick={() => setIsOpen(true)} className="chatbot-button">
          💬
        </button>
      )}

      {/* Chatbot Window */}
      {isOpen && (
        <div className="chatbot-window">
          {/* Header */}
          <div className="chatbot-header">
            <h3>Eventify Assistant</h3>
            <button onClick={() => setIsOpen(false)} className="close-btn">✖</button>
          </div>

          {/* Messages */}
          <div className="chatbot-messages">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}
              >
                {message.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="chatbot-input-area">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
            />
            <button onClick={handleSendMessage} className="send-btn">➤</button>
          </div>
        </div>
      )}

      {/* Internal CSS */}
      <style>{`
        .chatbot-wrapper {
          position: fixed;
          bottom: 20px;
          right: 20px;
          z-index: 9999;
        }
        .chatbot-button {
          background: #4f46e5;
          color: #fff;
          border: none;
          border-radius: 50%;
          padding: 16px;
          font-size: 20px;
          cursor: pointer;
          box-shadow: 0 4px 8px rgba(0,0,0,0.2);
          transition: background 0.3s;
        }
        .chatbot-button:hover {
          background: #4338ca;
        }
        .chatbot-window {
          background: #fff;
          width: 320px;
          height: 400px;
          display: flex;
          flex-direction: column;
          border-radius: 10px;
          box-shadow: 0 8px 16px rgba(0,0,0,0.2);
          overflow: hidden;
        }
        .chatbot-header {
          background: #4f46e5;
          color: #fff;
          padding: 12px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-weight: bold;
        }
        .close-btn {
          background: transparent;
          border: none;
          color: #fff;
          font-size: 16px;
          cursor: pointer;
        }
        .chatbot-messages {
          flex: 1;
          padding: 12px;
          background: #f9fafb;
          overflow-y: auto;
        }
        .message {
          max-width: 75%;
          padding: 8px 12px;
          margin-bottom: 10px;
          border-radius: 8px;
          font-size: 14px;
          line-height: 1.4;
        }
        .bot-message {
          background: #fff;
          border: 1px solid #e5e7eb;
          color: #333;
          align-self: flex-start;
        }
        .user-message {
          background: #4f46e5;
          color: #fff;
          align-self: flex-end;
        }
        .chatbot-input-area {
          display: flex;
          border-top: 1px solid #e5e7eb;
        }
        .chatbot-input-area textarea {
          flex: 1;
          border: none;
          padding: 8px 10px;
          resize: none;
          font-size: 14px;
          outline: none;
        }
        .send-btn {
          background: #4f46e5;
          color: #fff;
          border: none;
          padding: 0 16px;
          cursor: pointer;
          font-size: 18px;
          transition: background 0.3s;
        }
        .send-btn:hover {
          background: #4338ca;
        }
      `}</style>
    </div>
  )
}

export default Chatbot
