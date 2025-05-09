import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import fairyImg from "../assets/fairy-placeholder.jpg"; // <== Add your own image here

function Home() {
  return (
    <div className="bg-pink-50 min-h-screen flex flex-col font-sans">
      <NavBar />

      <main className="flex-grow flex flex-col items-center px-4 py-12 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-pink-600 mb-4">
          AirTalk 💌
        </h1>
        <p className="text-lg md:text-xl text-pink-500 mb-8">
          A fairy-tale inspired offline messaging platform for KU students
        </p>

        <img
          src={fairyImg}
          alt="Fairy chat"
          className="w-full max-w-md rounded-2xl shadow-lg mb-10"
        />

        <Link
          to="/join"
          className="bg-pink-500 hover:bg-pink-600 text-white text-lg py-3 px-8 rounded-full shadow-md transition"
        >
          Get Started
        </Link>

        {/* Feature Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-5xl w-full">
          <div className="bg-white p-6 rounded-lg shadow text-pink-700">
            <h3 className="text-xl font-semibold mb-2">🎯 Chatrooms</h3>
            <p>Jump into themed rooms and keep it campus-local!</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow text-pink-700">
            <h3 className="text-xl font-semibold mb-2">📡 Offline Messaging</h3>
            <p>Connect and chat without needing internet. Just KU WiFi.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow text-pink-700">
            <h3 className="text-xl font-semibold mb-2">🔒 P2P Privacy</h3>
            <p>No server, no data tracking. Just you and your friends chatting securely.</p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Home;