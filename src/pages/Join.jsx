import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

function Join() {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("General");
  const navigate = useNavigate();

  const handleJoin = () => {
    if (!name.trim()) return alert("Please enter your name!");
    navigate(`/chat/${room}?user=${encodeURIComponent(name)}`);
  };

  return (
    <div className="bg-pink-50 min-h-screen flex flex-col">
      <NavBar />

      <main className="flex-grow flex flex-col justify-center items-center px-4 text-center">
        <h2 className="text-3xl font-bold text-pink-700 mb-6">Join a Chatroom</h2>

        <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md space-y-4">
          <input
            type="text"
            placeholder="Enter your name"
            className="w-full px-4 py-2 rounded border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <select
            className="w-full px-4 py-2 rounded border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          >
            <option value="General">General</option>
            <option value="Hostel Chat">Hostel Chat</option>
            <option value="Classroom 207">Classroom 207</option>
          </select>

          <button
            onClick={handleJoin}
            className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded-full shadow"
          >
            Join Chat
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Join;