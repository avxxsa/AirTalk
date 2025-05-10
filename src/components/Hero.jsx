import { useEffect, useRef } from "react";

const Hero = () => {
  // Refs for animated elements
  const heroTitleRef = useRef(null);
  const heroSubtitleRef = useRef(null);
  const heroTextRef = useRef(null);
  const heroButtonRef = useRef(null);

  // Animation classes
  const fadeInClass = "opacity-100 translate-y-0";
  const initialClass = "opacity-0 translate-y-8";

  // Handle animations
  useEffect(() => {
    // Initial animations for hero section with staggered timing
    setTimeout(() => {
      if (heroTitleRef.current) {
        heroTitleRef.current.classList.remove(initialClass);
        heroTitleRef.current.classList.add(fadeInClass);
      }
    }, 300);

    setTimeout(() => {
      if (heroSubtitleRef.current) {
        heroSubtitleRef.current.classList.remove(initialClass);
        heroSubtitleRef.current.classList.add(fadeInClass);
      }
    }, 600);

    setTimeout(() => {
      if (heroTextRef.current) {
        heroTextRef.current.classList.remove(initialClass);
        heroTextRef.current.classList.add(fadeInClass);
      }
    }, 900);

    setTimeout(() => {
      if (heroButtonRef.current) {
        heroButtonRef.current.classList.remove(initialClass);
        heroButtonRef.current.classList.add(fadeInClass);
      }
    }, 1200);
  }, []);

  return (
    <section className="relative w-full min-h-[100vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src="/assets/hero-bg.jpg" // Replace with your actual image path
          alt="AirTalk Background"
          className="w-full h-full object-cover"
        />
        {/* Pink overlay with reduced opacity */}
        <div className="absolute inset-0 bg-[#E5989B]/30"></div>
      </div>

      {/* Hero Content - Centered with proper mobile spacing */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-16 md:pt-0">
        <h1
          ref={heroTitleRef}
          className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light font-serif text-white mb-4 leading-tight tracking-wide transition-all duration-1000 ${initialClass}`}
        >
          <span className="font-normal">CONNECT</span> <span className="text-white">SEAMLESSLY</span>
        </h1>

        <h2
          ref={heroSubtitleRef}
          className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light font-serif text-white mb-6 leading-tight tracking-wide transition-all duration-1000 ${initialClass}`}
        >
          ACROSS CAMPUS
        </h2>

        <p
          ref={heroTextRef}
          className={`text-base md:text-lg text-white mb-8 max-w-2xl mx-auto leading-relaxed transition-all duration-1000 ${initialClass}`}
        >
          KU's offline-first chatroom platform made just for campus life — elegant, minimalist & smart.
        </p>

        <div 
          ref={heroButtonRef} 
          className={`transition-all duration-1000 ${initialClass}`}
        >
          <a
            href="/rooms"
            className="inline-block bg-white/20 hover:bg-white/30 text-white border border-white/50 px-8 py-3 text-sm md:text-base uppercase tracking-wider transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            EXPLORE CHATROOMS
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;