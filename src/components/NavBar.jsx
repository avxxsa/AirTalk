import { Link } from "react-router-dom";

function NavBar() {
  return (
    <header className="w-full sticky top-0 bg-white shadow-md z-50 border-b border-pink-100">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-pink-500 tracking-wide">AirTalk</h1>
        <nav className="space-x-4">
          <Link
            to="/"
            className="px-4 py-2 text-pink-600 border border-pink-300 rounded-full hover:bg-pink-50 transition"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="px-4 py-2 text-pink-600 border border-pink-300 rounded-full hover:bg-pink-50 transition"
          >
            About
          </Link>
          <Link
            to="/rooms"
            className="px-4 py-2 text-white bg-pink-500 rounded-full hover:bg-pink-600 transition"
          >
            Join
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default NavBar;