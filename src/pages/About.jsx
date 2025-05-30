import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const About = () => {
  const teamMembers = [
    {
      name: "Avipsa Parajuli",
      role: "UI/UX Designer",
      image: "/images/avipsa.jpg",
    },
    {
      name: "Pratistha Thapa",
      role: "Database Manager",
      image: "/images/pratistha.jpg",
    },
    {
      name: "Misan Shrestha",
      role: "Backend Developer",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Elvish Vaidya",
      role: "UI/UX Designer",
      image: "/images/elvish.jpg",
    },
    {
    name: "Aayusha Shrestha",
      role: "Backend Developer",
      image: "/placeholder.svg?height=300&width=300",
    },
  ];

  return (
    <div className="bg-white text-gray-800 min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 bg-[#FFF8F8]">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-light font-serif text-gray-800 mb-6">About AirTalk</h1>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Connecting KU students even when the internet is down. Learn about our mission, our team, and the
              technology behind AirTalk.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-light font-serif text-gray-800 mb-6">Our Mission</h2>
              <p className="text-gray-600 mb-6">
                AirTalk was born out of a common frustration experienced by KU students: unreliable internet
                connectivity on campus. Our mission is to ensure that communication between students remains
                uninterrupted, regardless of internet availability.
              </p>
              <p className="text-gray-600">
                We believe that seamless communication is essential for collaboration, learning, and community building.
                By creating a platform that works offline, we're empowering students to stay connected and productive at
                all times.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img
                src="/images/airtalk-mission.jpg"
                alt="AirTalk Mission"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-light font-serif text-gray-800 mb-12 text-center">How It Works</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-[#E5989B]/20 rounded-full flex items-center justify-center mb-6">
                <span className="text-[#E5989B] text-xl">1</span>
              </div>
              <h3 className="text-xl font-medium mb-4">Mesh Network</h3>
              <p className="text-gray-600 text-sm">
                AirTalk creates a peer-to-peer mesh network using the existing WiFi infrastructure at KU, allowing
                devices to communicate directly with each other.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-[#E5989B]/20 rounded-full flex items-center justify-center mb-6">
                <span className="text-[#E5989B] text-xl">2</span>
              </div>
              <h3 className="text-xl font-medium mb-4">Local Storage</h3>
              <p className="text-gray-600 text-sm">
                Messages are stored locally on your device and synchronized with other users when they come within
                range, ensuring no messages are lost.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-[#E5989B]/20 rounded-full flex items-center justify-center mb-6">
                <span className="text-[#E5989B] text-xl">3</span>
              </div>
              <h3 className="text-xl font-medium mb-4">Seamless Transition</h3>
              <p className="text-gray-600 text-sm">
                AirTalk automatically switches between online and offline modes, so you don't have to worry about
                connectivity issues.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-light font-serif text-gray-800 mb-4 text-center">Meet Our Team</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            AirTalk is developed by a dedicated team of Computer Science students at Kathmandu University.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all">
                <div className="relative h-64">
                  <img src={member.image || "/placeholder.svg"} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-800 mb-1">{member.name}</h3>
                  <p className="text-[#E5989B] text-sm mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-light font-serif text-gray-800 mb-12 text-center">Frequently Asked Questions</h2>

          <div className="max-w-3xl mx-auto">
            <div className="mb-8">
              <h3 className="text-xl font-medium mb-3">How does AirTalk work without internet?</h3>
              <p className="text-gray-600">
                AirTalk uses a peer-to-peer mesh network that operates over the university's WiFi infrastructure. This
                allows devices to communicate directly with each other without needing an internet connection.
              </p>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-medium mb-3">Is AirTalk secure?</h3>
              <p className="text-gray-600">
                Yes, AirTalk uses end-to-end encryption to ensure that your messages can only be read by the intended
                recipients. Your data never passes through external servers.
              </p>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-medium mb-3">How far can messages travel?</h3>
              <p className="text-gray-600">
                Messages can travel as far as the KU WiFi network extends. Additionally, our mesh network technology
                allows messages to hop between devices, extending the range even further.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-medium mb-3">Can I use AirTalk outside of KU?</h3>
              <p className="text-gray-600">
                AirTalk is designed specifically for the KU campus network. However, it can work on any WiFi network
                where multiple AirTalk users are present.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-light font-serif text-gray-800 mb-6">Get In Touch</h2>
            <p className="text-gray-600 mb-8">Have questions or suggestions? We'd love to hear from you!</p>
            <Link
              to="mailto:airtalk@ku.edu.np"
              className="inline-block px-8 py-3 bg-[#E5989B] text-white text-sm uppercase tracking-wider hover:bg-[#d88a8d] transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md rounded-md"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;