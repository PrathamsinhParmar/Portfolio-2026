import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="py-24 px-6 border-t border-white/10 relative">
      <div className="container mx-auto max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16"
        >
          {/* Left Column: Title */}
          <div>
             <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter">
               ABOUT ME
             </h2>
             <p className="text-xl text-muted leading-relaxed mb-8">
               A dedicated B.Tech IT student passionate about full-stack web development and artificial intelligence. Focused on building real-world digital solutions by combining clean code, creativity, and modern technologies.
             </p>
             <div className="flex gap-4 items-center">
                 <a href="/Prathamsinh_Parmar_Final_Resume.pdf" target="_blank" className="text-accent1 font-bold underline underline-offset-4 hover:text-white transition-colors">
                   View Full Resume
                 </a>
             </div>
          </div>
          
          {/* Right Column: Education Timeline */}
          <div className="flex flex-col space-y-12 border-l border-white/10 pl-8 relative">
            
            <div className="relative">
              <div className="absolute -left-[37px] top-1 w-4 h-4 rounded-full bg-accent1 shadow-[0_0_10px_#4ade80]" />
              <p className="text-sm font-bold text-accent1 mb-2">Aug 2023 - Jun 2027</p>
              <h3 className="text-2xl font-bold text-foreground mb-2">B.Tech - Information Technology</h3>
              <p className="text-muted">Drs. Kiran & Pallavi Patel Global University (KPGU)</p>
            </div>
            
            <div className="relative">
              <div className="absolute -left-[37px] top-1 w-4 h-4 rounded-full bg-white/20" />
              <p className="text-sm font-bold text-muted mb-2">May 2021 - Jun 2023</p>
              <h3 className="text-2xl font-bold text-foreground mb-2">Higher Secondary Education</h3>
              <p className="text-muted">Aditi Science School (11th & 12th Science)</p>
            </div>

            <div className="relative">
              <div className="absolute -left-[37px] top-1 w-4 h-4 rounded-full bg-white/20" />
              <p className="text-sm font-bold text-muted mb-2">Jun 2008 - May 2021</p>
              <h3 className="text-2xl font-bold text-foreground mb-2">Primary & Secondary Education</h3>
              <p className="text-muted">Shah N. B. Sarvjanik Highschool</p>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
