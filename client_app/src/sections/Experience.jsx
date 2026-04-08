import React from 'react';
import { motion } from 'framer-motion';

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
    <section id="experience" className="py-32 px-6 border-t border-white/10 relative overflow-hidden">
      <div className="container mx-auto max-w-[1400px]">
        
        <div className="flex items-center gap-6 mb-10 md:mb-16">
          <div className="w-16 h-[2px] bg-gradient-to-r from-accent3 to-transparent animate-pulse shadow-[0_0_15px_rgba(255,0,85,0.8)]"></div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight uppercase bg-gradient-to-r from-white via-white/90 to-accent3/80 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(255,0,85,0.4)]">
             Work Experience
          </h2>
        </div>

        <div className="space-y-16 max-w-5xl">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.76, 0, 0.24, 1] }}
              className="group border-b border-white/10 pb-12 cursor-default"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-6">
                <div className="lg:w-[55%]">
                  <h3 className="text-4xl md:text-5xl font-black tracking-tight leading-[1.1] group-hover:text-accent2 transition-colors group-hover:drop-shadow-[0_0_10px_rgba(0,240,255,0.5)]">
                    {exp.role}
                  </h3>
                </div>
                <div className="lg:w-[45%] flex items-center justify-start lg:justify-end gap-4 md:gap-6 text-foreground/60 font-mono font-bold text-sm md:text-[15px] group-hover:text-white transition-colors">
                  <div className="w-[180px] leading-relaxed">{exp.company}</div>
                  <span className="text-accent1 text-xl drop-shadow-[0_0_5px_rgba(204,255,0,0.8)] shrink-0 mt-1">•</span>
                  <div className="w-[150px] leading-relaxed">{exp.period}</div>
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
