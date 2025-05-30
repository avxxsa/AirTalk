import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';

const ChatRoom = () => {
  const params = useParams();
  const roomId = params.id;
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [activeUsers, setActiveUsers] = useState([]);
  const [chatBackground, setChatBackground] = useState("default");
  const [showCustomization, setShowCustomization] = useState(false);
  const messagesEndRef = useRef(null);
  const currentUser = "You"; // This would come from authentication context

  // Background options
  const backgroundOptions = [
    { id: "default", name: "Default", class: "bg-gray-50" },
    { id: "blue", name: "Ocean Blue", class: "bg-gradient-to-b from-blue-50 to-blue-100" },
    { id: "green", name: "Forest Green", class: "bg-gradient-to-b from-green-50 to-green-100" },
    { id: "purple", name: "Lavender", class: "bg-gradient-to-b from-purple-50 to-purple-100" },
    { id: "pink", name: "Rose", class: "bg-gradient-to-b from-pink-50 to-pink-100" },
    { id: "dark", name: "Dark Mode", class: "bg-gradient-to-b from-gray-800 to-gray-900" },
  ];

  // Generate room name from ID
  const getRoomName = () => {
    return roomId
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Load initial data
  useEffect(() => {
    // Simulate loading messages from API with proper user alignment
    const sampleMessages = [
      {
        id: "1",
        sender: "Aarav Sharma",
        content: "Hey everyone! Has anyone started on the project for COMP 342?",
        timestamp: new Date(Date.now() - 3600000 * 2),
        avatar: "/placeholder.svg?height=40&width=40",
        isCurrentUser: false,
      },
      {
        id: "2",
        sender: "You",
        content: "I've been working on it. The requirements are quite challenging!",
        timestamp: new Date(Date.now() - 3600000 * 1.8),
        avatar: "/placeholder.svg?height=40&width=40",
        isCurrentUser: true,
      },
      {
        id: "3",
        sender: "Rohan Joshi",
        content: "I'm planning to start this weekend. Would anyone be interested in forming a study group?",
        timestamp: new Date(Date.now() - 3600000),
        avatar: "/placeholder.svg?height=40&width=40",
        isCurrentUser: false,
      },
      {
        id: "4",
        sender: "You",
        content: "Count me in for the study group! We could meet at the library.",
        timestamp: new Date(Date.now() - 1800000),
        avatar: "/placeholder.svg?height=40&width=40",
        isCurrentUser: true,
      },
      {
        id: "5",
        sender: "Vikram Mehta",
        content: "I'll join too. Has anyone checked the reference materials the professor shared?",
        timestamp: new Date(Date.now() - 900000),
        avatar: "/placeholder.svg?height=40&width=40",
        isCurrentUser: false,
      },
    ];

    // Simulate active users
    const sampleUsers = [
      { id: "1", name: "Aarav Sharma", avatar: "/placeholder.svg?height=40&width=40", status: "online" },
      { id: "2", name: "Priya Patel", avatar: "/placeholder.svg?height=40&width=40", status: "online" },
      { id: "3", name: "Rohan Joshi", avatar: "/placeholder.svg?height=40&width=40", status: "away" },
      { id: "4", name: "Ananya Singh", avatar: "/placeholder.svg?height=40&width=40", status: "online" },
      { id: "5", name: "Vikram Mehta", avatar: "/placeholder.svg?height=40&width=40", status: "offline" },
      { id: "6", name: "Neha Gupta", avatar: "/placeholder.svg?height=40&width=40", status: "online" },
      { id: "7", name: "Arjun Kumar", avatar: "/placeholder.svg?height=40&width=40", status: "away" },
    ];

    setMessages(sampleMessages);
    setActiveUsers(sampleUsers);
  }, [roomId]);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle sending a new message
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (messageInput.trim() === "") return;

    const newMessage = {
      id: Date.now().toString(),
      sender: currentUser,
      content: messageInput,
      timestamp: new Date(),
      avatar: "/placeholder.svg?height=40&width=40",
      isCurrentUser: true,
    };

    setMessages([...messages, newMessage]);
    setMessageInput("");
  };

  // Format timestamp
  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // Get current background class
  const getCurrentBackgroundClass = () => {
    const bg = backgroundOptions.find((bg) => bg.id === chatBackground);
    return bg ? bg.class : "bg-gray-50";
  };

  // Check if background is dark mode
  const isDarkMode = chatBackground === "dark";

  return (
    <div className="bg-white text-gray-800 min-h-screen flex flex-col">
      <Navbar />

      {/* Chat Interface */}
      <main className="flex-grow pt-20">
        <div className="container mx-auto px-0 md:px-6 h-[calc(100vh-64px-80px)] flex flex-col">
          {/* Chatroom Header */}
          <div className="bg-white border-b border-gray-200 p-4 flex justify-between items-center sticky top-16 z-10">
            <div className="flex items-center">
              <h1 className="text-xl font-medium text-gray-800">{getRoomName()}</h1>
              <span className="ml-3 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                {activeUsers.filter((user) => user.status === "online").length} online
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowCustomization(!showCustomization)}
                className="text-gray-500 hover:text-gray-700"
                title="Customize Chat Background"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z"
                  />
                </svg>
              </button>
              <button className="text-gray-500 hover:text-gray-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
              <button className="text-gray-500 hover:text-gray-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Background Customization Panel */}
          {showCustomization && (
            <div className="bg-white border-b border-gray-200 p-4">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Chat Background</h3>
              <div className="flex flex-wrap gap-2">
                {backgroundOptions.map((bg) => (
                  <button
                    key={bg.id}
                    onClick={() => setChatBackground(bg.id)}
                    className={`px-3 py-2 text-xs rounded-md border transition-all ${
                      chatBackground === bg.id
                        ? "border-[#E5989B] bg-[#E5989B] text-white"
                        : "border-gray-300 bg-white text-gray-700 hover:border-[#E5989B]"
                    }`}
                  >
                    {bg.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Chat Container */}
          <div className="flex flex-1 overflow-hidden">
            {/* Messages Area */}
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* Messages */}
              <div className={`flex-1 overflow-y-auto p-4 ${getCurrentBackgroundClass()}`}>
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`mb-4 flex ${message.isCurrentUser ? "justify-end" : "justify-start"}`}
                  >
                    {!message.isCurrentUser && (
                      <div className="flex-shrink-0 mr-3">
                        <div className="relative w-8 h-8 rounded-full overflow-hidden">
                          <img
                            src={message.avatar || "/placeholder.svg"}
                            alt={message.sender}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    )}

                    <div className={`max-w-xs lg:max-w-md ${message.isCurrentUser ? "order-1" : "order-2"}`}>
                      <div className={`flex items-baseline ${message.isCurrentUser ? "justify-end" : "justify-start"}`}>
                        <span className={`font-medium text-sm ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                          {message.sender}
                        </span>
                        <span className={`ml-2 text-xs ${isDarkMode ? "text-gray-300" : "text-gray-500"}`}>
                          {formatTime(message.timestamp)}
                        </span>
                      </div>
                      <div
                        className={`mt-1 text-sm p-3 rounded-lg shadow-sm ${
                          message.isCurrentUser
                            ? "bg-[#E5989B] text-white rounded-br-none"
                            : isDarkMode
                              ? "bg-gray-700 text-white rounded-bl-none"
                              : "bg-white text-gray-800 rounded-bl-none"
                        }`}
                      >
                        {message.content}
                      </div>
                    </div>

                    {message.isCurrentUser && (
                      <div className="flex-shrink-0 ml-3 order-2">
                        <div className="relative w-8 h-8 rounded-full overflow-hidden">
                          <img
                            src={message.avatar || "/placeholder.svg"}
                            alt={message.sender}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="bg-white border-t border-gray-200 p-4">
                <form onSubmit={handleSendMessage} className="flex items-center">
                  <button type="button" className="text-gray-400 hover:text-gray-600 mr-3" aria-label="Attach file">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                      />
                    </svg>
                  </button>
                  <input
                    type="text"
                    placeholder="Type your message..."
                    className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-1 focus:ring-[#E5989B] focus:border-[#E5989B]"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="ml-3 bg-[#E5989B] text-white rounded-full p-2 hover:bg-[#d88a8d] focus:outline-none focus:ring-2 focus:ring-[#E5989B] focus:ring-offset-2"
                    disabled={messageInput.trim() === ""}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                  </button>
                </form>
              </div>
            </div>

            {/* Active Users Sidebar */}
            <div className="hidden md:block w-64 border-l border-gray-200 bg-white overflow-y-auto">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-sm font-medium text-gray-700">Active Users</h2>
              </div>
              <div className="p-4">
                {activeUsers.map((user) => (
                  <div key={user.id} className="flex items-center mb-3 last:mb-0">
                    <div className="relative">
                      <div className="w-8 h-8 rounded-full overflow-hidden">
                        <img
                          src={user.avatar || "/placeholder.svg"}
                          alt={user.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span
                        className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border border-white ${
                          user.status === "online"
                            ? "bg-green-500"
                            : user.status === "away"
                              ? "bg-yellow-500"
                              : "bg-gray-300"
                        }`}
                      ></span>
                    </div>
                    <span className="ml-2 text-sm text-gray-700">{user.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChatRoom;