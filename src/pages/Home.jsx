import { useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import NavBar from "../components/NavBar"
import Footer from "../components/Footer"
import heroImage from "../assets/your-hero-image.jpg" // replace with your actual image

export default function Home() {
  const heroTitleRef = useRef(null)
  const heroSubtitleRef = useRef(null)
  const heroTextRef = useRef(null)
  const heroButtonRef = useRef(null)
  const featuresRef = useRef(null)
  const ctaRef = useRef(null)

  useEffect(() => {
    setTimeout(() => heroTitleRef.current?.classList.add("animate-fade-in"), 300)
    setTimeout(() => heroSubtitleRef.current?.classList.add("animate-fade-in"), 600)
    setTimeout(() => heroTextRef.current?.classList.add("animate-fade-in"), 900)
    setTimeout(() => heroButtonRef.current?.classList.add("animate-fade-in"), 1200)

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("animate-in")
      })
    }, { threshold: 0.1 })

    const sections = [featuresRef.current, ctaRef.current]
    sections.forEach((section) => section && observer.observe(section))

    return () => sections.forEach((section) => section && observer.unobserve(section))
  }, [])

  return (
    <div className="bg-white text-gray-800 min-h-screen flex flex-col">
      <NavBar />

      {/* Hero */}
      <section className="relative w-full min-h-[100vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <img
            src={heroImage}
            alt="AirTalk Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#E5989B]/30"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-16 md:pt-0">
          <h1
            ref={heroTitleRef}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light font-serif text-white mb-4 leading-tight tracking-wide opacity-0 transition-opacity duration-1000"
          >
            <span className="font-normal">CONNECT</span> <span className="text-white">SEAMLESSLY</span>
          </h1>

          <h2
            ref={heroSubtitleRef}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light font-serif text-white mb-6 leading-tight tracking-wide opacity-0 transition-opacity duration-1000"
          >
            ACROSS CAMPUS
          </h2>

          <p
            ref={heroTextRef}
            className="text-base md:text-lg text-white mb-8 max-w-2xl mx-auto leading-relaxed opacity-0 transition-opacity duration-1000"
          >
            KU’s offline-first chatroom platform made just for campus life — elegant, minimalist & smart.
          </p>

          <div ref={heroButtonRef} className="opacity-0 transition-opacity duration-1000">
            <Link
              to="/rooms"
              className="inline-block bg-white/20 hover:bg-white/30 text-white border border-white/50 px-8 py-3 text-sm md:text-base uppercase tracking-wider transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              EXPLORE CHATROOMS
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section
        ref={featuresRef}
        className="bg-white py-16 md:py-20 opacity-0 translate-y-8 transition-all duration-700 ease-out"
      >
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16">
            <div>
              <h4 className="text-[#E5989B] text-sm tracking-[0.2em] uppercase mb-2 font-light">Features</h4>
              <h2 className="text-2xl md:text-3xl font-light font-serif text-gray-800">Why Choose AirTalk</h2>
            </div>
            <p className="text-gray-600 max-w-md text-sm mt-4 md:mt-0">
              Discover how our thoughtfully designed features enhance your campus communication experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: "💬", title: "Offline Messaging", text: "Chat with friends even when the internet is down, using KU's Wi-Fi network." },
              { icon: "🔒", title: "Private & Secure", text: "Your messages stay on your device with peer-to-peer technology." },
              { icon: "⚡", title: "Fast & Reliable", text: "Instant messaging without delays, perfect for campus collaboration." }
            ].map((feature, i) => (
              <div key={i} className="group border-t border-gray-100 pt-8 transition-all duration-300 hover:border-[#E5989B] transform hover:-translate-y-2">
                <div className="text-[#E5989B] text-xl mb-4 opacity-80 group-hover:opacity-100 transition-opacity">{feature.icon}</div>
                <h3 className="text-lg font-medium mb-2 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section
        ref={ctaRef}
        className="py-16 md:py-20 bg-[#FFF8F8] opacity-0 translate-y-8 transition-all duration-700 ease-out"
      >
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h4 className="text-[#E5989B] text-sm tracking-[0.2em] uppercase mb-2 font-light">Join Us</h4>
            <h2 className="text-2xl md:text-3xl font-light font-serif text-gray-800 mb-6">Ready to Connect?</h2>
            <p className="text-gray-600 mb-8 text-sm max-w-lg mx-auto leading-relaxed">
              Join your fellow KU students on AirTalk and experience seamless communication across campus.
            </p>
            <Link
              to="/rooms"
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