import { Link } from "react-router-dom";

function NavBar() {
  return (
    <header className="sticky top-0 w-full bg-white z-50 shadow-md border-b border-pink-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-3xl font-serif font-bold text-pink-500">AirTalk</h1>
        <nav className="flex space-x-6 text-pink-600 font-medium text-lg">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/about" className="hover:underline">About</Link>
          <Link to="/rooms" className="bg-pink-500 text-white px-4 py-1.5 rounded-full hover:bg-pink-600 transition">
            Join
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default NavBar;