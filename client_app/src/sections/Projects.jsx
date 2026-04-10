import React, { useEffect, useState, useRef } from 'react';
import { motion, useSpring } from 'framer-motion';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const ProjectRow = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);

  // Smooth springs for tracking the cursor position
  const mouseX = useSpring(0, { stiffness: 80, damping: 20 });
  const mouseY = useSpring(0, { stiffness: 80, damping: 20 });



  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const getThumbnail = (index) => {
    const thumbs = [
      "/SnapPDF .jpeg", 
      "/DownAlert.jpeg", 
      "/ASPES.jpeg", 
      "/LifelineAI.jpeg", 
    ];
    return thumbs[index % thumbs.length];
  };

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -100px 0px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      className={`group relative flex flex-col justify-center border-t border-white/20 py-6 lg:py-8 transition-colors duration-500 hover:bg-[#0a0a0a] overflow-hidden md:overflow-visible z-0 hover:z-50`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      {/* Top small details */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center px-6 md:px-12 z-10 relative pointer-events-none mb-2 md:mb-4 gap-3 md:gap-0 mt-4 md:mt-0">
        {/* Left Side: Project Name & Core Tech */}
        <div className="flex items-center gap-3">
          <span className="text-xs md:text-sm font-black uppercase tracking-widest text-accent1 group-hover:text-white transition-colors duration-300 drop-shadow-md">
            {project.title}
          </span>
          <span className="w-1 h-1 rounded-full bg-white/30" />
          <span className="text-[10px] md:text-xs uppercase tracking-widest text-white/60 font-bold transition-opacity duration-300 group-hover:text-white opacity-80">
             {project.technologies && project.technologies[0] ? project.technologies[0] : 'Development'}
          </span>
        </div>

        {/* Right Side: Details, Month, Year */}
        <div className="flex items-center gap-3 text-[10px] md:text-xs uppercase tracking-widest text-white/40 font-bold text-right">
          <span className="hidden md:block truncate">
             {project.technologies?.slice(1, 3).join(' • ') || 'Concept • Design'}
          </span>
          <span className="hidden md:block w-1 h-1 rounded-full bg-white/20" />
          <div className="flex bg-white/5 px-4 py-1.5 text-white/60 rounded-full items-center gap-2 border border-white/5 group-hover:border-white/20 transition-all duration-300 group-hover:text-white/90">
             <span className="text-accent1 font-black tracking-widest">
                {['01', '03', '05', '08'][index % 4]}
             </span>
             <div className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-accent1/60 group-hover:bg-accent1 transition-colors" />
             <span className="font-bold">2026</span>
          </div>
        </div>
      </div>

      {/* Main Title Area */}
      <div className="relative w-full h-14 md:h-24 lg:h-32 flex items-center z-10 pointer-events-none">
         {/* Static Text with Details */}
         <motion.div 
           className="absolute inset-0 px-6 md:px-12 flex justify-between items-center transition-opacity duration-500 ease-[0.16,1,0.3,1]" 
           style={{ 
             opacity: isHovered ? 0 : 1
           }}
         >
            <h3 className="text-4xl md:text-6xl lg:text-[6rem] font-black uppercase tracking-tighter text-white/90 whitespace-nowrap overflow-hidden overflow-ellipsis leading-[0.85] drop-shadow-[0_0_15px_rgba(255,255,255,0.05)] max-w-[60%] md:max-w-[70%]">
              {project.title}
            </h3>

            {/* Right Side Center Details */}
            <div className="hidden md:flex flex-col items-end justify-center mt-2 group-hover:-translate-x-4 transition-transform duration-500">
               <span className="text-[10px] text-accent1 uppercase tracking-widest font-black mb-1.5 opacity-80">
                 Domain Area
               </span>
               <span className="text-xs font-bold text-white/60 uppercase tracking-widest text-right max-w-[200px] leading-relaxed">
                 {project.technologies && project.technologies.length > 0 
                    ? `Modern Website / ${project.technologies[0]}` 
                    : 'System Architecture'}
               </span>
            </div>
         </motion.div>

         {/* Marquee Text (Visible on Hover) */}
         <div 
           className="absolute inset-0 flex items-center transition-all duration-500 ease-[0.16,1,0.3,1]" 
           style={{ 
             opacity: isHovered ? 1 : 0, 
             transform: isHovered ? 'translateY(0px)' : 'translateY(20px)',
           }}
         >
            <motion.div
              initial={{ x: 0 }}
              animate={isHovered ? { x: "-50%" } : { x: 0 }}
              transition={{ repeat: Infinity, ease: "linear", duration: 15 }} 
              className="flex items-center whitespace-nowrap min-w-max"
            >
              {[...Array(4)].map((_, i) => (
                <React.Fragment key={i}>
                  <h3 className="text-4xl md:text-6xl lg:text-[6rem] font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70 leading-[0.85] whitespace-nowrap inline-flex items-center ml-6 md:ml-12">
                    {project.title}
                  </h3>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, ease: "linear", duration: 6 }}
                    className="mx-6 md:mx-12 origin-center flex justify-center items-center"
                  >
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="w-8 h-8 md:w-12 md:h-12 text-accent1 drop-shadow-[0_0_15px_rgba(204,255,0,0.8)]"><path d="M12 2L12 22M2 12L22 12M4.92822 4.92893L19.0704 19.0711M4.92822 19.0711L19.0704 4.92893" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </motion.div>
                </React.Fragment>
              ))}
            </motion.div>
         </div>
      </div>

      {/* Description Reveal on Hover (Desktop) */}
      <motion.div 
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: isHovered ? 'auto' : 0, opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="hidden md:flex flex-col overflow-hidden px-12 z-30 relative"
      >
        <div className="flex items-end justify-between py-4">
           <div className="flex flex-col gap-5 max-w-3xl">
             <p className="text-white/80 text-lg md:text-xl font-medium leading-relaxed">
               {project.description}
             </p>
             <div className="flex flex-wrap gap-3">
                {project.technologies?.map((tech, tIdx) => (
                  <span key={tIdx} className="text-xs font-bold px-5 py-2.5 rounded-full bg-white/10 border border-white/20 text-white/90 tracking-widest uppercase shadow-lg backdrop-blur-sm">
                    {tech}
                  </span>
                ))}
             </div>
           </div>

           <div className="flex gap-4 shrink-0 pointer-events-auto">
              {project.liveDemoLink && (
                <motion.a 
                  href={project.liveDemoLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  whileHover={{ 
                    y: [0, -8, 4, 0], 
                    x: [0, 6, -3, 0], 
                    rotate: [-1, 1, -1, 1, 0],
                    transition: { duration: 2.2, repeat: Infinity, ease: "easeInOut" } 
                  }}
                  className="relative overflow-hidden flex items-center justify-center gap-2 px-8 py-5 bg-accent2 text-black font-black text-sm uppercase tracking-widest rounded-full shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all duration-300 group/btn"
                >
                  {/* ARC Background Fill */}
                  <div className="absolute top-[100%] left-[50%] -translate-x-[50%] w-[200%] aspect-square bg-accent1 rounded-full scale-0 group-hover/btn:scale-100 group-hover/btn:-top-[50%] transition-all duration-700 ease-[0.76,0,0.24,1]" />
                  <span className="relative z-10 flex items-center gap-2">
                    Live Demo
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>
                  </span>
                </motion.a>
              )}
              {project.githubLink && (
                <motion.a 
                  href={project.githubLink}
                  target="_blank" 
                  rel="noopener noreferrer" 
                  whileHover={{ 
                    y: [0, -8, 4, 0], 
                    x: [0, 6, -3, 0], 
                    rotate: [-1, 1, -1, 1, 0],
                    transition: { duration: 2.2, repeat: Infinity, ease: "easeInOut" } 
                  }}
                  className="relative overflow-hidden flex items-center justify-center gap-2 px-8 py-5 bg-accent1 text-black font-black text-sm uppercase tracking-widest rounded-full shadow-[0_0_20px_rgba(204,255,0,0.3)] transition-all duration-300 group/btn"
                >
                  {/* ARC Background Fill */}
                  <div className="absolute top-[100%] left-[50%] -translate-x-[50%] w-[200%] aspect-square bg-accent2 rounded-full scale-0 group-hover/btn:scale-100 group-hover/btn:-top-[50%] transition-all duration-700 ease-[0.76,0,0.24,1]" />
                  <span className="relative z-10 flex items-center gap-2">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 flex-shrink-0"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                    Source
                  </span>
                </motion.a>
              )}
           </div>
        </div>
      </motion.div>

      {/* Desktop Floating Image (Tracks cursor) */}
      <motion.div
        className="hidden md:block absolute left-0 top-0 z-20 pointer-events-none rounded-2xl overflow-hidden border border-white/20 w-[350px] aspect-video shadow-2xl"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1 : 0.8,
          rotate: isHovered ? (index % 2 === 0 ? 3 : -3) : 0,
        }}
        transition={{ 
           opacity: { duration: 0.3 }, 
           scale: { duration: 0.6, type: "spring", bounce: 0.4 },
           rotate: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
        }}
      >
        <div className="absolute inset-0 bg-black/40 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
        <img src={getThumbnail(index)} className="w-full h-full object-cover" alt={project.title} />
      </motion.div>

      {/* Mobile Actions & Thumbnail (Visible only on mobile) */}
      <div className="flex md:hidden flex-col px-6 mt-6 gap-6 w-full z-20 relative font-sans">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full overflow-hidden rounded-xl border border-white/10 shadow-2xl relative"
        >
          <img src={getThumbnail(index)} className="w-full aspect-video object-cover" alt={project.title} />
        </motion.div>
        
        <p className="text-white/60 text-sm leading-relaxed">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2">
           {project.technologies?.map((tech, tIdx) => (
             <span key={tIdx} className="text-[10px] font-bold px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/80 uppercase">
               {tech}
             </span>
           ))}
        </div>

        <div className="flex gap-3 pt-2">
          {project.liveDemoLink && (
             <a href={project.liveDemoLink} target="_blank" rel="noopener noreferrer" className="flex-1 flex justify-center items-center gap-2 px-4 py-3 bg-accent2 text-black font-black text-xs uppercase tracking-widest rounded-lg shadow-[0_0_15px_rgba(0,240,255,0.2)]">
               Live Demo 
               <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>
             </a>
          )}
          {project.githubLink && (
             <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="flex-1 flex justify-center items-center gap-2 px-4 py-3 bg-accent1 text-black font-black text-xs uppercase tracking-widest rounded-lg shadow-[0_0_15px_rgba(204,255,0,0.2)]">
               <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 flex-shrink-0"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
               Source 
             </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

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
      title: "DownAlert",
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
      technologies: ["Python", "Streamlit", "Medgemma 4B", "Hugging Face"]
    }
  ]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/projects`);
        if (response.data && response.data.length > 0) {
          // ensure titles are streamlined for marquee effect
          const cleaned = response.data.map(p => ({
            ...p,
            title: p.title.replace(' - URL Health Checker', '').replace(' – AI Smart Project Evaluation System', '')
          }));
          setProjects(cleaned);
        }
      } catch (error) {
        console.error("Error fetching projects", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <section id="projects" className="py-24 md:py-40 bg-[var(--background)] border-t border-white/10 relative overflow-hidden">
      <div className="w-full">
        
        {/* Header Block matching Reference with spacing */}
        <div className="flex flex-col items-center md:items-start md:flex-row md:justify-between gap-6 mb-10 md:mb-16 px-6 md:px-12 max-w-[1600px] mx-auto z-10 relative">
          <div className="flex items-center gap-6">
            <div className="w-16 h-[2px] bg-gradient-to-r from-accent4 to-transparent animate-pulse shadow-[0_0_15px_rgba(112,0,255,0.8)]"></div>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight uppercase bg-gradient-to-r from-white via-white/90 to-accent4/80 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(112,0,255,0.4)]">
               Selected Works
            </h2>
          </div>
          <p className="text-white/40 text-sm md:text-base max-w-sm text-center md:text-right font-medium tracking-wide">
            Interact to reveal more. Hover over projects to discover live demos, case studies, and source code.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
             <div className="animate-pulse flex h-14 w-14 rounded-full bg-white/20 shadow-[0_0_20px_rgba(255,255,255,0.1)]"></div>
          </div>
        ) : (
          <div className="flex flex-col border-b border-light/20 w-full mb-20 max-w-[2000px] mx-auto">
            {projects.map((project, index) => (
              <ProjectRow key={project._id || index} project={project} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
