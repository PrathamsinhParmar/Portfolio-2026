import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, FolderGit2, User, Menu, X, Mail } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home', icon: <Home size={18} /> },
    { name: 'My Projects', href: '#projects', icon: <FolderGit2 size={18} /> },
    { name: 'About Me', href: '#about', icon: <User size={18} /> }
  ];

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-500 py-6`}>
      <div className="container mx-auto px-6 max-w-[1400px]">
        {/* Desktop View */}
        <div className="hidden md:flex items-center justify-between">
          
          {/* Logo Left */}
          <div className="flex-1">
            <a href="#" className="text-xl font-bold tracking-tight text-foreground group flex items-center gap-2">
              <span className="bg-foreground text-background w-8 h-8 rounded-full flex items-center justify-center font-black">P</span>
              Prathamsinh
            </a>
          </div>

          {/* Central Pill Nav */}
          <nav className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-500 ${scrolled ? 'glass shadow-2xl' : 'bg-transparent'}`}>
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-foreground/80 hover:text-accent2 hover:bg-accent2/10 transition-all"
              >
                {link.icon}
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Contact Button */}
          <div className="flex-1 flex justify-end">
             <a 
              href="#contact" 
              className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${scrolled ? 'bg-accent1 text-black hover:scale-105 shadow-[0_0_15px_rgba(204,255,0,0.5)]' : 'glass text-foreground hover:bg-accent1 hover:text-black hover:shadow-[0_0_15px_rgba(204,255,0,0.5)]'}`}
             >
               Contact Me
             </a>
          </div>
        </div>

        {/* Mobile View */}
        <div className="md:hidden flex items-center justify-between glass px-6 py-4 rounded-full">
          <a href="#" className="font-bold text-lg">Prathamsinh</a>
          <button className="text-foreground focus:outline-none" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
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
            className="md:hidden px-6 pt-4 overlow-hidden"
          >
            <div className="glass rounded-3xl p-6 flex flex-col space-y-4 shadow-2xl border border-white/10">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 text-lg font-medium text-foreground/80 hover:text-accent2 hover:bg-accent2/10 p-3 rounded-xl transition-all"
                >
                  {link.icon}
                  {link.name}
                </a>
              ))}
              <div className="border-t border-white/10 pt-4 mt-2">
                <a 
                  href="#contact" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-4 bg-accent1 text-black rounded-xl font-bold shadow-[0_0_15px_rgba(204,255,0,0.3)] transition-all hover:scale-[1.02]"
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
