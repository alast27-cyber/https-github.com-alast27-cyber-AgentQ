import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, 
  Bot, 
  User, 
  MessageSquare, 
  X, 
  Zap, 
  Activity, 
  BrainCircuit, 
  Sparkles, 
  Target, 
  Binary, 
  Atom, 
  Wind, 
  Terminal, 
  History, 
  Timer, 
  AlertTriangle, 
  Dna, 
  Infinity as InfinityIcon, 
  Settings2, 
  Command, 
  ArrowUpRight, 
  ArrowRight, 
  Plus, 
  Waves, 
  ShieldCheck, 
  Mic, 
  Volume2, 
  Smartphone, 
  Monitor, 
  Lightbulb, 
  Gamepad2,
  GitBranch,
  RefreshCw,
  Link2,
  Trash2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import AgentQIcon from './AgentQIcon';
import { AICoreModel, QCOSState, SystemTelemetryEvent } from '../types';

interface Message {
  id: string;
  type: 'user' | 'agent';
  content: string;
  timestamp: number;
}

interface AgentQChatProps {
  onClose?: () => void;
  activeCore?: AICoreModel;
  onAgenticCommand?: (type: string, payload: any) => Promise<void>;
  onModelChange?: (model: any) => void;
  systemState?: QCOSState;
  telemetryEvents?: SystemTelemetryEvent[];
}

const AgentQChat: React.FC<AgentQChatProps> = ({ 
  onClose,
  activeCore,
  onAgenticCommand,
  onModelChange,
  systemState,
  telemetryEvents
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'agent',
      content: "Neural substrate initialized. I am Agent Q, your cognitive interface for the QCOS ecosystem. How can I assist with your quantum-cognitive bridging today?",
      timestamp: Date.now()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate Agent Q response
    setTimeout(() => {
      const agentMsg: Message = {
        id: (Date.now() + 1).toString(),
        type: 'agent',
        content: "Processing request through the IBQOS manifold. Cognitive links are stabilizing. I've analyzed your query and am currently optimizing the neural topology to match your intent.",
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, agentMsg]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full bg-black/90 backdrop-blur-2xl border-l border-white/10 shadow-2xl">
      {/* Header */}
      <div className="p-6 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-purple-500/10 to-cyan-500/10">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center border border-purple-500/30">
            <AgentQIcon className="w-6 h-6 text-purple-400" />
          </div>
          <div>
            <h3 className="text-lg font-black text-white uppercase italic tracking-tighter">Agent <span className="text-purple-400">Q</span></h3>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[9px] font-black text-green-500 uppercase tracking-widest">Substrate Active</span>
            </div>
          </div>
        </div>
        {onClose && (
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/5 rounded-lg transition-colors text-white/40 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar"
      >
        <AnimatePresence mode="popLayout">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[85%] flex gap-3 ${msg.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${
                  msg.type === 'user' 
                    ? 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400' 
                    : 'bg-purple-500/10 border-purple-500/20 text-purple-400'
                }`}>
                  {msg.type === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>
                <div className={`p-4 rounded-2xl text-sm font-mono leading-relaxed ${
                  msg.type === 'user'
                    ? 'bg-cyan-500/10 border border-cyan-500/20 text-cyan-100 rounded-tr-none'
                    : 'bg-white/5 border border-white/10 text-white/90 rounded-tl-none'
                }`}>
                  {msg.content}
                </div>
              </div>
            </motion.div>
          ))}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="bg-white/5 border border-white/10 p-4 rounded-2xl rounded-tl-none flex gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-bounce" />
                <div className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-bounce [animation-delay:0.2s]" />
                <div className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-bounce [animation-delay:0.4s]" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input */}
      <div className="p-6 border-t border-white/10 bg-black/50">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Query Agent Q..."
            className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-6 pr-14 text-white font-mono text-sm focus:outline-none focus:border-purple-500/50 transition-colors placeholder:text-white/20"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="absolute right-2 top-2 bottom-2 px-4 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 disabled:hover:bg-purple-600 text-white rounded-lg transition-all flex items-center justify-center shadow-lg shadow-purple-900/20"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <div className="mt-4 flex items-center justify-between px-2">
          <div className="flex items-center gap-4">
            <button className="text-white/20 hover:text-white/60 transition-colors">
              <Mic className="w-4 h-4" />
            </button>
            <button className="text-white/20 hover:text-white/60 transition-colors">
              <Settings2 className="w-4 h-4" />
            </button>
          </div>
          <span className="text-[8px] font-black text-white/10 uppercase tracking-widest">Quantum-Cognitive Interface v1.0.4</span>
        </div>
      </div>
    </div>
  );
};

export default AgentQChat;
