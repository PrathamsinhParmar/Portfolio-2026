import React from 'react';
import { motion } from 'framer-motion';

const Experience = () => {
  const experiences = [
    {
      company: "Edunet Foundation",
      role: "Artificial Intelligence Intern",
      period: "June 2025 – Present",
      bullets: [
        "Understood the fundamentals of Artificial Intelligence and Machine Learning.",
        "Gained hands-on experience working with real-world datasets.",
        "Built and evaluated basic machine learning models using Python."
      ]
    },
    {
      company: "ShadowFox",
      role: "Web Development Intern",
      period: "July 2025 – Present",
      bullets: [
        "Worked with HTML, CSS, and JavaScript to improve user experience.",
        "Optimized site for mobile responsiveness and performance.",
        "Learned industry practices like version control using Git."
      ]
    }
  ];

  return (
    <section id="experience" className="py-24 px-6 border-t border-white/10 relative">
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-4xl md:text-6xl font-black mb-16 tracking-tighter text-center md:text-left">
          EXPERIENCE
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="glass p-8 rounded-3xl hover:border-accent2/50 transition-colors group cursor-default"
            >
              <h3 className="text-2xl font-bold mb-2 group-hover:text-accent2 transition-colors">{exp.role}</h3>
              <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
                <span className="text-foreground font-medium">{exp.company}</span>
                <span className="text-sm font-medium text-accent1 bg-accent1/10 px-3 py-1 rounded-full">{exp.period}</span>
              </div>
              <ul className="space-y-3">
                {exp.bullets.map((bullet, i) => (
                  <li key={i} className="text-muted text-sm flex items-start">
                    <span className="text-accent2 mr-2 mt-1">▹</span>
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
