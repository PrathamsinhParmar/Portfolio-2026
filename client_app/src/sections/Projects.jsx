import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/projects');
        setProjects(response.data);
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
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop",
    ];
    return thumbs[index % thumbs.length];
  }

  return (
    <section id="projects" className="py-32 px-6 border-t border-white/10 relative">
      <div className="container mx-auto max-w-[1400px]">
        
        {/* Header Block matching thegr8binil */}
        <div className="flex items-center gap-4 mb-24">
          <div className="w-12 h-[1px] bg-foreground/30"></div>
          <h2 className="text-xl md:text-2xl font-medium tracking-tight text-foreground/80 uppercase">
             Selected Works
          </h2>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
             <div className="animate-pulse flex h-14 w-14 rounded-full bg-white/20"></div>
          </div>
        ) : (
          <div className="flex flex-col space-y-32">
            {projects.map((project, index) => (
              <motion.div 
                key={project._id || index}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-24 items-center group`}
              >
                {/* Visual Side (Mockup image) */}
                <div className="w-full lg:w-1/2 relative overflow-hidden rounded-3xl aspect-[4/3] bg-white/5 border border-white/10">
                   <div className="absolute inset-0 bg-background/20 group-hover:bg-transparent transition-all duration-700 z-10" />
                   <img 
                      src={getThumbnail(index)} 
                      alt={project.title}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                   />
                </div>

                {/* Content Side */}
                <div className="w-full lg:w-1/2 space-y-6 flex flex-col justify-center">
                  
                  <div className="flex gap-4 items-center bg-white/5 px-4 py-2 rounded-full w-fit mb-2">
                     <span className="text-xs font-bold text-accent1 uppercase tracking-widest">{index < 9 ? `0${index + 1}` : index + 1}</span>
                     <div className="w-1 h-1 rounded-full bg-foreground/30" />
                     <span className="text-xs font-bold text-muted uppercase tracking-widest">2026</span>
                  </div>

                  <h3 className="text-4xl md:text-6xl font-black tracking-tight leading-none group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/50 transition-all duration-500 cursor-default">
                    {project.title}
                  </h3>
                  
                  <p className="text-lg md:text-xl text-foreground/60 leading-relaxed max-w-xl">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-4">
                    {project.technologies?.map((tech, tIdx) => (
                      <span key={tIdx} className="text-xs font-medium px-4 py-2 rounded-full border border-white/20 text-foreground/80 hover:bg-white hover:text-black transition-colors cursor-default">
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-4 pt-6">
                    {project.liveDemoLink && (
                      <a 
                        href={project.liveDemoLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 px-8 py-4 bg-foreground text-background font-bold rounded-full hover:scale-105 transition-transform"
                      >
                        Live Demo
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-1"><path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </a>
                    )}
                    {project.githubLink && (
                      <a 
                        href={project.githubLink}
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="flex items-center justify-center px-8 py-4 border border-white/20 rounded-full font-bold text-foreground hover:bg-white/5 transition-colors"
                      >
                        Source Code
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
