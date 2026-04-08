import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

import CustomCursor from './components/CustomCursor';
import MaskEffect   from './components/MaskEffect';
import SmoothScroll from './components/SmoothScroll';
import ScrollProgress from './components/ScrollProgress';
import { ReactLenis } from '@studio-freight/react-lenis';

function App() {
  return (
    <ReactLenis root options={{ lerp: 0.05, duration: 1.5, smoothTouch: false }}>
      <Router>
        <ScrollProgress />
        <SmoothScroll />
        <CustomCursor />
        <MaskEffect />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </ReactLenis>
  );
}

export default App;
