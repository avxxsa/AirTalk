"use client"

import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import AirTalkLogo from "./AirTalkLogo"

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { pathname } = useLocation()

  // Check if link is active
  const isActive = (path) => {
    return pathname === path
  }

  // Handle scroll event to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? "bg-white shadow-sm py-3" : "bg-white py-5"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <AirTalkLogo />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link
            href="/"
            className={`text-xs tracking-wider uppercase transition-all duration-300 ${
              isActive("/") ? "text-[#E5989B]" : "text-gray-600 hover:text-[#E5989B]"
            }`}
          >
            Home
          </Link>
          <Link
            href="/rooms"
            className={`text-xs tracking-wider uppercase transition-all duration-300 ${
              isActive("/rooms") ? "text-[#E5989B]" : "text-gray-600 hover:text-[#E5989B]"
            }`}
          >
            Chatrooms
          </Link>
          <Link
            href="/about"
            className={`text-xs tracking-wider uppercase transition-all duration-300 ${
              isActive("/about") ? "text-[#E5989B]" : "text-gray-600 hover:text-[#E5989B]"
            }`}
          >
            About
          </Link>
          <Link
            href="/rooms"
            className="text-xs tracking-wider uppercase px-5 py-2 bg-[#E5989B] text-white transition-all duration-300 hover:bg-[#d88a8d] transform hover:-translate-y-1 hover:shadow-sm"
          >
            Enter Chatrooms
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 focus:outline-none"
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
            <Link
              href="/"
              className={`text-xs tracking-wider uppercase transition-all duration-300 ${
                isActive("/") ? "text-[#E5989B]" : "text-gray-600 hover:text-[#E5989B]"
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/rooms"
              className={`text-xs tracking-wider uppercase transition-all duration-300 ${
                isActive("/rooms") ? "text-[#E5989B]" : "text-gray-600 hover:text-[#E5989B]"
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Chatrooms
            </Link>
            <Link
              href="/about"
              className={`text-xs tracking-wider uppercase transition-all duration-300 ${
                isActive("/about") ? "text-[#E5989B]" : "text-gray-600 hover:text-[#E5989B]"
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/rooms"
              className="text-xs tracking-wider uppercase px-5 py-2 bg-[#E5989B] text-white transition-all duration-300 hover:bg-[#d88a8d] text-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Enter Chatrooms
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

export default NavBar;