import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { preloadCriticalResources, optimizeWebVitals } from './utils/seoOptimization.js'

// Initialize SEO optimizations
preloadCriticalResources();
optimizeWebVitals();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
