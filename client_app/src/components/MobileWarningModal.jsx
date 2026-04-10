import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Monitor, Smartphone, X } from 'lucide-react';

const MobileWarningModal = ({ loadingComplete = true }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if on mobile (screen width or user agent)
    const isMobile = window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    if (isMobile && loadingComplete) {
      // Delay presentation slightly after the loader resolves for a clean entrance
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [loadingComplete]);

  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isVisible]);

  const handleDismiss = () => {
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm px-6 md:hidden"
        >
          <motion.div
            initial={{ scale: 0.8, y: 50, opacity: 0, rotateX: 20 }}
            animate={{ scale: 1, y: 0, opacity: 1, rotateX: 0 }}
            exit={{ scale: 0.9, y: 30, opacity: 0, rotateX: -20 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
            className="w-full max-w-sm glass bg-[#050505]/95 border border-white/10 rounded-[2rem] p-8 relative overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.6)]"
          >
            {/* Background glowing orbs reflecting the theme */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-accent2/20 blur-[40px] rounded-full pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-accent3/20 blur-[50px] rounded-full pointer-events-none" />

            <button 
              onClick={handleDismiss}
              className="absolute top-5 right-5 text-white/40 hover:text-white transition-colors focus:outline-none z-20"
            >
              <X size={20} strokeWidth={2.5} />
            </button>

            <div className="flex flex-col items-center text-center mt-4 relative z-10">
              
              <div className="relative mb-8">
                <div className="w-[100px] h-[100px] rounded-full bg-gradient-to-tr from-accent2 via-accent3 to-accent1 p-[3px] animate-pulse shadow-[0_0_25px_rgba(0,240,255,0.4)]">
                  <div className="w-full h-full bg-[#050505] rounded-full flex items-center justify-center relative overflow-hidden">
                    <Monitor className="text-white/10 w-10 h-10 absolute scale-75 -translate-y-3 translate-x-3" />
                    <Smartphone className="text-white w-10 h-10 absolute animate-bounce" />
                  </div>
                </div>
              </div>

              <h3 className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-white/90 uppercase tracking-tighter mb-6 leading-none">
                Mobile View <br />
                <span className="text-white mt-1 block">Detected <span className="inline-block animate-wiggle">👀</span></span>
              </h3>
              
              <div className="text-white/70 text-[16px] font-medium mb-10 leading-[1.8] tracking-wide px-2">
                <p className="mb-2">We noticed you're browsing from a phone.</p>
                <p>For the ultimate 3D experience, smooth interactions, and perfect pixel-alignment, we strongly advise diving into this portfolio on a <span className="text-accent2 drop-shadow-[0_0_5px_rgba(0,240,255,0.8)] font-black text-[17px]">Laptop</span> or <span className="text-accent3 drop-shadow-[0_0_5px_rgba(255,0,85,0.8)] font-black text-[17px]">Desktop</span>.</p>
                <p className="mt-2 text-white/40 italic text-sm">But hey, you can still take a peek!</p>
              </div>

              <button
                onClick={handleDismiss}
                className="w-full py-4 sm:py-5 rounded-2xl bg-white text-black font-black text-sm sm:text-base tracking-[0.2em] uppercase hover:bg-accent1 hover:shadow-[0_0_20px_rgba(204,255,0,0.6)] transition-all duration-300 relative group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-accent2 via-accent3 to-accent1 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                <span className="relative z-10">BROWSE ANYWAY</span>
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileWarningModal;
