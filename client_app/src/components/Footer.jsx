import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="bg-[#0a0a0a] pt-24 overflow-hidden border-t border-white/5 text-white font-sans">
      <div className="container mx-auto px-6 max-w-[1400px]">
        
        {/* Top Section */}
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-8 mb-8 lg:mb-16">
          
          {/* Column 1 - Catchphrase (Takes up 5 cols on lg) */}
          <div className="lg:col-span-5 pr-4 mb-2 lg:mb-0">
            <h2 className="text-3xl md:text-[2.2rem] font-black leading-snug tracking-tight">
              Where <span className="text-[#e879f9]">aesthetics</span> & <br />
              <span className="text-[#22d3ee]">functionality</span> meet
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:gap-8 lg:col-span-4 lg:gap-8">
            {/* Column 2 - Explore */}
            <div>
              <h3 className="text-[#fb923c] font-black mb-4 lg:mb-6 text-base lg:text-lg tracking-wide">Explore</h3>
              <ul className="space-y-3 lg:space-y-4 font-bold text-white/90">
                <li>
                  <motion.a 
                    href="#home" 
                    className="inline-block hover:text-accent1 transition-colors text-sm lg:text-base"
                    whileHover={{ x: 5, color: "#ccff00" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Home
                  </motion.a>
                </li>
                <li>
                  <motion.a 
                    href="#about" 
                    className="inline-block hover:text-accent2 transition-colors text-sm lg:text-base"
                    whileHover={{ x: 5, color: "#00f0ff" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    About Me
                  </motion.a>
                </li>
                <li>
                  <motion.a 
                    href="#contact" 
                    className="inline-block hover:text-accent3 transition-colors text-sm lg:text-base"
                    whileHover={{ x: 5, color: "#ff0055" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Contact
                  </motion.a>
                </li>
              </ul>
            </div>

            {/* Column 3 - Follow Me */}
            <div>
              <h3 className="text-[#22d3ee] font-black mb-4 lg:mb-6 text-base lg:text-lg tracking-wide">Follow Me</h3>
              <ul className="space-y-3 lg:space-y-4 font-bold text-white/90">
                <li>
                  <motion.a 
                    href="https://www.linkedin.com/in/prathamsinhparmar-2162a2300" target="_blank" rel="noreferrer"
                    className="flex items-center gap-2 lg:gap-3 transition-colors text-sm lg:text-base"
                    whileHover={{ x: 8, color: "#00f0ff" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="w-7 h-7 lg:w-8 lg:h-8 rounded-full bg-[#0a66c2] flex items-center justify-center shadow-[0_0_15px_rgba(10,102,194,0.3)] transition-all">
                      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 lg:w-4 lg:h-4 fill-white"><path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5V9h3v10zM6.5 7.7a1.8 1.8 0 110-3.6 1.8 1.8 0 010 3.6zM19 19h-3v-5.6c0-1.3-.5-2.2-1.6-2.2-1 0-1.5.7-1.8 1.4-.1.3-.1.6-.1 1V19h-3V9h3v1.4c.4-.6 1.1-1.5 2.8-1.5 2 0 3.5 1.3 3.5 4.1V19z"/></svg>
                    </div>
                    LinkedIn
                  </motion.a>
                </li>
                <li>
                  <motion.a 
                    href="https://www.instagram.com/parmarprathamsinh/" target="_blank" rel="noreferrer"
                    className="flex items-center gap-2 lg:gap-3 transition-colors text-sm lg:text-base"
                    whileHover={{ x: 8, color: "#e1306c" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="w-7 h-7 lg:w-8 lg:h-8 rounded-full bg-[#e1306c] flex items-center justify-center shadow-[0_0_15px_rgba(225,48,108,0.3)] transition-all">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-white">
                        <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                      </svg>
                    </div>
                    Instagram
                  </motion.a>
                </li>
                <li>
                  <motion.a 
                    href="https://github.com/PrathamsinhParmar" target="_blank" rel="noreferrer"
                    className="flex items-center gap-2 lg:gap-3 transition-colors text-sm lg:text-base"
                    whileHover={{ x: 8, color: "#ccff00" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="w-7 h-7 lg:w-8 lg:h-8 rounded-full bg-white flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-all">
                        <svg viewBox="0 0 24 24" className="w-4 h-4 lg:w-5 lg:h-5 fill-black"><path d="M12 2A10 10 0 002 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.45-1.16-1.1-1.47-1.1-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"/></svg>
                    </div>
                    Github
                  </motion.a>
                </li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-3 space-y-2 lg:ml-auto w-full max-w-xs mt-6 lg:mt-0">
            <motion.a 
              href="#contact" 
              className="flex items-center justify-between group pb-4 border-b border-white/10 hover:border-accent1/30 transition-colors"
              whileHover={{ y: -5, color: "#ccff00" }}
              whileTap={{ scale: 0.98 }}
            >
              <div>
                <h4 className="text-[1rem] lg:text-[1.1rem] font-black group-hover:text-accent1 transition-colors">Contact Me</h4>
                <p className="text-xs lg:text-sm text-white/50 font-medium group-hover:text-white/80 transition-colors">Say Hello !</p>
              </div>
              <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full border border-green-900 flex items-center justify-center group-hover:bg-[#072c1c] group-hover:scale-110 shadow-[0_0_20px_rgba(34,197,94,0.1)] group-hover:shadow-[0_0_25px_rgba(34,197,94,0.4)] transition-all">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
              </div>
            </motion.a>

            <motion.a 
              href="#projects" 
              className="flex items-center justify-between group pb-4 pt-2 border-b border-white/10 hover:border-accent2/30 transition-colors"
              whileHover={{ y: -5, color: "#00f0ff" }}
              whileTap={{ scale: 0.98 }}
            >
              <div>
                <h4 className="text-[1rem] lg:text-[1.1rem] font-black group-hover:text-accent2 transition-colors">My Projects</h4>
                <p className="text-xs lg:text-sm text-white/50 font-medium group-hover:text-white/80 transition-colors">Explore Projects</p>
              </div>
              <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full border border-green-900 flex items-center justify-center group-hover:bg-[#072c1c] group-hover:scale-110 shadow-[0_0_20px_rgba(34,197,94,0.1)] group-hover:shadow-[0_0_25px_rgba(34,197,94,0.4)] transition-all">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
              </div>
            </motion.a>
          </div>

        </div>

        {/* Massive Backdrop Text */}
        <div className="w-full flex justify-center overflow-visible mt-8 lg:mt-16 mb-4 lg:mb-0 pb-2 lg:pb-0">
          <h1 className="text-[17vw] lg:text-[17vw] font-black tracking-[-0.05em] text-[#faebd7] leading-[0.9] lg:leading-[0.75] select-none text-center">
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
