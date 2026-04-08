import { useEffect } from 'react';

// Custom easing function: easeOutQuart
// Begins fast and heavily decelerates towards the end of the scroll
const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

const SmoothScroll = () => {
  useEffect(() => {
    // Media query to respect OS-level motion reduction settings for accessibility
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    const handleAnchorClick = (e) => {
      // Intercept any click on an anchor link pointing to an internal ID (#...)
      const target = e.target.closest('a[href^="#"]');
      if (!target) return;
      
      const targetId = target.getAttribute('href');
      // Ignore empty hashes or route-handling variants
      if (targetId === '#' || !targetId.startsWith('#')) return;

      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        e.preventDefault();
        
        // Update URL state gracefully without triggering jump
        window.history.pushState(null, null, targetId);

        // Fall back to instant jumping if users prefer reduced motion
        if (prefersReducedMotion.matches) {
          window.scrollTo(0, targetElement.offsetTop - 100);
          return;
        }

        const startY = window.scrollY;
        // Calculate absolute position from top of document
        const elementY = targetElement.getBoundingClientRect().top + startY;
        
        // Fixed Navbar offset (subtracting ~100px so content doesn't hide behind header)
        const targetY = elementY - 100; 
        const distance = targetY - startY;
        
        // Target scroll duration inside the engine
        const duration = 1000;
        let start = null;

        const animation = (currentTime) => {
          if (start === null) start = currentTime;
          const timeElapsed = currentTime - start;
          
          let progress = timeElapsed / duration;
          if (progress > 1) progress = 1;

          // Apply easing math to standard time progress
          const easeProgress = easeOutQuart(progress);

          window.scrollTo(0, startY + distance * easeProgress);

          if (progress < 1) {
            requestAnimationFrame(animation);
          }
        };

        requestAnimationFrame(animation);
      }
    };

    // Attach to document to delegate all clicks across all components cleanly
    document.addEventListener('click', handleAnchorClick);

    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  return null;
};

export default SmoothScroll;
