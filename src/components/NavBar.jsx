import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
        <Link to="/" className="flex items-center">
          <div className="mr-3 relative">
            {/* Main bubble */}
            <div className="w-10 h-10 bg-gradient-to-br from-pink-primary to-pink-dark rounded-full flex items-center justify-center">
              {/* Inner circle */}
              <div className="w-5 h-5 bg-white rounded-full"></div>
            </div>
            {/* Small bubble */}
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-pink-secondary rounded-full"></div>
          </div>
          <span className={`text-xl font-medium ${isScrolled ? 'text-pink-primary' : 'text-white'}`} 
                style={{ fontFamily: "'Playfair Display', serif" }}>
            AirTalk
          </span>
        </Link>

        {/* Desktop Navigation - Explicitly spaced items */}
        <div className="hidden md:flex items-center">
          <Link to="/" className={`px-5 text-sm font-medium uppercase ${
            isScrolled ? 'text-gray-800 hover:text-pink-primary' : 'text-white hover:text-white/80'
          }`}>
            Home
          </Link>
          <Link to="/rooms" className={`px-5 text-sm font-medium uppercase ${
            isScrolled ? 'text-gray-800 hover:text-pink-primary' : 'text-white hover:text-white/80'
          }`}>
            Chatrooms
          </Link>
          <Link to="/about" className={`px-5 text-sm font-medium uppercase ${
            isScrolled ? 'text-gray-800 hover:text-pink-primary' : 'text-white hover:text-white/80'
          }`}>
            About
          </Link>
          <Link to="/rooms" className={`ml-4 px-6 py-2 text-sm font-medium uppercase rounded ${
            isScrolled 
              ? 'bg-pink-primary text-white hover:bg-pink-dark' 
              : 'bg-white/20 text-white border border-white/50 hover:bg-white/30'
          }`}>
            Enter Chatrooms
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className={`md:hidden ${isScrolled ? 'text-gray-800' : 'text-white'}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white mt-2 py-6 px-6 shadow-md">
          <div className="flex flex-col space-y-6">
            <Link
              to="/"
              className="text-sm tracking-wider uppercase transition-all duration-300 font-medium text-gray-700 hover:text-pink-primary"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/rooms"
              className="text-sm tracking-wider uppercase transition-all duration-300 font-medium text-gray-700 hover:text-pink-primary"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Chatrooms
            </Link>
            <Link
              to="/about"
              className="text-sm tracking-wider uppercase transition-all duration-300 font-medium text-gray-700 hover:text-pink-primary"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/rooms"
              className="bg-pink-primary hover:bg-pink-dark text-white px-6 py-3 text-sm uppercase tracking-wider transition-all duration-300 w-full text-center font-medium rounded-sm shadow-sm hover:shadow-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Enter Chatrooms
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;