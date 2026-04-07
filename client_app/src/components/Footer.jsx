import React from 'react';

const Footer = () => {
  return (
    <footer className="relative bg-background pt-24 pb-12 overflow-hidden border-t border-white/10">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div>
            <h3 className="text-2xl font-bold mb-6">Explore</h3>
            <ul className="space-y-4 text-muted">
              <li><a href="#home" className="hover:text-foreground transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-foreground transition-colors">About</a></li>
              <li><a href="#projects" className="hover:text-foreground transition-colors">Projects</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-6">Social</h3>
            <ul className="space-y-4 text-muted">
              <li><a href="https://github.com/PrathamsinhParmar" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">GitHub</a></li>
              <li><a href="https://www.linkedin.com/in/prathamsinhparmar-2162a2300" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">LinkedIn</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-6">Say Hello</h3>
            <ul className="space-y-4 text-muted">
              <li><a href="mailto:prthamsinhparmar0@gmail.com" className="hover:text-foreground transition-colors">prthamsinhparmar0@gmail.com</a></li>
              <li>Karjan, Vadodara, Gujarat</li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted pt-8 border-t border-white/10">
          <p>© 2026 Prathamsinh Parmar. Crafted with care.</p>
          <p>Full-Stack Developer • AI Enthusiast</p>
        </div>
      </div>

      {/* Massive Backdrop Text */}
      <div className="absolute bottom-[-5%] left-0 w-full overflow-hidden flex justify-center items-center opacity-[0.03] select-none pointer-events-none">
        <h1 className="text-[15vw] font-black tracking-tighter whitespace-nowrap">PRATHAMSINH</h1>
      </div>
    </footer>
  );
};

export default Footer;
