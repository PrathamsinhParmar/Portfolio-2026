import React from 'react';
import { motion } from 'framer-motion';

const Skills = () => {
  // Ordered array of devicon SVG URLs matching the user's stack
  const techLogos = [
    { name: 'HTML5', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', color: '#E34F26' },
    { name: 'CSS3', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', color: '#1572B6' },
    { name: 'Tailwind', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg', color: '#06B6D4' },
    { name: 'JavaScript', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', color: '#F7DF1E' },
    { name: 'TypeScript', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', color: '#3178C6' },
    { name: 'React', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', color: '#61DAFB' },
    { name: 'Next.js', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg', color: '#FFFFFF' },
    { name: 'Redux', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg', color: '#764ABC' },
    { name: 'Node.js', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', color: '#339933' },
    { name: 'Express', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg', color: '#FFFFFF' },
    { name: 'MongoDB', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', color: '#47A248' },
    { name: 'PostgreSQL', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', color: '#4169E1' },
    { name: 'Git', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', color: '#F05032' },
    { name: 'GitHub', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', color: '#FFFFFF' },
    { name: 'Docker', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', color: '#2496ED' },
    { name: 'AWS', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg', color: '#FF9900' },
    { name: 'Python', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', color: '#3776AB' },
    { name: 'C++', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg', color: '#00599C' },
    { name: 'Java', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg', color: '#007396' },
    { name: 'Postman', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg', color: '#FF6C37' },
    { name: 'Figma', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg', color: '#F24E1E' }
  ];

  // We duplicate the array to create a seamless infinite marquee effect
  const duplicatedLogos = [...techLogos, ...techLogos];

  return (
    <section id="skills" className="py-32 border-t border-white/10 relative overflow-hidden bg-black">
      <div className="container mx-auto px-6 max-w-[1200px] flex flex-col items-center text-center">
        
        {/* Load More Button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="mb-12"
        >
          <button className="relative overflow-hidden flex items-center gap-2 px-8 py-4 rounded-full border border-white/10 bg-white/5 text-sm font-black text-white hover:text-black hover:border-transparent transition-all group shadow-2xl">
            {/* ARC Background Fill */}
            <div className="absolute top-[100%] left-[50%] -translate-x-[50%] w-[150%] aspect-square bg-accent2 rounded-full scale-0 group-hover:scale-100 group-hover:-top-[40%] transition-all duration-700 ease-[0.76, 0, 0.24, 1]" />
            
            <span className="relative z-10 flex items-center gap-2">
              Load More 
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
            </span>
          </button>
        </motion.div>

        {/* Section Label Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ 
            delay: 0.1,
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="mb-8"
        >
          <h3 className="inline-flex items-center gap-3 glass px-8 py-3 rounded-full border border-accent4/30 text-white font-black text-xs tracking-[0.25em] uppercase shadow-[0_0_20px_rgba(112,0,255,0.15)] group hover:border-accent4 transition-colors duration-500">
            <span className="w-2 h-2 rounded-full bg-accent4 animate-pulse shadow-[0_0_10px_rgba(112,0,255,0.8)]" />
            MY TECH STACK
            <span className="text-accent4 group-hover:rotate-12 transition-transform duration-500">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="m16 18 6-6-6-6"/><path d="m8 6-6 6 6 6"/></svg>
            </span>
          </h3>
        </motion.div>

        {/* Highlighted Master Text */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0.2 }}
          className="text-2xl md:text-3xl lg:text-4xl font-black leading-relaxed max-w-4xl text-white/90 mb-24"
        >
          My expertise spans a diverse range of <span className="text-accent1 drop-shadow-[0_0_10px_rgba(204,255,0,0.4)]">technologies</span>, enabling me to deliver comprehensive and <span className="text-accent2 drop-shadow-[0_0_10px_rgba(0,240,255,0.4)]">cutting-edge solutions</span> across various platforms.
        </motion.p>
      </div>

      {/* Infinite Marquee Logos */}
      <div className="relative w-full overflow-hidden flex flex-col">
        {/* Shadow overlays for smooth fading edges */}
        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-black to-transparent z-10"></div>
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-black to-transparent z-10"></div>

        <motion.div 
          className="flex items-center gap-16 md:gap-20 py-12"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 8,
            ease: "linear",
            repeat: Infinity,
            repeatType: 'loop'
          }}
        >
          {duplicatedLogos.map((logo, index) => (
            <div key={index} className="flex-shrink-0 relative group hover:scale-110 transition-all duration-500 cursor-default flex flex-col items-center justify-center">
              <img 
                src={logo.src} 
                alt={`${logo.name} logo`} 
                className="h-16 w-16 md:h-20 md:w-20 object-contain drop-shadow-[0_0_20px_rgba(255,255,255,0.15)] group-hover:drop-shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all" 
                style={{ filter: `drop-shadow(0 0 10px ${logo.color}33)` }}
              />
              {/* Dynamic Brand-Matched Label */}
              <span 
                className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-all duration-500 text-[10px] md:text-sm font-black tracking-[0.25em] uppercase whitespace-nowrap translate-y-4 group-hover:translate-y-0"
                style={{ 
                   color: logo.color,
                   textShadow: `0 0 15px ${logo.color}88` 
                }}
              >
                {logo.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

    </section>
  );
};

export default Skills;
