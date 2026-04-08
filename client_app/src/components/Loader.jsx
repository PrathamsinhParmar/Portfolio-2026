import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Loader = ({ onLoadingComplete }) => {
  const [show, setShow] = useState(true);
  const [started, setStarted] = useState(false);
  const words = ["Hello", "नमस्ते", "કેમ છો Developer ?", "મજામાં ને ?",];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!started) return;

    if (index < words.length - 1) {
      setTimeout(() => {
        setIndex(index + 1);
      }, index >= words.length - 3 ? 1200 : 900); // Very slow transitions
    } else {
      setTimeout(() => {
        setShow(false);
        setTimeout(onLoadingComplete, 1500);
      }, 2500); // Prolonged final pause for reading
    }
  }, [index, onLoadingComplete, words.length, started]);

  const handleStart = () => {
    setStarted(true);
    // Dispatch custom event to trigger music
    window.dispatchEvent(new Event('start-music'));
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="loader"
          initial={{ y: 0 }}
          exit={{ y: "-100vh" }}
          transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
          onClick={!started ? handleStart : undefined}
        >
          {!started ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-6 cursor-pointer group"
            >
              <div className="relative w-24 h-24 flex items-center justify-center">
                <div className="absolute inset-0 border-2 border-accent2/30 rounded-full animate-ping" />
                <div className="absolute inset-2 border-2 border-accent1/50 rounded-full animate-spin [animation-duration:3s]" />
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-accent1 to-accent2 flex items-center justify-center shadow-[0_0_30px_rgba(0,240,255,0.4)] group-hover:scale-110 transition-transform">
                  <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[14px] border-l-black border-b-[8px] border-b-transparent ml-1" />
                </div>
              </div>
              <p className="text-white/50 text-sm font-black tracking-[0.3em] uppercase group-hover:text-white transition-colors">Click to Enter Experience</p>
            </motion.div>
          ) : (
            <div className="flex items-center justify-center py-20 px-8 pointer-events-none">
              <motion.h1
                key={index}
                initial={{ y: 70, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -70, opacity: 0 }}
                transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
                className={`font-black tracking-tighter whitespace-nowrap ${index >= words.length - 3
                  ? "text-4xl md:text-6xl bg-gradient-to-r from-accent2 via-accent3 to-accent1 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(255,0,85,0.4)]"
                  : "text-4xl md:text-5xl text-white/90"
                  }`}
              >
                {words[index]}
              </motion.h1>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};


export default Loader;
