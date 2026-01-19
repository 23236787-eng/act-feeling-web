import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { RefreshCw, Home } from 'lucide-react';
import { weatherOptions } from '@/data/weatherData';

interface LocationState {
  weatherId?: string;
  emojiCount?: number;
  emojis?: string[];
}

const Complete = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState;

  const weather = state?.weatherId 
    ? weatherOptions.find(w => w.id === state.weatherId)
    : null;

  const emojis = state?.emojis || [];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background - softened version of the weather scene */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: weather ? `url(${weather.scene})` : undefined,
          filter: 'brightness(1.1) saturate(0.8)'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/50 to-background/80" />
      </div>

      {/* Floating emojis display */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {emojis.slice(0, 15).map((emoji, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 0.6,
              y: [0, -10, 0],
              x: [0, 5, -5, 0]
            }}
            transition={{
              delay: index * 0.1,
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className="absolute text-2xl sm:text-3xl"
            style={{
              left: `${10 + (index * 6) % 80}%`,
              top: `${10 + (index * 7) % 50}%`,
            }}
          >
            {emoji}
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center max-w-lg mx-auto"
        >
          {/* Decorative element */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-primary/30 to-accent/40 flex items-center justify-center shadow-glow">
              <span className="text-3xl">🌈</span>
            </div>
          </motion.div>

          {/* Main message */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-2xl sm:text-3xl font-display font-medium text-foreground mb-6 leading-relaxed"
          >
            你不僅觀察了天氣，<br />
            還用屬於你的符號，<br />
            <span className="text-primary">溫柔地擁抱了它。</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-muted-foreground mb-8 leading-relaxed"
          >
            這片有你印記的天空，很美。<br />
            歡迎隨時回來。
          </motion.p>

          {/* Stats */}
          {emojis.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mb-10 p-4 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/30"
            >
              <p className="text-sm text-muted-foreground mb-2">
                你在天空中留下了
              </p>
              <p className="text-lg font-medium text-foreground">
                {emojis.length} 個溫柔的記號
              </p>
              <div className="mt-3 flex flex-wrap justify-center gap-1">
                {emojis.slice(0, 10).map((emoji, i) => (
                  <span key={i} className="text-xl">{emoji}</span>
                ))}
                {emojis.length > 10 && (
                  <span className="text-sm text-muted-foreground self-center ml-1">
                    +{emojis.length - 10}
                  </span>
                )}
              </div>
            </motion.div>
          )}

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/')}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium shadow-soft hover:shadow-card transition-all"
            >
              <RefreshCw className="w-4 h-4" />
              再次觀測
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/')}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-card/70 backdrop-blur-sm border border-border/50 text-foreground font-medium shadow-soft hover:shadow-card transition-all"
            >
              <Home className="w-4 h-4" />
              清空天空 / 新的開始
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Complete;
