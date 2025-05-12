import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/hero-bg.jpg" 
          alt="Hero Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-pink-primary/40"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 z-10 text-center text-white">
        <h1 className="text-5xl md:text-6xl font-light mb-4 font-playfair">
          <span className="font-normal">CONNECT</span> SEAMLESSLY
        </h1>
        <h2 className="text-3xl md:text-4xl font-light mb-6 font-playfair">
          ACROSS CAMPUS
        </h2>
        <p className="text-lg max-w-2xl mx-auto mb-10 font-montserrat">
          KU's offline-first chatroom platform made just for campus life — elegant, minimalist & smart.
        </p>
        <Link 
          to="/rooms" 
          className="inline-block bg-white/20 hover:bg-white/30 text-white border border-white/50 px-8 py-3 text-sm uppercase font-medium rounded transition-all hover:-translate-y-1 hover:shadow-lg font-montserrat"
        >
          Start Chatting
        </Link>
      </div>
    </section>
  );
};

export default Hero;