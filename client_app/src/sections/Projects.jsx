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

  return (
    <section id="projects" className="py-24 px-6 border-t border-white/10 relative">
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-4xl md:text-6xl font-black mb-16 tracking-tighter text-center md:text-left">
          SELECTED PROJECTS
        </h2>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent1"></div>
          </div>
        ) : (
          <div className="flex flex-col space-y-12">
            {projects.map((project, index) => (
              <motion.div 
                key={project._id || index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6 }}
                className="glass rounded-3xl p-8 lg:p-12 flex flex-col md:flex-row gap-8 items-center group relative overflow-hidden"
              >
                {/* Decorative Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-accent1/5 to-accent2/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="flex-1 w-full space-y-6">
                  <h3 className="text-3xl md:text-5xl font-bold tracking-tight">
                    {project.title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies?.map((tech, tIdx) => (
                      <span key={tIdx} className="text-sm font-medium px-3 py-1 bg-white/5 rounded-full border border-white/10 text-muted">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <p className="text-lg text-muted max-w-2xl leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex gap-4 pt-4">
                    {project.liveDemoLink && (
                      <a 
                        href={project.liveDemoLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn-primary px-6 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors"
                      >
                        Live Demo
                      </a>
                    )}
                    {project.githubLink && (
                      <a 
                        href={project.githubLink}
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="btn-secondary px-6 py-3 border border-white/20 rounded-full font-bold hover:bg-white/5 transition-colors"
                      >
                        GitHub Core
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
