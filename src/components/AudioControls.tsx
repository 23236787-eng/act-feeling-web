import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, Pause, Play } from 'lucide-react';

interface AudioControlsProps {
  weatherType: string;
}

// Use free ambient audio URLs from freesound.org (Creative Commons)
const ambientSounds: Record<string, string> = {
  thunder: 'https://assets.mixkit.co/active_storage/sfx/212/212-preview.mp3',
  rain: 'https://assets.mixkit.co/active_storage/sfx/2515/2515-preview.mp3',
  fire: 'https://assets.mixkit.co/active_storage/sfx/2511/2511-preview.mp3',
  wind: 'https://assets.mixkit.co/active_storage/sfx/2514/2514-preview.mp3',
  snow: 'https://assets.mixkit.co/active_storage/sfx/2514/2514-preview.mp3', // Using wind for snow
  night: 'https://assets.mixkit.co/active_storage/sfx/2430/2430-preview.mp3',
};

const AudioControls = ({ weatherType }: AudioControlsProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const soundUrl = ambientSounds[weatherType] || ambientSounds.rain;
    
    if (audioRef.current) {
      audioRef.current.pause();
    }
    
    audioRef.current = new Audio(soundUrl);
    audioRef.current.loop = true;
    audioRef.current.volume = isMuted ? 0 : volume;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [weatherType]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(console.error);
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.8, duration: 0.5 }}
      className="fixed bottom-24 left-4 sm:bottom-28 sm:left-6 z-20 flex items-center gap-2"
    >
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={togglePlay}
        className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-card/70 backdrop-blur-sm border border-border/40 shadow-soft flex items-center justify-center text-foreground/70 hover:text-foreground transition-colors"
      >
        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleMute}
        className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-card/70 backdrop-blur-sm border border-border/40 shadow-soft flex items-center justify-center text-foreground/70 hover:text-foreground transition-colors"
      >
        {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
      </motion.button>

      <input
        type="range"
        min="0"
        max="1"
        step="0.1"
        value={volume}
        onChange={(e) => setVolume(parseFloat(e.target.value))}
        className="w-16 sm:w-20 h-1 rounded-full appearance-none bg-border/50 cursor-pointer accent-primary"
      />
    </motion.div>
  );
};

export default AudioControls;
