import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Rooms = () => {
  // DUMMY DATA - All chatroom data is currently populated with dummy/sample data
  const [allChatrooms] = useState([
    {
      id: "general",
      name: "General",
      description: "General discussion for all KU students",
      members: 245,
      category: "General",
      image: "/placeholder.svg?height=200&width=300",
      isJoined: true,
      joinedDate: new Date("2024-01-15"),
      lastActivity: new Date("2024-01-20"),
      createdDate: new Date("2023-09-01"),
    },
    {
      id: "computer-science",
      name: "Computer Science",
      description: "For CS students to discuss coursework and projects",
      members: 128,
      category: "Academic",
      image: "/placeholder.svg?height=200&width=300",
      isJoined: true,
      joinedDate: new Date("2024-01-10"),
      lastActivity: new Date("2024-01-19"),
      createdDate: new Date("2023-09-05"),
    },
    {
      id: "engineering",
      name: "Engineering",
      description: "Engineering discussions and project collaborations",
      members: 156,
      category: "Academic",
      image: "/placeholder.svg?height=200&width=300",
      isJoined: false,
      joinedDate: null,
      lastActivity: new Date("2024-01-18"),
      createdDate: new Date("2023-09-03"),
    },
    {
      id: "arts",
      name: "Arts & Culture",
      description: "Discuss art, music, and cultural events on campus",
      members: 87,
      category: "Interest",
      image: "/placeholder.svg?height=200&width=300",
      isJoined: true,
      joinedDate: new Date("2024-01-12"),
      lastActivity: new Date("2024-01-17"),
      createdDate: new Date("2023-09-10"),
    },
    {
      id: "events",
      name: "Campus Events",
      description: "Stay updated on all campus events and activities",
      members: 203,
      category: "Events",
      image: "/placeholder.svg?height=200&width=300",
      isJoined: false,
      joinedDate: null,
      lastActivity: new Date("2024-01-16"),
      createdDate: new Date("2023-09-02"),
    },
    {
      id: "study-groups",
      name: "Study Groups",
      description: "Find and join study groups for your courses",
      members: 112,
      category: "Academic",
      image: "/placeholder.svg?height=200&width=300",
      isJoined: true,
      joinedDate: new Date("2024-01-08"),
      lastActivity: new Date("2024-01-15"),
      createdDate: new Date("2023-09-07"),
    },
    {
      id: "basketball",
      name: "Basketball Club",
      description: "For basketball enthusiasts and team members",
      members: 45,
      category: "Sports",
      image: "/placeholder.svg?height=200&width=300",
      isJoined: false,
      joinedDate: null,
      lastActivity: new Date("2024-01-14"),
      createdDate: new Date("2023-09-15"),
    },
    {
      id: "photography",
      name: "Photography Society",
      description: "Share your photos and learn photography techniques",
      members: 67,
      category: "Interest",
      image: "/placeholder.svg?height=200&width=300",
      isJoined: false,
      joinedDate: null,
      lastActivity: new Date("2024-01-13"),
      createdDate: new Date("2023-09-12"),
    },
  ]);

  // Filter and search states
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [joinedFilter, setJoinedFilter] = useState("All"); // All, Joined, Not Joined
  const [sortBy, setSortBy] = useState("name-asc"); // name-asc, name-desc, joined-date, last-activity, created-date
  const [activeTab, setActiveTab] = useState("all"); // all, joined

  // Get unique categories
  const categories = ["All", ...Array.from(new Set(allChatrooms.map((room) => room.category)))];

  // Get joined chatrooms
  const joinedChatrooms = allChatrooms.filter((room) => room.isJoined);

  // Filter and sort chatrooms
  const getFilteredAndSortedChatrooms = () => {
    let filtered = allChatrooms;

    // Apply tab filter
    if (activeTab === "joined") {
      filtered = filtered.filter((room) => room.isJoined);
    }

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (room) =>
          room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          room.description.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // Apply category filter
    if (selectedCategory !== "All") {
      filtered = filtered.filter((room) => room.category === selectedCategory);
    }

    // Apply joined/not joined filter
    if (joinedFilter === "Joined") {
      filtered = filtered.filter((room) => room.isJoined);
    } else if (joinedFilter === "Not Joined") {
      filtered = filtered.filter((room) => !room.isJoined);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        case "joined-date":
          if (!a.joinedDate && !b.joinedDate) return 0;
          if (!a.joinedDate) return 1;
          if (!b.joinedDate) return -1;
          return new Date(b.joinedDate) - new Date(a.joinedDate);
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

  const filteredChatrooms = getFilteredAndSortedChatrooms();

  // Handle joining/leaving chatrooms
  const handleJoinToggle = (roomId) => {
    // This would typically make an API call
    console.log(`Toggle join status for room: ${roomId}`);
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All");
    setJoinedFilter("All");
    setSortBy("name-asc");
  };

  // Format date for display
  const formatDate = (date) => {
    if (!date) return "Never";
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className="bg-white text-gray-800 min-h-screen flex flex-col">
      <Navbar />

      {/* Page Content */}
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-6">
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-light font-serif text-gray-800 mb-4">Chatrooms</h1>
            <p className="text-gray-600 max-w-2xl">
              Join conversations with fellow KU students across various topics. Our chatrooms work even when the
              internet is down!
            </p>
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> All chatroom data shown below is dummy/sample data for demonstration purposes.
              </p>
            </div>
          </div>

          {/* Tabs for All Chatrooms vs Joined Chatrooms */}
          <div className="mb-6">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTab("all")}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "all"
                      ? "border-[#E5989B] text-[#E5989B]"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  All Chatrooms ({allChatrooms.length})
                </button>
                <button
                  onClick={() => setActiveTab("joined")}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "joined"
                      ? "border-[#E5989B] text-[#E5989B]"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Joined Chatrooms ({joinedChatrooms.length})
                </button>
              </nav>
            </div>
          </div>

          {/* Search and Filter Controls */}
          <div className="mb-8 space-y-4">
            {/* Search Bar */}
            <div className="relative w-full md:w-96">
              <input
                type="text"
                placeholder="Search chatrooms..."
                className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#E5989B] pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute left-3 top-2.5 text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </div>
            </div>

            {/* Filter Controls */}
            <div className="flex flex-wrap gap-4 items-center">
              {/* Category Filter */}
              <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
                {categories.map((category) => (
                  <button
                    key={category}
                    className={`px-4 py-1.5 text-xs rounded-full whitespace-nowrap ${
                      selectedCategory === category
                        ? "bg-[#E5989B] text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Joined Filter */}
              <select
                value={joinedFilter}
                onChange={(e) => setJoinedFilter(e.target.value)}
                className="px-3 py-1.5 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#E5989B]"
              >
                <option value="All">All Rooms</option>
                <option value="Joined">Joined Only</option>
                <option value="Not Joined">Not Joined</option>
              </select>

              {/* Sort Options */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-1.5 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#E5989B]"
              >
                <option value="name-asc">Name (A-Z)</option>
                <option value="name-desc">Name (Z-A)</option>
                <option value="joined-date">Date Joined (Recent First)</option>
                <option value="last-activity">Last Activity</option>
                <option value="created-date">Creation Date</option>
              </select>

              {/* Clear Filters */}
              <button
                onClick={clearFilters}
                className="px-3 py-1.5 text-xs text-gray-600 hover:text-[#E5989B] border border-gray-300 rounded-md hover:border-[#E5989B]"
              >
                Clear Filters
              </button>
            </div>

            {/* Active Filters Display */}
            {(searchTerm || selectedCategory !== "All" || joinedFilter !== "All" || sortBy !== "name-asc") && (
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="text-gray-500">Active filters:</span>
                {searchTerm && (
                  <span className="bg-[#E5989B] text-white px-2 py-1 rounded">Search: "{searchTerm}"</span>
                )}
                {selectedCategory !== "All" && (
                  <span className="bg-[#E5989B] text-white px-2 py-1 rounded">Category: {selectedCategory}</span>
                )}
                {joinedFilter !== "All" && (
                  <span className="bg-[#E5989B] text-white px-2 py-1 rounded">Status: {joinedFilter}</span>
                )}
                {sortBy !== "name-asc" && (
                  <span className="bg-[#E5989B] text-white px-2 py-1 rounded">
                    Sort: {sortBy.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Results Summary */}
          <div className="mb-6">
            <p className="text-sm text-gray-600">
              Showing {filteredChatrooms.length} of {allChatrooms.length} chatrooms
              {activeTab === "joined" && ` (${joinedChatrooms.length} joined)`}
            </p>
          </div>

          {/* Chatroom Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredChatrooms.length > 0 ? (
              filteredChatrooms.map((room) => (
                <div
                  key={room.id}
                  className="bg-white border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-all overflow-hidden group"
                >
                  <div className="relative h-40 w-full">
                    <img
                      src={room.image || "/placeholder.svg"}
                      alt={room.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 bg-[#E5989B] text-white text-xs px-3 py-1">
                      {room.category}
                    </div>
                    {room.isJoined && (
                      <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                        Joined
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-medium text-gray-800">{room.name}</h3>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        {room.members} members
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{room.description}</p>

                    {/* Room Metadata */}
                    <div className="text-xs text-gray-500 mb-4 space-y-1">
                      {room.isJoined && <div>Joined: {formatDate(room.joinedDate)}</div>}
                      <div>Last Activity: {formatDate(room.lastActivity)}</div>
                      <div>Created: {formatDate(room.createdDate)}</div>
                    </div>

                    <div className="flex gap-2">
                      <Link
                        to={`/rooms/${room.id}`}
                        className="flex-1 text-center bg-[#E5989B] text-white py-2 px-4 rounded-md hover:bg-[#d88a8d] transition-colors text-sm"
                      >
                        {room.isJoined ? "Enter Room" : "View Room"}
                      </Link>
                      <button
                        onClick={() => handleJoinToggle(room.id)}
                        className={`px-4 py-2 rounded-md text-sm transition-colors ${
                          room.isJoined
                            ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                            : "bg-green-500 text-white hover:bg-green-600"
                        }`}
                      >
                        {room.isJoined ? "Leave" : "Join"}
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 mb-4">No chatrooms found matching your criteria.</p>
                <button onClick={clearFilters} className="text-[#E5989B] hover:text-[#d88a8d] font-medium">
                  Clear all filters
                </button>
              </div>
            )}
          </div>

          {/* Create New Room Button */}
          <div className="mt-12 text-center">
            <Link
              to="/rooms/create"
              className="inline-block px-8 py-3 bg-[#E5989B] text-white text-sm uppercase tracking-wider hover:bg-[#d88a8d] transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md rounded-md"
            >
              Create New Chatroom
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Rooms;