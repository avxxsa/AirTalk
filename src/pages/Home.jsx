import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import fairyImg from "../assets/fairy-placeholder.jpg";

function Home() {
  return (
    <div className="bg-white text-gray-800 font-serif">
      <NavBar />

      <main>
        <section className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-2 items-center gap-12">
          <div>
            <h1 className="text-5xl font-bold text-pink-600 mb-6 leading-tight">
              AirTalk 💌
            </h1>
            <p className="text-lg text-pink-500 mb-8">
              KU’s offline-first chatroom platform made just for campus life —
              elegant, minimalist & smart.
            </p>
            <Link
              to="/rooms"
              className="inline-block bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-full text-lg transition"
            >
              Enter Chatrooms
            </Link>
          </div>
          <div>
            <img
              src={fairyImg}
              alt="AirTalk Preview"
              className="rounded-2xl shadow-xl w-full max-w-sm mx-auto"
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Home;