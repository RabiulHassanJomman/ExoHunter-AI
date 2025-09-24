import React from 'react';

export default function About() {
  return (
    <section id="about" className="relative py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto" data-aos="fade-up">
        <h2 className="font-orbitron text-3xl sm:text-4xl text-center text-white mb-12">About the Challenge</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="bg-black/50 rounded-xl border border-white/10 p-6 shadow-neon">
            <p className="leading-relaxed text-gray-300">
              Create an AI/ML model trained on NASA exoplanet datasets to analyze light curves and detect transits. We used datasets like Kepler light curves for training CNN models and evaluated on TESS observations. Our system denoises, detects, and explains potential transit events to assist astronomers.
            </p>
            <ul className="list-disc list-inside mt-6 space-y-2 text-gray-200">
              <li><span className="font-semibold">Key datasets</span>: Kepler, TESS</li>
              <li><span className="font-semibold">Goal</span>: Identify exoplanets from transit dips in flux</li>
              <li><span className="font-semibold">Impact</span>: Aid in space exploration and citizen science</li>
            </ul>
          </div>
          <div className="bg-black/50 rounded-xl border border-white/10 p-2 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1447433819943-74a20887a81e?q=80&w=1600&auto=format&fit=crop"
              alt="Illustration of an exoplanet and a light curve graph"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

