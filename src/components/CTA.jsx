import { useEffect, useRef } from "react";

const CTA = () => {
  const ctaRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const buttonRef = useRef(null);

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
            } else if (entry.target === buttonRef.current) {
              setTimeout(() => {
                entry.target.classList.remove("opacity-0", "translate-y-8");
                entry.target.classList.add("opacity-100", "translate-y-0");
              }, 500);
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    if (titleRef.current) observer.observe(titleRef.current);
    if (textRef.current) observer.observe(textRef.current);
    if (buttonRef.current) observer.observe(buttonRef.current);

    return () => {
      if (titleRef.current) observer.unobserve(titleRef.current);
      if (textRef.current) observer.unobserve(textRef.current);
      if (buttonRef.current) observer.unobserve(buttonRef.current);
    };
  }, []);

  return (
    <section
      ref={ctaRef}
      className="py-20 md:py-24 bg-white"
    >
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h4 
            ref={titleRef}
            className="text-[#E5989B] text-sm tracking-[0.2em] uppercase mb-3 font-light opacity-0 translate-y-8 transition-all duration-700 ease-out"
          >
            Join Us
          </h4>
          <h2 
            ref={titleRef}
            className="text-2xl md:text-3xl font-light text-gray-800 mb-6 opacity-0 translate-y-8 transition-all duration-700 ease-out"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Ready to Connect?
          </h2>
          <p 
            ref={textRef}
            className="text-gray-600 mb-10 text-sm max-w-lg mx-auto leading-relaxed font-light opacity-0 translate-y-8 transition-all duration-700 ease-out"
          >
            Join your fellow KU students on AirTalk and experience seamless communication across campus.
          </p>
          <div
            ref={buttonRef}
            className="opacity-0 translate-y-8 transition-all duration-700 ease-out"
          >
            <a
              href="/rooms"
              className="inline-block px-10 py-4 bg-[#E5989B] text-white text-sm uppercase tracking-wider hover:bg-[#d88a8d] transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md font-medium rounded-sm"
            >
              Start Chatting Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;