import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import About from '../components/About';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const Home = () => {
  return (
    <div className="font-montserrat">
      <Navbar />
      <Hero />
      <Features />
      <About />
      <Footer />
    </div>
  );
};

export default Home;