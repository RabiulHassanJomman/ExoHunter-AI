import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-black/80 border-t border-white/10 py-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-gray-400 text-sm">© 2025 ExoHunter AI Team</div>
        <div className="flex items-center gap-4 text-sm">
          <a href="https://www.spaceappschallenge.org/" target="_blank" rel="noreferrer" className="text-neon underline">NASA Space Apps</a>
          <a href="#home" className="px-3 py-1 border border-white/20 rounded hover:bg-white/10 transition">Back to top</a>
        </div>
      </div>
    </footer>
  );
}

