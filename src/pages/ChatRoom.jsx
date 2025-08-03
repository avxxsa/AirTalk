import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { storeMessage, getMessagesByRoom } from "../utils/db"; // ✅ import IndexedDB helpers

const ChatRoom = () => {
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [chatBackground, setChatBackground] = useState("default");
  const [showCustomization, setShowCustomization] = useState(false);
  const messagesEndRef = useRef(null);

  const currentUser = "You";
  const chattingWith = id
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const backgroundOptions = [
    { id: "default", name: "Default", class: "bg-gray-50" },
    { id: "blue", name: "Ocean Blue", class: "bg-gradient-to-b from-blue-50 to-blue-100" },
    { id: "green", name: "Forest Green", class: "bg-gradient-to-b from-green-50 to-green-100" },
    { id: "purple", name: "Lavender", class: "bg-gradient-to-b from-purple-50 to-purple-100" },
    { id: "pink", name: "Rose", class: "bg-gradient-to-b from-pink-50 to-pink-100" },
    { id: "dark", name: "Dark Mode", class: "bg-gradient-to-b from-gray-800 to-gray-900" },
  ];

  // ✅ Load messages from IndexedDB
  useEffect(() => {
    const loadMessages = async () => {
      const saved = await getMessagesByRoom(id);
      if (saved.length) {
        setMessages(saved);
      } else {
        const initialMessages = [
          {
            id: "1",
            sender: chattingWith,
            content: "Hey! Ready to chat?",
            timestamp: new Date(Date.now() - 300000),
            isCurrentUser: false,
            avatar: "/placeholder.svg"
          },
          {
            id: "2",
            sender: currentUser,
            content: "Yes! Let’s get started.",
            timestamp: new Date(Date.now() - 200000),
            isCurrentUser: true,
            avatar: "/placeholder.svg"
          },
        ];
        setMessages(initialMessages);
        for (const m of initialMessages) {
          await storeMessage({ roomId: id, sender: m.sender, content: m.content, timestamp: m.timestamp });
        }
      }
    };
    loadMessages();
  }, [id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!messageInput.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      sender: currentUser,
      content: messageInput,
      timestamp: new Date(),
      isCurrentUser: true,
      avatar: "/placeholder.svg",
    };

    setMessages(prev => [...prev, newMessage]);
    setMessageInput("");

    // ✅ Save to IndexedDB
    await storeMessage({
      roomId: id,
      sender: newMessage.sender,
      content: newMessage.content,
      timestamp: newMessage.timestamp,
    });
  };

  const formatTime = (date) => new Date(date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const getCurrentBackgroundClass = () => backgroundOptions.find((bg) => bg.id === chatBackground)?.class || "bg-gray-50";
  const isDarkMode = chatBackground === "dark";

  return (
    <div className="bg-white text-gray-800 min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-20">
        <div className="container mx-auto px-0 md:px-6 h-[calc(100vh-64px-80px)] flex flex-col">
          {/* Header */}
          <div className="bg-white border-b border-gray-200 p-4 flex justify-between items-center sticky top-16 z-10">
            <h1 className="text-xl font-medium text-gray-800">{chattingWith}</h1>
            <button
              onClick={() => setShowCustomization(!showCustomization)}
              className="text-gray-500 hover:text-gray-700"
              title="Customize Chat Background"
            >
              🎨
            </button>
          </div>

          {/* Background Customization */}
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

          {/* Chat Area */}
          <div className={`flex-1 overflow-y-auto p-4 space-y-4 flex flex-col justify-end ${getCurrentBackgroundClass()} scroll-smooth`}>
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.isCurrentUser ? "justify-end" : "justify-start"}`}>
                <div className="max-w-xs lg:max-w-md">
                  <div className={`text-sm p-3 rounded-lg shadow-sm ${
                    msg.isCurrentUser
                      ? "bg-[#E5989B] text-white rounded-br-none"
                      : isDarkMode
                      ? "bg-gray-700 text-white rounded-bl-none"
                      : "bg-white text-gray-800 rounded-bl-none"
                  }`}>
                    {msg.content}
                  </div>
                  <div className={`text-xs mt-1 ${isDarkMode ? "text-gray-300" : "text-gray-500"}`}>
                    {msg.sender} • {formatTime(msg.timestamp)}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="bg-white border-t border-gray-200 p-4">
            <form onSubmit={handleSendMessage} className="flex items-center">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-1 focus:ring-[#E5989B] focus:border-[#E5989B]"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
              />
              <button
                type="submit"
                className="ml-3 bg-[#E5989B] text-white rounded-full p-2 hover:bg-[#d88a8d] focus:outline-none"
                disabled={messageInput.trim() === ""}
              >
                ➤
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChatRoom;
