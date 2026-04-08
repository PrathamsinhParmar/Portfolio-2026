import React, { useEffect, useState, useRef } from 'react';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);

  const [isHovering, setIsHovering] = useState(false);
  const [scrollSpeed, setScrollSpeed] = useState(0);

  useEffect(() => {
    // Hide on touch devices
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice) return;

    let requestRef;
    let dotX = window.innerWidth / 2;
    let dotY = window.innerHeight / 2;
    let cursorX = window.innerWidth / 2;
    let cursorY = window.innerHeight / 2;

    // Track mouse
    const onMouseMove = (e) => {
      dotX = e.clientX;
      dotY = e.clientY;
    };

    // Smooth follow loop
    const animate = () => {
      // Speed factor of cursor following (0.15 is smooth)
      cursorX += (dotX - cursorX) * 0.2;
      cursorY += (dotY - cursorY) * 0.2;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotX}px, ${dotY}px, 0)`;
      }
      
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
      }

      requestRef = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouseMove);
    requestRef = requestAnimationFrame(animate);

    // Hover state tracking
    const handleMouseOver = (e) => {
      if (e.target.closest('a, button, input, textarea, select, [role="button"], .group\\/btn')) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = (e) => {
      if (e.target.closest('a, button, input, textarea, select, [role="button"], .group\\/btn')) {
        setIsHovering(false);
      }
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    // Scroll state & parallax tracking
    let lastScrollY = window.scrollY;
    let timeoutId;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const speed = Math.abs(currentScrollY - lastScrollY);
      const scrollDiff = currentScrollY - lastScrollY;
      
      // Parallax effect: lag the trailing cursor on scroll
      cursorY += scrollDiff * 0.8; 
      
      setScrollSpeed(Math.min(speed, 50)); 
      lastScrollY = currentScrollY;

      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setScrollSpeed(0);
      }, 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(requestRef);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  const isTouchDevice = typeof window !== 'undefined' && window.matchMedia("(pointer: coarse)").matches;
  if (isTouchDevice) return null;

  return (
    <>
      <style>
        {`
          @media (pointer: fine) {
            body, a, button, input, textarea, select, [role="button"] {
              cursor: none !important;
            }
          }
        `}
      </style>
      
      {/* Outer trailing cursor container */}
      <div 
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] will-change-transform"
      >
        {/* Colorful Scroll Glow Effect */}
        <div 
          className="absolute -top-[40px] -left-[40px] w-[80px] h-[80px] rounded-full pointer-events-none transition-all duration-300 mix-blend-screen"
          style={{
            background: 'radial-gradient(circle, rgba(0,240,255,0.8) 0%, rgba(255,0,85,0.5) 40%, rgba(204,255,0,0.2) 70%, transparent 100%)',
            opacity: scrollSpeed > 5 ? Math.min(scrollSpeed * 0.02, 0.9) : 0,
            transform: `scale(${1 + Math.min(scrollSpeed * 0.015, 1.5)})`,
            filter: 'blur(15px)'
          }}
        />

        {/* Visual elements */}
        <div 
          className="absolute -top-[14px] -left-[14px] w-[28px] h-[28px] rounded-full border-2 transition-all duration-300 ease-out mix-blend-difference"
          style={{
            borderColor: isHovering ? '#CCFF00' : (scrollSpeed > 10 ? '#00f0ff' : '#aaaaaa'),
            backgroundColor: isHovering ? 'rgba(204, 255, 0, 0.2)' : 'transparent',
            transform: isHovering 
              ? 'scale(1.6)' 
              : `scale(${1 - Math.min(scrollSpeed * 0.01, 0.4)}) ` + (scrollSpeed > 0 ? 'skewY(' + Math.min(scrollSpeed, 20) + 'deg)' : ''),
            opacity: scrollSpeed > 0 ? 0.6 : 1
          }}
        />
      </div>
      
      {/* Inner dot container */}
      <div 
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[10000] will-change-transform"
      >
        <div 
          className="absolute -top-[4px] -left-[4px] w-[8px] h-[8px] bg-white rounded-full transition-all duration-300 mix-blend-difference"
          style={{
            opacity: isHovering ? 0 : 1,
            transform: isHovering ? 'scale(0)' : 'scale(1)',
          }}
        />
      </div>
    </>
  );
};

export default CustomCursor;
