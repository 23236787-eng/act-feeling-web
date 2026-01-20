import weatherAnxiety from '@/assets/weather-anxiety.png';
import weatherSadness from '@/assets/weather-sadness.png';
import weatherAnger from '@/assets/weather-anger.png';
import weatherConfused from '@/assets/weather-confused.png';
import weatherTired from '@/assets/weather-tired-v2.png';
import weatherLonely from '@/assets/weather-lonely.png';
import sceneStorm from '@/assets/scene-storm.jpg';
import sceneRain from '@/assets/scene-rain.jpg';
import sceneSunset from '@/assets/scene-sunset.jpg';
import sceneFog from '@/assets/scene-fog.jpg';
import sceneSnow from '@/assets/scene-snow.jpg';
import sceneNight from '@/assets/scene-night.jpg';
import type { WeatherOption } from '@/types/weather';

export const weatherOptions: WeatherOption[] = [
  {
    id: 'anxiety',
    name: '焦慮 / 緊張',
    description: '心中像有閃電在跳動',
    icon: weatherAnxiety,
    scene: sceneStorm,
    gradient: 'bg-gradient-storm',
    ambientSound: 'thunder',
  },
  {
    id: 'sadness',
    name: '悲傷 / 低落',
    description: '淅淅瀝瀝的心情',
    icon: weatherSadness,
    scene: sceneRain,
    gradient: 'bg-gradient-rain',
    ambientSound: 'rain',
  },
  {
    id: 'anger',
    name: '憤怒 / 煩躁',
    description: '內心燃燒著晚霞',
    icon: weatherAnger,
    scene: sceneSunset,
    gradient: 'bg-gradient-sunset',
    ambientSound: 'fire',
  },
  {
    id: 'confused',
    name: '迷茫 / 不確定',
    description: '像走在晨霧之中',
    icon: weatherConfused,
    scene: sceneFog,
    gradient: 'bg-gradient-fog',
    ambientSound: 'wind',
  },
  {
    id: 'tired',
    name: '疲憊 / 無力',
    description: '需要一場柔軟的雪',
    icon: weatherTired,
    scene: sceneSnow,
    gradient: 'bg-gradient-snow',
    ambientSound: 'snow',
  },
  {
    id: 'lonely',
    name: '孤獨',
    description: '在夜空中尋找星星',
    icon: weatherLonely,
    scene: sceneNight,
    gradient: 'bg-gradient-night',
    ambientSound: 'night',
  },
];

export const commonEmojis = [
  '💭', '🌸', '🍃', '✨', '🌙', '💫', '🦋', '🌿',
  '🌊', '☁️', '🔥', '❄️', '🌈', '💧', '🍂', '🌻'
];
