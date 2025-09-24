/* global Chart */
import React, { useEffect, useRef } from 'react';
import { sampleLightCurve } from '../utils/mockData';

const steps = [
  {
    title: 'Gather Data',
    desc: 'Fetch light curve data from NASA APIs (e.g., Kepler mission). Preprocess for noise reduction.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-neon"><path d="M12 2C6.477 2 2 4.239 2 7v10c0 2.761 4.477 5 10 5s10-2.239 10-5V7c0-2.761-4.477-5-10-5zm0 2c4.963 0 8 .172 8 3s-3.037 3-8 3-8-.172-8-3 3.037-3 8-3zm8 6.08V17c0 1.524-3.684 3-8 3s-8-1.476-8-3V10.08C6.014 11.29 8.977 12 12 12s5.986-.71 8-1.92z"/></svg>
    ),
  },
  {
    title: 'Train ML Model',
    desc: 'Use CNN or RNN to detect transit patterns in flux data.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-neon"><path d="M4 3h16a1 1 0 0 1 1 1v12a3 3 0 0 1-3 3H8l-5 3V4a1 1 0 0 1 1-1zm3 5v2h10V8H7zm0 4v2h7v-2H7z"/></svg>
    ),
  },
  {
    title: 'Analyze & Predict',
    desc: 'Input new data, output detection probability.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-neon"><path d="M13 2a1 1 0 0 0-1 1v6H6a1 1 0 1 0 0 2h6v6a1 1 0 1 0 2 0v-6h6a1 1 0 1 0 0-2h-6V3a1 1 0 0 0-1-1z"/></svg>
    ),
  },
  {
    title: 'Visualize Results',
    desc: 'Plot light curves and orbit simulations.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-neon"><path d="M4 5a1 1 0 0 0-1 1v12h18V6a1 1 0 1 0-2 0v10H5V6a1 1 0 0 0-1-1zm3 8h2v3H7v-3zm4-5h2v8h-2V8zm4 3h2v5h-2v-5z"/></svg>
    ),
  },
];

export default function HowItWorks() {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!chartRef.current || !window.Chart) return;
    const ctx = chartRef.current.getContext('2d');
    const data = {
      labels: sampleLightCurve.time.map((t) => t.toFixed(2)),
      datasets: [
        {
          label: 'Normalized Flux',
          data: sampleLightCurve.flux,
          borderColor: '#00BFFF',
          tension: 0.25,
          pointRadius: 0,
        },
      ],
    };
    const chart = new window.Chart(ctx, {
      type: 'line',
      data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { labels: { color: '#D3D3D3' } },
        },
        scales: {
          x: { ticks: { color: '#999' }, grid: { color: 'rgba(255,255,255,0.05)' } },
          y: { ticks: { color: '#999' }, grid: { color: 'rgba(255,255,255,0.05)' } },
        },
      },
    });
    return () => chart.destroy();
  }, []);

  return (
    <section id="how-it-works" className="relative py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-orbitron text-3xl sm:text-4xl text-center text-white mb-12" data-aos="fade-up">
          How Our AI Hunts Exoplanets
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {steps.map((s, idx) => (
            <div key={idx} className="bg-black/50 rounded-xl border border-white/10 p-6 hover:-translate-y-2 transition-transform duration-300" data-aos="fade-up" data-aos-delay={idx * 100}>
              <div className="mb-4">{s.icon}</div>
              <div className="text-neon text-2xl font-orbitron mb-2">{String(idx + 1).padStart(2, '0')}</div>
              <h3 className="text-white text-xl font-semibold mb-2">{s.title}</h3>
              <p className="text-gray-300">{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-black/50 rounded-xl border border-white/10 p-6" data-aos="fade-up">
          <div className="h-64 sm:h-80">
            <canvas ref={chartRef} aria-label="Sample light curve showing a transit dip" role="img"></canvas>
          </div>
        </div>
      </div>
    </section>
  );
}

