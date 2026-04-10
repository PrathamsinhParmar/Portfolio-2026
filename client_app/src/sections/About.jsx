import React from 'react';
import { motion } from 'framer-motion';

import ScrollRevealText from '../components/ScrollRevealText';

const About = () => {
  return (
    <section id="about" className="py-20 md:py-32 px-6 border-t border-white/10 relative overflow-hidden">
      <div className="container mx-auto max-w-[1400px]">
        
        <div className="flex items-center gap-6 mb-10 md:mb-16">
          <div className="w-16 h-[2px] bg-gradient-to-r from-accent2 to-transparent animate-pulse shadow-[0_0_15px_rgba(0,240,255,0.8)]"></div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight uppercase bg-gradient-to-r from-white via-white/90 to-accent2/80 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(0,240,255,0.4)]">
             About Me
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32">
          
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            <ScrollRevealText 
              text="I AM A FULL-STACK DEVELOPER DRIVEN BY IMPACT AND ARTIFICIAL INTELLIGENCE." 
              className="text-3xl sm:text-4xl md:text-5xl font-black mb-6 md:mb-8 tracking-tight drop-shadow-[0_0_15px_rgba(255,0,85,0.2)]" 
              revealClassName="text-transparent bg-clip-text bg-gradient-to-r from-accent3 to-accent1"
            />
            <ScrollRevealText 
              text="Currently pursuing a B.Tech in Information Technology. I focus on building robust applications combining clean code structure with smooth, highly aesthetic frontends." 
              className="text-xl leading-relaxed mb-12"
              revealClassName="text-foreground/80 md:text-foreground/90"
            />
            <motion.a 
              href="/Pratham Latest Resume.pdf" 
              target="_blank" 
              whileHover={{ 
                y: [0, -10, 5, 0], 
                x: [0, 8, -4, 0], 
                rotate: [-0.6, 0.6, -0.6, 0.6, 0],
                transition: { duration: 2.5, repeat: Infinity, ease: "easeInOut" } 
              }}
              className="relative overflow-hidden inline-flex items-center px-6 py-3 md:px-8 md:py-4 bg-accent1 rounded-full transition-all group mt-4 mb-2 border-2 border-transparent hover:border-accent2"
            >
              {/* ARC Background Fill */}
              <div className="absolute top-[100%] left-[50%] -translate-x-[50%] w-[150%] aspect-square bg-accent2 rounded-full scale-0 group-hover:scale-100 group-hover:-top-[50%] transition-all duration-700 ease-[0.76, 0, 0.24, 1]" />
              
              <span 
                className="relative z-10 flex items-center gap-2 md:gap-3 transition-colors duration-300 text-black text-sm md:text-lg" 
                style={{ fontFamily: '"Inter", sans-serif', fontWeight: 900 }}
              >
                Download Resume
                <svg 
                  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" 
                  className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </motion.a>
          </motion.div>

          <div className="space-y-16">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
              className="perspective-[1200px]"
            >
              <h4 className="text-sm font-black tracking-widest text-accent3 drop-shadow-[0_0_5px_rgba(255,0,85,0.4)] uppercase mb-10">Education</h4>
              
              <div className="relative flex flex-col gap-4 pl-4 border-l-2 border-white/5">
                
                {/* 1. Drs. Kiran & Pallavi Patel (Accent 4 - Purple) */}
                <motion.div
                  initial={{ rotateX: 20, y: 40, opacity: 0, z: -50 }}
                  whileInView={{ rotateX: 0, y: 0, opacity: 1, z: 0 }}
                  whileHover={{ scale: 1.02, rotateX: 8, rotateY: -8, z: 40 }}
                  transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
                  className="group relative p-5 md:p-6 rounded-2xl bg-white/[0.015] border border-white/10 hover:border-accent4/40 hover:bg-accent4/5 transition-colors overflow-hidden backdrop-blur-md cursor-default"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div className="absolute top-[50%] -left-4 w-6 h-[2px] bg-accent4 shadow-[0_0_10px_rgba(112,0,255,0.8)] -translate-y-[50%] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-br from-accent4/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  
                  <div className="relative z-10" style={{ transform: 'translateZ(30px)' }}>
                    <span className="text-foreground/40 font-mono font-bold text-xs tracking-widest uppercase mb-1.5 block group-hover:text-accent4 transition-colors">
                      Aug 2023 - May 2027
                    </span>
                    <h5 className="text-xl sm:text-2xl font-black mb-1.5 text-white group-hover:text-accent4 transition-colors drop-shadow-[0_0_5px_rgba(112,0,255,0)] group-hover:drop-shadow-[0_0_10px_rgba(112,0,255,0.4)] leading-tight">
                      Drs. Kiran & Pallavi Patel Global University
                    </h5>
                    <p className="text-foreground/60 font-bold text-sm group-hover:text-white transition-colors">
                      Bachelor of Technology - Information Technology
                    </p>
                  </div>
                </motion.div>

                {/* 2. Aditi Science School (Accent 3 - Pink) */}
                <motion.div
                  initial={{ rotateX: 20, y: 40, opacity: 0, z: -50 }}
                  whileInView={{ rotateX: 0, y: 0, opacity: 1, z: 0 }}
                  whileHover={{ scale: 1.02, rotateX: -8, rotateY: 8, z: 40 }}
                  transition={{ duration: 0.6, type: "spring", bounce: 0.4, delay: 0.1 }}
                  className="group relative p-5 md:p-6 rounded-2xl bg-white/[0.015] border border-white/10 hover:border-accent3/40 hover:bg-accent3/5 transition-colors overflow-hidden backdrop-blur-md cursor-default"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div className="absolute top-[50%] -left-4 w-6 h-[2px] bg-accent3 shadow-[0_0_10px_rgba(255,0,85,0.8)] -translate-y-[50%] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-br from-accent3/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <div className="relative z-10" style={{ transform: 'translateZ(30px)' }}>
                    <span className="text-foreground/40 font-mono font-bold text-xs tracking-widest uppercase mb-1.5 block group-hover:text-accent3 transition-colors">
                      May 2021 - April 2023
                    </span>
                    <h5 className="text-xl sm:text-2xl font-black mb-1.5 text-white group-hover:text-accent3 transition-colors drop-shadow-[0_0_5px_rgba(255,0,85,0)] group-hover:drop-shadow-[0_0_10px_rgba(255,0,85,0.4)] leading-tight">
                      Aditi Science School
                    </h5>
                    <p className="text-foreground/60 font-bold text-sm group-hover:text-white transition-colors">
                      Higher Secondary Education (11th & 12th Science)
                    </p>
                  </div>
                </motion.div>

                {/* 3. Shah N. B. Sarvjanik Highschool (Accent 2 - Cyan) */}
                <motion.div
                  initial={{ rotateX: 20, y: 40, opacity: 0, z: -50 }}
                  whileInView={{ rotateX: 0, y: 0, opacity: 1, z: 0 }}
                  whileHover={{ scale: 1.02, rotateX: 8, rotateY: -8, z: 40 }}
                  transition={{ duration: 0.6, type: "spring", bounce: 0.4, delay: 0.2 }}
                  className="group relative p-5 md:p-6 rounded-2xl bg-white/[0.015] border border-white/10 hover:border-accent2/40 hover:bg-accent2/5 transition-colors overflow-hidden backdrop-blur-md cursor-default"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div className="absolute top-[50%] -left-4 w-6 h-[2px] bg-accent2 shadow-[0_0_10px_rgba(0,240,255,0.8)] -translate-y-[50%] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-br from-accent2/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <div className="relative z-10" style={{ transform: 'translateZ(30px)' }}>
                    <span className="text-foreground/40 font-mono font-bold text-xs tracking-widest uppercase mb-1.5 block group-hover:text-accent2 transition-colors">
                      Jun 2008 - May 2021
                    </span>
                    <h5 className="text-xl sm:text-2xl font-black mb-1.5 text-white group-hover:text-accent2 transition-colors drop-shadow-[0_0_5px_rgba(0,240,255,0)] group-hover:drop-shadow-[0_0_10px_rgba(0,240,255,0.4)] leading-tight">
                      Shah N. B. Sarvjanik Highschool
                    </h5>
                    <p className="text-foreground/60 font-bold text-sm group-hover:text-white transition-colors">
                      All Primary Education & Secondary School Education
                    </p>
                  </div>
                </motion.div>

              </div>
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;
