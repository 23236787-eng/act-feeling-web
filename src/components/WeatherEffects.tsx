import { useMemo } from 'react';
import { motion } from 'framer-motion';
import type { WeatherType } from '@/types/weather';

interface WeatherEffectsProps {
  weatherType: WeatherType;
}

interface RainEffect {
  id: number;
  type: 'rain';
  x: number;
  delay: number;
  duration: number;
}

interface SnowEffect {
  id: number;
  type: 'snow';
  x: number;
  delay: number;
  duration: number;
}

interface LightningEffect {
  id: number;
  type: 'lightning';
  delay: number;
}

interface StarEffect {
  id: number;
  type: 'star';
  x: number;
  y: number;
  delay: number;
  duration: number;
}

interface FogEffect {
  id: number;
  type: 'fog';
  y: number;
  delay: number;
}

type WeatherEffect = RainEffect | SnowEffect | LightningEffect | StarEffect | FogEffect;

const WeatherEffects = ({ weatherType }: WeatherEffectsProps) => {
  const effects = useMemo((): WeatherEffect[] => {
    switch (weatherType) {
      case 'sadness':
        return Array.from({ length: 30 }, (_, i): RainEffect => ({
          id: i,
          type: 'rain',
          x: Math.random() * 100,
          delay: Math.random() * 2,
          duration: 1 + Math.random() * 0.5,
        }));
      
      case 'tired':
        return Array.from({ length: 25 }, (_, i): SnowEffect => ({
          id: i,
          type: 'snow',
          x: Math.random() * 100,
          delay: Math.random() * 3,
          duration: 4 + Math.random() * 3,
        }));

      case 'anxiety':
        return Array.from({ length: 3 }, (_, i): LightningEffect => ({
          id: i,
          type: 'lightning',
          delay: i * 4 + Math.random() * 2,
        }));

      case 'lonely':
        return Array.from({ length: 20 }, (_, i): StarEffect => ({
          id: i,
          type: 'star',
          x: Math.random() * 100,
          y: Math.random() * 50,
          delay: Math.random() * 2,
          duration: 2 + Math.random() * 2,
        }));

      case 'confused':
        return Array.from({ length: 5 }, (_, i): FogEffect => ({
          id: i,
          type: 'fog',
          y: 20 + i * 15,
          delay: i * 2,
        }));

      default:
        return [];
    }
  }, [weatherType]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-5">
      {effects.map((effect) => {
        if (effect.type === 'rain') {
          return (
            <motion.div
              key={effect.id}
              initial={{ y: '-10%', opacity: 0 }}
              animate={{ y: '110%', opacity: [0, 0.6, 0.6, 0] }}
              transition={{
                duration: effect.duration,
                delay: effect.delay,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="absolute w-0.5 h-4 bg-gradient-to-b from-transparent via-blue-300/50 to-blue-400/30 rounded-full"
              style={{ left: `${effect.x}%` }}
            />
          );
        }

        if (effect.type === 'snow') {
          return (
            <motion.div
              key={effect.id}
              initial={{ y: '-5%', opacity: 0, rotate: 0 }}
              animate={{ 
                y: '105%', 
                opacity: [0, 0.8, 0.8, 0],
                rotate: 360,
                x: [0, 20, -10, 15, 0]
              }}
              transition={{
                duration: effect.duration,
                delay: effect.delay,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="absolute w-2 h-2 bg-white/70 rounded-full shadow-sm"
              style={{ left: `${effect.x}%` }}
            />
          );
        }

        if (effect.type === 'lightning') {
          return (
            <motion.div
              key={effect.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.8, 0, 0.4, 0] }}
              transition={{
                duration: 0.5,
                delay: effect.delay,
                repeat: Infinity,
                repeatDelay: 4 + Math.random() * 4,
              }}
              className="absolute inset-0 bg-yellow-100/20"
            />
          );
        }

        if (effect.type === 'star') {
          return (
            <motion.div
              key={effect.id}
              initial={{ opacity: 0.3, scale: 1 }}
              animate={{ 
                opacity: [0.3, 1, 0.3],
                scale: [1, 1.3, 1]
              }}
              transition={{
                duration: effect.duration,
                delay: effect.delay,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute w-1.5 h-1.5 bg-white rounded-full"
              style={{ 
                left: `${effect.x}%`, 
                top: `${effect.y}%`,
                boxShadow: '0 0 6px rgba(255,255,255,0.8)'
              }}
            />
          );
        }

        if (effect.type === 'fog') {
          return (
            <motion.div
              key={effect.id}
              initial={{ x: '-20%', opacity: 0.3 }}
              animate={{ x: '20%', opacity: [0.3, 0.5, 0.3] }}
              transition={{
                duration: 20,
                delay: effect.delay,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut',
              }}
              className="absolute w-full h-24 bg-gradient-to-r from-transparent via-white/20 to-transparent blur-xl"
              style={{ top: `${effect.y}%` }}
            />
          );
        }

        return null;
      })}
    </div>
  );
};

export default WeatherEffects;
