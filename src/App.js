/* global Chart, Plotly, AOS, particlesJS, THREE */
import { useEffect } from 'react';
import About from './components/About';
import Demo from './components/Demo';
import Footer from './components/Footer';
import Header from './components/Header';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import Results from './components/Results';
import TeamContact from './components/TeamContact';

/**
 * Main App Component
 * 
 * Single-page application structure for ExoHunter AI
 * - Initializes AOS (Animate On Scroll) library for smooth animations
 * - Renders all main sections in sequence: Hero, About, How It Works, Demo, Results, Team
 * - Uses Tailwind CSS for styling and responsive design
 */
function App() {
  useEffect(() => {
    // Initialize AOS (Animate On Scroll) library for section animations
    // Prevents double initialization if already loaded in index.html
    if (window.AOS && !window.__aosInitialized) {
      window.AOS.init({ 
        once: true,                // Animate elements only once when scrolling down
        duration: 800,             // Animation duration in milliseconds
        easing: 'ease-out-cubic'   // Smooth easing function for natural feel
      });
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

