import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Loader = ({ onLoadingComplete }) => {
  const [show, setShow] = useState(true);
  const words = ["Hello", "नमस्ते", "કેમ છો Developer ?", "મજામાં ને ?",];
  const [index, setIndex] = useState(0);

  useEffect(() => {
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
  }, [index, onLoadingComplete, words.length]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="loader"
          initial={{ y: 0 }}
          exit={{ y: "-100vh" }}
          transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background pointer-events-none"
        >
          <div className="flex items-center justify-center py-20 px-8">
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
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
