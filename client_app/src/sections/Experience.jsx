import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import ScrollRevealText from '../components/ScrollRevealText';

const Experience = () => {
  const experiences = [
    {
      company: "Edunet Foundation x IBM SkillsBuild",
      role: "AI & Machine Learning Intern",
      period: "June 2025 – August 2025",
      bullets: [
        "Completed a 6-week AI/ML internship focused on applying machine learning techniques to real-world datasets.",
        "Developed and deployed an Employee Salary Predictor using regression models trained on 50,000 employee records.",
        "Implemented supervised learning algorithms (Linear Regression, Random Forest, Gradient Boosting) and evaluated with MAE, RMSE, and R² scores.",
        "Tools & Technologies: Python, Pandas, NumPy, Scikit-learn, Matplotlib, Jupyter Notebook, Streamlit"
      ]
    },
    {
      company: "Edunet Foundation x IBM SkillsBuild",
      role: "Frontend Web Development Intern",
      period: "July 2025 – September 2025",
      bullets: [
        "Completed a 6-week frontend development internship focused on building responsive and interactive web applications.",
        "Designed and developed modern user interfaces using HTML, CSS, and JavaScript, ensuring cross-browser compatibility.",
        "Implemented dynamic features such as form validation, API integration, and real-time DOM updates.",
        "Tools & Technologies: HTML, CSS, JavaScript, React, Bootstrap, Git, GitHub, VS Code"
      ]
    }
  ];

  const [expandedIndex, setExpandedIndex] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Smooth floating cursor tracking
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 25, stiffness: 300 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Only track if not on a touch device
    if (window.matchMedia('(pointer: coarse)').matches) return;
    
    const moveCursor = (e) => {
      cursorX.set(e.clientX + 32);
      cursorY.set(e.clientY - 16);
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [cursorX, cursorY]);

  const toggleAccordion = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const isTouchDevice = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;

  return (
    <section id="experience" className="pt-32 pb-24 px-6 border-t border-white/10 relative overflow-hidden">
      <div className="container mx-auto max-w-[1400px]">
        
        <div className="flex items-center gap-6 mb-10 md:mb-16">
          <div className="w-16 h-[2px] bg-gradient-to-r from-accent3 to-transparent animate-pulse shadow-[0_0_15px_rgba(255,0,85,0.8)]"></div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight uppercase bg-gradient-to-r from-white via-white/90 to-accent3/80 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(255,0,85,0.4)]">
             Work Experience
          </h2>
        </div>

        <div className="space-y-4 w-full" onMouseLeave={() => setHoveredIndex(null)}>
          {experiences.map((exp, index) => {
            const isExpanded = expandedIndex === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: [0.76, 0, 0.24, 1] }}
                className="group border-b border-white/10"
                onMouseEnter={() => setHoveredIndex(index)}
              >
                {/* Clickable Header */}
                <div 
                  className="py-12 cursor-pointer relative z-10"
                  onClick={() => toggleAccordion(index)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleAccordion(index);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-expanded={isExpanded}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-6 md:gap-12 relative flex-col-reverse lg:flex-row items-center pointer-events-none">
                    
                    {/* Role Title */}
                    <div className="order-2 lg:order-1 w-full">
                      <h3 className="text-4xl md:text-5xl font-black tracking-tight leading-[1.1] text-white group-hover:text-accent2 transition-colors duration-300 group-hover:drop-shadow-[0_0_10px_rgba(0,240,255,0.5)]">
                        {exp.role}
                      </h3>
                    </div>

                    {/* Meta Column: Period & Company */}
                    <div className="flex flex-col gap-2 lg:items-end lg:text-right order-1 lg:order-2 w-full mb-2 lg:mb-0">
                      <div className="flex items-center lg:justify-end gap-3 text-accent1 font-bold font-mono text-sm md:text-base drop-shadow-[0_0_5px_rgba(204,255,0,0.5)]">
                        <span className="w-2 h-2 rounded-full bg-accent1 shadow-[0_0_8px_rgba(204,255,0,0.8)] animate-pulse shrink-0 lg:order-2" />
                        <span className="lg:order-1">{exp.period}</span>
                      </div>
                      <div className="text-white/60 font-black font-mono text-xs uppercase tracking-widest mt-1 border-l lg:border-l-0 lg:border-r border-white/10 pl-5 lg:pl-0 lg:pr-5 ml-1 lg:mr-1 py-1">
                        {exp.company}
                      </div>
                    </div>

                  </div>
                </div>

                {/* Expanded Content */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-12 lg:w-3/4">
                        <ul className="space-y-4 mt-2">
                          {exp.bullets.map((bullet, i) => (
                            <li key={i} className="flex items-start text-lg">
                              <span className="text-accent1 mr-4 mt-1 drop-shadow-[0_0_5px_rgba(204,255,0,0.8)] font-black shrink-0">▹</span>
                              <ScrollRevealText 
                                text={bullet} 
                                className="text-lg font-medium leading-relaxed" 
                                revealClassName="text-white/80"
                              />
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Floating Cursor Button */}
      {!isTouchDevice && (
        <AnimatePresence>
          {hoveredIndex !== null && expandedIndex !== hoveredIndex && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="fixed top-0 left-0 z-50 pointer-events-none drop-shadow-2xl px-5 py-2.5 bg-[#ff1e69] rounded-full text-black font-bold tracking-widest text-[11px] whitespace-nowrap uppercase shadow-lg"
              style={{
                x: cursorXSpring,
                y: cursorYSpring,
              }}
            >
              CLICK TO EXPAND DETAILS
            </motion.div>
          )}
        </AnimatePresence>
      )}

    </section>
  );
};

export default Experience;
