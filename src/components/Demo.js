/* global Plotly, Chart, THREE */
import { useEffect, useRef, useState } from 'react';
import ReasoningPanel from './ReasoningPanel';
import { sampleLightCurve, sampleLightCurve2 } from '../utils/mockData';

// Available sample light curve datasets for demonstration
const samples = [sampleLightCurve, sampleLightCurve2];

/**
 * Mock ML Analysis Function
 * Simulates a machine learning model that classifies exoplanet signals
 * 
 * @param {Object} data - Light curve data with time and flux arrays
 * @returns {Promise} - Resolves with classification result after simulated processing time
 * 
 * Classification Logic:
 * - Strong transit signals (deep dips) → confirmed exoplanet or candidate
 * - Moderate signals → candidate or false positive
 * - Weak signals → likely false positive
 */
function mockAnalyze(data) {
  // Extract basic statistical features from light curve
  const minFlux = Math.min(...data.flux);  // Minimum flux (deepest transit)
  const maxFlux = Math.max(...data.flux);  // Maximum flux 
  const fluxVariation = maxFlux - minFlux; // Total flux variation range
  
  let classification, confidence;
  
  // Classification decision tree based on transit depth and variation
  if (minFlux < 0.96 && fluxVariation > 0.06) {
    // Strong transit signal detected - likely a real exoplanet
    classification = Math.random() > 0.2 ? 'confirmed' : 'candidate';
    confidence = 0.85 + Math.random() * 0.14; // High confidence (85-99%)
  } else if (minFlux < 0.98 && fluxVariation > 0.03) {
    // Moderate signal - could be planet or instrumental noise
    const rand = Math.random();
    if (rand > 0.6) classification = 'candidate';
    else if (rand > 0.3) classification = 'false_positive';
    else classification = 'confirmed';
    confidence = 0.60 + Math.random() * 0.25; // Medium confidence (60-85%)
  } else {
    // Weak or no signal detected - likely noise or stellar activity
    classification = Math.random() > 0.1 ? 'false_positive' : 'candidate';
    confidence = 0.75 + Math.random() * 0.20; // Variable confidence (75-95%)
  }
  
  // Generate estimated physical parameters for real planet detections
  const period = classification !== 'false_positive' ? 
    (15 + Math.random() * 200).toFixed(1) : null; // Orbital period in days
  const radius = classification !== 'false_positive' ? 
    (0.5 + Math.random() * 3).toFixed(2) : null;  // Planet radius in Earth radii
  
  return new Promise((resolve) => 
    setTimeout(() => resolve({ 
      classification, 
      confidence: Math.min(0.99, confidence),
      period: period ? parseFloat(period) : null,
      radius: radius ? parseFloat(radius) : null
    }), 1200)
  );
}

export default function Demo() {
  const [selected, setSelected] = useState(samples[0]);
  const [uploaded, setUploaded] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [showReasoning, setShowReasoning] = useState(false);
  const plotRef = useRef(null);
  const chartRef = useRef(null);
  const planetCanvasRef = useRef(null);
  const planetContainerRef = useRef(null);

  useEffect(() => {
    // Plotly graph
    const dataToUse = uploaded || selected;
    if (plotRef.current && window.Plotly) {
      window.Plotly.react(
        plotRef.current,
        [
          {
            x: dataToUse.time,
            y: dataToUse.flux,
            type: 'scatter',
            mode: 'lines',
            line: { color: '#00BFFF' },
            name: 'Flux',
          },
        ],
        {
          paper_bgcolor: 'rgba(0,0,0,0)',
          plot_bgcolor: 'rgba(0,0,0,0)',
          margin: { t: 24, r: 12, b: 36, l: 48 },
          xaxis: { title: 'Time (days)', color: '#D3D3D3', gridcolor: 'rgba(255,255,255,0.05)' },
          yaxis: { title: 'Normalized Flux', color: '#D3D3D3', gridcolor: 'rgba(255,255,255,0.05)' },
          displayModeBar: false,
        },
        { responsive: true }
      );
    }
  }, [selected, uploaded]);

  useEffect(() => {
    // Three.js planet
    if (!planetContainerRef.current || !window.THREE) return;
    const container = planetContainerRef.current;
    let renderer, scene, camera, animationId;
    let planet;
    const init = () => {
      const w = container.clientWidth;
      const h = 260;
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 1000);
      camera.position.z = 3.2;
      renderer = new THREE.WebGLRenderer({ canvas: planetCanvasRef.current, antialias: true, alpha: true });
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      // Planet with subtle texture-like lambert shading
      const geometry = new THREE.SphereGeometry(1, 64, 64);
      const material = new THREE.MeshStandardMaterial({ color: 0x0f5e9c, roughness: 0.7, metalness: 0.2 });
      planet = new THREE.Mesh(geometry, material);
      scene.add(planet);
      const light = new THREE.PointLight(0x00bfff, 1.2);
      light.position.set(3, 3, 3);
      scene.add(light);
      scene.add(new THREE.AmbientLight(0x222222));

      const onResize = () => {
        const nw = container.clientWidth;
        camera.aspect = nw / h;
        camera.updateProjectionMatrix();
        renderer.setSize(nw, h);
      };
      window.addEventListener('resize', onResize);
      const animate = () => {
        animationId = requestAnimationFrame(animate);
        planet.rotation.y += 0.003;
        renderer.render(scene, camera);
      };
      animate();
      return () => {
        window.removeEventListener('resize', onResize);
        cancelAnimationFrame(animationId);
        renderer && renderer.dispose();
      };
    };
    const cleanup = init();
    return () => cleanup && cleanup();
  }, []);

  useEffect(() => {
    // Confidence progress bar as Chart.js doughnut chart
    if (!chartRef.current || !window.Chart || !result) return;
    const ctx = chartRef.current.getContext('2d');
    const percent = Math.round(result.confidence * 100);
    const color = result.classification === 'confirmed' ? '#10B981' :
                  result.classification === 'candidate' ? '#F59E0B' : '#EF4444';
    
    const chart = new window.Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Confidence', 'Remaining'],
        datasets: [
          { data: [percent, 100 - percent], backgroundColor: [color, 'rgba(255,255,255,0.1)'], borderWidth: 0 },
        ],
      },
      options: {
        responsive: true,
        cutout: '70%',
        plugins: { legend: { display: false }, tooltip: { enabled: false } },
      },
    });
    return () => chart.destroy();
  }, [result]);

  const onFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        let parsed;
        if (file.name.toLowerCase().endsWith('.json')) {
          parsed = JSON.parse(reader.result);
        } else {
          // Expect CSV with two columns: time,flux
          const lines = String(reader.result).split(/\r?\n/).filter(Boolean);
          const time = [];
          const flux = [];
          for (const line of lines) {
            const [t, f] = line.split(',').map((v) => v.trim());
            if (!isNaN(parseFloat(t)) && !isNaN(parseFloat(f))) {
              time.push(parseFloat(t));
              flux.push(parseFloat(f));
            }
          }
          parsed = { name: file.name, time, flux };
        }
        if (!parsed.time?.length || !parsed.flux?.length || parsed.time.length !== parsed.flux.length) {
          throw new Error('Invalid data format. Expect arrays time and flux of equal length.');
        }
        setUploaded(parsed);
        setResult(null);
      } catch (err) {
        alert('Error parsing file: ' + err.message);
      }
    };
    reader.onerror = () => alert('Failed to read file.');
    if (file.name.toLowerCase().endsWith('.json')) reader.readAsText(file);
    else reader.readAsText(file);
  };

  const onAnalyze = async () => {
    try {
      setAnalyzing(true);
      setResult(null);
      const data = uploaded || selected;
      const r = await mockAnalyze(data);
      setResult(r);
      setShowReasoning(true);
    } catch (e) {
      alert('Analysis failed. Your browser may not support required features.');
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <section id="demo" className="relative py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto" data-aos="fade-up">
        <h2 className="font-orbitron text-3xl sm:text-4xl text-center text-white mb-10">Try It Yourself</h2>

        <div className="bg-black/50 rounded-2xl border border-white/10 p-6 shadow-neon">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <label className="block text-sm text-gray-300 mb-2" htmlFor="sample">Choose sample</label>
              <select id="sample" className="w-full bg-black/40 border border-white/10 rounded-md p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-neon" value={samples.indexOf(selected)} onChange={(e) => { setSelected(samples[Number(e.target.value)]); setUploaded(null); setResult(null); }}>
                {samples.map((s, i) => (<option key={i} value={i}>{s.name}</option>))}
              </select>
              <div className="mt-4">
                <label className="block text-sm text-gray-300 mb-2" htmlFor="file">Or upload CSV/JSON (time,flux)</label>
                <input id="file" type="file" accept=".csv,.json" className="w-full text-gray-300" onChange={onFileChange} />
              </div>
              <button onClick={onAnalyze} className="mt-6 gradient-cta px-6 py-3 rounded-md text-white font-semibold hover:scale-105 transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-neon" disabled={analyzing} aria-busy={analyzing}>
                {analyzing ? 'Analyzing…' : 'Analyze'}
              </button>
              {analyzing && <div className="mt-4 spinner" aria-hidden="true"></div>}

              {result && (
                <div className="mt-8" data-aos="fade-in">
                  <div className="bg-black/40 rounded-lg border border-white/10 p-4 mb-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-4 h-4 rounded-full ${
                        result.classification === 'confirmed' ? 'bg-green-400' :
                        result.classification === 'candidate' ? 'bg-yellow-400' : 'bg-red-400'
                      }`}></div>
                      <div className="text-white font-semibold text-lg">
                        {result.classification === 'confirmed' ? 'Confirmed Exoplanet' :
                         result.classification === 'candidate' ? 'Planetary Candidate' : 'False Positive'}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-4">
                        <div className="relative w-24 h-24">
                          <canvas ref={chartRef} width="96" height="96" aria-label="Confidence chart" role="img"></canvas>
                          <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold">
                            {Math.round(result.confidence * 100)}%
                          </div>
                        </div>
                        <div className="text-gray-300 text-sm">
                          Model Confidence
                        </div>
                      </div>
                      
                      {result.classification !== 'false_positive' && (
                        <div className="space-y-2 text-sm">
                          <div className="text-gray-300">
                            <span className="text-white font-medium">Estimated Properties:</span>
                          </div>
                          {result.period && (
                            <div className="text-gray-300">
                              Orbital Period: <span className="text-cyan-400">{result.period} days</span>
                            </div>
                          )}
                          {result.radius && (
                            <div className="text-gray-300">
                              Planet Radius: <span className="text-cyan-400">{result.radius} R⊕</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-3 text-xs text-gray-400">
                      {result.classification === 'confirmed' ? 
                        'High confidence detection with strong transit signature' :
                       result.classification === 'candidate' ? 
                        'Moderate confidence - requires additional validation' :
                        'Signal likely caused by instrumental noise or stellar activity'}
                    </div>
                  </div>

                  {showReasoning && (
                    <ReasoningPanel
                      classification={result.classification}
                      confidence={result.confidence}
                      onClose={() => setShowReasoning(false)}
                    >
                      <p className="text-xs italic text-gray-400">
                        This is purely AI-assisted reasoning. So you shouldn’t expect the reasoning as flawless.
                      </p>

                      <ol className="list-decimal pl-5 space-y-2">
                        <li>
                          <span className="font-semibold text-white">Ideal Planetary Parameters:</span> The fundamental characteristics of the transit signal are pristine.
                          <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li>
                              <span className="text-white">Planet Radius (koi_prad):</span> The derived radius is 1.16 Earth radii. This is a perfect size for a small, terrestrial "super-Earth" type planet and is a strong indicator of a planetary nature.
                            </li>
                            <li>
                              <span className="text-white">Transit Depth (koi_depth):</span> The depth of 131.1 ppm is very shallow, consistent with a small planet transiting a Sun-like star. It is far too shallow to be caused by a stellar companion.
                            </li>
                            <li>
                              <span className="text-white">Signal-to-Noise Ratio (koi_model_snr):</span> At 50.6, the signal is detected with extremely high confidence. There is no doubt that a real, periodic dimming event is occurring.
                            </li>
                            <li>
                              <span className="text-white">Impact Parameter (koi_impact):</span> The value of 0.051 is very close to zero, indicating a central transit across the star’s disk. This typically produces a clean, flat-bottomed “U-shaped” light curve, which is a hallmark of a genuine planetary transit.
                            </li>
                          </ul>
                        </li>

                        <li>
                          <span className="font-semibold text-white">Lack of Evidence for a False Positive:</span> The common causes for a false positive are typically a background eclipsing binary contaminating the target’s photometry or an issue with the transit shape itself. The data shows no evidence of either.
                          <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li>
                              <span className="text-white">Centroid Analysis:</span> Key tests for a BEB are the difference image centroiding metrics (koi_dicco_msky, koi_dicco_mdc, koi_dicco_msly). These measure whether the source of the dimming is located on the target star or on a nearby, unresolved star. None show significant offset.
                            </li>
                            <li>
                              Neither of these measurements is statistically significant. A robust detection of a centroid offset typically requires a significance of ≥3-sigma. Therefore, these vetting statistics strongly suggest the transit signal is originating from the target star, which is what we expect for a true planet.
                            </li>
                          </ul>
                        </li>
                      </ol>

                      <p className="text-sm text-gray-300 mt-4">
                        However, based solely on the information provided, this object should be considered a high‑priority PLANETARY CANDIDATE. The available evidence does not support the given disposition.
                      </p>
                    </ReasoningPanel>
                  )}
                </div>
              )}
            </div>

            <div>
              <div className="rounded-lg border border-white/10 p-2 mb-6">
                <div ref={plotRef} style={{ width: '100%', height: 320 }} aria-label="Light curve plot"></div>
              </div>
              <div className="rounded-lg border border-white/10 p-2" ref={planetContainerRef}>
                <canvas ref={planetCanvasRef} className="w-full" aria-label="3D rotating exoplanet"></canvas>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

