import React from 'react';
import { motion } from 'framer-motion';

const Experience = () => {
  const experiences = [
    {
      company: "Edunet Foundation",
      role: "AI & Machine Learning Intern",
      period: "June 2025 – Present",
      bullets: [
        "Mastered the fundamentals of AI/ML handling large datasets.",
        "Built and evaluated predictive models utilizing Python frameworks."
      ]
    },
    {
      company: "ShadowFox",
      role: "Web Development Intern",
      period: "July 2025 – Present",
      bullets: [
        "Crafted optimized HTML, CSS, and JS components improving core UX metrics.",
        "Integrated Git workflow protocols for efficient version-controlled development."
      ]
    }
  ];

  return (
    <section id="experience" className="py-32 px-6 border-t border-white/10 relative overflow-hidden">
      <div className="container mx-auto max-w-[1400px]">
        
        <div className="flex items-center gap-6 mb-24">
          <div className="w-16 h-[2px] bg-gradient-to-r from-accent3 to-transparent animate-pulse shadow-[0_0_15px_rgba(255,0,85,0.8)]"></div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight uppercase bg-gradient-to-r from-white via-white/90 to-accent3/80 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(255,0,85,0.4)]">
             Work Experience
          </h2>
        </div>

        <div className="space-y-12 max-w-4xl">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.76, 0, 0.24, 1] }}
              className="group border-b border-white/10 pb-12 cursor-default"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                <h3 className="text-3xl md:text-4xl font-black tracking-tight group-hover:text-accent2 transition-colors group-hover:drop-shadow-[0_0_10px_rgba(0,240,255,0.5)]">
                  {exp.role}
                </h3>
                <div className="flex items-center gap-4 text-foreground/60 font-mono font-bold group-hover:text-white transition-colors">
                  <span>{exp.company}</span>
                  <span className="hidden md:inline text-accent1">•</span>
                  <span>{exp.period}</span>
                </div>
              </div>
              <ul className="space-y-3">
                {exp.bullets.map((bullet, i) => (
                  <li key={i} className="text-lg text-foreground/60 font-medium flex items-start group-hover:text-white/80 transition-colors">
                    <span className="text-accent1 mr-4 mt-1 drop-shadow-[0_0_5px_rgba(204,255,0,0.8)] font-black">▹</span>
                    {bullet}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Experience;
