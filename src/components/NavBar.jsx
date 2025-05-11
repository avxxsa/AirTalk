import React, { useState, useEffect } from 'react';

const Navbar = () => {
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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'
    }`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <a href="/" className="flex items-center">
          <div className="mr-3 relative">
            {/* Main bubble */}
            <div className="w-10 h-10 bg-gradient-to-br from-[#E5989B] to-[#B5838D] rounded-full flex items-center justify-center">
              {/* Inner circle */}
              <div className="w-5 h-5 bg-white rounded-full"></div>
            </div>
            {/* Small bubble */}
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#F7C9C0] rounded-full"></div>
          </div>
          <span className={`text-xl font-medium ${isScrolled ? 'text-[#E5989B]' : 'text-white'}`} 
                style={{ fontFamily: "'Playfair Display', serif" }}>
            AirTalk
          </span>
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
  );
};

export default Navbar;