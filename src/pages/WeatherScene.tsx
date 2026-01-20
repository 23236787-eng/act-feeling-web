import { useState, useCallback, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Check } from 'lucide-react';
import EmojiInput from '@/components/EmojiInput';
import FloatingEmoji from '@/components/FloatingEmoji';
import BreathingGuide from '@/components/BreathingGuide';
import WeatherEffects from '@/components/WeatherEffects';
import { weatherOptions } from '@/data/weatherData';
import type { FloatingEmoji as FloatingEmojiType, WeatherType } from '@/types/weather';

const MAX_EMOJIS = 20;

const WeatherScene = () => {
  const { weatherId } = useParams<{ weatherId: string }>();
  const navigate = useNavigate();
  const [emojis, setEmojis] = useState<FloatingEmojiType[]>([]);
  const [isBreathing, setIsBreathing] = useState(false);

  const weather = useMemo(() => 
    weatherOptions.find(w => w.id === weatherId),
    [weatherId]
  );

  const handleSendEmoji = useCallback((emoji: string) => {
    if (emojis.length >= MAX_EMOJIS) {
      // Remove oldest emoji when limit reached
      setEmojis(prev => prev.slice(1));
    }

    const newEmoji: FloatingEmojiType = {
      id: `${Date.now()}-${Math.random()}`,
      emoji,
      x: 10 + Math.random() * 80, // Random horizontal position (10-90%)
      y: 5 + Math.random() * 40, // Final vertical position (5-45%)
      delay: 0,
      duration: 6 + Math.random() * 4, // 6-10 seconds to float up
    };

    setEmojis(prev => [...prev, newEmoji]);
  }, [emojis.length]);

  const handleComplete = () => {
    navigate('/complete', { 
      state: { 
        weatherId,
        emojiCount: emojis.length,
        emojis: emojis.map(e => e.emoji)
      } 
    });
  };

  if (!weather) {
    navigate('/');
    return null;
  }

  const guidanceText = {
    anxiety: '感受這場風暴…那些閃電不是要傷害你，它們只是路過。如果你想，可以為你感受到的一切，在天空中留下一個溫柔的記號。',
    sadness: '允許這場雨落下…每一滴都是你的心在說話。如果你想，可以為你感受到的一切，在天空中留下一個溫柔的記號。',
    anger: '這片晚霞很美，即使它燃燒著…你的感受是被允許的。如果你想，可以為你感受到的一切，在天空中留下一個溫柔的記號。',
    confused: '在這片霧中慢慢走…不必急著看清一切。如果你想，可以為你感受到的一切，在天空中留下一個溫柔的記號。',
    tired: '讓這場雪輕輕覆蓋你…允許自己休息。如果你想，可以為你感受到的一切，在天空中留下一個溫柔的記號。',
    lonely: '夜空中有你一個人…但也有無數星星陪著你。如果你想，可以為你感受到的一切，在天空中留下一個溫柔的記號。',
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Scene */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000"
        style={{ backgroundImage: `url(${weather.scene})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/40" />
      </div>

      {/* Weather Effects */}
      <WeatherEffects weatherType={weather.id as WeatherType} />

      {/* Floating Emojis */}
      <AnimatePresence>
        {emojis.map((emoji) => (
          <FloatingEmoji key={emoji.id} emoji={emoji} />
        ))}
      </AnimatePresence>

      {/* Navigation */}
      <div className="absolute top-4 left-4 right-4 z-30 flex justify-between items-center">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/')}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/70 backdrop-blur-sm border border-border/40 text-foreground/80 hover:text-foreground shadow-soft transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">返回觀測站</span>
        </motion.button>

        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleComplete}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/80 backdrop-blur-sm text-primary-foreground shadow-soft transition-colors hover:bg-primary"
        >
          <Check className="w-4 h-4" />
          <span className="text-sm font-medium">練習完成</span>
        </motion.button>
      </div>

      {/* Guidance Card */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="absolute top-20 left-1/2 -translate-x-1/2 z-20 w-full max-w-lg px-4"
      >
        <div className="p-4 sm:p-5 rounded-2xl bg-card/60 backdrop-blur-md border border-border/30 shadow-card">
          <p className="text-sm sm:text-base text-foreground/90 leading-relaxed text-center font-light">
            {guidanceText[weather.id as keyof typeof guidanceText]}
          </p>
        </div>
      </motion.div>

      {/* Emoji Counter */}
      {emojis.length > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute top-24 right-4 sm:top-20 sm:right-6 z-20 px-3 py-1.5 rounded-full bg-card/60 backdrop-blur-sm border border-border/30 text-xs text-muted-foreground"
        >
          {emojis.length} / {MAX_EMOJIS}
        </motion.div>
      )}

      {/* Emoji Input - Centered on screen */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
        <div className="pointer-events-auto">
          <EmojiInput 
            onSendEmoji={handleSendEmoji}
            disabled={emojis.length >= MAX_EMOJIS}
            recentEmojis={emojis.map(e => e.emoji)}
          />
        </div>
      </div>

      {/* Breathing Guide */}
      <BreathingGuide 
        isVisible={isBreathing}
        onToggle={() => setIsBreathing(!isBreathing)}
      />
    </div>
  );
};

export default WeatherScene;
