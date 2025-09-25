// Realistic exoplanet data based on NASA's Kepler, K2, and TESS missions
// This simulates the kind of data that would come from a real ML model

export const nasaExoplanetCatalog = [
  {
    id: 'K-442b',
    keplerName: 'Kepler-442b',
    mission: 'Kepler',
    classification: 'confirmed',
    confidence: 0.96,
    discoveryMethod: 'Transit',
    
    // Orbital parameters
    orbitalPeriod: 112.3053, // days
    transitDuration: 6.87, // hours
    timeOfTransit: 2454833.14583, // BJD
    impactParameter: 0.13,
    
    // Physical parameters
    planetRadius: 1.34, // Earth radii
    planetMass: null, // Earth masses (not always available)
    equilibriumTemp: 233, // Kelvin
    insolationFlux: 0.70, // relative to Earth
    
    // Stellar parameters
    stellarRadius: 0.61, // Solar radii
    stellarMass: 0.61, // Solar masses
    stellarTemp: 4402, // Kelvin
    stellarMagnitude: 14.76,
    
    // Detection metrics
    transitDepth: 0.00028, // relative flux decrease
    signalToNoise: 23.4,
    planetCandidateFlag: 1,
    
    coordinates: {
      ra: 294.14693, // degrees
      dec: 49.68672, // degrees
      distance: 1291 // parsecs
    }
  },
  {
    id: 'TOI-715.01',
    keplerName: 'TOI-715.01',
    mission: 'TESS',
    classification: 'candidate',
    confidence: 0.73,
    discoveryMethod: 'Transit',
    
    orbitalPeriod: 19.28517,
    transitDuration: 3.2,
    timeOfTransit: 2458353.2841,
    impactParameter: 0.47,
    
    planetRadius: 1.55,
    planetMass: null,
    equilibriumTemp: 374,
    insolationFlux: 2.73,
    
    stellarRadius: 0.70,
    stellarMass: 0.70,
    stellarTemp: 4800,
    stellarMagnitude: 12.18,
    
    transitDepth: 0.00041,
    signalToNoise: 15.2,
    planetCandidateFlag: 1,
    
    coordinates: {
      ra: 123.45678,
      dec: -12.34567,
      distance: 137
    }
  },
  {
    id: 'KIC-8462852',
    keplerName: 'KIC 8462852',
    mission: 'Kepler',
    classification: 'false_positive',
    confidence: 0.89,
    discoveryMethod: 'Transit',
    
    orbitalPeriod: null,
    transitDuration: null,
    timeOfTransit: null,
    impactParameter: null,
    
    planetRadius: null,
    planetMass: null,
    equilibriumTemp: null,
    insolationFlux: null,
    
    stellarRadius: 1.58,
    stellarMass: 1.43,
    stellarTemp: 6750,
    stellarMagnitude: 11.70,
    
    transitDepth: 0.22, // Unusual deep dimming - likely stellar activity
    signalToNoise: 1.2, // Very low SNR
    planetCandidateFlag: 0,
    
    coordinates: {
      ra: 301.5643971,
      dec: 44.4568869,
      distance: 454
    },
    notes: "Exhibits unusual dimming patterns consistent with dust clouds or stellar activity"
  },
  {
    id: 'TRAPPIST-1e',
    keplerName: 'TRAPPIST-1e',
    mission: 'K2',
    classification: 'confirmed',
    confidence: 0.97,
    discoveryMethod: 'Transit',
    
    orbitalPeriod: 6.099615,
    transitDuration: 0.73,
    timeOfTransit: 2457322.51736,
    impactParameter: 0.16,
    
    planetRadius: 0.91,
    planetMass: 0.62,
    equilibriumTemp: 251,
    insolationFlux: 0.66,
    
    stellarRadius: 0.121,
    stellarMass: 0.089,
    stellarTemp: 2559,
    stellarMagnitude: 18.80,
    
    transitDepth: 0.00367,
    signalToNoise: 28.7,
    planetCandidateFlag: 1,
    
    coordinates: {
      ra: 346.6223,
      dec: -5.0414,
      distance: 12.43
    }
  },
  {
    id: 'K2-18b',
    keplerName: 'K2-18b',
    mission: 'K2',
    classification: 'confirmed',
    confidence: 0.92,
    discoveryMethod: 'Transit',
    
    orbitalPeriod: 32.9396,
    transitDuration: 4.1,
    timeOfTransit: 2456811.5123,
    impactParameter: 0.24,
    
    planetRadius: 2.61,
    planetMass: 8.92,
    equilibriumTemp: 279,
    insolationFlux: 1.33,
    
    stellarRadius: 0.48,
    stellarMass: 0.52,
    stellarTemp: 3457,
    stellarMagnitude: 13.27,
    
    transitDepth: 0.00156,
    signalToNoise: 19.8,
    planetCandidateFlag: 1,
    
    coordinates: {
      ra: 165.1234,
      dec: 7.5890,
      distance: 34.46
    }
  }
];

// Feature importance for ML model (what the model considers most important)
export const featureImportance = [
  { feature: 'Transit Depth', importance: 0.23, description: 'Relative decrease in stellar brightness' },
  { feature: 'Signal-to-Noise Ratio', importance: 0.19, description: 'Quality of the transit signal' },
  { feature: 'Transit Duration', importance: 0.16, description: 'How long the transit lasts' },
  { feature: 'Orbital Period', importance: 0.14, description: 'Time between transits' },
  { feature: 'Impact Parameter', importance: 0.12, description: 'Transit geometry' },
  { feature: 'Stellar Properties', importance: 0.08, description: 'Host star characteristics' },
  { feature: 'Multi-transit Events', importance: 0.06, description: 'Number of observed transits' },
  { feature: 'Centroid Motion', importance: 0.02, description: 'Star position stability during transit' }
];

// Realistic light curve data with more sophisticated transit signals
export const keplerLightCurve = {
  name: 'Kepler-442b Light Curve',
  mission: 'Kepler',
  target: 'KIC 4138008',
  quarter: 'Q1-Q17',
  cadence: 'Long',
  time: (() => {
    const points = [];
    const baseTime = 120.0; // BJD - 2454833
    for (let i = 0; i < 2000; i++) {
      points.push(baseTime + i * 0.0204); // ~30 minute cadence
    }
    return points;
  })(),
  flux: (() => {
    const points = [];
    const period = 112.3053;
    const transitDuration = 6.87 / 24; // Convert hours to days
    const depth = 0.00028;
    
    for (let i = 0; i < 2000; i++) {
      const time = 120.0 + i * 0.0204;
      let flux = 1.0;
      
      // Add realistic noise (instrumental + stellar)
      const noise = (Math.random() - 0.5) * 0.0003;
      flux += noise;
      
      // Add stellar variability
      const stellarVar = 0.0001 * Math.sin(2 * Math.PI * time / 25.4); // ~25 day rotation
      flux += stellarVar;
      
      // Add transits
      const phase = (time % period) / period;
      if (phase > 0.5) phase = 1 - phase; // Mirror around 0.5
      
      if (Math.abs(phase) < (transitDuration / period / 2)) {
        // Realistic transit shape using limb darkening
        const ingress = transitDuration / period / 4;
        if (Math.abs(phase) < ingress) {
          // Ingress/egress
          const x = Math.abs(phase) / ingress;
          flux -= depth * (1 - Math.cos(Math.PI * x / 2));
        } else {
          // Flat bottom
          flux -= depth;
        }
      }
      
      points.push(parseFloat(flux.toFixed(6)));
    }
    return points;
  })()
};

export const tessLightCurve = {
  name: 'TOI-715.01 Light Curve',
  mission: 'TESS',
  target: 'TIC 271971130',
  sector: 'S01-S13',
  cadence: '2-minute',
  time: (() => {
    const points = [];
    const baseTime = 1325.0; // TESS BJD
    for (let i = 0; i < 1000; i++) {
      points.push(baseTime + i * (2.0 / 1440)); // 2-minute cadence
    }
    return points;
  })(),
  flux: (() => {
    const points = [];
    const period = 19.28517;
    const transitDuration = 3.2 / 24;
    const depth = 0.00041;
    
    for (let i = 0; i < 1000; i++) {
      const time = 1325.0 + i * (2.0 / 1440);
      let flux = 1.0;
      
      // TESS has different noise characteristics
      const noise = (Math.random() - 0.5) * 0.0002;
      flux += noise;
      
      // Add systematic trends (common in TESS data)
      const trend = -0.00001 * i / 1000; // Slight downward trend
      flux += trend;
      
      // Add transits
      const phase = (time % period) / period;
      if (Math.abs(phase - 0.5) < (transitDuration / period / 2)) {
        flux -= depth * (1 - 0.3 * Math.random()); // Add some variability
      }
      
      points.push(parseFloat(flux.toFixed(6)));
    }
    return points;
  })()
};

// Data processing pipeline steps
export const processingSteps = [
  {
    step: 1,
    name: 'Data Ingestion',
    description: 'Download and parse FITS files from NASA archives',
    status: 'completed',
    details: 'Processed 150,000 light curves from Kepler, K2, and TESS missions'
  },
  {
    step: 2,
    name: 'Quality Filtering',
    description: 'Remove corrupted data and apply quality flags',
    status: 'completed',
    details: 'Filtered out 12% of data due to quality issues'
  },
  {
    step: 3,
    name: 'Detrending',
    description: 'Remove systematic trends and stellar variability',
    status: 'completed',
    details: 'Applied Savitzky-Golay filter and polynomial detrending'
  },
  {
    step: 4,
    name: 'Transit Search',
    description: 'Box Least Squares (BLS) algorithm for period detection',
    status: 'completed',
    details: 'Identified 45,000 potential transit signals'
  },
  {
    step: 5,
    name: 'Feature Extraction',
    description: 'Calculate transit parameters and stellar properties',
    status: 'completed',
    details: 'Extracted 23 features per candidate'
  },
  {
    step: 6,
    name: 'ML Classification',
    description: 'Random Forest classifier with ensemble methods',
    status: 'in_progress',
    details: 'Training on labeled dataset of 10,000 examples'
  }
];
