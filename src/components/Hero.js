/* global THREE */
import React, { useEffect, useRef } from 'react';

export default function Hero() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    let renderer, scene, camera, animationId;
    let planet, stars;
    const container = containerRef.current;

    const initThree = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
      camera.position.z = 5;
      renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias: true, alpha: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      // Stars
      const starGeometry = new THREE.BufferGeometry();
      const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.015 });
      const starVertices = [];
      for (let i = 0; i < 2000; i++) {
        const x = (Math.random() - 0.5) * 200;
        const y = (Math.random() - 0.5) * 200;
        const z = -Math.random() * 200;
        starVertices.push(x, y, z);
      }
      starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
      stars = new THREE.Points(starGeometry, starMaterial);
      scene.add(stars);

      // Planet
      const planetGeometry = new THREE.SphereGeometry(1, 64, 64);
      const planetMaterial = new THREE.MeshStandardMaterial({ color: 0x2233ff, metalness: 0.1, roughness: 0.8 });
      planet = new THREE.Mesh(planetGeometry, planetMaterial);
      scene.add(planet);

      // Light
      const dirLight = new THREE.DirectionalLight(0x00bfff, 1.2);
      dirLight.position.set(5, 5, 5);
      scene.add(dirLight);
      scene.add(new THREE.AmbientLight(0x404040));

      const onResize = () => {
        if (!container) return;
        const w = container.clientWidth;
        const h = container.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      window.addEventListener('resize', onResize);

      const animate = () => {
        animationId = requestAnimationFrame(animate);
        if (planet) planet.rotation.y += 0.0015;
        if (stars) stars.rotation.z += 0.0005;
        renderer.render(scene, camera);
      };
      animate();

      return () => {
        window.removeEventListener('resize', onResize);
        cancelAnimationFrame(animationId);
        renderer && renderer.dispose();
      };
    };

    let cleanup = () => {};
    try {
      if (window.THREE) {
        cleanup = initThree();
      }
    } catch (e) {
      // Fallback handled by CSS background image
    }
    return () => cleanup && cleanup();
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center hero-bg-fallback">
      <div ref={containerRef} className="absolute inset-0" aria-hidden="true">
        <canvas ref={canvasRef} className="three-canvas"></canvas>
      </div>
      <div className="relative z-10 text-center px-6" data-aos="fade-up">
        <h1 className="font-orbitron text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-white tracking-wide mb-6">
          Hunt for <span className="gradient-text">Exoplanets</span> with AI
        </h1>
        <p className="max-w-3xl mx-auto text-lg sm:text-xl text-gray-300 mb-8">
          Our NASA Space Apps 2025 Project: Detecting Distant Worlds Using ML on Kepler/TESS Data
        </p>
        <a href="#demo" className="inline-block gradient-cta px-8 py-4 rounded-md text-white font-semibold shadow-neon hover:scale-105 transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-neon">
          Try the Demo
        </a>
      </div>
    </section>
  );
}

