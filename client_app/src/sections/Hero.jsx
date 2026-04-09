import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

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

import FloatingCursor from '../components/FloatingCursor';

const Hero = () => {
  const { scrollY } = useScroll();
  const yText1 = useTransform(scrollY, [0, 1000], [0, 150]);
  const yText2 = useTransform(scrollY, [0, 1000], [0, -100]);
  const yPhoto = useTransform(scrollY, [0, 1000], [0, 200]);

  return (
    <section id="home" className="min-h-screen flex flex-col justify-center px-6 relative overflow-visible pt-24 pb-16 md:pt-32 md:pb-20">

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
            Hello, I'm Prathamsinh Rajput
          </p>
        </motion.div>

        <div className="flex flex-col mb-12 md:mb-18 gap-2 md:gap-0 relative">
          
          {/* Animated 3D Floating Cursors */}
          <FloatingCursor color="#FF0055" label="Product" className="top-[-20px] md:top-[-60px] left-[30%] md:left-[45%]" delay={0} />
          <FloatingCursor color="#8B5CF6" label="Prathamsinh" className="top-[60%] right-[10%] md:right-[20%] hidden sm:block" delay={1.2} />
          <FloatingCursor color="#00f0ff" label="Dev" className="bottom-[-80px] md:bottom-[-60px] left-[10%] md:left-[5%]" delay={2.5} />
          
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.76, 0, 0.24, 1] }}
            className="w-full"
            style={{ y: yText1 }}
          >
            <h1 className="text-[13vw] sm:text-[10vw] md:text-[9vw] font-black leading-[0.8] md:leading-[0.85] tracking-[-0.04em] md:whitespace-nowrap uppercase">
               FULL STACK
            </h1>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="w-full md:text-right md:mr-12 lg:mr-24"
            style={{ y: yText2 }}
          >
            <h1 className="text-[15vw] sm:text-[12vw] md:text-[9vw] font-black leading-[0.8] md:leading-[0.85] tracking-[-0.04em] md:whitespace-nowrap">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent2 via-accent3 to-accent1 drop-shadow-[0_0_15px_rgba(255,0,85,0.3)]">
                WEB DEVELOPER
              </span>
            </h1>
          </motion.div>

        </div>

        {/* Bottom Metadata & Button */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mt-4 md:mt-8">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="max-w-2xl mt-4 mb-4 md:mt-8"
          >
            <p className="text-xl sm:text-2xl md:text-3xl text-white/50 leading-[1.1] font-black tracking-tighter uppercase">
              ENGINEERING HIGH-PERFORMANCE <span className="text-white">FULL-STACK</span> APPLICATIONS. FOCUSED ON SCALABLE ARCHITECTURES AND <span className="text-accent2">HIGH-IMPACT</span> DIGITAL EXPERIENCES.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1, ease: [0.76, 0, 0.24, 1] }}
            className="pb-4 self-end"
            style={{ y: yPhoto }}
          >
            <MagneticButton>
              <motion.a 
                href="#contact" 
                whileHover={{ 
                  y: [0, -15, 8, 0], 
                  x: [0, 10, -5, 0], 
                  rotate: [-2, 2, -2, 2, 0],
                  transition: { duration: 3, repeat: Infinity, ease: "easeInOut" } 
                }}
                className="w-48 h-48 md:w-64 md:h-64 rounded-full flex items-center justify-center overflow-hidden hover:scale-110 transition-all duration-500 group relative shadow-[0_0_50px_rgba(0,0,0,0.5)] border-4 border-white/10"
              >
                {/* Gradient Glow Background */}
                <div className="absolute inset-0 bg-gradient-to-tr from-accent2 via-accent3 to-accent1 blur-3xl opacity-50 group-hover:opacity-80 group-hover:scale-125 transition-all duration-700 animate-pulse" />
                
                {/* Main Photo */}
                <img 
                  src="/Pratham Latest Photo.jpeg" 
                  alt="Contact" 
                  className="w-full h-full object-cover grayscale-[0.1] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110 relative z-10" 
                />
              </motion.a>
            </MagneticButton>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default Hero;
