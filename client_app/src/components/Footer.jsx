import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="bg-[#0a0a0a] pt-24 overflow-hidden border-t border-white/5 text-white font-sans">
      <div className="container mx-auto px-6 max-w-[1400px]">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* Column 1 - Catchphrase (Takes up 5 cols on lg) */}
          <div className="lg:col-span-5 pr-4">
            <h2 className="text-3xl md:text-[2.2rem] font-black leading-snug tracking-tight">
              Where <span className="text-[#e879f9]">aesthetics</span> & <br />
              <span className="text-[#22d3ee]">functionality</span> meet
            </h2>
          </div>

          {/* Column 2 - Explore */}
          <div className="lg:col-span-2">
            <h3 className="text-[#fb923c] font-black mb-6 text-lg tracking-wide">Explore</h3>
            <ul className="space-y-4 font-bold text-white/90">
              <li>
                <motion.a 
                  href="#home" 
                  className="inline-block hover:text-accent1 transition-colors"
                  whileHover={{ x: 5, color: "#ccff00" }}
                  whileTap={{ scale: 0.95 }}
                >
                  Home
                </motion.a>
              </li>
              <li>
                <motion.a 
                  href="#about" 
                  className="inline-block hover:text-accent2 transition-colors"
                  whileHover={{ x: 5, color: "#00f0ff" }}
                  whileTap={{ scale: 0.95 }}
                >
                  About Me
                </motion.a>
              </li>
              <li>
                <motion.a 
                  href="#contact" 
                  className="inline-block hover:text-accent3 transition-colors"
                  whileHover={{ x: 5, color: "#ff0055" }}
                  whileTap={{ scale: 0.95 }}
                >
                  Contact
                </motion.a>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-[#22d3ee] font-black mb-6 text-lg tracking-wide">Follow Me</h3>
            <ul className="space-y-4 font-bold text-white/90">
              <li>
                <motion.a 
                  href="https://www.linkedin.com/in/prathamsinhparmar-2162a2300" target="_blank" rel="noreferrer"
                  className="flex items-center gap-3 transition-colors"
                  whileHover={{ x: 8, color: "#00f0ff" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="w-8 h-8 rounded-full bg-[#0a66c2] flex items-center justify-center shadow-[0_0_15px_rgba(10,102,194,0.3)] transition-all">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white"><path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5V9h3v10zM6.5 7.7a1.8 1.8 0 110-3.6 1.8 1.8 0 010 3.6zM19 19h-3v-5.6c0-1.3-.5-2.2-1.6-2.2-1 0-1.5.7-1.8 1.4-.1.3-.1.6-.1 1V19h-3V9h3v1.4c.4-.6 1.1-1.5 2.8-1.5 2 0 3.5 1.3 3.5 4.1V19z"/></svg>
                  </div>
                  LinkedIn
                </motion.a>
              </li>
              <li>
                <motion.a 
                  href="#" 
                  className="flex items-center gap-3 transition-colors"
                  whileHover={{ x: 8, color: "#ea4c89" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="w-8 h-8 rounded-full bg-[#ea4c89] flex items-center justify-center shadow-[0_0_15px_rgba(234,76,137,0.3)] transition-all">
                      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm8.46 9.4c-.05-.03-2.31-1.32-4.99-.81a10.98 10.98 0 00-1.35-2.65c2.4-1.02 3.42-2.52 3.47-2.6a8.04 8.04 0 012.87 6.06zM17.06 4.7c-.03.04-1.03 1.51-3.32 2.51a20.08 20.08 0 00-3.57-5.1A8.04 8.04 0 0117.06 4.7M9.23 2.76c.19.23 1.25 1.56 2.05 3.3a18.06 18.06 0 00-5.83 1.7A8.02 8.02 0 019.23 2.76M3.6 12c0-.52.05-1.03.14-1.52A18.88 18.88 0 019.98 8.8a18.23 18.23 0 00-.91 4.22c-2.45.54-4.82.49-4.94.49A8.02 8.02 0 003.6 12m.53 3.45c.18-.01 2.37.04 4.88-.47a24.36 24.36 0 002.58 6.4 8.01 8.01 0 01-7.46-5.93m9.2 6.4a22.25 22.25 0 01-2.44-6c2.72-.63 4.95-1.9 5.2-2.05a8.03 8.03 0 01-2.76 8.05z"/></svg>
                  </div>
                  Dribble
                </motion.a>
              </li>
              <li>
                <motion.a 
                  href="https://github.com/PrathamsinhParmar" target="_blank" rel="noreferrer"
                  className="flex items-center gap-3 transition-colors"
                  whileHover={{ x: 8, color: "#ccff00" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-all">
                      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-black"><path d="M12 2A10 10 0 002 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.45-1.16-1.1-1.47-1.1-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"/></svg>
                  </div>
                  Github
                </motion.a>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3 space-y-2 lg:ml-auto w-full max-w-xs">
            <motion.a 
              href="#contact" 
              className="flex items-center justify-between group pb-4 border-b border-white/10 hover:border-accent1/30 transition-colors"
              whileHover={{ y: -5, color: "#ccff00" }}
              whileTap={{ scale: 0.98 }}
            >
              <div>
                <h4 className="text-[1.1rem] font-black group-hover:text-accent1 transition-colors">Contact Me</h4>
                <p className="text-sm text-white/50 font-medium group-hover:text-white/80 transition-colors">Say Hello !</p>
              </div>
              <div className="w-10 h-10 rounded-full border border-green-900 flex items-center justify-center group-hover:bg-[#072c1c] group-hover:scale-110 shadow-[0_0_20px_rgba(34,197,94,0.1)] group-hover:shadow-[0_0_25px_rgba(34,197,94,0.4)] transition-all">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
              </div>
            </motion.a>

            <motion.a 
              href="#projects" 
              className="flex items-center justify-between group pb-4 pt-2 border-b border-white/10 hover:border-accent2/30 transition-colors"
              whileHover={{ y: -5, color: "#00f0ff" }}
              whileTap={{ scale: 0.98 }}
            >
              <div>
                <h4 className="text-[1.1rem] font-black group-hover:text-accent2 transition-colors">My Projects</h4>
                <p className="text-sm text-white/50 font-medium group-hover:text-white/80 transition-colors">Explore Projects</p>
              </div>
              <div className="w-10 h-10 rounded-full border border-green-900 flex items-center justify-center group-hover:bg-[#072c1c] group-hover:scale-110 shadow-[0_0_20px_rgba(34,197,94,0.1)] group-hover:shadow-[0_0_25px_rgba(34,197,94,0.4)] transition-all">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
              </div>
            </motion.a>
          </div>

        </div>

        {/* Massive Backdrop Text */}
        <div className="w-full flex justify-center overflow-hidden mt-8 lg:mt-16">
          <h1 className="text-[18vw] lg:text-[17vw] font-black tracking-[-0.05em] text-[#faebd7] leading-[0.75] select-none text-center">
            Prathamsinh
          </h1>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-transparent px-6 mt-4 mb-2">
        <div className="container mx-auto max-w-[1400px] flex flex-col md:flex-row justify-between items-center text-sm font-medium text-white uppercase tracking-wider">
          <p>
            <span className="font-bold">Prathamsinh</span> <span className="opacity-70 ml-1">©2026 - Privacy Policy</span>
          </p> 
          <p className="font-bold mt-2 md:mt-0">Gujarat, India</p>
        </div>
      </div>
      
    </footer>
  );
};

export default Footer;
