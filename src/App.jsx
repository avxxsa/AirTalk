import { ChatBubbleLeftIcon, LockClosedIcon, BoltIcon } from '@heroicons/react/24/outline';

function App() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <img src="https://i.ibb.co/M6qBPvL/logo.png" alt="AirTalk Logo" className="h-10" />
          <span className="ml-2 text-rose-400 text-xl font-semibold">AirTalk</span>
        </div>
        <div className="flex items-center space-x-8">
          <a href="#" className="text-gray-600 hover:text-gray-900">HOME</a>
          <a href="#" className="text-gray-600 hover:text-gray-900">CHATROOMS</a>
          <a href="#" className="text-gray-600 hover:text-gray-900">ABOUT</a>
          <button className="bg-rose-300 text-white px-6 py-2 rounded-md hover:bg-rose-400 transition-colors">
            ENTER CHATROOMS
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="text-center py-24 px-4 bg-gradient-to-b from-rose-50 to-white">
        <h1 className="text-6xl font-serif mb-4">
          CONNECT SEAMLESSLY
          <br />
          ACROSS CAMPUS
        </h1>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          KU's offline-first chatroom platform made just for campus life — elegant,
          minimalist & smart.
        </p>
        <button className="bg-white text-gray-800 px-8 py-3 rounded-md border border-gray-200 hover:bg-gray-50 transition-colors">
          EXPLORE CHATROOMS
        </button>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-rose-300 uppercase tracking-wide mb-2">FEATURES</h2>
          <div className="flex justify-between items-start mb-12">
            <h3 className="text-4xl font-serif">Why Choose AirTalk</h3>
            <p className="text-gray-600 max-w-md">
              Discover how our thoughtfully designed features enhance your
              campus communication experience.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-12">
            <div>
              <ChatBubbleLeftIcon className="h-8 w-8 text-gray-800 mb-4" />
              <h4 className="text-xl font-semibold mb-2">Offline Messaging</h4>
              <p className="text-gray-600">
                Chat with friends even when the internet is down, using KU's Wi-Fi network.
              </p>
            </div>
            <div>
              <LockClosedIcon className="h-8 w-8 text-gray-800 mb-4" />
              <h4 className="text-xl font-semibold mb-2">Private & Secure</h4>
              <p className="text-gray-600">
                Your messages stay on your device with peer-to-peer technology.
              </p>
            </div>
            <div>
              <BoltIcon className="h-8 w-8 text-gray-800 mb-4" />
              <h4 className="text-xl font-semibold mb-2">Fast & Reliable</h4>
              <p className="text-gray-600">
                Instant messaging without delays, perfect for campus collaboration.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-gradient-to-b from-white to-rose-50 text-center">
        <h2 className="text-rose-300 uppercase tracking-wide mb-2">JOIN US</h2>
        <h3 className="text-4xl font-serif mb-4">Ready to Connect?</h3>
        <p className="text-gray-600 mb-8">
          Join your fellow KU students on AirTalk and experience seamless
          communication across campus.
        </p>
        <button className="bg-rose-300 text-white px-8 py-3 rounded-md hover:bg-rose-400 transition-colors">
          START CHATTING NOW
        </button>
      </section>

      {/* Footer */}
      <footer className="bg-white py-12 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-3 gap-8">
          <div>
            <img src="https://i.ibb.co/M6qBPvL/logo.png" alt="AirTalk Logo" className="h-10 mb-4" />
            <p className="text-gray-600 mb-2">
              KU's offline-first chatroom platform made just for campus life —
              elegant, minimalist & smart.
            </p>
            <p className="text-gray-500 text-sm">
              Works without internet, using KU's Wi-Fi network.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">QUICK LINKS</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Home</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Chatrooms</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">About</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">CONTACT</h4>
            <ul className="space-y-2">
              <li className="text-gray-600">Kathmandu University</li>
              <li className="text-gray-600">Dhulikhel, Kavre</li>
              <li><a href="mailto:airtalk@ku.edu.np" className="text-gray-600 hover:text-gray-900">airtalk@ku.edu.np</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-gray-200 flex justify-between items-center">
          <p className="text-gray-500">© 2025 AirTalk. All rights reserved.</p>
          <p className="text-gray-500">Developed by COMP 207 Group</p>
        </div>
      </footer>
    </div>
  );
}

export default App;