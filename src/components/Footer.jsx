import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <div className="mr-3 relative">
                <div className="w-10 h-10 bg-gradient-to-br from-pink-primary to-pink-dark rounded-full flex items-center justify-center">
                  <div className="w-5 h-5 bg-white rounded-full"></div>
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-pink-secondary rounded-full"></div>
              </div>
              <span className="text-xl font-medium text-pink-primary font-playfair">
                AirTalk
              </span>
            </div>
            <p className="text-gray-600 mb-4 max-w-md text-sm font-montserrat">
              KU's offline-first chatroom platform made just for campus life — elegant, minimalist & smart.
            </p>
            <p className="text-gray-500 text-sm font-montserrat">
              Works without internet, using KU's Wi-Fi network.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-medium text-gray-800 uppercase mb-4 font-playfair">
              Quick Links
            </h3>
            <ul className="space-y-2 font-montserrat">
              <li>
                <Link to="/" className="text-gray-600 hover:text-pink-primary text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/rooms" className="text-gray-600 hover:text-pink-primary text-sm">
                  Chatrooms
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-pink-primary text-sm">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-medium text-gray-800 uppercase mb-4 font-playfair">
              Contact
            </h3>
            <ul className="space-y-2 font-montserrat">
              <li className="text-gray-600 text-sm">Kathmandu University</li>
              <li className="text-gray-600 text-sm">Dhulikhel, Kavre</li>
              <li>
                <a href="mailto:airtalk@ku.edu.np" className="text-gray-600 hover:text-pink-primary text-sm">
                  airtalk@ku.edu.np
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-gray-500 font-montserrat">&copy; {currentYear} AirTalk. All rights reserved.</p>
          <p className="text-xs text-gray-500 mt-2 md:mt-0 font-montserrat">Developed by COMP 207 Group</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;