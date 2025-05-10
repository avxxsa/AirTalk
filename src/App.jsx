import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="bg-white text-gray-800 min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <Features />
      <CTA />
      <Footer />
    </div>
  );
}

export default App;