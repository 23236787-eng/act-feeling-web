import { motion } from 'framer-motion';
import type { FloatingEmoji as FloatingEmojiType } from '@/types/weather';

interface FloatingEmojiProps {
  emoji: FloatingEmojiType;
  onComplete?: () => void;
}

const FloatingEmoji = ({ emoji, onComplete }: FloatingEmojiProps) => {
  return (
    <motion.div
      key={emoji.id}
      initial={{ 
        opacity: 0, 
        scale: 0.5,
        x: emoji.x,
        y: '100vh'
      }}
      animate={{ 
        opacity: [0, 1, 1, 0.6],
        scale: [0.5, 1, 0.9, 0.8],
        y: `${emoji.y}vh`,
        x: [emoji.x, emoji.x + 20, emoji.x - 10, emoji.x + 15]
      }}
      transition={{ 
        duration: emoji.duration,
        delay: emoji.delay,
        ease: 'easeOut',
        x: {
          duration: emoji.duration * 2,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut'
        }
      }}
      onAnimationComplete={onComplete}
      className="absolute text-3xl sm:text-4xl pointer-events-none select-none"
      style={{ 
        left: `${emoji.x}%`,
        filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))',
        zIndex: 10 
      }}
    >
      {emoji.emoji}
    </motion.div>
  );
};

export default FloatingEmoji;
