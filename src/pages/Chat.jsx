import { useParams, useSearchParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

function Chat() {
  const { roomId } = useParams();
  const [searchParams] = useSearchParams();
  const user = searchParams.get("user") || "Anonymous";

  return (
    <div className="bg-pink-50 min-h-screen flex flex-col">
      <NavBar />

      <main className="flex-grow flex flex-col items-center px-4 py-6 text-center">
        <h2 className="text-2xl font-bold text-pink-700 mb-2">
          Welcome, {user}!
        </h2>
        <p className="text-pink-600 text-lg mb-6">
          You're in the <span className="font-semibold">{roomId}</span> chatroom.
        </p>

        <div className="w-full max-w-2xl bg-white rounded-lg p-6 shadow-md">
          <p className="text-gray-400 italic">
            (This is where chat functionality will appear!)
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Chat;