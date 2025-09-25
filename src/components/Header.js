import { useEffect, useState } from 'react';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Demo', href: '#demo' },
  { label: 'Results', href: '#results' },
  { label: 'Team', href: '#team' },
  { label: 'Contact', href: '#contact' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-colors ${solid ? 'bg-black/90 backdrop-blur-md' : 'bg-black/50'} border-b border-white/10`}
      role="banner" aria-label="Primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="#home" className="focus:outline-none focus-visible:ring-2 focus-visible:ring-neon" aria-label="ExoHunter AI Home">
            <span className="font-orbitron text-white text-xl tracking-wide">ExoHunter <span className="text-neon">AI</span></span>
          </a>

          <nav className="hidden md:flex items-center gap-6" aria-label="Primary Navigation">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="text-gray-200 hover:text-white transition relative focus:outline-none focus-visible:ring-2 focus-visible:ring-neon">
                <span className="hover:shadow-neon">{item.label}</span>
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <a href="https://github.com/example/exohunter-ai" target="_blank" rel="noreferrer" className="px-3 py-2 border border-white/20 rounded-md hover:bg-white/10 transition flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-neon" aria-label="View on GitHub">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.018c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.455-1.157-1.11-1.466-1.11-1.466-.908-.62.069-.607.069-.607 1.004.071 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.833.092-.647.35-1.088.636-1.339-2.221-.252-4.555-1.114-4.555-4.957 0-1.095.39-1.99 1.03-2.689-.104-.253-.447-1.27.098-2.645 0 0 .84-.27 2.75 1.027A9.564 9.564 0 0 1 12 6.844c.851.004 1.707.115 2.507.337 1.908-1.297 2.747-1.027 2.747-1.027.546 1.375.203 2.392.1 2.645.64.699 1.028 1.594 1.028 2.689 0 3.853-2.337 4.702-4.565 4.95.359.31.678.92.678 1.855 0 1.339-.012 2.418-.012 2.747 0 .268.18.58.688.481A10.025 10.025 0 0 0 22 12.018C22 6.484 17.523 2 12 2z" clipRule="evenodd"/></svg>
              <span>View on GitHub</span>
            </a>
            <a href="#demo" className="gradient-cta px-4 py-2 rounded-md text-white font-medium hover:scale-105 transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-neon">Join Challenge</a>
          </div>

          <button className="md:hidden p-2 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-neon" aria-label="Toggle navigation menu" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-white">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav className="md:hidden bg-black/95 border-t border-white/10" aria-label="Mobile Navigation">
          <div className="px-4 py-3 flex flex-col gap-2">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setOpen(false)} className="py-2 text-gray-200 hover:text-white hover:bg-white/5 rounded transition focus:outline-none focus-visible:ring-2 focus-visible:ring-neon">
                {item.label}
              </a>
            ))}
            <div className="flex gap-2 pt-2">
              <a href="https://github.com/example/exohunter-ai" target="_blank" rel="noreferrer" className="flex-1 px-3 py-2 border border-white/20 rounded-md text-center hover:bg-white/10 transition">GitHub</a>
              <a href="#demo" className="flex-1 gradient-cta px-3 py-2 rounded-md text-center text-white font-medium hover:scale-[1.02] transition-transform">Join</a>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}

