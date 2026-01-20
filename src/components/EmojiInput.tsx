import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { commonEmojis } from '@/data/weatherData';

interface EmojiInputProps {
  onSendEmoji: (emoji: string) => void;
  disabled?: boolean;
  recentEmojis?: string[];
}

const EmojiInput = ({ onSendEmoji, disabled, recentEmojis = [] }: EmojiInputProps) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = useCallback((e?: React.FormEvent) => {
    e?.preventDefault();
    if (inputValue.trim()) {
      onSendEmoji(inputValue.trim());
      setInputValue('');
    }
  }, [inputValue, onSendEmoji]);

  const handleEmojiClick = useCallback((emoji: string) => {
    onSendEmoji(emoji);
  }, [onSendEmoji]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  }, [handleSubmit]);

  // Combine recent emojis (unique, max 8) with common emojis
  const uniqueRecent = [...new Set(recentEmojis)].slice(0, 8);
  const displayEmojis = uniqueRecent.length > 0 
    ? [...uniqueRecent, ...commonEmojis.filter(e => !uniqueRecent.includes(e))]
    : commonEmojis;

  // Split into two rows
  const firstRow = displayEmojis.slice(0, 8);
  const secondRow = displayEmojis.slice(8, 16);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.6 }}
      className="w-full max-w-sm px-4"
    >
      {/* Emoji Tray - Two Rows */}
      <div className="flex flex-col gap-1.5 mb-3">
        {/* First Row - Recent or Common */}
        <div className="flex justify-center gap-1.5 sm:gap-2 flex-wrap">
          {firstRow.map((emoji, index) => (
            <motion.button
              key={`row1-${emoji}-${index}`}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 + index * 0.03 }}
              whileHover={{ scale: 1.2, y: -3 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleEmojiClick(emoji)}
              disabled={disabled}
              className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-lg sm:text-xl rounded-full bg-card/70 backdrop-blur-sm border border-border/40 shadow-soft hover:shadow-card transition-all duration-200 disabled:opacity-50"
            >
              {emoji}
            </motion.button>
          ))}
        </div>
        
        {/* Second Row */}
        <div className="flex justify-center gap-1.5 sm:gap-2 flex-wrap">
          {secondRow.map((emoji, index) => (
            <motion.button
              key={`row2-${emoji}-${index}`}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.85 + index * 0.03 }}
              whileHover={{ scale: 1.2, y: -3 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleEmojiClick(emoji)}
              disabled={disabled}
              className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-lg sm:text-xl rounded-full bg-card/70 backdrop-blur-sm border border-border/40 shadow-soft hover:shadow-card transition-all duration-200 disabled:opacity-50"
            >
              {emoji}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Input Field */}
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder="貼上一個『小標籤』吧…"
          className="w-full px-4 py-3 pr-12 rounded-full bg-card/80 backdrop-blur-sm border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 shadow-soft transition-all duration-200 text-sm disabled:opacity-50"
        />
        <motion.button
          type="submit"
          disabled={!inputValue.trim() || disabled}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="absolute right-1.5 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-primary text-primary-foreground disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
        >
          <Send className="w-4 h-4" />
        </motion.button>
      </form>

      <p className="text-center text-xs text-muted-foreground/70 mt-2">
        輸入 Emoji 或文字，讓它飄向天空
      </p>
    </motion.div>
  );
};

export default EmojiInput;
