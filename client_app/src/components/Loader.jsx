import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Loader = ({ onLoadingComplete }) => {
  const [show, setShow] = useState(true);
  const words = ["Ciao", "Hello", "Hola", "Bonjour", "Namaste", "Welcome"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < words.length - 1) {
      setTimeout(() => {
        setIndex(index + 1);
      }, 150);
    } else {
      setTimeout(() => {
        setShow(false);
        setTimeout(onLoadingComplete, 800); // Wait for exit animation
      }, 800);
    }
  }, [index, onLoadingComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="loader"
          initial={{ y: 0 }}
          exit={{ y: "-100vh" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background pointer-events-none"
        >
          <div className="flex items-center space-x-4 text-foreground/80 overflow-hidden">
            <span className="w-2 h-2 rounded-full bg-foreground" />
            <motion.h1 
              key={index}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="text-4xl md:text-5xl font-medium tracking-tight"
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
