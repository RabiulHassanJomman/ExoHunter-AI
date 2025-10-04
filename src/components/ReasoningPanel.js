import React from 'react';

/**
 * ReasoningPanel
 * Compact, accessible panel that displays the model's verdict,
 * confidence, and a richly formatted reasoning section.
 */
export default function ReasoningPanel({
  classification,
  confidence, // 0..1 or 0..100
  onClose,
  children,
}) {
  const percent = Math.round(confidence > 1 ? confidence : confidence * 100);
  const label =
    classification === 'confirmed'
      ? 'Exoplanet'
      : classification === 'candidate'
      ? 'Planetary Candidate'
      : 'False Positive';

  const pillColor =
    classification === 'confirmed'
      ? 'bg-green-400/20 text-green-300 border-green-400/30'
      : classification === 'candidate'
      ? 'bg-yellow-400/20 text-yellow-300 border-yellow-400/30'
      : 'bg-red-400/20 text-red-300 border-red-400/30';

  return (
    <section
      aria-label="Model reasoning"
      className="mt-8 rounded-2xl border border-white/10 bg-black/60 shadow-neon overflow-hidden"
    >
      <header className="flex items-center justify-between gap-4 px-6 py-4 border-b border-white/10">
        <div className="flex items-center gap-3 flex-wrap">
          <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${pillColor}`}>
            Verdict: {label}
          </span>
          <span className="text-sm text-gray-300">
            <span className="text-white font-semibold">Confidence:</span> {percent}%
          </span>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="text-xs font-semibold tracking-wide uppercase px-3 py-2 rounded-md border border-white/20 bg-white/5 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-neon"
          aria-label="Close reasoning"
        >
          Close Reasoning
        </button>
      </header>

      <div className="px-6 py-5">
        <h3 className="text-white font-semibold mb-3">Reasoning:</h3>
        <div className="max-w-none text-sm leading-6 text-gray-300 space-y-4">
          {children}
        </div>
      </div>

      <footer className="px-6 py-4 border-t border-white/10 text-[11px] text-gray-500">
        Copyright © 2025 OrbitSix. All rights reserved.
      </footer>
    </section>
  );
}
