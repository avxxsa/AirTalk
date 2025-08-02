// roomsfront.jsx (Updated for 1-on-1 private chats only)

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const RoomsFront = () => {
  const [allChats] = useState([
    {
      id: "avipsa-pratistha",
      name: "Avipsa & Pratistha",
      description: "Private chat between Avipsa and Pratistha",
      image: "/images/avipsa.jpg",
      isJoined: true,
      joinedDate: new Date("2024-01-15"),
      lastActivity: new Date("2024-01-20"),
      createdDate: new Date("2023-09-01"),
    },
    {
      id: "elvish-misan",
      name: "Elvish & Misan",
      description: "Private chat between Elvish and Misan",
      image: "/images/misan.jpg",
      isJoined: false,
      joinedDate: null,
      lastActivity: new Date("2024-01-18"),
      createdDate: new Date("2023-09-05"),
    },
    {
      id: "avipsa-ayusha",
      name: "Avipsa & Ayusha",
      description: "Private chat between Avipsa and Ayusha",
      image: "/images/ayusha.jpg",
      isJoined: true,
      joinedDate: new Date("2024-01-10"),
      lastActivity: new Date("2024-01-19"),
      createdDate: new Date("2023-09-07"),
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name-asc");
  const [activeTab, setActiveTab] = useState("all");

  const joinedChats = allChats.filter((room) => room.isJoined);

  const getFilteredChats = () => {
    let filtered = allChats;
    if (activeTab === "joined") filtered = filtered.filter((r) => r.isJoined);
    if (searchTerm) {
      filtered = filtered.filter(
        (room) =>
          room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          room.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        case "joined-date":
          return new Date(b.joinedDate || 0) - new Date(a.joinedDate || 0);
        case "last-activity":
          return new Date(b.lastActivity) - new Date(a.lastActivity);
        case "created-date":
          return new Date(b.createdDate) - new Date(a.createdDate);
        default:
          return 0;
      }
    });
    return filtered;
  };

  const filteredChats = getFilteredChats();
  const formatDate = (date) => (date ? new Date(date).toLocaleDateString() : "Never");
  const clearFilters = () => {
    setSearchTerm("");
    setSortBy("name-asc");
  };

  return (
    <div className="bg-white text-gray-800 min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-6">
          <h1 className="text-3xl md:text-4xl font-light font-serif text-gray-800 mb-4">Private Chats</h1>
          <p className="text-gray-600 max-w-2xl">
            Start one-on-one conversations with KU friends. No group chats supported.
          </p>

          <div className="mt-4">
            <nav className="flex space-x-8 border-b border-gray-200 mb-6">
              <button
                onClick={() => setActiveTab("all")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "all"
                    ? "border-[#E5989B] text-[#E5989B]"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                All Chats ({allChats.length})
              </button>
              <button
                onClick={() => setActiveTab("joined")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "joined"
                    ? "border-[#E5989B] text-[#E5989B]"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Your Chats ({joinedChats.length})
              </button>
            </nav>

            <div className="flex gap-4 mb-6 flex-wrap">
              <input
                type="text"
                placeholder="Search private chats..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md w-full md:w-64"
              />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md"
              >
                <option value="name-asc">Name (A-Z)</option>
                <option value="name-desc">Name (Z-A)</option>
                <option value="joined-date">Joined Date</option>
                <option value="last-activity">Last Activity</option>
                <option value="created-date">Creation Date</option>
              </select>
              <button
                onClick={clearFilters}
                className="text-sm text-gray-600 hover:text-[#E5989B]"
              >
                Clear Filters
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredChats.map((room) => (
                <div
                  key={room.id}
                  className="bg-white border rounded-lg shadow-sm hover:shadow-md transition overflow-hidden"
                >
                  <div className="relative h-40 w-full">
                    <img
                      src={room.image || "/placeholder.svg"}
                      alt={room.name}
                      className="w-full h-full object-cover"
                    />
                    {room.isJoined && (
                      <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                        Joined
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-medium text-gray-800 mb-1">{room.name}</h3>
                    <p className="text-gray-600 text-sm mb-3">{room.description}</p>
                    <p className="text-xs text-gray-500 mb-3">Last Active: {formatDate(room.lastActivity)}</p>

                    <Link
                      to={`/rooms/${room.id}`}
                      className="block w-full text-center bg-[#E5989B] text-white py-2 rounded hover:bg-[#d88a8d] text-sm"
                    >
                      {room.isJoined ? "Enter Chat" : "Start Chat"}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RoomsFront;