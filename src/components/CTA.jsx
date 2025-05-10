import { useEffect, useRef } from "react";

const CTA = () => {
  const ctaRef = useRef(null);

  useEffect(() => {
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("opacity-0", "translate-y-8");
            entry.target.classList.add("opacity-100", "translate-y-0");
          }
        });
      },
      { threshold: 0.1 }
    );

    if (ctaRef.current) {
      observer.observe(ctaRef.current);
    }

    return () => {
      if (ctaRef.current) {
        observer.unobserve(ctaRef.current);
      }
    };
  }, []);

  return (
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
          <a
            href="/rooms"
            className="inline-block px-8 py-3 bg-[#E5989B] text-white text-xs uppercase tracking-wider hover:bg-[#d88a8d] transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md"
          >
            Start Chatting Now
          </a>
        </div>
      </div>
    </section>
  );
};

export default CTA;