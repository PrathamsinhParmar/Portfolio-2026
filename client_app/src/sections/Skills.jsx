import React from 'react';
import { motion } from 'framer-motion';

const Skills = () => {
  // Ordered array of devicon SVG URLs matching the user's stack
  const techLogos = [
    { name: 'HTML5', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
    { name: 'CSS3', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
    { name: 'Tailwind', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
    { name: 'JavaScript', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
    { name: 'React', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    { name: 'Node.js', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
    { name: 'Express', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
    { name: 'MongoDB', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
    { name: 'Git', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
    { name: 'GitHub', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original-wordmark.svg' },
    { name: 'Python', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
    { name: 'C++', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
    { name: 'Java', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' }
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
          <button className="flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 hover:border-accent2 hover:text-accent2 hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all bg-white/5 text-sm font-bold">
            Load More 
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
          </button>
        </motion.div>

        {/* Section Label */}
        <motion.h3 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0.1 }}
          className="bg-accent4 text-white px-6 py-2 rounded-full tracking-widest uppercase font-black text-sm mb-8 drop-shadow-[0_0_10px_rgba(112,0,255,0.6)]"
        >
          MY TECH STACK
        </motion.h3>

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
          className="flex whitespace-nowrap min-w-max items-center py-4"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 25,
            ease: "linear",
            repeat: Infinity,
            repeatType: 'loop'
          }}
        >
          {duplicatedLogos.map((logo, index) => (
            <div key={index} className="flex-shrink-0 mx-10 md:mx-16 grayscale opacity-80 hover:grayscale-0 hover:opacity-100 hover:scale-110 transition-all duration-300">
              <img src={logo.src} alt={`${logo.name} logo`} className="h-16 w-16 md:h-20 md:w-20 object-contain" />
            </div>
          ))}
        </motion.div>
      </div>

    </section>
  );
};

export default Skills;
