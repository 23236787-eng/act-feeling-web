import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import WeatherCard from '@/components/WeatherCard';
import { weatherOptions } from '@/data/weatherData';
import dawnHills from '@/assets/dawn-hills.jpg';

const Index = () => {
  const navigate = useNavigate();

  const handleWeatherSelect = (weatherId: string) => {
    navigate(`/weather/${weatherId}`);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{ backgroundImage: `url(${dawnHills})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center mb-10 sm:mb-14"
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-4xl sm:text-5xl md:text-6xl font-display font-semibold text-foreground mb-4 tracking-wide"
          >
            心境氣象站
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-md mx-auto leading-relaxed"
          >
            觀察情緒的天氣，為它騰出空間。
          </motion.p>
        </motion.div>

        {/* Weather Selection Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-6 max-w-3xl mx-auto"
        >
          {weatherOptions.map((weather, index) => (
            <WeatherCard
              key={weather.id}
              weather={weather}
              onClick={() => handleWeatherSelect(weather.id)}
              index={index}
            />
          ))}
        </motion.div>

        {/* Footer hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-10 sm:mt-14 text-sm text-muted-foreground/60 text-center max-w-sm"
        >
          選擇一種天氣，開始你的情緒觀察之旅
        </motion.p>
      </div>
    </div>
  );
};

export default Index;
