import { motion } from 'framer-motion';
import type { WeatherOption } from '@/types/weather';

interface WeatherCardProps {
  weather: WeatherOption;
  onClick: () => void;
  index: number;
}

const WeatherCard = ({ weather, onClick, index }: WeatherCardProps) => {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: 'easeOut' }}
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="group flex flex-col items-center p-4 sm:p-6 rounded-2xl bg-card/60 backdrop-blur-sm border border-border/50 shadow-soft hover:shadow-card transition-all duration-300 cursor-pointer"
    >
      <div className="relative w-20 h-20 sm:w-24 sm:h-24 mb-3 sm:mb-4">
        <img
          src={weather.icon}
          alt={weather.name}
          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      <h3 className="text-base sm:text-lg font-medium text-foreground mb-1 font-display">
        {weather.name}
      </h3>
      <p className="text-xs sm:text-sm text-muted-foreground text-center">
        {weather.description}
      </p>
    </motion.button>
  );
};

export default WeatherCard;
