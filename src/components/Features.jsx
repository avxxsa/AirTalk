import { useEffect, useRef } from "react";

const Features = () => {
  const featuresRef = useRef(null);

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

    if (featuresRef.current) {
      observer.observe(featuresRef.current);
    }

    return () => {
      if (featuresRef.current) {
        observer.unobserve(featuresRef.current);
      }
    };
  }, []);

  return (
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
          <div className="group border-t border-gray-100 pt-8 transition-all duration-300 hover:border-[#E5989B] transform hover:-translate-y-2">
            <div className="text-[#E5989B] text-xl mb-4 opacity-80 group-hover:opacity-100 transition-opacity">
              💬
            </div>
            <h3 className="text-lg font-medium mb-2 text-gray-800">Offline Messaging</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Chat with friends even when the internet is down, using KU's Wi-Fi network.
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
  );
};

export default Features;