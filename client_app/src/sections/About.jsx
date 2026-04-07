import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="py-32 px-6 border-t border-white/10 relative overflow-hidden">
      <div className="container mx-auto max-w-[1400px]">
        
        <div className="flex items-center gap-4 mb-24">
          <div className="w-12 h-[1px] bg-foreground/30"></div>
          <h2 className="text-xl md:text-2xl font-medium tracking-tight text-foreground/80 uppercase">
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
            <h3 className="text-4xl md:text-5xl font-black mb-8 leading-tight tracking-tight">
              I AM A FULL-STACK DEVELOPER DRIVEN BY IMPACT AND ARTIFICIAL INTELLIGENCE.
            </h3>
            <p className="text-xl text-foreground/60 leading-relaxed mb-12">
              Currently pursuing a B.Tech in Information Technology. I focus on building robust applications combining clean code structure with smooth, highly aesthetic frontends.
            </p>
            <a href="/Prathamsinh_Parmar_Final_Resume.pdf" target="_blank" className="font-bold border-b border-foreground hover:text-foreground/60 hover:border-foreground/60 transition-colors pb-1 text-lg">
              Download Resume →
            </a>
          </motion.div>

          <div className="space-y-16">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
            >
              <h4 className="text-sm font-bold tracking-widest text-foreground/40 uppercase mb-8">Education</h4>
              <div className="space-y-12">
                
                <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-12 group cursor-default">
                  <span className="text-foreground/40 font-mono w-32 shrink-0">Aug 2023 - 2027</span>
                  <div>
                    <h5 className="text-2xl font-bold mb-2 group-hover:text-accent1 transition-colors">B.Tech - Information Tech.</h5>
                    <p className="text-foreground/60">Drs. Kiran & Pallavi Patel Global University</p>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-12 group cursor-default">
                  <span className="text-foreground/40 font-mono w-32 shrink-0">May 2021 - 2023</span>
                  <div>
                    <h5 className="text-2xl font-bold mb-2 transition-colors group-hover:text-white">Higher Secondary (Science)</h5>
                    <p className="text-foreground/60">Aditi Science School</p>
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
