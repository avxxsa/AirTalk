// pages/Chatrooms.jsx
import { Link } from 'react-router-dom';
import { MessageSquare, Users, Book } from 'lucide-react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const ChatroomCard = ({ title, description, icon: Icon, members }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
      <div className="flex items-center mb-4">
        <Icon size={24} className="text-rose-500 mr-3" />
        <h3 className="text-xl font-medium">{title}</h3>
      </div>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500 flex items-center">
          <Users size={16} className="mr-1" /> {members} members
        </span>
        <button className="text-rose-500 hover:text-rose-600">Join</button>
      </div>
    </div>
  );
};

const Chatrooms = () => {
  const popularChatrooms = [
    {
      title: "General Campus",
      description: "General discussion about campus life and events.",
      icon: MessageSquare,
      members: 325
    },
    {
      title: "COMP 207 Group",
      description: "Collaboration space for COMP 207 course projects.",
      icon: Book,
      members: 42
    },
    {
      title: "Engineering Hub",
      description: "For all engineering students to discuss academics.",
      icon: MessageSquare,
      members: 189
    },
    {
      title: "Campus Events",
      description: "Updates about upcoming events around KU.",
      icon: MessageSquare,
      members: 267
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif mb-4">Explore Chatrooms</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find and join chatrooms based on your interests or courses.
            Connect with fellow students even without internet.
          </p>
        </div>
        
        <div className="mb-16">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-serif">Popular Chatrooms</h2>
            <Link to="/all-rooms" className="text-rose-500 hover:underline">View all</Link>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularChatrooms.map((room, index) => (
              <ChatroomCard key={index} {...room} />
            ))}
          </div>
        </div>
        
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-serif mb-6">Create a New Chatroom</h2>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="room-name">
                Chatroom Name
              </label>
              <input
                type="text"
                id="room-name"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-rose-300"
                placeholder="Enter chatroom name..."
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 mb-2" htmlFor="room-desc">
                Description
              </label>
              <textarea
                id="room-desc"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-rose-300"
                rows="3"
                placeholder="What's this chatroom about?"
              ></textarea>
            </div>
            
            <button
              type="submit"
              className="bg-rose-500 text-white px-6 py-2 rounded-md hover:bg-rose-600 transition"
            >
              Create Chatroom
            </button>
          </form>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Chatrooms;