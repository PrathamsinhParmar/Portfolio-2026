import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Custom Magnetic Button Hook/Component logic inside Hero for proximity to the element
const MagneticButton = ({ children, className }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={`relative inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
};

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex flex-col justify-center px-6 relative overflow-visible pt-32 pb-20">

      <div className="container mx-auto max-w-[1400px] z-10">
        
        {/* Intro */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
          className="flex items-center gap-4 mb-8"
        >
          <div className="w-12 h-[1px] bg-foreground/30"></div>
          <p className="text-xl md:text-2xl font-medium tracking-tight text-foreground/80">
            Hello, I'm Prathamsinh Parmar
          </p>
        </motion.div>

        {/* Massive Text Layout aligned exactly like reference */}
        <div className="flex flex-col mb-16">
          
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.76, 0, 0.24, 1] }}
            className="self-start"
          >
            <h1 className="text-[12vw] sm:text-[10vw] md:text-[9vw] font-black leading-[0.85] tracking-[-0.04em] whitespace-nowrap">
              FULL STACK
            </h1>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="self-end md:mr-12 lg:mr-24"
          >
            <h1 className="text-[12vw] sm:text-[10vw] md:text-[9vw] font-black leading-[0.85] tracking-[-0.04em] whitespace-nowrap">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent2 via-accent3 to-accent1 drop-shadow-[0_0_15px_rgba(255,0,85,0.3)]">
                WEB DEVELOPER
              </span>
            </h1>
          </motion.div>

        </div>

        {/* Bottom Metadata & Button */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-12 mt-12 md:mt-24">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="max-w-2xl mt-12 mb-8 md:mt-24"
          >
            <p className="text-2xl md:text-3xl text-white/50 leading-[1.1] font-black tracking-tighter uppercase">
              ENGINEERING HIGH-PERFORMANCE <span className="text-white">FULL-STACK</span> APPLICATIONS. FOCUSED ON SCALABLE ARCHITECTURES AND <span className="text-accent2">HIGH-IMPACT</span> DIGITAL EXPERIENCES.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1, ease: [0.76, 0, 0.24, 1] }}
            className="pb-4"
          >
            <MagneticButton>
              <a 
                href="#contact" 
                className="w-32 h-32 md:w-40 md:h-40 rounded-full flex items-center justify-center overflow-hidden hover:scale-105 transition-all duration-300 group relative"
              >
                {/* Gradient Glow Background */}
                <div className="absolute inset-0 bg-gradient-to-tr from-accent2 via-accent3 to-accent1 blur-2xl opacity-40 group-hover:opacity-70 group-hover:scale-110 transition-all duration-500 animate-pulse" />
                
                {/* Main Photo */}
                <img 
                  src="/Pratham Latest Photo.jpeg" 
                  alt="Contact" 
                  className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110 relative z-10" 
                />
              </a>
            </MagneticButton>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default Hero;
