import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

const BackgroundMusic = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const handleStart = () => {
      if (audioRef.current) {
        audioRef.current.volume = 0.15; // subtle background ambience
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(err => console.log("Autoplay blocked:", err));
      }
    };

    window.addEventListener('start-music', handleStart);
    return () => window.removeEventListener('start-music', handleStart);
  }, []);

  const toggleMute = () => {
    if (!audioRef.current) return;
    const nextMute = !isMuted;
    
    if (nextMute) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(err => console.log("Play error:", err));
    }
    
    setIsMuted(nextMute);
  };

  return (
    <>
      <audio 
        ref={audioRef}
        src="/Music/Boombastic.mp3" 
        loop 
        preload="auto"
      />
      
      <div className="fixed bottom-8 right-8 z-[10001] flex items-center gap-3">
        <AnimatePresence>
          {isPlaying && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleMute}
              className="w-12 h-12 rounded-full glass border border-white/10 flex items-center justify-center shadow-xl group transition-all"
            >
              {isMuted ? (
                <VolumeX size={20} className="text-white/60 group-hover:text-white" />
              ) : (
                <div className="relative">
                  <Volume2 size={20} className="text-accent2 group-hover:text-accent1" />
                  <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent1 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-accent1"></span>
                  </span>
                </div>
              )}
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default BackgroundMusic;
