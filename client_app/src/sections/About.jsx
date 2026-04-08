import React from 'react';
import { motion } from 'framer-motion';

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
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6 md:mb-8 leading-tight tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-accent3 to-accent1 drop-shadow-[0_0_15px_rgba(255,0,85,0.2)]">
              I AM A FULL-STACK DEVELOPER DRIVEN BY IMPACT AND ARTIFICIAL INTELLIGENCE.
            </h3>
            <p className="text-xl text-foreground/60 leading-relaxed mb-12">
              Currently pursuing a B.Tech in Information Technology. I focus on building robust applications combining clean code structure with smooth, highly aesthetic frontends.
            </p>
            <a 
              href="/Prathamsinh_Parmar_Final_Resume.pdf" 
              target="_blank" 
              className="relative overflow-hidden inline-flex items-center gap-3 px-8 py-4 bg-accent1 text-black font-black text-lg rounded-full transition-all group mt-4 mb-2 border-2 border-transparent hover:border-accent2"
            >
              {/* ARC Background Fill */}
              <div className="absolute top-[100%] left-[50%] -translate-x-[50%] w-[150%] aspect-square bg-accent2 rounded-full scale-0 group-hover:scale-100 group-hover:-top-[50%] transition-all duration-700 ease-[0.76, 0, 0.24, 1]" />
              
              <span className="relative z-10 flex items-center gap-3 transition-colors duration-300 text-black">
                Download Resume
                <svg 
                  width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" 
                  className="group-hover:translate-x-1 transition-transform"
                >
                  <path d="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSstikLXeSSCmIjmdJvuLSA4lsTJ6a8aBOY8A&s"/>
                </svg>
              </span>
            </a>
          </motion.div>

          <div className="space-y-16">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
            >
              <h4 className="text-sm font-black tracking-widest text-accent3 drop-shadow-[0_0_5px_rgba(255,0,85,0.4)] uppercase mb-8">Education</h4>
              <div className="space-y-12">
                
                <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-12 group cursor-default">
                  <span className="text-foreground/40 font-mono font-bold w-32 shrink-0 group-hover:text-accent2 transition-colors">Aug 2023 - 2027</span>
                  <div>
                    <h5 className="text-2xl font-black mb-2 group-hover:text-accent1 transition-colors drop-shadow-[0_0_5px_rgba(204,255,0,0)] group-hover:drop-shadow-[0_0_10px_rgba(204,255,0,0.4)]">B.Tech - Information Tech.</h5>
                    <p className="text-foreground/60 font-bold group-hover:text-white transition-colors">Drs. Kiran & Pallavi Patel Global University</p>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-12 group cursor-default">
                  <span className="text-foreground/40 font-mono font-bold w-32 shrink-0 group-hover:text-accent3 transition-colors">May 2021 - 2023</span>
                  <div>
                    <h5 className="text-2xl font-black mb-2 group-hover:text-accent2 transition-colors drop-shadow-[0_0_5px_rgba(0,240,255,0)] group-hover:drop-shadow-[0_0_10px_rgba(0,240,255,0.4)]">Higher Secondary (Science)</h5>
                    <p className="text-foreground/60 font-bold group-hover:text-white transition-colors">Aditi Science School</p>
                  </div>
                </div>

              </div>
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;
