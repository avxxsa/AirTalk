import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/authcontext'; 

export default function Home() {
  const { user } = useAuth(); // ✅ user from context

  const heroTitleRef = useRef(null);
  const heroSubtitleRef = useRef(null);
  const heroTextRef = useRef(null);
  const heroButtonRef = useRef(null);
  const featuresRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    setTimeout(() => heroTitleRef.current?.classList.add("animate-fade-in"), 300);
    setTimeout(() => heroSubtitleRef.current?.classList.add("animate-fade-in"), 600);
    setTimeout(() => heroTextRef.current?.classList.add("animate-fade-in"), 900);
    setTimeout(() => heroButtonRef.current?.classList.add("animate-fade-in"), 1200);

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("animate-in")),
      { threshold: 0.1 }
    );

    const sections = [featuresRef.current, ctaRef.current];
    sections.forEach((s) => s && observer.observe(s));

    return () => sections.forEach((s) => s && observer.unobserve(s));
  }, []);

  return (
    <div className="bg-white text-gray-800 min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative w-full min-h-[100vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <img src="/images/hero-bg.jpg" alt="AirTalk Background" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#E5989B]/60"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-16 md:pt-0">
          <h1 ref={heroTitleRef} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light font-serif text-white mb-4 leading-tight tracking-wide opacity-0 transition-opacity duration-1000">
            <span className="font-normal">CONNECT</span> <span className="text-white">SEAMLESSLY</span>
          </h1>
          <h2 ref={heroSubtitleRef} className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light font-serif text-white mb-6 leading-tight tracking-wide opacity-0 transition-opacity duration-1000">
            ACROSS CAMPUS
          </h2>
          <p ref={heroTextRef} className="text-base md:text-lg text-white mb-8 max-w-2xl mx-auto leading-relaxed opacity-0 transition-opacity duration-1000">
            KU&apos;s offline-first 1-on-1 messaging platform — elegant, minimalist & smart.
          </p>
          <div ref={heroButtonRef} className="opacity-0 transition-opacity duration-1000">
            <Link
              to={user ? "/rooms" : "/login"}
              className="inline-block bg-white/20 hover:bg-white/30 text-white border border-white/50 px-8 py-3 text-sm md:text-base uppercase tracking-wider transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              {user ? "START A PRIVATE CHAT" : "LOGIN TO START CHAT"}
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section ref={featuresRef} className="bg-white py-16 md:py-20 opacity-0 translate-y-8 transition-all duration-700 ease-out">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16">
            <div>
              <h4 className="text-[#E5989B] text-sm tracking-[0.2em] uppercase mb-2 font-light">Features</h4>
              <h2 className="text-2xl md:text-3xl font-light font-serif text-gray-800">Why Choose AirTalk</h2>
            </div>
            <p className="text-gray-600 max-w-md text-sm mt-4 md:mt-0">
              Designed for seamless 1-on-1 messaging at Kathmandu University — with or without the internet.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group border-t border-gray-100 pt-8 transition-all duration-300 hover:border-[#E5989B] transform hover:-translate-y-2">
              <div className="text-[#E5989B] text-xl mb-4 opacity-80 group-hover:opacity-100">💬</div>
              <h3 className="text-lg font-medium mb-2 text-gray-800">1-on-1 Messaging</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Start private conversations without needing a server or group chatroom.
              </p>
            </div>
            <div className="group border-t border-gray-100 pt-8 transition-all duration-300 hover:border-[#E5989B] transform hover:-translate-y-2">
              <div className="text-[#E5989B] text-xl mb-4 opacity-80 group-hover:opacity-100">🔒</div>
              <h3 className="text-lg font-medium mb-2 text-gray-800">Private & Secure</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Peer-to-peer communication ensures messages stay only between you and your friend.
              </p>
            </div>
            <div className="group border-t border-gray-100 pt-8 transition-all duration-300 hover:border-[#E5989B] transform hover:-translate-y-2">
              <div className="text-[#E5989B] text-xl mb-4 opacity-80 group-hover:opacity-100">⚡</div>
              <h3 className="text-lg font-medium mb-2 text-gray-800">Reliable Offline</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Designed to work seamlessly over KU Wi-Fi even without internet.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section ref={ctaRef} className="py-16 md:py-20 bg-[#FFF8F8] opacity-0 translate-y-8 transition-all duration-700 ease-out">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h4 className="text-[#E5989B] text-sm tracking-[0.2em] uppercase mb-2 font-light">Join Us</h4>
            <h2 className="text-2xl md:text-3xl font-light font-serif text-gray-800 mb-6">Ready to Chat?</h2>
            <p className="text-gray-600 mb-8 text-sm max-w-lg mx-auto leading-relaxed">
              Connect privately with fellow KU students instantly on AirTalk — no groups, no distractions.
            </p>
            <Link
              to={user ? "/rooms" : "/login"}
              className="inline-block px-8 py-3 bg-[#E5989B] text-white text-xs uppercase tracking-wider hover:bg-[#d88a8d] transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md"
            >
              {user ? "Start a Private Chat" : "Login to Chat"}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
