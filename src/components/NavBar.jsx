import { useState, useEffect } from "react";
import AirTalkLogo from "./AirTalkLogo";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Get current path for active link styling
  const pathname = window.location.pathname;
  
  // Check if link is active
  const isActive = (path) => {
    return pathname === path;
  };

  // Handle scroll event to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? "bg-white shadow-sm py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <a href="/" className="flex items-center">
          <AirTalkLogo isScrolled={isScrolled} />
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <a
            href="/"
            className={`text-xs tracking-wider uppercase transition-all duration-300 ${
              isActive("/")
                ? isScrolled
                  ? "text-[#E5989B]"
                  : "text-white font-normal"
                : isScrolled
                  ? "text-gray-600 hover:text-[#E5989B]"
                  : "text-white hover:text-white/80"
            }`}
          >
            Home
          </a>
          <a
            href="/rooms"
            className={`text-xs tracking-wider uppercase transition-all duration-300 ${
              isActive("/rooms")
                ? isScrolled
                  ? "text-[#E5989B]"
                  : "text-white font-normal"
                : isScrolled
                  ? "text-gray-600 hover:text-[#E5989B]"
                  : "text-white hover:text-white/80"
            }`}
          >
            Chatrooms
          </a>
          <a
            href="/about"
            className={`text-xs tracking-wider uppercase transition-all duration-300 ${
              isActive("/about")
                ? isScrolled
                  ? "text-[#E5989B]"
                  : "text-white font-normal"
                : isScrolled
                  ? "text-gray-600 hover:text-[#E5989B]"
                  : "text-white hover:text-white/80"
            }`}
          >
            About
          </a>
          <a
            href="/rooms"
            className={`
              transition-all duration-300 px-5 py-2 text-xs uppercase tracking-wider
              ${
                isScrolled
                  ? "bg-[#E5989B] hover:bg-[#d88a8d] text-white"
                  : "bg-white/20 hover:bg-white/30 text-white border border-white/50"
              }
            `}
          >
            Enter Chatrooms
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className={`md:hidden focus:outline-none ${isScrolled ? "text-gray-700" : "text-white"}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t mt-2 py-4 px-6 shadow-sm">
          <div className="flex flex-col space-y-4">
            <a
              href="/"
              className={`text-xs tracking-wider uppercase transition-all duration-300 ${
                isActive("/") ? "text-[#E5989B]" : "text-gray-600 hover:text-[#E5989B]"
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </a>
            <a
              href="/rooms"
              className={`text-xs tracking-wider uppercase transition-all duration-300 ${
                isActive("/rooms") ? "text-[#E5989B]" : "text-gray-600 hover:text-[#E5989B]"
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Chatrooms
            </a>
            <a
              href="/about"
              className={`text-xs tracking-wider uppercase transition-all duration-300 ${
                isActive("/about") ? "text-[#E5989B]" : "text-gray-600 hover:text-[#E5989B]"
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </a>
            <a
              href="/rooms"
              className="bg-[#E5989B] hover:bg-[#d88a8d] text-white px-5 py-2 text-xs uppercase tracking-wider transition-all duration-300 w-full text-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Enter Chatrooms
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;