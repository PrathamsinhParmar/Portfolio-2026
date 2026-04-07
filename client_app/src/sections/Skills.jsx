import React from 'react';
import { motion } from 'framer-motion';

const Skills = () => {
  const categories = [
    {
      title: "Web Development",
      skills: ["HTML5", "CSS3", "Tailwind CSS", "JavaScript", "React JS", "Node JS", "Express JS"]
    },
    {
      title: "Languages",
      skills: ["C", "C++", "Java", "Python"]
    },
    {
      title: "Tools & Technologies",
      skills: ["MongoDB", "Git & GitHub", "Framer Motion", "Vite"]
    }
  ];

  return (
    <section className="py-24 px-6 border-t border-white/10 relative overflow-hidden text-center md:text-left">
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-4xl md:text-6xl font-black mb-16 tracking-tighter">
          SKILLS
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {categories.map((cat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
            >
              <h3 className="text-2xl font-bold mb-6 text-foreground/80">{cat.title}</h3>
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                {cat.skills.map((skill, sIdx) => (
                  <span 
                    key={sIdx} 
                    className="glass px-4 py-2 rounded-full text-sm font-medium hover:bg-white hover:text-black transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
