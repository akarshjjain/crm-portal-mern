// Chatbot.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, X } from 'lucide-react'; // Import X for close button

const Chatbot = ({ onClose }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Initial greeting message from the bot
  useEffect(() => {
    setMessages([
      { sender: 'bot', text: 'Hello! How can I assist you with Team1 Consulting or our CRM portal today?' }
    ]);
  }, []);

  // Scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (input.trim() === '') return;

    const userMessage = input;
    setMessages((prevMessages) => [...prevMessages, { sender: 'user', text: userMessage }]);
    setInput('');
    setIsLoading(true);

    try {
      // For local development, ensure your Flask app is running on http://localhost:5000
      const response = await fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setMessages((prevMessages) => [...prevMessages, { sender: 'bot', text: data.response }]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'bot', text: 'Sorry, I am having trouble connecting to the AI. Please try again later.' }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 w-80 h-96 bg-white rounded-lg shadow-xl flex flex-col font-sans border border-gray-200 z-50">
      <div className="flex items-center justify-between p-3 bg-indigo-700 text-white rounded-t-lg">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Bot className="w-5 h-5" /> AI Assistant
        </h3>
        <button
          onClick={onClose}
          className="p-1 rounded-full hover:bg-indigo-600 transition"
          aria-label="Close Chatbot"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-3 custom-scrollbar">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex items-start gap-2 ${
              msg.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {msg.sender === 'bot' && (
              <div className="bg-gray-200 p-2 rounded-full flex-shrink-0">
                <Bot className="w-4 h-4 text-gray-700" />
              </div>
            )}
            <div
              className={`max-w-[75%] p-3 rounded-xl shadow-sm ${
                msg.sender === 'user'
                  ? 'bg-blue-500 text-white rounded-br-none'
                  : 'bg-gray-100 text-gray-800 rounded-bl-none'
              }`}
            >
              <p className="text-sm break-words">{msg.text}</p>
            </div>
            {msg.sender === 'user' && (
              <div className="bg-blue-500 p-2 rounded-full flex-shrink-0">
                <User className="w-4 h-4 text-white" />
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 text-gray-600 p-3 rounded-xl rounded-bl-none text-sm animate-pulse">
              Typing...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} /> {/* For auto-scrolling */}
      </div>

      <div className="p-3 border-t border-gray-200 bg-white rounded-b-lg">
        <div className="flex items-center gap-2">
          <textarea
            className="flex-1 p-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none overflow-hidden h-10"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            rows={1}
            style={{ minHeight: '40px', maxHeight: '100px' }} // Control textarea height
          />
          <button
            onClick={handleSendMessage}
            disabled={isLoading || input.trim() === ''}
            className="p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
            aria-label="Send Message"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
