/* global Chart, Plotly, AOS, particlesJS, THREE */
import React, { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import HowItWorks from './components/HowItWorks';
import Demo from './components/Demo';
import Results from './components/Results';
import TeamContact from './components/TeamContact';
import Footer from './components/Footer';

function App() {
  useEffect(() => {
    // Init AOS if not already initialized in index.html
    if (window.AOS && !window.__aosInitialized) {
      window.AOS.init({ once: true, duration: 800, easing: 'ease-out-cubic' });
      window.__aosInitialized = true;
    }
  }, []);

  return (
    <div className="min-h-screen text-gray-200">
      <Header />
      <main id="main" className="relative">
        <Hero />
        <About />
        <HowItWorks />
        <Demo />
        <Results />
        <TeamContact />
      </main>
      <Footer />
    </div>
  );
}

export default App;

