import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#fff] text-gray py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="landing_container mx-auto flex justify-between items-center px-3">
            <div className="flex items-center mb-4">
              <div className="mr-3 relative">
                <div className="w-10 h-10 bg-gradient-to-br from-[#E5989B] to-[#B5838D] rounded-full flex items-center justify-center">
                  <div className="w-5 h-5 bg-white rounded-full"></div>
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#F7C9C0] rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-medium text-gray-800 uppercase mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <p>
                <a href="/" className="text-gray-600 hover:text-[#E5989B] text-xs no-underline">
                  Home
                </a>
              </p>
              <p>
                <a href="/rooms" className="text-gray-600 hover:text-[#E5989B] text-xs no-underline">
                  Chatrooms
                </a>
              </p>
              <p>
                <a href="/about" className="text-gray-600 hover:text-[#E5989B] text-xs no-underline">
                  About
                </a>
              </p>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-medium text-gray-800 uppercase mb-4">
              Contact
            </h3>
            <ul className="space-y-2">
              <p className="text-gray-600 text-sm">Kathmandu University</p>
              <p className="text-gray-600 text-sm">Dhulikhel, Kavre</p>
              <p className="text-gray-600 hover:text-[#E5989B] text-sm">airtalk@ku.edu.np</p>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-gray-500">&copy; {currentYear} AirTalk. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;