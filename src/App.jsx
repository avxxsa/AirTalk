import { ChatBubbleLeftIcon, LockClosedIcon, BoltIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

function NavLink({ href, children, className }) {
  return (
    <a 
      href={href} 
      className={clsx(
        "text-[15px] font-light tracking-[0.15em] text-gray-400 hover:text-rose-300 transition-colors",
        className
      )}
    >
      {children}
    </a>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-brand-light">
      {/* Navigation */}
      <nav className="px-16 py-8 flex items-center justify-between bg-white">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-rose-200 flex items-center justify-center">
            <span className="text-2xl font-display text-rose-400">A</span>
          </div>
          <span className="text-xl text-rose-300 font-light tracking-wider">AirTalk</span>
        </div>
        <div className="flex items-center gap-16">
          <NavLink href="#">HOME</NavLink>
          <NavLink href="#">CHATROOMS</NavLink>
          <NavLink href="#">ABOUT</NavLink>
          <button className="bg-rose-200 text-rose-500 px-8 py-3 rounded-lg hover:bg-rose-300 transition-colors tracking-[0.15em] text-[15px] font-light">
            ENTER CHATROOMS
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="text-center py-32 px-4">
        <h1 className="font-display text-[72px] leading-tight mb-6 text-gray-900">
          CONNECT SEAMLESSLY
          <br />
          ACROSS CAMPUS
        </h1>
        <p className="text-gray-600 text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
          KU's offline-first chatroom platform made just for campus life — elegant,
          minimalist & smart.
        </p>
        <button className="bg-white text-gray-800 px-10 py-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors text-[15px] tracking-wider">
          EXPLORE CHATROOMS
        </button>
      </section>

      {/* Features Section */}
      <section className="py-32 px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <p className="text-brand-pink text-sm tracking-[0.2em] mb-4">FEATURES</p>
          <div className="flex justify-between items-start mb-20">
            <h2 className="font-display text-4xl text-gray-900">Why Choose AirTalk</h2>
            <p className="text-gray-600 max-w-md leading-relaxed">
              Discover how our thoughtfully designed features enhance your
              campus communication experience.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-16">
            <div>
              <ChatBubbleLeftIcon className="h-8 w-8 text-gray-800 mb-6" />
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Offline Messaging</h3>
              <p className="text-gray-600 leading-relaxed">
                Chat with friends even when the internet is down, using KU's Wi-Fi network.
              </p>
            </div>
            <div>
              <LockClosedIcon className="h-8 w-8 text-gray-800 mb-6" />
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Private & Secure</h3>
              <p className="text-gray-600 leading-relaxed">
                Your messages stay on your device with peer-to-peer technology.
              </p>
            </div>
            <div>
              <BoltIcon className="h-8 w-8 text-gray-800 mb-6" />
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Fast & Reliable</h3>
              <p className="text-gray-600 leading-relaxed">
                Instant messaging without delays, perfect for campus collaboration.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-12 text-center bg-brand-light">
        <p className="text-brand-pink text-sm tracking-[0.2em] mb-4">JOIN US</p>
        <h2 className="font-display text-4xl mb-6 text-gray-900">Ready to Connect?</h2>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
          Join your fellow KU students on AirTalk and experience seamless
          communication across campus.
        </p>
        <button className="bg-brand-pink text-gray-800 px-10 py-4 rounded-lg hover:bg-opacity-90 transition-colors text-[15px] tracking-wider">
          START CHATTING NOW
        </button>
      </section>

      {/* Footer */}
      <footer className="bg-white py-20 px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-3 gap-24 mb-20">
            <div>
              <div className="w-10 h-10 rounded-full bg-brand-pink flex items-center justify-center mb-6">
                <span className="text-2xl font-display">A</span>
              </div>
              <p className="text-gray-600 mb-4 leading-relaxed">
                KU's offline-first chatroom platform made just for campus life —
                elegant, minimalist & smart.
              </p>
              <p className="text-gray-500 text-sm">
                Works without internet, using KU's Wi-Fi network.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-6 tracking-wider">QUICK LINKS</h4>
              <ul className="space-y-3">
                <li><NavLink href="#" className="text-gray-500">Home</NavLink></li>
                <li><NavLink href="#" className="text-gray-500">Chatrooms</NavLink></li>
                <li><NavLink href="#" className="text-gray-500">About</NavLink></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-6 tracking-wider">CONTACT</h4>
              <ul className="space-y-3">
                <li className="text-gray-500">Kathmandu University</li>
                <li className="text-gray-500">Dhulikhel, Kavre</li>
                <li>
                  <a href="mailto:airtalk@ku.edu.np" className="text-gray-500 hover:text-gray-800 transition-colors">
                    airtalk@ku.edu.np
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex justify-between items-center pt-8 border-t border-gray-100">
            <p className="text-gray-500">© 2025 AirTalk. All rights reserved.</p>
            <p className="text-gray-500">Developed by COMP 207 Group</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;