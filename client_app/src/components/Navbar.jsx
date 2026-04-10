import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, FolderGit2, User } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 50);

      // Hide if scrolling down past absolute threshold. Show if scrolling up.
      if (currentScrollY > lastScrollY && currentScrollY > 200) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [mobileMenuOpen]);

  const desktopLinks = [
    { name: 'Home', href: '#home', icon: <Home size={18} /> },
    { name: 'My Projects', href: '#projects', icon: <FolderGit2 size={18} /> },
    { name: 'About Me', href: '#about', icon: <User size={18} /> }
  ];

  const mobileLinks = [
    { name: 'HOME', href: '#home', hoverColor: 'group-hover:text-accent2', glow: 'group-hover:drop-shadow-[0_0_15px_rgba(0,240,255,0.8)]', tapColor: '#00f0ff' },
    { name: 'PROJECTS', href: '#projects', meta: '(4)', hoverColor: 'group-hover:text-accent3', glow: 'group-hover:drop-shadow-[0_0_15px_rgba(255,0,85,0.8)]', tapColor: '#ff0055' },
    { name: 'ABOUT', href: '#about', hoverColor: 'group-hover:text-accent1', glow: 'group-hover:drop-shadow-[0_0_15px_rgba(204,255,0,0.8)]', tapColor: '#ccff00' },
    { name: 'EXPERIENCE', href: '#experience', hoverColor: 'group-hover:text-accent4', glow: 'group-hover:drop-shadow-[0_0_15px_rgba(112,0,255,0.8)]', tapColor: '#7000ff' },
    { name: 'CONTACT', href: '#contact', hoverColor: 'group-hover:text-accent2', glow: 'group-hover:drop-shadow-[0_0_15px_rgba(0,240,255,0.8)]', tapColor: '#00f0ff' },
  ];

  return (
    <>
      <header className={`fixed top-0 w-full z-[999] transition-all duration-500 py-6 ${hidden ? '-translate-y-full' : 'translate-y-0'}`}>
        <div className="container mx-auto px-6 max-w-[1400px]">
          {/* ═══════════════════════════════════════════════════════════════ */}
          {/* DESKTOP VIEW                                                  */}
          {/* ═══════════════════════════════════════════════════════════════ */}
          <div className="hidden md:flex items-center justify-between">
            {/* Logo Left */}
            <div className="flex-1">
              <a href="#" className="w-fit flex items-center gap-3 glass pl-2 pr-5 py-2 rounded-full border border-white/10 group shadow-lg transition-transform hover:scale-[1.02]">
                <div className="relative flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-tr from-accent2 via-accent3 to-accent1 blur-md opacity-40 group-hover:opacity-100 transition-opacity rounded-full" />
                  <img src="/Pratham Latest Photo.jpeg" alt="Prathamsinh" className="w-9 h-9 rounded-full object-cover border border-white/20 relative z-10" />
                </div>
                <span className="text-xl font-semibold tracking-tight text-white">Prathamsinh</span>
              </a>
            </div>

            {/* Central Pill Nav */}
            <nav className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-500 ${scrolled ? 'glass shadow-2xl' : 'bg-transparent'}`}>
              {desktopLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  whileHover={{ rotate: [-1, 1, -1, 1, 0], transition: { duration: 0.3 } }}
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-foreground/80 hover:text-black hover:bg-accent1 transition-all relative overflow-hidden group"
                >
                  <div className="absolute top-[100%] left-[50%] -translate-x-[50%] w-[150%] aspect-square bg-accent1 rounded-full scale-0 group-hover:scale-100 group-hover:-top-[50%] transition-all duration-700 ease-[0.76, 0, 0.24, 1]" />
                  <span className="relative z-10 flex items-center gap-2">
                    {link.icon}
                    {link.name}
                  </span>
                </motion.a>
              ))}
            </nav>

            {/* Right Contact Button */}
            <div className="flex-1 flex justify-end">
              <motion.a
                href="#contact"
                whileHover={{ rotate: [-0.6, 0.6, -0.6, 0.6, 0], transition: { duration: 0.3 } }}
                className="relative overflow-hidden flex items-center gap-2 px-8 py-3 rounded-full text-sm font-black transition-all duration-300 glass text-white border-white/10 border hover:text-black hover:border-transparent group"
              >
                <div className="absolute top-[100%] left-[50%] -translate-x-[50%] w-[150%] aspect-square bg-accent1 rounded-full scale-0 group-hover:scale-100 group-hover:-top-[50%] transition-all duration-700 ease-[0.76, 0, 0.24, 1]" />
                <span className="relative z-10">Contact Me</span>
              </motion.a>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════════════ */}
          {/* MOBILE VIEW NAVIGATION BAR                                        */}
          {/* ═══════════════════════════════════════════════════════════════ */}
          <div className={`md:hidden flex items-center justify-between glass pl-3 pr-4 py-3 rounded-full border border-white/10 shadow-lg relative z-50 transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
            <a href="#" className="flex items-center gap-3">
              <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-tr from-accent2 via-accent3 to-accent1 blur-md opacity-40 rounded-full" />
                <img src="/Pratham Latest Photo.jpeg" alt="Prathamsinh" className="w-8 h-8 rounded-full object-cover border border-white/20 relative z-10" />
              </div>
              <span className="text-lg font-semibold text-white tracking-tight">Prathamsinh</span>
            </a>
            
            {/* Animated Hamburger Icon */}
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 flex flex-col justify-center items-end focus:outline-none group p-1" 
              onClick={() => setMobileMenuOpen(true)}
            >
              <div className="flex flex-col items-start gap-[5px] w-7 relative">
                {/* Top line */}
                <div className="w-full h-[2px] bg-white rounded-full transform origin-right transition-all duration-300 group-hover:w-4" />
                {/* Middle line */}
                <div className="w-full h-[2px] bg-white rounded-full transition-all duration-300 group-hover:translate-x-1" />
                {/* Bottom Cyan line */}
                <div className="w-4 h-[2px] bg-accent2 rounded-full self-end shadow-[0_0_8px_rgba(0,240,255,0.8)] transition-all duration-300 group-hover:w-full group-hover:bg-accent3 group-hover:shadow-[0_0_8px_rgba(255,0,85,0.8)]" />
              </div>
            </motion.button>
          </div>
        </div>
      </header>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* MOBILE FULL-SCREEN OVERLAY MENU                                 */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'circle(0% at 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at 100% 0)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at 100% 0)', transition: { duration: 0.6 } }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[1000] bg-[#070707] flex flex-col overflow-hidden"
          >
            {/* 3D Multi-color Gradient Sphere (Depth Effect) - Parallaxing */}
            <motion.div 
              className="absolute bottom-[-10%] right-[-30%] w-[120vw] max-w-[500px] aspect-square rounded-full z-0 pointer-events-none opacity-60"
              style={{ 
                background: 'radial-gradient(circle at 30% 30%, rgba(112,0,255,0.3) 0%, rgba(255,0,85,0.2) 30%, rgba(0,240,255,0.15) 60%, rgba(204,255,0,0.1) 85%, transparent 100%)',
                boxShadow: 'inset -50px -50px 120px rgba(0,0,0,0.95), 0 0 120px rgba(112,0,255,0.2)'
              }}
              animate={{ 
                rotate: [0, 15, 0, -15, 0],
                y: [0, -30, 0, 30, 0],
                scale: [1, 1.1, 1, 0.9, 1]
              }}
              transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Header Area inside Overlay */}
            <div className="w-full flex items-center justify-between pl-9 pr-10 pt-9 pb-6 z-20 relative">
              
              <div className="flex items-center gap-3">
                <div className="relative flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-tr from-accent2 via-accent3 to-accent1 blur-md opacity-40 rounded-full" />
                  <img src="/Pratham Latest Photo.jpeg" alt="Prathamsinh" className="w-8 h-8 rounded-full object-cover border border-white/20 relative z-10" />
                </div>
                <span className="text-lg font-semibold text-white tracking-tight">Prathamsinh</span>
              </div>
              
              {/* 3D Animated Close Button */}
              <motion.button 
                whileHover={{ rotate: 90, scale: 1.1 }}
                whileTap={{ scale: 0.9, rotateZ: 45 }}
                className="w-12 h-12 flex items-center justify-center focus:outline-none group"
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className="relative w-8 h-8 flex items-center justify-center">
                  <span className="absolute w-full h-[2px] bg-accent3 shadow-[0_0_8px_rgba(255,0,85,0.6)] rotate-45 rounded-full transition-transform duration-300 group-hover:bg-accent1 group-hover:shadow-[0_0_8px_rgba(204,255,0,0.6)]"></span>
                  <span className="absolute w-full h-[2px] bg-accent2 shadow-[0_0_8px_rgba(0,240,255,0.6)] -rotate-45 rounded-full transition-transform duration-300 group-hover:bg-accent1 group-hover:shadow-[0_0_8px_rgba(204,255,0,0.6)]"></span>
                </div>
              </motion.button>
            </div>

            <div className="flex-1 flex flex-col justify-center px-8 z-20 relative">
              
              {/* Top Metadata */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.3, duration: 0.6 }}
                className="mb-8 space-y-1 text-white/50 font-sans tracking-wide text-sm border-l-2 border-accent4/50 pl-4"
              >
                <p className="font-bold text-accent2 drop-shadow-[0_0_10px_rgba(0,240,255,0.7)] tracking-widest uppercase text-xs mb-3">Gujarat, India</p>
                <p className="hover:text-white transition-colors cursor-pointer">prathamsinhparmar0@gmail.com</p>
                <p className="hover:text-white transition-colors cursor-pointer">+91 8238075291</p>
              </motion.div>

              {/* Main Links - Perspective 3D Staggered Container */}
              <div className="flex flex-col gap-5 perspective-[1000px]">
                {mobileLinks.map((link, i) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    initial={{ opacity: 0, rotateX: -60, y: 40, z: -100 }}
                    animate={{ opacity: 1, rotateX: 0, y: 0, z: 0 }}
                    transition={{ delay: 0.2 + (i * 0.1), duration: 0.8, type: "spring", bounce: 0.4 }}
                    whileTap={{ scale: 0.95, z: -20, rotateX: 10, color: link.tapColor }}
                    className="group flex flex-col justify-center"
                    style={{ transformOrigin: 'top center', transformStyle: 'preserve-3d' }}
                  >
                    <div className={`flex items-end gap-3 text-white/90 transition-all duration-300 ${link.hoverColor} group-hover:translate-x-4`}>
                      <span className={`text-4xl sm:text-5xl font-black uppercase tracking-tighter leading-none m-0 p-0 transition-all duration-300 ${link.glow}`}>
                        {link.name}
                      </span>
                      {link.meta && (
                        <span className={`text-sm font-bold text-white/30 transition-colors duration-300 ${link.hoverColor} mb-1 leading-none`}>
                          {link.meta}
                        </span>
                      )}
                    </div>
                  </motion.a>
                ))}
              </div>

            </div>

            {/* Bottom Footer Navigation */}
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: 0.8 }}
              className="p-8 z-20 flex gap-6 text-sm font-medium text-white/50 relative"
            >
              <a href="/Prathamsinh_Parmar_Final_Resume.pdf" target="_blank" className="flex items-center gap-2 hover:text-accent1 transition-colors">
                <span className="w-1.5 h-1.5 rounded-full bg-accent1 shadow-[0_0_8px_rgba(204,255,0,0.8)] animate-pulse"></span>
                Resume / CV
              </a>
              <a href="https://github.com/PrathamsinhParmar" target="_blank" className="hover:text-accent4 transition-colors">
                GitHub
              </a>
            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
