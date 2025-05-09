import { useState, useEffect } from 'react';
import { ChatBubbleLeftRightIcon, UserGroupIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { useInView } from 'react-intersection-observer';

function App() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const { ref: contentRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const chatRooms = [
    { id: 1, name: "Computer Science Hub", unread: 3 },
    { id: 2, name: "Engineering Lounge", unread: 0 },
    { id: 3, name: "Campus Events", unread: 5 },
  ];

  const directMessages = [
    { id: 1, name: "Sarah Parker", online: true },
    { id: 2, name: "Alex Kumar", online: true },
    { id: 3, name: "Maya Sharma", online: false },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 shadow-md' : 'bg-white/80'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold text-indigo-600">KU MeshChat</h1>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-8">
                {['Home', 'About', 'Join'].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:scale-105"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-16 flex h-screen">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <p className="text-sm text-gray-500">Connected to KU WiFi</p>
          </div>

          {/* Chat Rooms */}
          <div className="p-4">
            <h2 className="flex items-center text-sm font-semibold text-gray-600 mb-2">
              <UserGroupIcon className="h-4 w-4 mr-2" />
              Chat Rooms
            </h2>
            <div className="space-y-1">
              {chatRooms.map(room => (
                <button
                  key={room.id}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-indigo-50 transition-colors"
                  onClick={() => setSelectedChat(room)}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">{room.name}</span>
                    {room.unread > 0 && (
                      <span className="bg-indigo-500 text-white text-xs px-2 py-1 rounded-full">
                        {room.unread}
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Direct Messages */}
          <div className="p-4">
            <h2 className="flex items-center text-sm font-semibold text-gray-600 mb-2">
              <ChatBubbleLeftRightIcon className="h-4 w-4 mr-2" />
              Direct Messages
            </h2>
            <div className="space-y-1">
              {directMessages.map(dm => (
                <button
                  key={dm.id}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-indigo-50 transition-colors"
                  onClick={() => setSelectedChat(dm)}
                >
                  <div className="flex items-center">
                    <div className="relative">
                      <UserCircleIcon className="h-6 w-6 text-gray-400" />
                      {dm.online && (
                        <div className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-green-400 ring-1 ring-white"></div>
                      )}
                    </div>
                    <span className="ml-2 text-sm text-gray-700">{dm.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {selectedChat ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200 bg-white">
                <h2 className="text-lg font-semibold text-gray-800">{selectedChat.name}</h2>
              </div>

              {/* Messages Area */}
              <div ref={contentRef} className={`flex-1 p-4 overflow-y-auto transition-opacity duration-500 ${inView ? 'opacity-100' : 'opacity-0'}`}>
                <div className="flex flex-col space-y-4">
                  <div className="flex items-start space-x-2">
                    <UserCircleIcon className="h-8 w-8 text-gray-400" />
                    <div className="bg-white rounded-lg p-3 shadow-sm">
                      <p className="text-sm text-gray-800">Hey everyone! Anyone up for study group tonight? 📚</p>
                    </div>
                  </div>
                  <div className="flex items-start justify-end space-x-2">
                    <div className="bg-indigo-500 rounded-lg p-3 shadow-sm">
                      <p className="text-sm text-white">Count me in! Library at 7?</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-gray-200 bg-white">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    className="flex-1 rounded-lg border border-gray-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <button className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors">
                    Send
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <ChatBubbleLeftRightIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900">Welcome to KU MeshChat!</h3>
                <p className="mt-1 text-sm text-gray-500">Select a chat to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">KU MeshChat</h3>
              <p className="text-sm text-indigo-200">Connect with your peers on campus, no internet required.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <p className="text-sm text-indigo-200">support@kumeshchat.edu.np</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-indigo-200 hover:text-white transition-colors">Twitter</a>
                <a href="#" className="text-indigo-200 hover:text-white transition-colors">GitHub</a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-indigo-500 text-center text-sm text-indigo-200">
            <p>&copy; {new Date().getFullYear()} KU MeshChat. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;