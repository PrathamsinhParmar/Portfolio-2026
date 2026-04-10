import React from 'react';
import { motion } from 'framer-motion';
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

  return (
    <section id="experience" className="pt-32 pb-24 px-6 border-t border-white/10 relative overflow-hidden">
      <div className="container mx-auto max-w-[1400px]">
        
        <div className="flex items-center gap-6 mb-10 md:mb-16">
          <div className="w-16 h-[2px] bg-gradient-to-r from-accent3 to-transparent animate-pulse shadow-[0_0_15px_rgba(255,0,85,0.8)]"></div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight uppercase bg-gradient-to-r from-white via-white/90 to-accent3/80 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(255,0,85,0.4)]">
             Work Experience
          </h2>
        </div>

        <div className="space-y-16 w-full">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.76, 0, 0.24, 1] }}
              className="group border-b border-white/10 pb-12 cursor-default"
            >
              {/* Restructured 2-Column Grid Layout — Content Left, Meta Right */}
              <div className="grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-6 md:gap-12 relative flex-col-reverse lg:flex-row">
                
                {/* Content Column: Role & Bullets (Now on the Left) */}
                <div className="order-2 lg:order-1">
                  <h3 className="text-4xl md:text-5xl font-black tracking-tight leading-[1.1] text-white group-hover:text-accent2 transition-colors duration-300 group-hover:drop-shadow-[0_0_10px_rgba(0,240,255,0.5)] mb-8">
                    {exp.role}
                  </h3>
                  <ul className="space-y-4">
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

                {/* Meta Column: Period & Company (Now on the Right) */}
                <div className="flex flex-col gap-2 lg:pt-3 lg:items-end lg:text-right order-1 lg:order-2 mb-6 lg:mb-0">
                  <div className="flex items-center lg:justify-end gap-3 text-accent1 font-bold font-mono text-sm md:text-base drop-shadow-[0_0_5px_rgba(204,255,0,0.5)]">
                    <span className="w-2 h-2 rounded-full bg-accent1 shadow-[0_0_8px_rgba(204,255,0,0.8)] animate-pulse shrink-0 lg:order-2" />
                    <span className="lg:order-1">{exp.period}</span>
                  </div>
                  <div className="text-white/60 font-black font-mono text-xs uppercase tracking-widest mt-1 border-l lg:border-l-0 lg:border-r border-white/10 pl-5 lg:pl-0 lg:pr-5 ml-1 lg:mr-1 py-1">
                    {exp.company}
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Experience;
