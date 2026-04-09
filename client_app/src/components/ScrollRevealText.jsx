import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Word = ({ children, progress, range, revealClassName }) => {
  const opacity = useTransform(progress, range, [0, 1]);
  return (
    <span className="relative mr-[0.4em] md:mr-[0.25em] inline-block">
      {/* Dim Base Layer */}
      <span className="text-white/25 select-none">{children}</span>
      {/* Bright Animated Layer */}
      <motion.span 
        style={{ opacity }} 
        className={`absolute top-0 left-0 h-full w-full ${revealClassName || ''}`}
      >
        {children}
      </motion.span>
    </span>
  );
};

const ScrollRevealText = ({ text, segments, className, revealClassName }) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 0.95", "start 0.2"]
  });

  // Normalize input to an array of word objects to support multiple colors
  let allWords = [];
  if (segments) {
    segments.forEach(seg => {
      seg.text.split(" ").filter(w => w !== "").forEach(word => {
        allWords.push({ word, revealClassName: seg.revealClassName || revealClassName });
      });
    });
  } else if (text) {
    text.split(" ").forEach(word => {
      allWords.push({ word, revealClassName });
    });
  }

  return (
    <div ref={container} className={`flex flex-wrap ${className}`}>
      {allWords.map((item, i) => {
        const start = i / (allWords.length || 1);
        const end = Math.min(start + 0.15, 1);
        return (
          <Word 
            key={i} 
            progress={scrollYProgress} 
            range={[start, end]}
            revealClassName={item.revealClassName}
          >
            {item.word}
          </Word>
        );
      })}
    </div>
  );
};

export default ScrollRevealText;
