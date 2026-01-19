export type WeatherType = 'anxiety' | 'sadness' | 'anger' | 'confused' | 'tired' | 'lonely';

export interface WeatherOption {
  id: WeatherType;
  name: string;
  description: string;
  icon: string;
  scene: string;
  gradient: string;
  ambientSound: string;
}

export interface FloatingEmoji {
  id: string;
  emoji: string;
  x: number;
  y: number;
  delay: number;
  duration: number;
}
