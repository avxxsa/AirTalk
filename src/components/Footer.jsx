import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-100 py-12 mt-auto">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <div className="mr-3 relative">
                {/* Main bubble */}
                <div className="w-9 h-9 bg-gradient-to-br from-[#E5989B] to-[#B5838D] rounded-full flex items-center justify-center shadow-sm">
                  {/* Inner circle */}
                  <div className="w-4 h-4 bg-white rounded-full"></div>
                </div>

                {/* Small bubble */}
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#F7C9C0] rounded-full"></div>

                {/* Tiny bubble */}
                <div className="absolute top-0 right-1 w-2 h-2 bg-[#FFD8D8] rounded-full"></div>
              </div>
              <div className="logo-text text-xl font-medium tracking-wide">AirTalk</div>
            </div>
            <p className="text-gray-600 mb-4 max-w-md text-sm leading-relaxed">
              KU&apos;s offline-first chatroom platform made just for campus life — elegant, minimalist & smart.
            </p>
            <p className="text-sm text-gray-400">Works without internet, using KU&apos;s Wi-Fi network.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-medium text-gray-800 uppercase tracking-wider mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-[#E5989B] transition-colors duration-300 text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/rooms"
                  className="text-gray-600 hover:text-[#E5989B] transition-colors duration-300 text-sm"
                >
                  Chatrooms
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-600 hover:text-[#E5989B] transition-colors duration-300 text-sm"
                >
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-medium text-gray-800 uppercase tracking-wider mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-gray-600 text-sm">Kathmandu University</li>
              <li className="text-gray-600 text-sm">Dhulikhel, Kavre</li>
              <li>
                <a
                  href="mailto:airtalk@ku.edu.np"
                  className="text-gray-600 hover:text-[#E5989B] transition-colors duration-300 text-sm"
                >
                  airtalk@ku.edu.np
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-100 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-gray-400">&copy; {currentYear} AirTalk. All rights reserved.</p>
          <p className="text-xs text-gray-400 mt-2 md:mt-0">Developed by COMP 207 Group</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;