'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Loader2, Terminal, Radio, Wifi } from 'lucide-react';

import { FundamentosIcon } from './icons/FundamentosIcon';
import { MiningIcon } from './icons/MiningIcon';
import { CustodiaIcon } from './icons/CustodiaIcon';
import { ImpuestosIcon } from './icons/ImpuestosIcon';
import { VerificacionIcon } from './icons/VerificacionIcon';

export interface BobChatWidgetProps {
  mode: 'hero' | 'floating';
  defaultContext?: string;
  lang?: 'es' | 'en';
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  visible: boolean;
}

const CONTEXTS = [
  { key: 'fundamentos', label: 'Fundamentos', icon: FundamentosIcon },
  { key: 'mining', label: 'Mining', icon: MiningIcon },
  { key: 'custodia', label: 'Custodia', icon: CustodiaIcon },
  { key: 'impuestos', label: 'Impuestos', icon: ImpuestosIcon },
  { key: 'verificacion', label: 'Verificación', icon: VerificacionIcon },
] as const;

// ✅ Mantenemos ChatBubble inline para garantizar que no haya errores de importación 
// que rompan el renderizado en producción. Es pequeño y no afecta la legibilidad.
const ChatBubble = ({ message }: { message: Message }) => {
  const isUser = message.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div
        className={`max-w-[85%] px-5 py-4 rounded-2xl text-sm leading-relaxed transition-all
          ${isUser 
            // v3.0: bg-black/80 mínimo (Bunker Rule) + borde bitcoin
            ? 'bg-black/80 border-2 border-bitcoin/40 text-white rounded-tr-none shadow-[0_0_20px_rgba(247,147,26,0.15)]' 
            // v3.0: bg-black/80 mínimo + borde matrix
            : 'bg-black/80 border-2 border-matrix/40 text-[#FAFAFA] rounded-tl-none shadow-[0_0_25px_rgba(0,255,65,0.25)]'
          }`}
      >
        <p className="whitespace-pre-wrap font-mono">{message.content}</p>
        {message.role === 'assistant' && !message.visible && (
          <span className="inline-block w-2 h-4 bg-matrix animate-pulse ml-1 align-middle shadow-[0_0_8px_rgba(0,255,65,0.8)]" />
        )}
      </div>
    </motion.div>
  );
};

export default function BobChatWidget({ 
  mode = 'hero', 
  defaultContext = 'fundamentos', 
  lang = 'es' 
}: BobChatWidgetProps) {
  
  const [isMounted, setIsMounted] = useState(false);
  const [context, setContext] = useState(defaultContext);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingRef = useRef<NodeJS.Timeout | null>(null);

  const clearTypingInterval = () => {
    if (typingRef.current) {
      clearInterval(typingRef.current);
      typingRef.current = null;
    }
  };

  useEffect(() => {
    setIsMounted(true);
    return () => clearTypingInterval();
  }, []);

  useEffect(() => {
    if (isMounted && messages.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [messages, isMounted]);

  const simulateTyping = useCallback((fullText: string, assistantMsgId: string) => {
    clearTypingInterval();

    let i = 0;
    typingRef.current = setInterval(() => {
      setMessages(prev => 
        prev.map(msg => {
          if (msg.id !== assistantMsgId) return msg;
          
          if (i < fullText.length) {
            const updatedContent = fullText.slice(0, i + 1);
            i++;
            return { ...msg, content: updatedContent, visible: i >= fullText.length };
          } else {
            clearTypingInterval();
            return { ...msg, visible: true };
          }
        })
      );
    }, 22);
  }, []);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || isLoading || !isMounted) return;

    setIsLoading(true);
    setError(null);

    const userMsgId = crypto.randomUUID();
    const assistantMsgId = crypto.randomUUID();

    const userMsg: Message = { id: userMsgId, role: 'user', content: text, visible: true };
    const placeholderAssistantMsg: Message = { id: assistantMsgId, role: 'assistant', content: '', visible: false };

    setMessages(prev => [...prev, userMsg, placeholderAssistantMsg]);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, context, lang, useRAG: true }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Sin respuesta');

      simulateTyping(data.response || "Entendido. ¿Qué más quieres saber sobre Bitcoin?", assistantMsgId);
    } catch (err: any) {
      setError(err.message || 'Error de conexión');
      setMessages(prev => 
        prev.map(msg => 
          msg.id === assistantMsgId 
            ? { ...msg, content: '⚠️ B.O.B. tuvo un problema temporal en el nodo. Intenta de nuevo.', visible: true }
            : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, context, lang, simulateTyping, isMounted]);

  const handleContextSwitch = (key: string) => {
    if (key === context) return;
    clearTypingInterval();
    setContext(key);
    setMessages([]);
    setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      sendMessage(input.trim());
      setInput('');
    }
  };

  const ActiveIcon = CONTEXTS.find(c => c.key === context)?.icon || FundamentosIcon;

  // ✅ GUARD DE HIDRATACIÓN: Exactamente en la misma posición que tu versión funcional probada.
  if (!isMounted) {
    return mode === 'floating' ? (
      <div className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-black border-2 border-matrix/30 rounded-full animate-pulse shadow-[0_0_20px_rgba(0,255,65,0.3)]" />
    ) : (
      <div className="w-full max-w-4xl mx-auto h-[520px] bg-black border-2 border-matrix/30 rounded-3xl animate-pulse shadow-[0_0_30px_rgba(0,255,65,0.2)]" />
    );
  }

  // ===================== FLOATING MODE =====================
  if (mode === 'floating') {
    return (
      <>
        <motion.button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-black border-2 border-matrix/50 rounded-full flex items-center justify-center shadow-[0_0_25px_rgba(0,255,65,0.4)] transition-all hover:shadow-[0_0_35px_rgba(0,255,65,0.6)] hover:border-matrix group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Abrir B.O.B."
        >
          <ActiveIcon className="w-8 h-8 text-matrix transition-transform group-hover:scale-110" />
          <div className="absolute -top-1 -right-1 h-3 w-3 bg-matrix rounded-full animate-pulse shadow-[0_0_10px_rgba(0,255,65,0.8)]" />
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 20 }}
              transition={{ duration: 0.15 }}
              // v3.0: bg-black/90 mínimo para paneles (Bunker Rule)
              className="fixed bottom-24 right-6 z-50 w-[min(92vw,420px)] h-[560px] bg-black/90 border-2 border-matrix/40 rounded-3xl overflow-hidden shadow-[0_0_30px_rgba(0,255,65,0.25)] flex flex-col"
            >
              <div className="absolute inset-0 bg-[radial-gradient(rgba(0,255,65,0.08)_1px,transparent_1px)] bg-[size:40px_40px] opacity-30 pointer-events-none" />
              
              <div className="relative px-5 py-4 border-b-2 border-matrix/30 bg-black/90 backdrop-blur-md flex items-center justify-between shrink-0">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-matrix/60 to-transparent animate-scanline" />
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-matrix/10 border-2 border-matrix/40 shadow-[0_0_20px_rgba(0,255,65,0.3)]">
                    <ActiveIcon className="w-6 h-6 text-matrix" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]">B.O.B.</h3>
                    <p className="font-vt323 text-xs text-matrix tracking-wider flex items-center gap-2 mt-0.5">
                      <span className="inline-block w-1.5 h-1.5 bg-matrix rounded-full animate-pulse shadow-[0_0_6px_rgba(0,255,65,0.8)]" />
                      BITCOIN OPERATED BRAIN
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsOpen(false)} 
                  className="p-2 text-gray-400 hover:text-matrix transition-all rounded-lg hover:bg-matrix/10 border border-transparent hover:border-matrix/30"
                  aria-label="Cerrar"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="p-3 border-b border-matrix/20 flex gap-2 overflow-x-auto bg-black/80 no-scrollbar shrink-0">
                {CONTEXTS.map(({ key, label, icon: Icon }) => (
                  <button
                    key={key}
                    onClick={() => handleContextSwitch(key)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-vt323 uppercase tracking-wider whitespace-nowrap transition-all ${
                      context === key 
                        ? 'bg-matrix text-black font-bold shadow-[0_0_20px_rgba(0,255,65,0.4)] border-2 border-matrix' 
                        : 'bg-black border-2 border-matrix/20 hover:border-matrix/60 text-gray-300 hover:text-matrix hover:shadow-[0_0_15px_rgba(0,255,65,0.2)]'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" /> {label}
                  </button>
                ))}
              </div>

              <div className="flex-1 overflow-y-auto p-5 space-y-4 relative custom-scrollbar">
                {messages.length === 0 && (
                  <div className="h-full flex flex-col items-center justify-center text-center">
                    <div className="p-4 rounded-2xl bg-black/80 border border-matrix/20 mb-4 shadow-[0_0_20px_rgba(0,255,65,0.1)]">
                      <Terminal className="w-12 h-12 text-matrix/60" />
                    </div>
                    <p className="text-matrix font-mono text-sm uppercase tracking-wider">¿Qué quieres aprender hoy?</p>
                    <p className="text-gray-500 font-mono text-xs mt-2">Selecciona un contexto arriba</p>
                  </div>
                )}
                <AnimatePresence mode="wait">
                  {messages.filter(msg => msg.content !== '').map((msg) => (
                    <ChatBubble key={msg.id} message={msg} />
                  ))}
                </AnimatePresence>
                <div ref={messagesEndRef} />
              </div>

              <form onSubmit={handleSubmit} className="p-4 border-t-2 border-matrix/30 bg-black/90 backdrop-blur-md shrink-0">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Pregúntale a B.O.B..."
                    disabled={isLoading}
                    // v3.0: bg-black/80 mínimo para inputs glassmorphism
                    className="flex-1 bg-black/80 border-2 border-matrix/30 rounded-xl px-5 py-3 text-sm font-mono focus:border-matrix focus:ring-2 focus:ring-matrix/40 outline-none transition-all placeholder:text-gray-600 text-white"
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="px-5 bg-bitcoin hover:bg-bitcoin/90 disabled:bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed text-black font-bold rounded-xl transition-all flex items-center justify-center shadow-[0_0_15px_rgba(247,147,26,0.3)] hover:shadow-[0_0_25px_rgba(247,147,26,0.5)]"
                    aria-label="Enviar mensaje"
                  >
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  </button>
                </div>
              </form>

              <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-matrix/30 opacity-40 pointer-events-none" />
              <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-matrix/30 opacity-40 pointer-events-none" />
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  }

  // ===================== HERO MODE =====================
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-4xl mx-auto bg-black border-2 border-matrix/40 rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(0,255,65,0.2)] relative"
    >
      <div className="absolute inset-0 bg-[radial-gradient(rgba(0,255,65,0.1)_1px,transparent_1px)] bg-[size:50px_50px] opacity-40 pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,255,65,0.02)_50%)] bg-[length:100%_4px] pointer-events-none animate-scanline opacity-20" />

      <div className="relative px-6 py-5 border-b-2 border-matrix/30 flex items-center justify-between bg-black/90 backdrop-blur-md shrink-0">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-matrix/60 to-transparent animate-scanline" />
        <div className="flex items-center gap-4">
          <div className="p-3 bg-matrix/10 border-2 border-matrix/40 rounded-2xl shadow-[0_0_25px_rgba(0,255,65,0.3)] relative">
            <ActiveIcon className="w-7 h-7 text-matrix" />
            <div className="absolute -top-1 -right-1 h-2.5 w-2.5 bg-matrix rounded-full animate-pulse shadow-[0_0_8px_rgba(0,255,65,0.8)]" />
          </div>
          <div>
            <h3 className="font-serif text-2xl font-bold text-white tracking-tight drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]">B.O.B.</h3>
            <p className="font-vt323 text-sm text-matrix tracking-wider flex items-center gap-2 mt-0.5">
              <span className="inline-block w-2 h-2 bg-matrix rounded-full animate-pulse shadow-[0_0_8px_rgba(0,255,65,0.8)]" />
              TU TUTOR CYPHERPUNK
            </p>
          </div>
        </div>
        
        <div className="hidden sm:flex items-center gap-2 bg-black/80 border border-matrix/30 rounded-lg px-3 py-1.5 shadow-[0_0_15px_rgba(0,255,65,0.1)]">
          <Wifi className="h-3 w-3 text-matrix" />
          <span className="text-[10px] font-mono text-matrix uppercase tracking-wider">ONLINE</span>
        </div>
      </div>

      <div className="p-4 border-b border-matrix/20 flex gap-2 overflow-x-auto bg-black/80 no-scrollbar shrink-0">
        {CONTEXTS.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => handleContextSwitch(key)}
            className={`flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-xs font-vt323 uppercase tracking-wider transition-all whitespace-nowrap ${
              context === key 
                ? 'bg-matrix text-black shadow-[0_0_20px_rgba(0,255,65,0.4)] border-2 border-matrix' 
                : 'bg-black border-2 border-matrix/20 hover:border-matrix/60 text-gray-300 hover:text-matrix hover:shadow-[0_0_15px_rgba(0,255,65,0.2)]'
            }`}
          >
            <Icon className="w-4 h-4" /> {label}
          </button>
        ))}
      </div>

      <div className="h-[460px] overflow-y-auto p-6 space-y-5 relative custom-scrollbar">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
            <div className="p-5 rounded-2xl bg-black/80 border-2 border-matrix/20 shadow-[0_0_25px_rgba(0,255,65,0.15)]">
              <Terminal className="w-14 h-14 text-matrix/40" />
            </div>
            <div>
              <p className="text-xl text-matrix font-mono font-light drop-shadow-[0_0_10px_rgba(0,255,65,0.3)]">Hola, soy B.O.B.</p>
              <p className="text-gray-400 mt-2 font-mono text-xs">¿En qué tema de Bitcoin quieres profundizar?</p>
              <p className="text-gray-500 mt-1 font-mono text-[10px] uppercase tracking-wider">Selecciona un contexto arriba</p>
            </div>
          </div>
        )}
        <AnimatePresence mode="wait">
          {messages.filter(msg => msg.content !== '').map((msg) => (
            <ChatBubble key={msg.id} message={msg} />
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-5 border-t-2 border-matrix/30 bg-black/90 backdrop-blur-md shrink-0">
        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribe tu pregunta sobre Bitcoin..."
            disabled={isLoading}
            className="flex-1 bg-black/80 border-2 border-matrix/30 rounded-xl px-6 py-4 text-sm font-mono focus:border-matrix focus:ring-2 focus:ring-matrix/40 outline-none transition-all placeholder:text-gray-600 text-white"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="px-7 bg-bitcoin hover:bg-bitcoin/90 disabled:bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed text-black font-bold rounded-xl transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(247,147,26,0.3)] hover:shadow-[0_0_30px_rgba(247,147,26,0.5)]"
            aria-label="Enviar mensaje"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </button>
        </div>
      </form>

      <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-matrix/30 opacity-50 pointer-events-none" />
      <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-matrix/30 opacity-50 pointer-events-none" />
    </motion.div>
  );
}