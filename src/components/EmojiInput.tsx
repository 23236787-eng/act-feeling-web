import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { commonEmojis } from '@/data/weatherData';

interface EmojiInputProps {
  onSendEmoji: (emoji: string) => void;
  disabled?: boolean;
}

const EmojiInput = ({ onSendEmoji, disabled }: EmojiInputProps) => {
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.6 }}
      className="w-full max-w-md mx-auto"
    >
      {/* Emoji Tray */}
      <div className="flex justify-center gap-2 mb-3 flex-wrap">
        {commonEmojis.map((emoji, index) => (
          <motion.button
            key={emoji}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 + index * 0.05 }}
            whileHover={{ scale: 1.2, y: -3 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleEmojiClick(emoji)}
            disabled={disabled}
            className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center text-xl sm:text-2xl rounded-full bg-card/70 backdrop-blur-sm border border-border/40 shadow-soft hover:shadow-card transition-all duration-200 disabled:opacity-50"
          >
            {emoji}
          </motion.button>
        ))}
      </div>

      {/* Input Field */}
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder="為此刻的感受，貼上一個『小標籤』吧…"
          className="w-full px-5 py-3.5 pr-14 rounded-full bg-card/80 backdrop-blur-sm border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 shadow-soft transition-all duration-200 text-sm sm:text-base disabled:opacity-50"
        />
        <motion.button
          type="submit"
          disabled={!inputValue.trim() || disabled}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-primary text-primary-foreground disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
        >
          <Send className="w-4 h-4" />
        </motion.button>
      </form>

      <p className="text-center text-xs text-muted-foreground/70 mt-3">
        可以輸入任何 Emoji 或文字，讓它飄向天空
      </p>
    </motion.div>
  );
};

export default EmojiInput;
