import React from 'react';

const Footer = () => {
  return (
    <footer className="relative bg-accent2 text-black pt-24 pb-12 overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div>
            <h3 className="text-2xl font-black mb-6 uppercase">Explore</h3>
            <ul className="space-y-4 text-black/80 font-bold">
              <li><a href="#home" className="hover:opacity-70 transition-opacity">Home</a></li>
              <li><a href="#about" className="hover:opacity-70 transition-opacity">About</a></li>
              <li><a href="#projects" className="hover:opacity-70 transition-opacity">Projects</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-black mb-6 uppercase">Social</h3>
            <ul className="space-y-4 text-black/80 font-bold">
              <li><a href="https://github.com/PrathamsinhParmar" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">GitHub</a></li>
              <li><a href="https://www.linkedin.com/in/prathamsinhparmar-2162a2300" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">LinkedIn</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-black mb-6 uppercase">Say Hello</h3>
            <ul className="space-y-4 text-black/80 font-bold">
              <li><a href="mailto:prthamsinhparmar0@gmail.com" className="hover:opacity-70 transition-opacity">prthamsinhparmar0@gmail.com</a></li>
              <li>Karjan, Vadodara, Gujarat</li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-black/60 font-bold pt-8 border-t border-black/20">
          <p>© 2026 Prathamsinh Parmar. Crafted with care.</p>
          <p>Full-Stack Developer • AI Enthusiast</p>
        </div>
      </div>

      {/* Massive Backdrop Text */}
      <div className="absolute bottom-[-5%] left-0 w-full overflow-hidden flex justify-center items-center opacity-[0.08] text-black select-none pointer-events-none">
        <h1 className="text-[15vw] font-black tracking-tighter whitespace-nowrap">PRATHAMSINH</h1>
      </div>
    </footer>
  );
};

export default Footer;
