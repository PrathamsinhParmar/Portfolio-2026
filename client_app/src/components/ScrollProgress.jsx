import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * ScrollProgress Indicator
 * Uses Framer Motion's useScroll and useSpring for heavily optimized native scroll tracking
 * Creates a sticky progress bar tracking window depth.
 */
const ScrollProgress = () => {
  // Extract purely normalized scroll progress (0.0 to 1.0)
  const { scrollYProgress } = useScroll();
  
  // Pass it through a physics spring to avoid harsh jerking and guarantee silky smooth fill
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] bg-accent1 origin-[0%] z-[99999]"
      style={{ 
        scaleX,
        boxShadow: '0 0 10px rgba(204, 255, 0, 0.8), 0 0 20px rgba(204, 255, 0, 0.4)' 
      }}
    />
  );
};

export default ScrollProgress;
