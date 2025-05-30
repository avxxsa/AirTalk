import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-light text-gray-800 mb-6 font-playfair">
              <span className="text-pink-primary">AirTalk</span> - Connect Without Boundaries
            </h2>
            <p className="text-gray-600 mb-6 font-montserrat">
              AirTalk is designed specifically for Kathmandu University students, providing a seamless communication platform that works even when the internet is down.
            </p>
            <p className="text-gray-600 mb-8 font-montserrat">
              Using the campus Wi-Fi network, AirTalk creates a peer-to-peer mesh network that allows students to chat, share notes, and collaborate on projects without relying on external internet connections.
            </p>
            <Link
              to="/about"
              className="inline-block px-8 py-3 border border-pink-primary text-pink-primary text-sm uppercase font-medium rounded hover:bg-pink-primary/5 transition-all hover:-translate-y-1 font-montserrat"
            >
              Learn More
            </Link>
          </div>
          <div className="rounded-lg overflow-hidden shadow-xl">
            <img 
              src="/images/airtalk-concept.jpg" 
              alt="AirTalk Concept" 
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;