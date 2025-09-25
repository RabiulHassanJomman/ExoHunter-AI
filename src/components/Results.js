/* global Chart */
import { useEffect, useRef } from 'react';
import { confusionMatrix, samplePredictions } from '../utils/mockData';

/**
 * Results Component - Displays ML model performance metrics and classification results
 * 
 * This component shows:
 * - Classification summary (confirmed, candidate, false positive counts)
 * - Model accuracy visualization using Chart.js doughnut chart
 * - Confusion matrix table for detailed performance analysis
 * - Recent classifications list with confidence scores
 */
export default function Results() {
  // Reference to canvas element for Chart.js doughnut chart
  const doughnutRef = useRef(null);

  /**
   * Initialize Chart.js doughnut chart for accuracy visualization
   * Calculates accuracy from confusion matrix diagonal elements
   */
  useEffect(() => {
    // Ensure canvas element and Chart.js library are available
    if (!doughnutRef.current || !window.Chart) return;
    
    const ctx = doughnutRef.current.getContext('2d');
    
    // Calculate overall accuracy from confusion matrix diagonal elements
    // Diagonal elements represent correct predictions (true positives for each class)
    const totalCorrect = confusionMatrix.matrix[0][0] + confusionMatrix.matrix[1][1] + confusionMatrix.matrix[2][2];
    const totalSamples = confusionMatrix.matrix.flat().reduce((a, b) => a + b, 0);
    const accuracy = Math.round((totalCorrect / totalSamples) * 100);
    
    // Create doughnut chart showing accuracy vs error rate
    const chart = new window.Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Accuracy', 'Error'],
        datasets: [
          { 
            data: [accuracy, 100 - accuracy], 
            backgroundColor: ['#10B981', 'rgba(255,255,255,0.1)'], // Green for accuracy, transparent for error
            borderWidth: 0 
          },
        ],
      },
      options: { 
        plugins: { 
          legend: { labels: { color: '#D3D3D3' } } 
        }, 
        cutout: '70%' // Creates donut hole for displaying accuracy percentage
      },
    });
    
    // Cleanup function to destroy chart when component unmounts
    return () => chart.destroy();
  }, []);

  return (
    <section id="results" className="relative py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto" data-aos="fade-up">
        <h2 className="font-orbitron text-3xl sm:text-4xl text-center text-white mb-10">Our Results</h2>

        {/* Classification Summary Cards - Shows count of each classification type */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Confirmed Exoplanets Card */}
          <div className="bg-black/50 rounded-xl border border-green-400/20 p-6 text-center">
            <div className="w-4 h-4 bg-green-400 rounded-full mx-auto mb-3"></div>
            <div className="text-2xl font-bold text-green-400 mb-1">
              {/* Count confirmed exoplanets from sample predictions */}
              {samplePredictions.filter(p => p.classification === 'confirmed').length}
            </div>
            <div className="text-sm text-gray-300">Confirmed Exoplanets</div>
          </div>
          
          {/* Planetary Candidates Card */}
          <div className="bg-black/50 rounded-xl border border-yellow-400/20 p-6 text-center">
            <div className="w-4 h-4 bg-yellow-400 rounded-full mx-auto mb-3"></div>
            <div className="text-2xl font-bold text-yellow-400 mb-1">
              {/* Count candidate planets from sample predictions */}
              {samplePredictions.filter(p => p.classification === 'candidate').length}
            </div>
            <div className="text-sm text-gray-300">Planetary Candidates</div>
          </div>
          
          {/* False Positives Card */}
          <div className="bg-black/50 rounded-xl border border-red-400/20 p-6 text-center">
            <div className="w-4 h-4 bg-red-400 rounded-full mx-auto mb-3"></div>
            <div className="text-2xl font-bold text-red-400 mb-1">
              {/* Count false positives from sample predictions */}
              {samplePredictions.filter(p => p.classification === 'false_positive').length}
            </div>
            <div className="text-sm text-gray-300">False Positives</div>
          </div>
        </div>

        {/* Main Results Grid - Three columns showing different metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Accuracy Visualization Column */}
          <div className="bg-black/50 rounded-xl border border-white/10 p-6">
            <h3 className="text-white font-semibold mb-4">Accuracy</h3>
            <div className="flex items-center justify-center">
              <div className="relative w-48 h-48">
                {/* Chart.js canvas for doughnut chart */}
                <canvas ref={doughnutRef} width="192" height="192" aria-label="Accuracy chart" role="img"></canvas>
                {/* Centered accuracy percentage text overlay */}
                <div className="absolute inset-0 flex items-center justify-center text-2xl font-semibold">
                  {/* Calculate and display accuracy percentage from confusion matrix */}
                  {Math.round((confusionMatrix.matrix[0][0] + confusionMatrix.matrix[1][1] + confusionMatrix.matrix[2][2]) / 
                   confusionMatrix.matrix.flat().reduce((a, b) => a + b, 0) * 100)}%
                </div>
              </div>
            </div>
          </div>

          {/* Confusion Matrix Column */}
          <div className="bg-black/50 rounded-xl border border-white/10 p-6 overflow-auto">
            <h3 className="text-white font-semibold mb-4">Confusion Matrix</h3>
            {/* 
              Confusion Matrix Table:
              - Rows represent actual classifications
              - Columns represent predicted classifications
              - Diagonal elements show correct predictions
              - Off-diagonal elements show misclassifications
            */}
            <table className="w-full text-sm text-gray-200 border-collapse" aria-label="Confusion matrix">
              <thead>
                <tr>
                  <th className="border border-white/10 p-2"> </th>
                  {/* Column headers for predicted classifications */}
                  {confusionMatrix.labels.map((l) => (
                    <th key={l} className="border border-white/10 p-2">Pred {l}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* Generate table rows for each actual classification */}
                {confusionMatrix.matrix.map((row, rowIdx) => (
                  <tr key={rowIdx}>
                    {/* Row header for actual classification */}
                    <th className="border border-white/10 p-2 text-left">Actual {confusionMatrix.labels[rowIdx]}</th>
                    {/* Data cells showing prediction counts */}
                    {row.map((val, colIdx) => (
                      <td key={colIdx} className="border border-white/10 p-2 text-center">{val}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Recent Classifications Column */}
          <div className="bg-black/50 rounded-xl border border-white/10 p-6">
            <h3 className="text-white font-semibold mb-4">Recent Classifications</h3>
            {/* Scrollable list of recent exoplanet classifications */}
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {samplePredictions.map((pred) => (
                <div key={pred.id} className="bg-black/30 rounded-lg p-3 border border-white/5">
                  {/* Classification header with color-coded indicator */}
                  <div className="flex items-center gap-2 mb-1">
                    {/* Color-coded dot based on classification type */}
                    <div className={`w-2 h-2 rounded-full ${
                      pred.classification === 'confirmed' ? 'bg-green-400' :
                      pred.classification === 'candidate' ? 'bg-yellow-400' : 'bg-red-400'
                    }`}></div>
                    <span className="text-white font-medium text-sm">{pred.name}</span>
                  </div>
                  
                  {/* Classification type and confidence score */}
                  <div className="text-xs text-gray-400 capitalize">
                    {pred.classification.replace('_', ' ')} ({Math.round(pred.confidence * 100)}% confidence)
                  </div>
                  
                  {/* Physical parameters (only shown for confirmed/candidate planets) */}
                  {pred.period && (
                    <div className="text-xs text-cyan-400 mt-1">
                      P: {pred.period}d • R: {pred.radius}R⊕
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

