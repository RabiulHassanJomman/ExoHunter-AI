export const sampleLightCurve = {
  name: 'Sample Kepler Data 1',
  // Simplified time in days and normalized flux values
  time: Array.from({ length: 200 }, (_, i) => i * 0.02),
  flux: (() => {
    const base = 1.0;
    const arr = [];
    for (let i = 0; i < 200; i++) {
      // Introduce a transit dip around t=2.0-2.6
      const t = i * 0.02;
      const noise = (Math.random() - 0.5) * 0.0025;
      let value = base + noise;
      if (t > 2.0 && t < 2.6) {
        value -= 0.05 * Math.cos(((t - 2.3) / 0.3) * Math.PI);
      }
      arr.push(parseFloat(value.toFixed(5)));
    }
    return arr;
  })(),
};

export const sampleLightCurve2 = {
  name: 'Sample TESS Data 2',
  time: Array.from({ length: 180 }, (_, i) => i * 0.025),
  flux: (() => {
    const base = 1.0;
    const arr = [];
    for (let i = 0; i < 180; i++) {
      const t = i * 0.025;
      const noise = (Math.random() - 0.5) * 0.0035;
      let value = base + noise;
      if (t > 1.5 && t < 1.9) {
        value -= 0.035 * Math.cos(((t - 1.7) / 0.2) * Math.PI);
      }
      arr.push(parseFloat(value.toFixed(5)));
    }
    return arr;
  })(),
};

export const galleryImages = [
  'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=1400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1447433819943-74a20887a81e?q=80&w=1400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1462331321792-cc44368b8894?q=80&w=1400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?q=80&w=1400&auto=format&fit=crop',
];

export const confusionMatrix = {
  labels: ['Positive', 'Negative'],
  matrix: [
    [88, 7], // TP, FN
    [6, 99], // FP, TN
  ],
};

