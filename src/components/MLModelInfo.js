import { useState } from 'react';

const modelArchitectures = [
  {
    name: 'Random Forest Ensemble',
    type: 'Traditional ML',
    accuracy: 92.3,
    precision: 89.7,
    recall: 94.1,
    features: 23,
    description: 'Ensemble of 500 decision trees trained on hand-crafted features from light curve analysis.',
    pros: ['Interpretable results', 'Fast inference', 'Robust to outliers', 'Good with tabular data'],
    cons: ['Limited feature learning', 'Manual feature engineering required'],
    trainingData: '150,000 labeled examples from Kepler catalog'
  },
  {
    name: 'Convolutional Neural Network',
    type: 'Deep Learning',
    accuracy: 94.8,
    precision: 93.2,
    recall: 96.1,
    features: 'Raw time series',
    description: '1D CNN with attention mechanism for direct processing of light curve time series.',
    pros: ['Automatic feature learning', 'Captures temporal patterns', 'High accuracy', 'End-to-end training'],
    cons: ['Black box model', 'Requires more data', 'Computational intensive'],
    trainingData: '500,000 light curves with data augmentation'
  },
  {
    name: 'Transformer-based',
    type: 'Deep Learning',
    accuracy: 96.1,
    precision: 95.4,
    recall: 97.2,
    features: 'Multi-modal input',
    description: 'Transformer architecture processing both light curves and stellar parameters.',
    pros: ['State-of-the-art accuracy', 'Handles variable length sequences', 'Multi-modal fusion'],
    cons: ['Very complex', 'Requires large datasets', 'High computational cost'],
    trainingData: '1M+ examples from Kepler, K2, TESS missions'
  }
];

const trainingDatasets = [
  {
    mission: 'Kepler',
    duration: '2009-2017',
    targets: '200,000+ stars',
    confirmed: '2,662 exoplanets',
    candidates: '4,034 candidates',
    dataPoints: '150,000 labeled light curves',
    cadence: '29.4 minutes (long), 1 minute (short)',
    coverage: 'Continuous monitoring of Cygnus constellation'
  },
  {
    mission: 'K2',
    duration: '2014-2018',
    targets: '500,000+ stars',
    confirmed: '479 exoplanets',
    candidates: '1,100+ candidates',
    dataPoints: '50,000 labeled light curves',
    cadence: '29.4 minutes',
    coverage: 'Multiple fields across the sky'
  },
  {
    mission: 'TESS',
    duration: '2018-present',
    targets: '200,000+ stars',
    confirmed: '300+ exoplanets',
    candidates: '5,000+ candidates',
    dataPoints: '100,000+ labeled light curves',
    cadence: '2 minutes (priority), 30 minutes (full frame)',
    coverage: 'All-sky survey'
  }
];

const processingPipeline = [
  {
    stage: 'Data Preprocessing',
    steps: [
      'Download FITS files from NASA archives (MAST)',
      'Apply quality flags and remove corrupted data',
      'Normalize flux values and handle missing data',
      'Remove systematic trends using Savitzky-Golay filtering'
    ]
  },
  {
    stage: 'Feature Engineering',
    steps: [
      'Extract statistical features (mean, variance, skewness, kurtosis)',
      'Calculate transit-specific features (depth, duration, period)',
      'Perform Box Least Squares (BLS) period search',
      'Compute stellar activity indicators and centroid motion'
    ]
  },
  {
    stage: 'Signal Processing',
    steps: [
      'Apply matched filtering for transit detection',
      'Phase fold light curves on detected periods',
      'Calculate signal-to-noise ratios',
      'Perform secondary eclipse searches'
    ]
  },
  {
    stage: 'Machine Learning',
    steps: [
      'Split data into training/validation/test sets (60/20/20)',
      'Train ensemble of classifiers with cross-validation',
      'Optimize hyperparameters using grid search',
      'Evaluate performance using confusion matrix and ROC curves'
    ]
  }
];

export default function MLModelInfo() {
  const [activeModel, setActiveModel] = useState(0);
  const [activeTab, setActiveTab] = useState('models');

  return (
    <section id="ml-models" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black/0 to-black/50">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-orbitron text-3xl sm:text-4xl text-center text-white mb-4">
          ML Model Architecture
        </h2>
        <p className="text-gray-300 text-center mb-12 max-w-3xl mx-auto">
          Our exoplanet detection system employs state-of-the-art machine learning techniques 
          trained on NASA's comprehensive datasets from multiple space missions.
        </p>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {['models', 'datasets', 'pipeline'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === tab
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-400/30'
                  : 'bg-black/30 text-gray-400 border border-white/10 hover:text-white hover:border-white/20'
              }`}
            >
              {tab === 'models' ? 'Model Architectures' :
               tab === 'datasets' ? 'Training Datasets' : 'Processing Pipeline'}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-black/50 rounded-2xl border border-white/10 p-8">
          {activeTab === 'models' && (
            <div>
              {/* Model Selector */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {modelArchitectures.map((model, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveModel(index)}
                    className={`p-4 rounded-lg border text-left transition-all ${
                      activeModel === index
                        ? 'bg-cyan-500/20 border-cyan-400/50'
                        : 'bg-black/30 border-white/10 hover:border-white/20'
                    }`}
                  >
                    <h3 className="text-white font-semibold mb-2">{model.name}</h3>
                    <div className="text-xs text-gray-400 mb-2">{model.type}</div>
                    <div className="text-sm text-cyan-400 font-mono">
                      {model.accuracy}% accuracy
                    </div>
                  </button>
                ))}
              </div>

              {/* Model Details */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xl font-semibold text-white mb-4">
                    {modelArchitectures[activeModel].name}
                  </h4>
                  <p className="text-gray-300 mb-6">
                    {modelArchitectures[activeModel].description}
                  </p>

                  <div className="space-y-4">
                    <div>
                      <h5 className="text-green-400 font-medium mb-2">Advantages</h5>
                      <ul className="space-y-1">
                        {modelArchitectures[activeModel].pros.map((pro, i) => (
                          <li key={i} className="text-gray-300 text-sm flex items-center gap-2">
                            <div className="w-1 h-1 bg-green-400 rounded-full"></div>
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h5 className="text-yellow-400 font-medium mb-2">Limitations</h5>
                      <ul className="space-y-1">
                        {modelArchitectures[activeModel].cons.map((con, i) => (
                          <li key={i} className="text-gray-300 text-sm flex items-center gap-2">
                            <div className="w-1 h-1 bg-yellow-400 rounded-full"></div>
                            {con}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h5 className="text-white font-medium mb-3">Performance Metrics</h5>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { label: 'Accuracy', value: modelArchitectures[activeModel].accuracy, color: 'text-green-400' },
                        { label: 'Precision', value: modelArchitectures[activeModel].precision, color: 'text-blue-400' },
                        { label: 'Recall', value: modelArchitectures[activeModel].recall, color: 'text-purple-400' },
                        { label: 'F1-Score', value: ((2 * modelArchitectures[activeModel].precision * modelArchitectures[activeModel].recall) / (modelArchitectures[activeModel].precision + modelArchitectures[activeModel].recall)).toFixed(1), color: 'text-cyan-400' }
                      ].map(({ label, value, color }) => (
                        <div key={label} className="bg-black/30 rounded-lg p-3">
                          <div className="text-gray-400 text-xs">{label}</div>
                          <div className={`text-lg font-bold ${color}`}>{value}%</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h5 className="text-white font-medium mb-3">Training Details</h5>
                    <div className="bg-black/30 rounded-lg p-4 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Features:</span>
                        <span className="text-white">{modelArchitectures[activeModel].features}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Training Data:</span>
                        <span className="text-white text-sm">{modelArchitectures[activeModel].trainingData}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'datasets' && (
            <div className="space-y-8">
              {trainingDatasets.map((dataset, index) => (
                <div key={index} className="bg-black/30 rounded-lg p-6 border border-white/10">
                  <div className="flex items-center gap-4 mb-4">
                    <h3 className="text-xl font-semibold text-white">{dataset.mission} Mission</h3>
                    <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm">
                      {dataset.duration}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-400">{dataset.confirmed}</div>
                      <div className="text-xs text-gray-400">Confirmed Planets</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-400">{dataset.candidates}</div>
                      <div className="text-xs text-gray-400">Candidates</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-cyan-400">{dataset.targets}</div>
                      <div className="text-xs text-gray-400">Stars Observed</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-400">{dataset.dataPoints}</div>
                      <div className="text-xs text-gray-400">Training Examples</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Observing Cadence:</span>
                      <span className="ml-2 text-white">{dataset.cadence}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Sky Coverage:</span>
                      <span className="ml-2 text-white">{dataset.coverage}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'pipeline' && (
            <div className="space-y-6">
              {processingPipeline.map((stage, index) => (
                <div key={index} className="bg-black/30 rounded-lg p-6 border border-white/10">
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
                    <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center text-black font-bold">
                      {index + 1}
                    </div>
                    {stage.stage}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {stage.steps.map((step, stepIndex) => (
                      <div key={stepIndex} className="flex items-start gap-3 p-3 bg-black/40 rounded-lg">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-300 text-sm">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
