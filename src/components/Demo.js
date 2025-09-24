/* global Plotly, Chart, THREE */
import React, { useEffect, useRef, useState } from 'react';
import { sampleLightCurve, sampleLightCurve2 } from '../utils/mockData';

const samples = [sampleLightCurve, sampleLightCurve2];

function mockAnalyze(data) {
  // Simple mock: increase probability if a dip exists
  const minFlux = Math.min(...data.flux);
  const detected = minFlux < 0.97;
  const probability = detected ? 0.82 + Math.random() * 0.1 : 0.15 + Math.random() * 0.2;
  return new Promise((resolve) => setTimeout(() => resolve({ detected, probability: Math.min(0.99, probability) }), 1200));
}

export default function Demo() {
  const [selected, setSelected] = useState(samples[0]);
  const [uploaded, setUploaded] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
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
    // Probability progress bar as Chart.js horizontal bar (using a doughnut as progress)
    if (!chartRef.current || !window.Chart || !result) return;
    const ctx = chartRef.current.getContext('2d');
    const percent = Math.round(result.probability * 100);
    const chart = new window.Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Probability', 'Remaining'],
        datasets: [
          { data: [percent, 100 - percent], backgroundColor: ['#00BFFF', 'rgba(255,255,255,0.1)'], borderWidth: 0 },
        ],
      },
      options: {
        responsive: true,
        cutout: '75%',
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
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-3 h-3 rounded-full ${result.detected ? 'bg-green-400' : 'bg-red-400'}`}></div>
                    <div className="text-white font-semibold">{result.detected ? 'Exoplanet Detected!' : 'No Detection'}</div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="relative w-40 h-40">
                      <canvas ref={chartRef} width="160" height="160" aria-label="Probability chart" role="img"></canvas>
                      <div className="absolute inset-0 flex items-center justify-center text-xl font-semibold">
                        {Math.round(result.probability * 100)}%
                      </div>
                    </div>
                    <div className="text-gray-300">
                      The model estimates a probability of detection based on transit-like dips in the light curve.
                    </div>
                  </div>
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

