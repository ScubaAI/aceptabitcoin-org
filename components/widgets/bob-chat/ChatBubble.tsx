'use client';

import { motion } from 'framer-motion';
import { ChatMessage } from './useBobChat';

export const ChatBubble = ({ message }: { message: ChatMessage }) => {
  const isUser = message.role === 'user';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div 
        className={`
          max-w-[85%] px-4 py-3 rounded-xl text-sm leading-relaxed transition-all
          ${isUser 
            // Usuario: Serif para autoridad, borde bitcoin sutil, sin glow
            ? 'bg-black/80 border border-bitcoin/30 text-foreground font-serif rounded-tr-none' 
            // Asistente (BOB): Mono para terminal, borde matrix, glow terminal canónico
            : 'bg-black/80 border border-matrix/30 text-foreground font-mono rounded-tl-none shadow-terminal'
          }
        `}
      >
        <p className="whitespace-pre-wrap">{message.content}</p>
        
        {/* Cursor de escritura (Typewriter Persona §8.9) */}
        {message.role === 'assistant' && !message.visible && (
          <span className="inline-block w-2 h-4 bg-matrix align-middle ml-1 animate-pulse shadow-[0_0_8px_rgba(0,255,65,0.8)]" />
        )}
      </div>
    </motion.div>
  );
};