import React, { useState, useEffect } from 'react';

// IMPORTANT: For the background image to work properly:
// 1. Create a folder named "images" directly in your "public" folder
// 2. Place your hero-bg.jpg in the public/images folder
// 3. The path should be exactly "/images/hero-bg.jpg" (with the leading slash)

const Home = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="font-['Montserrat']">
      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'
      }`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          {/* Logo */}
          <a href="/" className="flex items-center">
            <div className="mr-3 relative">
            <span className={`text-xl font-medium ${isScrolled ? 'text-[#E5989B]' : 'text-white'}`} 
                  style={{ fontFamily: "'Playfair Display', serif" }}>
              AirTalk
            </span>
            </div>
          </a>

          {/* Desktop Navigation - Explicitly spaced items */}
          <div className="hidden md:flex items-center">
            <a href="/" className={`px-5 text-sm font-medium uppercase ${
              isScrolled ? 'text-gray-800 hover:text-[#E5989B]' : 'text-white hover:text-white/80'
            }`}>
              Home
            </a>
            <a href="/rooms" className={`px-5 text-sm font-medium uppercase ${
              isScrolled ? 'text-gray-800 hover:text-[#E5989B]' : 'text-white hover:text-white/80'
            }`}>
              Chatrooms
            </a>
            <a href="/about" className={`px-5 text-sm font-medium uppercase ${
              isScrolled ? 'text-gray-800 hover:text-[#E5989B]' : 'text-white hover:text-white/80'
            }`}>
              About
            </a>
            <a href="/rooms" className={`ml-4 px-6 py-2 text-sm font-medium uppercase rounded ${
              isScrolled 
                ? 'bg-[#E5989B] text-white hover:bg-[#d88a8d]' 
                : 'bg-white/20 text-white border border-white/50 hover:bg-white/30'
            }`}>
              Enter Chatrooms
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button className={`md:hidden ${isScrolled ? 'text-gray-800' : 'text-white'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          {/* IMPORTANT: This image path must be exactly as shown below */}
          <img 
            src="/assets/hero-bg.jpg" 
            alt="Hero Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#E5989B]/40"></div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 z-10 text-center text-white">
          <h1 className="text-5xl md:text-6xl font-light mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            <span className="font-normal">CONNECT</span> SEAMLESSLY
          </h1>
          <h2 className="text-3xl md:text-4xl font-light mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            ACROSS CAMPUS
          </h2>
          <p className="text-lg max-w-2xl mx-auto mb-10">
            KU's offline-first chatroom platform made just for campus life — elegant, minimalist & smart.
          </p>
          <a 
            href="/rooms" 
            className="inline-block bg-white/20 hover:bg-white/30 text-white border border-white/50 px-8 py-3 text-sm uppercase font-medium rounded transition-all hover:-translate-y-1 hover:shadow-lg"
          >
            Start Chatting
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h4 className="text-[#E5989B] text-sm uppercase tracking-wider mb-2">Features</h4>
            <h2 className="text-3xl font-light text-gray-800 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Why Choose AirTalk
            </h2>
            <p className="text-gray-600 max-w-lg mx-auto">
              Discover how our thoughtfully designed features enhance your campus communication experience.
            </p>
          </div>

          {/* Feature Boxes in a Horizontal Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="text-3xl text-[#E5989B] mb-4">💬</div>
              <h3 className="text-xl font-medium mb-3 text-gray-800" style={{ fontFamily: "'Playfair Display', serif" }}>
                Offline Messaging
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Chat with friends even when the internet is down, using KU's Wi-Fi network.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="text-3xl text-[#E5989B] mb-4">🔒</div>
              <h3 className="text-xl font-medium mb-3 text-gray-800" style={{ fontFamily: "'Playfair Display', serif" }}>
                Private & Secure
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Your messages stay on your device with peer-to-peer technology.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="text-3xl text-[#E5989B] mb-4">⚡</div>
              <h3 className="text-xl font-medium mb-3 text-gray-800" style={{ fontFamily: "'Playfair Display', serif" }}>
                Fast & Reliable
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Instant messaging without delays, perfect for campus collaboration.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-light text-gray-800 mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                <span className="text-[#E5989B]">AirTalk</span> - Connect Without Boundaries
              </h2>
              <p className="text-gray-600 mb-6">
                AirTalk is designed specifically for Kathmandu University students, providing a seamless communication platform that works even when the internet is down.
              </p>
              <p className="text-gray-600 mb-8">
                Using the campus Wi-Fi network, AirTalk creates a peer-to-peer mesh network that allows students to chat, share notes, and collaborate on projects without relying on external internet connections.
              </p>
              <a
                href="/about"
                className="inline-block px-8 py-3 border border-[#E5989B] text-[#E5989B] text-sm uppercase font-medium rounded hover:bg-[#E5989B]/5 transition-all hover:-translate-y-1"
              >
                Learn More
              </a>
            </div>
            <div className="rounded-lg overflow-hidden shadow-xl">
              {/* IMPORTANT: This image path must be exactly as shown below */}
              <img 
                src="/images/airtalk-concept.jpg" 
                alt="AirTalk Concept" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo and Description */}
            <div className="md:col-span-2">
              <div className="flex items-center mb-4">
                <div className="mr-3 relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#E5989B] to-[#B5838D] rounded-full flex items-center justify-center">
                    <div className="w-5 h-5 bg-white rounded-full"></div>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#F7C9C0] rounded-full"></div>
                </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-sm font-medium text-gray-800 uppercase mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                Quick Links
              </h3>
              <ul className="space-y-2 font-['Montserrat']">
                <li>
                  <a href="/" className="text-gray-600 hover:text-[#E5989B] text-sm">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/rooms" className="text-gray-600 hover:text-[#E5989B] text-sm">
                    Chatrooms
                  </a>
                </li>
                <li>
                  <a href="/about" className="text-gray-600 hover:text-[#E5989B] text-sm">
                    About
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-sm font-medium text-gray-800 uppercase mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                Contact
              </h3>
              <ul className="space-y-2 font-['Montserrat']">
                <li className="text-gray-600 text-sm">Kathmandu University</li>
                <li className="text-gray-600 text-sm">Dhulikhel, Kavre</li>
                <li>
                  <a href="mailto:airtalk@ku.edu.np" className="text-gray-600 hover:text-[#E5989B] text-sm">
                    airtalk@ku.edu.np
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-xs text-gray-500 font-['Montserrat']">&copy; {new Date().getFullYear()} AirTalk. All rights reserved.</p>
          </div>
        </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;