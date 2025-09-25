# ExoHunter AI 🚀

An AI-powered exoplanet detection web application built for NASA Space Apps Challenge. This application demonstrates machine learning techniques for identifying and classifying exoplanets from light curve data obtained from NASA's Kepler, K2, and TESS missions.

## 🌟 Features

### Three-Category Classification System

- **🟢 Confirmed Exoplanets**: High-confidence detections with strong transit signatures
- **🟡 Planetary Candidates**: Moderate-confidence detections requiring additional validation
- **🔴 False Positives**: Signals likely caused by instrumental noise or stellar activity

### Interactive Demo

- Upload your own light curve data (CSV/JSON format)
- Analyze sample datasets from Kepler and TESS missions
- Real-time visualization of light curves using Plotly.js
- ML model classification with confidence scores
- Estimated planetary parameters (orbital period, radius)

### Performance Metrics

- Model accuracy visualization with Chart.js
- Detailed confusion matrix for classification analysis
- Recent classifications dashboard
- Feature importance display (ready for real ML integration)

## 🛠️ Technology Stack

### Frontend

- **React** - Component-based UI framework
- **Tailwind CSS** - Utility-first CSS framework for styling
- **Chart.js** - Interactive charts for data visualization
- **Plotly.js** - Scientific plotting for light curve display
- **Three.js** - 3D graphics for planet visualization
- **AOS (Animate On Scroll)** - Smooth scroll animations

### Data Processing

- **JavaScript** - Light curve analysis and feature extraction
- **Mock ML Pipeline** - Simulates real exoplanet detection algorithms
- **NASA-compatible data formats** - FITS file support ready for integration

## 📁 Project Structure

```
ExoHunter-AI/
├── public/
│   ├── index.html          # Main HTML template
│   └── assets/             # Static assets
├── src/
│   ├── components/         # React components
│   │   ├── Header.js       # Navigation header
│   │   ├── Hero.js         # Landing section
│   │   ├── About.js        # Project description
│   │   ├── HowItWorks.js   # Methodology explanation
│   │   ├── Demo.js         # Interactive analysis demo
│   │   ├── Results.js      # Performance metrics display
│   │   ├── TeamContact.js  # Team member information
│   │   └── Footer.js       # Site footer
│   ├── utils/
│   │   └── mockData.js     # Sample datasets and configurations
│   ├── App.js              # Main application component
│   ├── index.js            # Application entry point
│   └── index.css           # Global styles and Tailwind imports
├── package.json            # Dependencies and scripts
└── README.md              # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/ExoHunter-AI.git
   cd ExoHunter-AI
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to view the application

### Build for Production

```bash
npm run build
```

## 📊 Data Formats

### Light Curve Data

The application accepts light curve data in two formats:

**JSON Format:**

```json
{
  "name": "Sample Light Curve",
  "time": [0.0, 0.02, 0.04, ...],
  "flux": [1.0, 0.999, 1.001, ...]
}
```

**CSV Format:**

```csv
time,flux
0.0,1.0
0.02,0.999
0.04,1.001
...
```

### Classification Results

```javascript
{
  classification: "confirmed" | "candidate" | "false_positive",
  confidence: 0.95,           // Confidence score (0-1)
  period: 112.3,              // Orbital period in days
  radius: 1.34                // Planet radius in Earth radii
}
```

## 🎯 ML Model Integration

The application is designed to easily integrate with real machine learning models:

### Current Mock Implementation

- Analyzes flux variation and transit depth
- Applies decision tree logic for classification
- Generates realistic confidence scores
- Estimates physical parameters

### Ready for Real ML

- Feature extraction pipeline prepared
- Model endpoint structure defined
- Performance monitoring built-in
- Scalable for large datasets

### Integration Points

1. **Replace `mockAnalyze()` function** in `src/components/Demo.js`
2. **Update data preprocessing** in light curve analysis
3. **Connect to ML model API** endpoints
4. **Integrate with NASA data archives** (MAST)

## 👥 Team

- **Md. Abrar Fairuj Raiyan** - ML Engineer
- **Afif Al Hasnain** - Data Scientist
- **MD. Jomman** - Backend Developer
- **Farabi** - Frontend Developer
- **Hasan Md Arik** - UX Designer
- **Md Abrar Zahin Antor** - Software Engineer

## 🔬 Scientific Background

### Exoplanet Detection Methods

- **Transit Photometry**: Detecting periodic dimming of stars
- **Light Curve Analysis**: Processing time-series flux measurements
- **Signal Processing**: Removing systematic noise and trends
- **Statistical Classification**: ML-based signal validation

### NASA Missions Integration

- **Kepler Mission**: High-precision photometry of 200,000+ stars
- **K2 Mission**: Extended Kepler observations across sky
- **TESS Mission**: All-sky exoplanet survey with 2-minute cadence

## 📈 Performance Metrics

The application tracks several key performance indicators:

- **Accuracy**: Overall classification correctness
- **Precision**: True positive rate for each class
- **Recall**: Sensitivity for detecting real planets
- **F1-Score**: Harmonic mean of precision and recall
- **Confusion Matrix**: Detailed error analysis

## 🛡️ Browser Compatibility

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **NASA Space Apps Challenge** for the opportunity and datasets
- **NASA Exoplanet Archive** for providing open-source data
- **Kepler, K2, and TESS teams** for revolutionary space missions
- **Open-source community** for the amazing tools and libraries

## 🤝 Contributing

We welcome contributions to improve ExoHunter AI! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Contact

For questions about this project, please reach out to our team through the application's interface or create an issue on GitHub.

---

**Built with ❤️ for NASA Space Apps Challenge 2025**
