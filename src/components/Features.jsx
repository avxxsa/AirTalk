import React from 'react';

const FeatureBox = ({ icon, title, description }) => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
      <div className="text-3xl text-[#E5989B] mb-4">{icon}</div>
      <h3 className="text-xl font-medium mb-3 text-gray-800" style={{ fontFamily: "'Playfair Display', serif" }}>
        {title}
      </h3>
      <p className="text-gray-600 text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
};

const Features = () => {
  return (
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
          <FeatureBox 
            icon="💬" 
            title="Offline Messaging" 
            description="Chat with friends even when the internet is down, using KU's Wi-Fi network."
          />
          <FeatureBox 
            icon="🔒" 
            title="Private and Secure" 
            description="Your messages stay on your device with peer-to-peer technology."
          />
          <FeatureBox 
            icon="⚡" 
            title="Fast and Reliable" 
            description="Instant messaging without delays, perfect for campus collaboration."
          />
        </div>
      </div>
    </section>
  );
};

export default Features;