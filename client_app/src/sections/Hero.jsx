import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20 px-6 relative overflow-hidden">
      
      {/* Background gradients */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent1/20 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent2/20 rounded-full blur-[128px] pointer-events-none" />

      <div className="container mx-auto max-w-7xl flex flex-col items-start z-10 mt-12 md:mt-24">
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-muted text-lg tracking-widest uppercase mb-4"
        >
          Hello, I'm Prathamsinh Parmar
        </motion.p>

        <motion.h1 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-none mb-8"
        >
          FULL STACK
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent1 to-accent2">
            WEB DEVELOPER
          </span>
        </motion.h1>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="max-w-2xl"
        >
          <p className="text-xl text-muted leading-relaxed mb-10 border-l-2 border-white/20 pl-6">
            B.Tech IT student passionate about full-stack web development and artificial intelligence. 
            Focused on building real-world digital solutions by combining clean code, creativity, and modern technologies.
          </p>

          <div className="flex gap-4">
            <a href="#projects" className="px-8 py-4 bg-foreground text-background font-bold rounded-full hover:scale-105 transition-transform">
              View Work
            </a>
            <a href="#about" className="px-8 py-4 border border-white/20 font-bold rounded-full hover:bg-white/5 transition-all">
              Explore More
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
