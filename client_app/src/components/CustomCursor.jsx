import React, { useEffect, useState, useRef } from 'react';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);
  const trailsRef = useRef([]);

  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [scrollSpeed, setScrollSpeed] = useState(0);
  const [moveSpeed, setMoveSpeed] = useState(0);

  useEffect(() => {
    // Hide on touch devices
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice) return;

    let requestRef;
    let dotX = window.innerWidth / 2;
    let dotY = window.innerHeight / 2;
    let cursorX = window.innerWidth / 2;
    let cursorY = window.innerHeight / 2;
    
    // Trail history array
    let history = [];

    // Track mouse
    const onMouseMove = (e) => {
      dotX = e.clientX;
      dotY = e.clientY;
    };

    // Smooth follow loop
    const animate = () => {
      const dx = dotX - cursorX;
      const dy = dotY - cursorY;
      
      // Calculate speed for glow intensification
      const speed = Math.sqrt(dx * dx + dy * dy);
      
      cursorX += dx * 0.2;
      cursorY += dy * 0.2;

      // Update inner dot
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotX}px, ${dotY}px, 0)`;
      }
      
      // Update outer stroke
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
        // Dynamic box shadow based on raw trailing distance (mouse speed factor)
        const glowIntensity = Math.min(speed / 20, 1);
        cursorRef.current.style.boxShadow = `0 0 ${10 + glowIntensity * 10}px rgba(0,240,255,${0.4 + glowIntensity * 0.4}), inset 0 0 ${5 + glowIntensity * 5}px rgba(0,240,255,${0.2 + glowIntensity * 0.3})`;
      }

      // Update Trails
      history.unshift({ x: dotX, y: dotY });
      if (history.length > 20) {
        history.length = 20;
      }

      trailsRef.current.forEach((trail, index) => {
        const point = history[index * 2] || history[history.length - 1];
        if (point && trail) {
          trail.style.transform = `translate3d(${point.x}px, ${point.y}px, 0) scale(${1 - index * 0.1})`;
          // Only show trail when not hovering over buttons to keep it clean, or always show.
        }
      });

      requestRef = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouseMove);
    requestRef = requestAnimationFrame(animate);

    // Interaction tracking
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
    
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

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
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
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
          @keyframes cursor-breathe {
            0% { filter: drop-shadow(0 0 2px rgba(0,240,255,0.4)); }
            50% { filter: drop-shadow(0 0 8px rgba(0,240,255,0.8)); }
            100% { filter: drop-shadow(0 0 2px rgba(0,240,255,0.4)); }
          }
          .breathe-animation {
            animation: cursor-breathe 2.5s infinite ease-in-out;
          }
        `}
      </style>
      
      {/* Trails mapping */}
      {[...Array(10)].map((_, i) => (
        <div
          key={i}
          ref={(el) => (trailsRef.current[i] = el)}
          className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9998] mix-blend-screen transition-opacity duration-300"
          style={{
            marginLeft: '-4px',
            marginTop: '-4px',
            background: `rgba(${isHovering ? '204,255,0' : '0,240,255'}, ${0.6 - i * 0.05})`,
            boxShadow: `0 0 ${4 + i}px rgba(${isHovering ? '204,255,0' : '0,240,255'}, ${0.6 - i * 0.05})`,
            opacity: isClicking ? 0 : 1
          }}
        />
      ))}

      {/* Outer trailing cursor container */}
      <div 
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] will-change-transform"
      >
        {/* Colorful Scroll Glow Effect */}
        <div 
          className="absolute -top-[40px] -left-[40px] w-[80px] h-[80px] rounded-full pointer-events-none transition-all duration-300 mix-blend-screen"
          style={{
            background: isHovering 
                ? 'radial-gradient(circle, rgba(204,255,0,0.6) 0%, rgba(0,240,255,0.4) 50%, transparent 100%)' 
                : 'radial-gradient(circle, rgba(0,240,255,0.8) 0%, rgba(255,0,85,0.5) 40%, rgba(204,255,0,0.2) 70%, transparent 100%)',
            opacity: scrollSpeed > 5 || isHovering || isClicking ? 0.9 : 0,
            transform: `scale( ${isClicking ? 1.8 : 1 + Math.min(scrollSpeed * 0.015, 1.5)} )`,
            filter: 'blur(15px)'
          }}
        />

        {/* Visual elements */}
        <div 
          className="absolute -top-[14px] -left-[14px] w-[28px] h-[28px] rounded-full border-2 transition-all duration-300 ease-out mix-blend-screen breathe-animation"
          style={{
            borderColor: isHovering ? '#CCFF00' : (isClicking ? '#FF0055' : '#00f0ff'),
            backgroundColor: isHovering ? 'rgba(204, 255, 0, 0.15)' : (isClicking ? 'rgba(255, 0, 85, 0.3)' : 'transparent'),
            transform: isHovering 
              ? 'scale(1.6)' 
              : isClicking 
                 ? 'scale(0.8)'
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
            opacity: isHovering || isClicking ? 0 : 1,
            transform: isHovering || isClicking ? 'scale(0)' : 'scale(1)',
            boxShadow: '0 0 10px #fff'
          }}
        />
      </div>
    </>
  );
};

export default CustomCursor;
