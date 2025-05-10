import { useEffect, useRef } from "react";
import { Link } from "react-router-dom"; // This is the right one
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import AirTalkLogo from "../components/AirTalkLogo"; // if needed

export default function Home() {
  // Refs for animated elements
  const heroTextRef = useRef(null)
  const heroImageRef = useRef(null)
  const featuresRef = useRef(null)
  const ctaRef = useRef(null)

  // Handle scroll animations
  useEffect(() => {
    // Initial animations for hero section
    setTimeout(() => {
      if (heroTextRef.current) {
        heroTextRef.current.classList.add("animate-in")
      }
    }, 100)

    setTimeout(() => {
      if (heroImageRef.current) {
        heroImageRef.current.classList.add("animate-in")
      }
    }, 300)

    // Scroll animations for other sections
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in")
          }
        })
      },
      { threshold: 0.1 },
    )

    const sections = [featuresRef.current, ctaRef.current]
    sections.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => {
      sections.forEach((section) => {
        if (section) observer.unobserve(section)
      })
    }
  }, [])

  return (
    <div className="bg-white text-gray-800 min-h-screen flex flex-col">
      <NavBar />

      {/* Redesigned Hero Section with Luxurious Feel */}
      <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background with Split Design */}
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute inset-0 bg-white"></div>
          <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-[#FFE8E9]"></div>

          {/* Decorative Elements */}
          <div className="absolute left-[45%] top-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full border border-[#E5989B]/20"></div>
          <div className="absolute left-[42%] top-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full border border-[#E5989B]/10"></div>
        </div>

        {/* Hero Content */}
        <div className="container mx-auto px-6 pt-32 pb-20 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div ref={heroTextRef} className="text-left opacity-0 translate-y-8 transition-all duration-1000 ease-out">
            <h4 className="text-[#E5989B] text-sm tracking-[0.2em] uppercase mb-4 font-light">Kathmandu University</h4>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-light font-serif text-gray-800 mb-6 leading-tight">
              Seamless <span className="italic">Communication</span> <br />
              <span className="text-[#E5989B]">Without Boundaries</span>
            </h1>
            <p className="text-gray-600 mb-8 max-w-md text-sm leading-relaxed">
              AirTalk provides KU students with an elegant, offline-first chatroom platform designed specifically for
              campus life. Connect with peers even when the internet is down.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/rooms"
                className="px-8 py-3 bg-[#E5989B] text-white text-xs uppercase tracking-wider hover:bg-[#d88a8d] transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md"
              >
                Explore Chatrooms
              </Link>
              <Link
                href="/about"
                className="px-8 py-3 border border-[#E5989B] text-[#E5989B] text-xs uppercase tracking-wider hover:bg-[#E5989B]/5 transition-all duration-300 transform hover:-translate-y-1"
              >
                Learn More
              </Link>
            </div>
          </div>

          <div
            ref={heroImageRef}
            className="relative h-[300px] md:h-[400px] lg:h-[500px] w-full opacity-0 translate-y-8 transition-all duration-1000 ease-out"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-[250px] h-[250px] md:w-[350px] md:h-[350px] rounded-full overflow-hidden shadow-xl transform transition-all duration-500 hover:scale-105">
                <img
                  src="/placeholder.svg?height=500&width=500"
                  alt="AirTalk"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-[#F7C9C0] rounded-full flex items-center justify-center transform transition-all duration-500 hover:scale-110 hover:bg-[#E5989B]">
                <span className="text-white text-xs font-light">Offline Ready</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-pulse">
          <div className="flex flex-col items-center">
            <span className="text-xs text-gray-400 mb-2 tracking-widest">SCROLL</span>
            <div className="w-px h-8 bg-gray-300"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        ref={featuresRef}
        className="bg-white py-20 opacity-0 translate-y-8 transition-all duration-700 ease-out"
      >
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div>
              <h4 className="text-[#E5989B] text-sm tracking-[0.2em] uppercase mb-2 font-light">Features</h4>
              <h2 className="text-2xl md:text-3xl font-light font-serif text-gray-800">Why Choose AirTalk</h2>
            </div>
            <p className="text-gray-600 max-w-md text-sm mt-4 md:mt-0">
              Discover how our thoughtfully designed features enhance your campus communication experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group border-t border-gray-100 pt-8 transition-all duration-300 hover:border-[#E5989B] transform hover:-translate-y-2">
              <div className="text-[#E5989B] text-xl mb-4 opacity-80 group-hover:opacity-100 transition-opacity">
                💬
              </div>
              <h3 className="text-lg font-medium mb-2 text-gray-800">Offline Messaging</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Chat with friends even when the internet is down, using KU&apos;s Wi-Fi network.
              </p>
            </div>
            <div className="group border-t border-gray-100 pt-8 transition-all duration-300 hover:border-[#E5989B] transform hover:-translate-y-2">
              <div className="text-[#E5989B] text-xl mb-4 opacity-80 group-hover:opacity-100 transition-opacity">
                🔒
              </div>
              <h3 className="text-lg font-medium mb-2 text-gray-800">Private & Secure</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Your messages stay on your device with peer-to-peer technology.
              </p>
            </div>
            <div className="group border-t border-gray-100 pt-8 transition-all duration-300 hover:border-[#E5989B] transform hover:-translate-y-2">
              <div className="text-[#E5989B] text-xl mb-4 opacity-80 group-hover:opacity-100 transition-opacity">
                ⚡
              </div>
              <h3 className="text-lg font-medium mb-2 text-gray-800">Fast & Reliable</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Instant messaging without delays, perfect for campus collaboration.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section ref={ctaRef} className="py-20 bg-[#FFF8F8] opacity-0 translate-y-8 transition-all duration-700 ease-out">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h4 className="text-[#E5989B] text-sm tracking-[0.2em] uppercase mb-2 font-light">Join Us</h4>
            <h2 className="text-2xl md:text-3xl font-light font-serif text-gray-800 mb-6">Ready to Connect?</h2>
            <p className="text-gray-600 mb-8 text-sm max-w-lg mx-auto leading-relaxed">
              Join your fellow KU students on AirTalk and experience seamless communication across campus.
            </p>
            <Link
              href="/rooms"
              className="inline-block px-8 py-3 bg-[#E5989B] text-white text-xs uppercase tracking-wider hover:bg-[#d88a8d] transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md"
            >
              Start Chatting Now
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}