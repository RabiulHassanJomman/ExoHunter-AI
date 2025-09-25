import { useEffect, useRef, useState } from 'react';
import { featureImportance, nasaExoplanetCatalog, processingSteps } from '../utils/realExoplanetData';

export default function DataAnalysis() {
  const [selectedExoplanet, setSelectedExoplanet] = useState(nasaExoplanetCatalog[0]);
  const [activeTab, setActiveTab] = useState('overview');
  const featureChartRef = useRef(null);
  const orbitalChartRef = useRef(null);

  useEffect(() => {
    // Feature importance chart
    if (featureChartRef.current && window.Chart) {
      const ctx = featureChartRef.current.getContext('2d');
      const chart = new window.Chart(ctx, {
        type: 'horizontalBar',
        data: {
          labels: featureImportance.map(f => f.feature),
          datasets: [{
            data: featureImportance.map(f => f.importance),
            backgroundColor: [
              '#10B981', '#06B6D4', '#8B5CF6', '#F59E0B', 
              '#EF4444', '#EC4899', '#6366F1', '#84CC16'
            ],
            borderWidth: 0
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: (context) => {
                  const feature = featureImportance[context.dataIndex];
                  return `${feature.feature}: ${(feature.importance * 100).toFixed(1)}%`;
                }
              }
            }
          },
          scales: {
            x: {
              beginAtZero: true,
              max: 0.25,
              ticks: { color: '#D1D5DB' },
              grid: { color: 'rgba(255,255,255,0.1)' }
            },
            y: {
              ticks: { color: '#D1D5DB' },
              grid: { color: 'rgba(255,255,255,0.1)' }
            }
          }
        }
      });
      return () => chart.destroy();
    }
  }, []);

  useEffect(() => {
    // Orbital parameters visualization
    if (orbitalChartRef.current && window.Chart && selectedExoplanet.orbitalPeriod) {
      const ctx = orbitalChartRef.current.getContext('2d');
      
      // Create orbital data points
      const orbitalData = [];
      for (let i = 0; i <= 360; i += 5) {
        const angle = (i * Math.PI) / 180;
        const radius = 1; // Simplified circular orbit
        orbitalData.push({
          x: radius * Math.cos(angle),
          y: radius * Math.sin(angle)
        });
      }
      
      const chart = new window.Chart(ctx, {
        type: 'scatter',
        data: {
          datasets: [{
            label: 'Orbital Path',
            data: orbitalData,
            borderColor: '#06B6D4',
            backgroundColor: 'transparent',
            showLine: true,
            pointRadius: 0
          }, {
            label: 'Star',
            data: [{ x: 0, y: 0 }],
            backgroundColor: '#FCD34D',
            pointRadius: 8
          }, {
            label: 'Planet',
            data: [{ x: 1, y: 0 }],
            backgroundColor: '#10B981',
            pointRadius: 6
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { labels: { color: '#D1D5DB' } }
          },
          scales: {
            x: {
              type: 'linear',
              position: 'center',
              min: -1.5,
              max: 1.5,
              ticks: { color: '#D1D5DB' },
              grid: { color: 'rgba(255,255,255,0.1)' }
            },
            y: {
              type: 'linear',
              position: 'center',
              min: -1.5,
              max: 1.5,
              ticks: { color: '#D1D5DB' },
              grid: { color: 'rgba(255,255,255,0.1)' }
            }
          }
        }
      });
      return () => chart.destroy();
    }
  }, [selectedExoplanet]);

  const getClassificationColor = (classification) => {
    switch (classification) {
      case 'confirmed': return 'text-green-400';
      case 'candidate': return 'text-yellow-400';
      case 'false_positive': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getClassificationBadge = (classification) => {
    const colors = {
      confirmed: 'bg-green-400/20 text-green-400 border-green-400/30',
      candidate: 'bg-yellow-400/20 text-yellow-400 border-yellow-400/30',
      false_positive: 'bg-red-400/20 text-red-400 border-red-400/30'
    };
    return colors[classification] || 'bg-gray-400/20 text-gray-400 border-gray-400/30';
  };

  return (
    <section id="data-analysis" className="relative py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-orbitron text-3xl sm:text-4xl text-center text-white mb-4">
          Exoplanet Data Analysis
        </h2>
        <p className="text-gray-300 text-center mb-12 max-w-3xl mx-auto">
          Detailed analysis of exoplanet candidates using NASA's Kepler, K2, and TESS mission data.
          Our ML model processes multiple parameters to classify each detection.
        </p>

        {/* Exoplanet Selector */}
        <div className="mb-8">
          <label className="block text-sm text-gray-300 mb-3">Select Exoplanet for Analysis:</label>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {nasaExoplanetCatalog.map((planet) => (
              <button
                key={planet.id}
                onClick={() => setSelectedExoplanet(planet)}
                className={`p-4 rounded-lg border text-left transition-all ${
                  selectedExoplanet.id === planet.id
                    ? 'bg-cyan-500/20 border-cyan-400/50'
                    : 'bg-black/30 border-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-2 h-2 rounded-full ${
                    planet.classification === 'confirmed' ? 'bg-green-400' :
                    planet.classification === 'candidate' ? 'bg-yellow-400' : 'bg-red-400'
                  }`}></div>
                  <span className="text-white font-semibold">{planet.keplerName}</span>
                </div>
                <div className="text-xs text-gray-400">
                  {planet.mission} • {(planet.confidence * 100).toFixed(1)}% confidence
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 border-b border-white/10">
            {['overview', 'parameters', 'features', 'pipeline'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm font-medium capitalize transition-colors ${
                  activeTab === tab
                    ? 'text-cyan-400 border-b-2 border-cyan-400'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {tab === 'parameters' ? 'Physical Parameters' : 
                 tab === 'features' ? 'ML Features' :
                 tab === 'pipeline' ? 'Processing Pipeline' : tab}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-black/50 rounded-2xl border border-white/10 p-6">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  {selectedExoplanet.keplerName}
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getClassificationBadge(selectedExoplanet.classification)}`}>
                      {selectedExoplanet.classification.replace('_', ' ').toUpperCase()}
                    </span>
                    <span className="text-gray-300">
                      {(selectedExoplanet.confidence * 100).toFixed(1)}% confidence
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Mission:</span>
                      <span className="ml-2 text-white">{selectedExoplanet.mission}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Method:</span>
                      <span className="ml-2 text-white">{selectedExoplanet.discoveryMethod}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Distance:</span>
                      <span className="ml-2 text-white">{selectedExoplanet.coordinates.distance} pc</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Magnitude:</span>
                      <span className="ml-2 text-white">{selectedExoplanet.stellarMagnitude}</span>
                    </div>
                  </div>

                  {selectedExoplanet.notes && (
                    <div className="bg-yellow-400/10 border border-yellow-400/20 rounded-lg p-3">
                      <div className="text-yellow-400 text-xs font-medium mb-1">Note:</div>
                      <div className="text-gray-300 text-xs">{selectedExoplanet.notes}</div>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Orbital Visualization</h4>
                <div className="bg-black/30 rounded-lg p-4">
                  <canvas ref={orbitalChartRef} width="400" height="300" className="w-full"></canvas>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'parameters' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Planetary Parameters</h4>
                <div className="space-y-3">
                  {[
                    { label: 'Orbital Period', value: selectedExoplanet.orbitalPeriod, unit: 'days' },
                    { label: 'Transit Duration', value: selectedExoplanet.transitDuration, unit: 'hours' },
                    { label: 'Planet Radius', value: selectedExoplanet.planetRadius, unit: 'R⊕' },
                    { label: 'Planet Mass', value: selectedExoplanet.planetMass, unit: 'M⊕' },
                    { label: 'Equilibrium Temperature', value: selectedExoplanet.equilibriumTemp, unit: 'K' },
                    { label: 'Insolation Flux', value: selectedExoplanet.insolationFlux, unit: 'S⊕' }
                  ].map(({ label, value, unit }) => (
                    <div key={label} className="flex justify-between items-center p-3 bg-black/30 rounded-lg">
                      <span className="text-gray-300">{label}:</span>
                      <span className="text-white font-mono">
                        {value ? `${value} ${unit}` : 'N/A'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Stellar Parameters</h4>
                <div className="space-y-3">
                  {[
                    { label: 'Stellar Radius', value: selectedExoplanet.stellarRadius, unit: 'R☉' },
                    { label: 'Stellar Mass', value: selectedExoplanet.stellarMass, unit: 'M☉' },
                    { label: 'Stellar Temperature', value: selectedExoplanet.stellarTemp, unit: 'K' },
                    { label: 'Stellar Magnitude', value: selectedExoplanet.stellarMagnitude, unit: 'mag' },
                    { label: 'Right Ascension', value: selectedExoplanet.coordinates.ra?.toFixed(6), unit: '°' },
                    { label: 'Declination', value: selectedExoplanet.coordinates.dec?.toFixed(6), unit: '°' }
                  ].map(({ label, value, unit }) => (
                    <div key={label} className="flex justify-between items-center p-3 bg-black/30 rounded-lg">
                      <span className="text-gray-300">{label}:</span>
                      <span className="text-white font-mono">
                        {value ? `${value} ${unit}` : 'N/A'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'features' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">ML Model Feature Importance</h4>
                <div className="bg-black/30 rounded-lg p-4">
                  <canvas ref={featureChartRef} width="400" height="300" className="w-full"></canvas>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Detection Metrics</h4>
                <div className="space-y-3">
                  {[
                    { label: 'Transit Depth', value: selectedExoplanet.transitDepth, unit: 'relative flux' },
                    { label: 'Signal-to-Noise Ratio', value: selectedExoplanet.signalToNoise, unit: '' },
                    { label: 'Impact Parameter', value: selectedExoplanet.impactParameter, unit: '' },
                    { label: 'Planet Candidate Flag', value: selectedExoplanet.planetCandidateFlag, unit: '' }
                  ].map(({ label, value, unit }) => (
                    <div key={label} className="flex justify-between items-center p-3 bg-black/30 rounded-lg">
                      <span className="text-gray-300">{label}:</span>
                      <span className="text-white font-mono">
                        {value !== null ? `${value} ${unit}`.trim() : 'N/A'}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <h5 className="text-md font-medium text-white mb-3">Feature Descriptions</h5>
                  <div className="space-y-2">
                    {featureImportance.map((feature) => (
                      <div key={feature.feature} className="text-xs">
                        <span className="text-cyan-400 font-medium">{feature.feature}:</span>
                        <span className="text-gray-400 ml-1">{feature.description}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'pipeline' && (
            <div>
              <h4 className="text-lg font-semibold text-white mb-6">Data Processing Pipeline</h4>
              <div className="space-y-4">
                {processingSteps.map((step) => (
                  <div key={step.step} className="flex items-start gap-4 p-4 bg-black/30 rounded-lg">
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      step.status === 'completed' ? 'bg-green-400 text-black' :
                      step.status === 'in_progress' ? 'bg-yellow-400 text-black' :
                      'bg-gray-400 text-black'
                    }`}>
                      {step.step}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h5 className="text-white font-medium">{step.name}</h5>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          step.status === 'completed' ? 'bg-green-400/20 text-green-400' :
                          step.status === 'in_progress' ? 'bg-yellow-400/20 text-yellow-400' :
                          'bg-gray-400/20 text-gray-400'
                        }`}>
                          {step.status.replace('_', ' ')}
                        </span>
                      </div>
                      <p className="text-gray-300 text-sm mb-2">{step.description}</p>
                      <p className="text-gray-400 text-xs">{step.details}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
