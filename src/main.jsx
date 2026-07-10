import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import CaseStudy from './componenets/CaseStudy.jsx'
import { preloadCriticalResources, optimizeWebVitals } from './utils/seoOptimization.js'

// Initialize SEO optimizations
preloadCriticalResources();
optimizeWebVitals();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/work/:slug" element={<CaseStudy />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
