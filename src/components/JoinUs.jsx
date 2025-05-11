// components/JoinUs.jsx
import { Link } from 'react-router-dom';

const JoinUs = () => {
  return (
    <section className="py-20 bg-rose-50">
      <div className="container mx-auto px-4 text-center">
        <h3 className="text-rose-400 uppercase mb-4">JOIN US</h3>
        <h2 className="text-4xl font-serif mb-6">Ready to Connect?</h2>
        <p className="text-xl mb-10 max-w-2xl mx-auto">
          Join your fellow KU students on AirTalk and experience seamless 
          communication across campus.
        </p>
        
        <Link
          to="/chatrooms"
          className="inline-block bg-rose-400 text-white px-8 py-3 text-lg rounded hover:bg-rose-500 transition"
        >
          START CHATTING NOW
        </Link>
      </div>
    </section>
  );
};

export default JoinUs;