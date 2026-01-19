import { motion } from 'framer-motion';

interface BreathingGuideProps {
  isVisible: boolean;
  onToggle: () => void;
}

const BreathingGuide = ({ isVisible, onToggle }: BreathingGuideProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.6, duration: 0.5 }}
      className="fixed bottom-24 right-4 sm:bottom-28 sm:right-6 z-20"
    >
      <motion.button
        onClick={onToggle}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative group"
      >
        <motion.div
          animate={isVisible ? {
            scale: [1, 1.15, 1],
            opacity: [0.7, 1, 0.7]
          } : {}}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-primary/30 to-accent/40 backdrop-blur-sm border border-border/30 shadow-glow flex items-center justify-center"
        >
          <motion.div
            animate={isVisible ? {
              scale: [0.6, 1, 0.6],
            } : { scale: 0.8 }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-primary/60"
          />
        </motion.div>
        
        {/* Tooltip */}
        <span className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1.5 rounded-lg bg-card/90 backdrop-blur-sm text-xs text-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-soft border border-border/30">
          {isVisible ? '暫停呼吸引導' : '開始呼吸引導'}
        </span>
      </motion.button>

      {isVisible && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute -left-16 sm:-left-20 top-1/2 -translate-y-1/2 text-xs text-foreground/70 font-medium whitespace-nowrap"
        >
          <motion.span
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 4, repeat: Infinity, times: [0, 0.5, 1] }}
          >
            吸氣... 吐氣...
          </motion.span>
        </motion.p>
      )}
    </motion.div>
  );
};

export default BreathingGuide;
