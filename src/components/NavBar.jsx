import { Link } from "react-router-dom";

function NavBar() {
  return (
    <header className="sticky top-0 bg-pink-100 shadow z-10">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-pink-600">AirTalk 💬</h1>
        <nav className="space-x-6">
          <Link to="/" className="text-pink-700 hover:text-pink-900">Home</Link>
          <Link to="/join" className="text-pink-700 hover:text-pink-900">Join</Link>
          <Link to="/about" className="text-pink-700 hover:text-pink-900">About</Link>
        </nav>
      </div>
    </header>
  );
}

export default NavBar;