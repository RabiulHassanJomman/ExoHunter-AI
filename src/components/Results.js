/* global Chart */
import React, { useEffect, useRef } from 'react';
import { confusionMatrix, galleryImages } from '../utils/mockData';

export default function Results() {
  const doughnutRef = useRef(null);

  useEffect(() => {
    if (!doughnutRef.current || !window.Chart) return;
    const ctx = doughnutRef.current.getContext('2d');
    const chart = new window.Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Accuracy', 'Error'],
        datasets: [
          { data: [92, 8], backgroundColor: ['#00BFFF', 'rgba(255,255,255,0.1)'], borderWidth: 0 },
        ],
      },
      options: { plugins: { legend: { labels: { color: '#D3D3D3' } } }, cutout: '70%' },
    });
    return () => chart.destroy();
  }, []);

  return (
    <section id="results" className="relative py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto" data-aos="fade-up">
        <h2 className="font-orbitron text-3xl sm:text-4xl text-center text-white mb-10">Our Results</h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="bg-black/50 rounded-xl border border-white/10 p-6">
            <h3 className="text-white font-semibold mb-4">Accuracy</h3>
            <div className="flex items-center justify-center">
              <div className="relative w-48 h-48">
                <canvas ref={doughnutRef} width="192" height="192" aria-label="Accuracy chart" role="img"></canvas>
                <div className="absolute inset-0 flex items-center justify-center text-2xl font-semibold">92%</div>
              </div>
            </div>
          </div>

          <div className="bg-black/50 rounded-xl border border-white/10 p-6 overflow-auto">
            <h3 className="text-white font-semibold mb-4">Confusion Matrix</h3>
            <table className="w-full text-sm text-gray-200 border-collapse" aria-label="Confusion matrix">
              <thead>
                <tr>
                  <th className="border border-white/10 p-2"> </th>
                  {confusionMatrix.labels.map((l) => (
                    <th key={l} className="border border-white/10 p-2">Pred {l}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {confusionMatrix.matrix.map((row, rowIdx) => (
                  <tr key={rowIdx}>
                    <th className="border border-white/10 p-2 text-left">Actual {confusionMatrix.labels[rowIdx]}</th>
                    {row.map((val, colIdx) => (
                      <td key={colIdx} className="border border-white/10 p-2 text-center">{val}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-black/50 rounded-xl border border-white/10 p-6">
            <h3 className="text-white font-semibold mb-4">Detected Exoplanets</h3>
            <div className="grid grid-cols-2 gap-3">
              {galleryImages.map((src, i) => (
                <div key={i} className="overflow-hidden rounded-lg">
                  <img src={src} alt={`Detected exoplanet example ${i + 1}`} className="w-full h-28 object-cover hover:scale-110 transition-transform duration-700" loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

