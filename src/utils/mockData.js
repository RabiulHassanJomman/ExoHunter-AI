/**
 * Mock Data for ExoHunter AI Demo
 * 
 * This file contains sample datasets and configurations used throughout the application
 * for demonstrating exoplanet detection capabilities. In a production environment,
 * this would be replaced with real NASA mission data from MAST archives.
 */

/**
 * Sample Light Curve 1 - Kepler-style Data
 * Simulates a typical Kepler mission light curve with:
 * - 30-minute cadence (0.02 day intervals)
 * - Normalized flux measurements
 * - Single transit event around day 2.3
 * - Realistic noise levels (~0.25%)
 */
export const sampleLightCurve = {
  name: 'Sample Kepler Data 1',
  time: Array.from({ length: 200 }, (_, i) => i * 0.02), // Time array: 0 to 4 days
  flux: (() => {
    const base = 1.0; // Normalized flux baseline
    const arr = [];
    
    for (let i = 0; i < 200; i++) {
      const t = i * 0.02; // Current time point
      
      // Add realistic photometric noise (σ ≈ 0.25%)
      const noise = (Math.random() - 0.5) * 0.0025;
      let value = base + noise;
      
      // Simulate exoplanet transit: periodic dip in brightness
      if (t > 2.0 && t < 2.6) {
        // Transit depth of ~5% with smooth ingress/egress
        value -= 0.05 * Math.cos(((t - 2.3) / 0.3) * Math.PI);
      }
      
      arr.push(parseFloat(value.toFixed(5))); // Precision matching real data
    }
    return arr;
  })(),
};

/**
 * Sample Light Curve 2 - TESS-style Data
 * Simulates TESS mission observations with:
 * - 2-minute cadence (0.025 day intervals) 
 * - Higher noise levels typical of TESS
 * - Shallower transit (~3.5% depth)
 * - Shorter transit duration
 */
export const sampleLightCurve2 = {
  name: 'Sample TESS Data 2',
  time: Array.from({ length: 180 }, (_, i) => i * 0.025), // Time array: 0 to 4.5 days
  flux: (() => {
    const base = 1.0; // Normalized flux baseline
    const arr = [];
    
    for (let i = 0; i < 180; i++) {
      const t = i * 0.025; // Current time point
      
      // TESS typically has higher noise than Kepler (σ ≈ 0.35%)
      const noise = (Math.random() - 0.5) * 0.0035;
      let value = base + noise;
      
      // Simulate smaller planet transit with shorter duration
      if (t > 1.5 && t < 1.9) {
        // Shallower transit depth (~3.5%) with steeper ingress/egress
        value -= 0.035 * Math.cos(((t - 1.7) / 0.2) * Math.PI);
      }
      
      arr.push(parseFloat(value.toFixed(5))); // Match TESS precision
    }
    return arr;
  })(),
};

/**
 * Gallery Images for Visual Enhancement
 * Space-themed images from Unsplash for aesthetic purposes
 * These could be replaced with real exoplanet/space mission images
 */
export const galleryImages = [
  'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=1400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1447433819943-74a20887a81e?q=80&w=1400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1462331321792-cc44368b8894?q=80&w=1400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?q=80&w=1400&auto=format&fit=crop',
];

/**
 * Sample Exoplanet Classifications
 * Realistic examples based on actual NASA discoveries
 * Each entry represents a classified exoplanet candidate with:
 * - name: Standard astronomical designation
 * - classification: ML model prediction (confirmed/candidate/false_positive)
 * - confidence: Model confidence score (0-1)
 * - period: Orbital period in days (null for false positives)
 * - radius: Planet radius in Earth radii (null for false positives)
 */
export const samplePredictions = [
  { 
    id: 1, 
    name: 'Kepler-442b', 
    classification: 'confirmed', 
    confidence: 0.95, 
    period: 112.3, 
    radius: 1.34 
  },
  { 
    id: 2, 
    name: 'TOI-715.01', 
    classification: 'candidate', 
    confidence: 0.73, 
    period: 19.3, 
    radius: 1.55 
  },
  { 
    id: 3, 
    name: 'KIC-8462852', 
    classification: 'false_positive', 
    confidence: 0.89, 
    period: null, 
    radius: null 
  },
  { 
    id: 4, 
    name: 'TRAPPIST-1e', 
    classification: 'confirmed', 
    confidence: 0.97, 
    period: 6.1, 
    radius: 0.91 
  },
  { 
    id: 5, 
    name: 'K2-18b', 
    classification: 'confirmed', 
    confidence: 0.92, 
    period: 33.0, 
    radius: 2.61 
  },
  { 
    id: 6, 
    name: 'HD-219134b', 
    classification: 'candidate', 
    confidence: 0.68, 
    period: 3.1, 
    radius: 1.6 
  }
];

/**
 * Confusion Matrix for Model Performance Evaluation
 * 3x3 matrix showing classification performance:
 * - Rows: Actual classifications (ground truth)
 * - Columns: Predicted classifications (model output)
 * - Diagonal elements: Correct predictions
 * - Off-diagonal elements: Misclassifications
 * 
 * Matrix interpretation:
 * [0][0] = Confirmed correctly classified as Confirmed (42)
 * [0][1] = Confirmed incorrectly classified as Candidate (3)
 * [0][2] = Confirmed incorrectly classified as False Positive (2)
 * ... and so on
 */
export const confusionMatrix = {
  labels: ['Confirmed', 'Candidate', 'False Positive'],
  matrix: [
    [42, 3, 2],  // Actual: Confirmed → Predicted: [Confirmed, Candidate, False Positive]
    [4, 38, 5],  // Actual: Candidate → Predicted: [Confirmed, Candidate, False Positive]  
    [1, 2, 43],  // Actual: False Positive → Predicted: [Confirmed, Candidate, False Positive]
  ],
};

