import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, FolderGit2, User, Menu, X, Mail } from 'lucide-react';

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

  const navLinks = [
    { name: 'Home', href: '#home', icon: <Home size={18} /> },
    { name: 'My Projects', href: '#projects', icon: <FolderGit2 size={18} /> },
    { name: 'About Me', href: '#about', icon: <User size={18} /> }
  ];

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-500 py-6 ${hidden ? '-translate-y-full' : 'translate-y-0'}`}>
      <div className="container mx-auto px-6 max-w-[1400px]">
        {/* Desktop View */}
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
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-foreground/80 hover:text-black hover:bg-accent1 transition-all relative overflow-hidden group"
              >
                <div className="absolute top-[100%] left-[50%] -translate-x-[50%] w-[150%] aspect-square bg-accent1 rounded-full scale-0 group-hover:scale-100 group-hover:-top-[50%] transition-all duration-700 ease-[0.76, 0, 0.24, 1]" />
                <span className="relative z-10 flex items-center gap-2">
                  {link.icon}
                  {link.name}
                </span>
              </a>
            ))}
          </nav>

          {/* Right Contact Button */}
          <div className="flex-1 flex justify-end">
             <a 
              href="#contact" 
              className="relative overflow-hidden flex items-center gap-2 px-8 py-3 rounded-full text-sm font-black transition-all duration-300 glass text-white border-white/10 border hover:text-black hover:border-transparent group"
             >
                {/* ARC Background Fill */}
                <div className="absolute top-[100%] left-[50%] -translate-x-[50%] w-[150%] aspect-square bg-accent1 rounded-full scale-0 group-hover:scale-100 group-hover:-top-[50%] transition-all duration-700 ease-[0.76, 0, 0.24, 1]" />
                
                <span className="relative z-10">Contact Me</span>
             </a>
          </div>
        </div>

        {/* Mobile View */}
        <div className="md:hidden flex items-center justify-between glass pl-3 pr-6 py-3 rounded-full border border-white/10 shadow-lg">
          <a href="#" className="flex items-center gap-3">
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-tr from-accent2 via-accent3 to-accent1 blur-md opacity-40 rounded-full" />
              <img src="/Pratham Latest Photo.jpeg" alt="Prathamsinh" className="w-8 h-8 rounded-full object-cover border border-white/20 relative z-10" />
            </div>
            <span className="text-lg font-semibold text-white">Prathamsinh</span>
          </a>
          <button className="text-white focus:outline-none" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -20, height: 0 }}
            className="md:hidden px-6 pt-4 overflow-hidden"
          >
            <div className="glass rounded-3xl p-6 flex flex-col space-y-4 shadow-2xl border border-white/10">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-4 text-xl font-bold text-foreground/80 hover:text-accent2 hover:bg-accent2/10 p-4 rounded-xl transition-all"
                >
                  {link.icon}
                  {link.name}
                </a>
              ))}
              <div className="border-t border-white/10 pt-4 mt-2">
                <a 
                  href="#contact" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-4 glass text-white rounded-xl font-bold border-white/10 shadow-[0_0_15px_rgba(204,255,0,0.3)] transition-all hover:scale-[1.02]"
                >
                  <Mail size={18} /> Let's Connect
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
