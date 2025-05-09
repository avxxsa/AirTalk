import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import fairyImg from "../assets/fairy-placeholder.jpg"; // Rename or replace as needed

function Home() {
  return (
    <div className="bg-pink-50 min-h-screen flex flex-col">
      <NavBar />

      <main className="flex-grow px-4">
        <section className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 items-center gap-10">
          <div>
            <h1 className="text-5xl font-bold text-pink-600 mb-6 leading-tight">
              Welcome to AirTalk 💌
            </h1>
            <p className="text-lg text-pink-500 mb-6">
              Offline messaging for KU — elegant, fast, and minimalist.
            </p>
            <Link
              to="/rooms"
              className="inline-block bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-full text-lg transition shadow"
            >
              Get Started
            </Link>
          </div>
          <div className="flex justify-center">
            <img
              src={fairyImg}
              alt="Preview"
              className="rounded-2xl shadow-lg w-full max-w-md"
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Home;