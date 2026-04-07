import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const API_BASE_URL = 'http://10.86.238.244:5000/api';

const Projects = () => {
  const [projects, setProjects] = useState([
    {
      _id: "p1",
      title: "SnapPDF",
      description: "SnappDFF is a web-based PDF utility platform designed to help users easily manage and convert digital documents online. It provides a collection of essential tools that simplify working with PDF files without requiring software installation.",
      githubLink: "https://github.com/Divya241181/SnapPDF",
      liveDemoLink: "https://snappdff.netlify.app/",
      technologies: ["React.js", "Express", "Supabase", "Tailwind CSS"]
    },
    {
      _id: "p2",
      title: "DonwAlert - URL Health Checker",
      description: "Downalert – URL Health Checker is a web-based monitoring tool designed to help users track the availability and performance of websites in real time. It allows users to input a URL and instantly check whether the site is up or down, along with key details such as response status, load time, and server health.",
      githubLink: "https://github.com/PrathamsinhParmar/URL_Health_Checker",
      liveDemoLink: "https://miro.medium.com/v2/resize:fit:1400/1*rFrfoJW2uNRvxQehVx8ssQ.png",
      technologies: ["Python", "Django", "React", "Canvas API"]
    },
    {
      _id: "p3",
      title: "ASPES",
      description: "ASPES – AI Smart Project Evaluation System is an intelligent web-based platform designed to automate and enhance the evaluation of academic and technical projects using artificial intelligence. The system analyzes project submissions based on predefined criteria such as originality, code quality, documentation, and overall performance, providing accurate and unbiased assessments.",
      githubLink: "https://github.com/PrathamsinhParmar/ASPES",
      liveDemoLink: "https://miro.medium.com/v2/resize:fit:1400/1*rFrfoJW2uNRvxQehVx8ssQ.png",
      technologies: ["React", "Flask", "Chart.js", "Redis"]
    },
    {
      _id: "p4",
      title: "Lifeline AI",
      description: "Lifeline AI is an intelligent, AI-powered platform designed to provide timely support, guidance, and assistance in critical or everyday situations. By leveraging advanced artificial intelligence, it can analyze user inputs, understand context, and deliver personalized recommendations related to health, safety, and general well-being.",
      githubLink: "https://github.com/PrathamsinhParmar/Lifeline-AI---The-Health-Assistant",
      liveDemoLink: "https://miro.medium.com/v2/resize:fit:1400/1*rFrfoJW2uNRvxQehVx8ssQ.png",
      technologies: ["Python", "Streamlit", "Medgemma 4B", "Hugging Face Transformers"]
    }
  ]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/projects`);
        if (response.data && response.data.length > 0) {
          setProjects(response.data);
        }
      } catch (error) {
        console.error("Error fetching projects", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  // Standard premium placeholders mimicking thegr8binil design cards
  const getThumbnail = (index) => {
    const thumbs = [
      "/SnapPDF .jpeg", // Project 1
      "/DownAlert.jpeg", // Project 2
      "/ASPES.jpeg", // Project 3
      "/LifelineAI.jpeg", // Project 4
    ];
    return thumbs[index % thumbs.length];
  }

  return (
    <section id="projects" className="py-32 px-6 border-t border-white/10 relative">
      <div className="container mx-auto max-w-[1400px]">
        
        {/* Header Block matching thegr8binil */}
        <div className="flex items-center gap-6 mb-24">
          <div className="w-16 h-[2px] bg-gradient-to-r from-accent4 to-transparent animate-pulse shadow-[0_0_15px_rgba(112,0,255,0.8)]"></div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight uppercase bg-gradient-to-r from-white via-white/90 to-accent4/80 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(112,0,255,0.4)]">
             Selected Works
          </h2>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
             <div className="animate-pulse flex h-14 w-14 rounded-full bg-white/20"></div>
          </div>
        ) : (
          <div className="flex flex-col space-y-20 md:space-y-28 divide-y divide-white/5">
            {projects.map((project, index) => (
              <motion.div 
                key={project._id || index}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-10 lg:gap-20 items-center group pt-20 md:pt-28`}
              >
                {/* Visual Side (Mockup image) */}
                 <div className="w-full lg:w-1/2 relative overflow-hidden rounded-3xl aspect-video bg-[#0c0c0c] border border-white/10 group-hover:border-accent1/50 transition-colors duration-500 shadow-2xl">
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-all duration-700 z-10 pointer-events-none" />
                    <img 
                       src={getThumbnail(index)} 
                       alt={project.title}
                       className="w-full h-full object-cover grayscale opacity-60 group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    />
                 </div>

                {/* Content Side */}
                <div className="w-full lg:w-1/2 space-y-6 flex flex-col justify-center">
                  
                  <div className="flex gap-4 items-center bg-white/5 px-4 py-2 rounded-full w-fit mb-2 border border-white/5">
                     <span className="text-xs font-black text-accent1 drop-shadow-[0_0_5px_rgba(204,255,0,0.5)] uppercase tracking-widest">{index < 9 ? `0${index + 1}` : index + 1}</span>
                     <div className="w-1 h-1 rounded-full bg-white/30" />
                     <span className="text-xs font-bold text-white/50 uppercase tracking-widest">2026</span>
                  </div>

                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter leading-[1.05] group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-accent1 group-hover:to-accent2 transition-all duration-500 cursor-default">
                    {project.title}
                  </h3>
                  
                  <p className="text-base md:text-lg text-foreground/50 leading-relaxed max-w-xl">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-4">
                    {project.technologies?.map((tech, tIdx) => (
                      <span key={tIdx} className="text-xs font-bold px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:text-white hover:border-white/30 transition-all cursor-default">
                        {tech}
                      </span>
                    ))}
                  </div>
                                 <div className="flex flex-wrap gap-3 pt-6">
                    {project.liveDemoLink && (
                      <a 
                        href={project.liveDemoLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="relative overflow-hidden flex items-center gap-2 px-6 py-3 bg-accent2 text-black font-black text-sm rounded-full shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all duration-300 group/btn"
                      >
                        {/* ARC Background Fill */}
                        <div className="absolute top-[100%] left-[50%] -translate-x-[50%] w-[200%] aspect-square bg-accent1 rounded-full scale-0 group-hover/btn:scale-100 group-hover/btn:-top-[50%] transition-all duration-700 ease-[0.76,0,0.24,1]" />
                        <span className="relative z-10 flex items-center gap-2">
                          Live Demo
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>
                        </span>
                      </a>
                    )}
                    {project.githubLink && (
                      <a 
                        href={project.githubLink}
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="relative overflow-hidden flex items-center gap-2 px-6 py-3 bg-accent1 text-black font-black text-sm rounded-full shadow-[0_0_20px_rgba(204,255,0,0.3)] transition-all duration-300 group/btn"
                      >
                        {/* ARC Background Fill - Blue on hover */}
                        <div className="absolute top-[100%] left-[50%] -translate-x-[50%] w-[200%] aspect-square bg-accent2 rounded-full scale-0 group-hover/btn:scale-100 group-hover/btn:-top-[50%] transition-all duration-700 ease-[0.76,0,0.24,1]" />
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 flex-shrink-0 relative z-10"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                        <span className="relative z-10">Source Code</span>
                      </a>
                    )}
                  </div>

                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
