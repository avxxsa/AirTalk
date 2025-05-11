import { useEffect, useRef } from "react";

const AirTalkSection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === titleRef.current) {
              entry.target.classList.remove("opacity-0", "translate-y-8");
              entry.target.classList.add("opacity-100", "translate-y-0");
            } else if (entry.target === textRef.current) {
              setTimeout(() => {
                entry.target.classList.remove("opacity-0", "translate-y-8");
                entry.target.classList.add("opacity-100", "translate-y-0");
              }, 300);
            } else if (entry.target === imageRef.current) {
              setTimeout(() => {
                entry.target.classList.remove("opacity-0", "scale-95");
                entry.target.classList.add("opacity-100", "scale-100");
              }, 500);
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    if (titleRef.current) observer.observe(titleRef.current);
    if (textRef.current) observer.observe(textRef.current);
    if (imageRef.current) observer.observe(imageRef.current);

    return () => {
      if (titleRef.current) observer.unobserve(titleRef.current);
      if (textRef.current) observer.unobserve(textRef.current);
      if (imageRef.current) observer.unobserve(imageRef.current);
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-20 md:py-28 bg-[#FFF8F8]">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 
              ref={titleRef}
              className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-800 mb-6 opacity-0 translate-y-8 transition-all duration-700 ease-out"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              <span className="text-[#E5989B]">AirTalk</span> - Connect Without Boundaries
            </h2>
            <div 
              ref={textRef}
              className="opacity-0 translate-y-8 transition-all duration-700 ease-out"
            >
              <p className="text-gray-600 mb-6 leading-relaxed font-light">
                AirTalk is designed specifically for Kathmandu University students, providing a seamless communication platform that works even when the internet is down.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed font-light">
                Using the campus Wi-Fi network, AirTalk creates a peer-to-peer mesh network that allows students to chat, share notes, and collaborate on projects without relying on external internet connections.
              </p>
              <a
                href="/about"
                className="inline-block px-8 py-3 border border-[#E5989B] text-[#E5989B] text-sm uppercase tracking-wider hover:bg-[#E5989B]/5 transition-all duration-300 transform hover:-translate-y-1 font-medium rounded-sm"
              >
                Learn More
              </a>
            </div>
          </div>
          <div 
            ref={imageRef}
            className="opacity-0 scale-95 transition-all duration-700 ease-out"
          >
            <div className="relative rounded-lg overflow-hidden shadow-xl">
              <img 
                src="/assets/airtalk-concept.jpg" 
                alt="AirTalk Concept" 
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#E5989B]/30 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AirTalkSection;