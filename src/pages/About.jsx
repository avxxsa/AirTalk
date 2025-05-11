import React from 'react';

const About = () => {
  return (
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
            <img 
              src="/assets/airtalk-concept.jpg" 
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