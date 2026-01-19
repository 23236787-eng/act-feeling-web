import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import type { FloatingEmoji as FloatingEmojiType } from '@/types/weather';

interface FloatingEmojiProps {
  emoji: FloatingEmojiType;
  onComplete?: () => void;
}

const FloatingEmoji = ({ emoji, onComplete }: FloatingEmojiProps) => {
  // Continuous drifting animation state
  const [driftX, setDriftX] = useState(emoji.x);
  
  useEffect(() => {
    // Random drift across the sky
    const interval = setInterval(() => {
      setDriftX(prev => {
        const drift = (Math.random() - 0.5) * 15; // Random drift -7.5% to +7.5%
        const newX = prev + drift;
        // Keep within bounds (5% to 95%)
        return Math.max(5, Math.min(95, newX));
      });
    }, 2000 + Math.random() * 1000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      key={emoji.id}
      initial={{ 
        opacity: 0, 
        scale: 0.5,
        y: '100vh'
      }}
      animate={{ 
        opacity: [0, 1, 1, 0.8],
        scale: [0.5, 1.1, 0.95, 1],
        y: `${emoji.y}vh`,
        x: `${driftX}vw`,
      }}
      transition={{ 
        duration: emoji.duration * 0.5, // Faster float up
        delay: emoji.delay,
        ease: 'easeOut',
        x: {
          duration: 3,
          ease: 'easeInOut'
        }
      }}
      onAnimationComplete={onComplete}
      className="absolute text-3xl sm:text-4xl pointer-events-none select-none"
      style={{ 
        filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.15))',
        zIndex: 10 
      }}
    >
      {emoji.emoji}
    </motion.div>
  );
};

export default FloatingEmoji;
