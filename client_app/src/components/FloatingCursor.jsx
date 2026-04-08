import React from 'react';
import { motion } from 'framer-motion';

const FloatingCursor = ({ color = "#FF0055", label = "Visitor", className = "", style = {}, delay = 0 }) => {
  return (
    <motion.div
      className={`absolute z-40 pointer-events-none drop-shadow-xl ${className}`}
      style={style}
      animate={{
        y: [0, -45, 10, 0],
        x: [0, 35, -15, 0],
      }}
      transition={{
        duration: 7,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
        delay: delay,
      }}
    >
      <div className="relative flex flex-col items-start">
        {/* Cursor SVG */}
        <svg 
          viewBox="0 0 32 32" 
          width="32" 
          height="32" 
          fill={color} 
          stroke="white" 
          strokeWidth="1.2"
          className="relative -left-2 -top-2"
          style={{ filter: 'drop-shadow(0px 4px 5px rgba(0,0,0,0.4))' }}
        >
          <path d="M5.5 3.5L25 15L15 16L11.5 25L5.5 3.5Z" strokeLinejoin="miter"/>
        </svg>
        
        {/* Name Pill */}
        <div 
          className="px-4 py-1.5 text-sm font-semibold text-white rounded-full whitespace-nowrap -mt-2 ml-4 shadow-lg tracking-wide"
          style={{ backgroundColor: color, fontFamily: '"Inter", sans-serif' }}
        >
          {label}
        </div>
      </div>
    </motion.div>
  );
};

export default FloatingCursor;
