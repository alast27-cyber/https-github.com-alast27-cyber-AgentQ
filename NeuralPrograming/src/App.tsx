import React from 'react';
import NeuralProgramming from './components/NeuralProgramming';
import { Bot, Network, Cpu, BrainCircuit } from 'lucide-react';
import AgentQIcon from './components/AgentQIcon';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-purple-500/30 font-sans p-6 md:p-8 flex flex-col gap-8 max-w-[1700px] mx-auto overflow-x-hidden">
      {/* Header Bar */}
      <header className="flex flex-col md:flex-row justify-between items-center gap-6 bg-black/40 border border-purple-500/20 p-6 rounded-[2rem] backdrop-blur-2xl shadow-xl relative z-40">
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 bg-purple-500/5 rounded-2xl flex items-center justify-center border border-purple-500/30 shadow-[0_0_25px_rgba(168,85,247,0.15)] relative">
            <AgentQIcon className="w-9 h-9 text-purple-400" glow={true} />
            <div className="absolute -bottom-1 -right-1 w-4.5 h-4.5 rounded-full bg-green-500 border border-[#050505] flex items-center justify-center">
              <span className="w-2 h-2 rounded-full bg-white animate-ping" />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight uppercase italic flex items-center gap-2">
              Neural <span className="text-purple-400">Forge</span>
            </h1>
            <p className="text-[9px] text-purple-500/60 uppercase tracking-[0.25em] font-mono mt-0.5">STANDALONE INTERFACE v1.4.0</p>
          </div>
        </div>

        {/* Framing and KPI stats inside Standalone */}
        <div className="flex items-center gap-12">
          <div className="flex flex-col items-end">
            <span className="text-[8px] font-black uppercase text-white/20 tracking-widest font-mono">Cognitive Bridge</span>
            <span className="text-xs font-mono font-bold text-green-400 mt-1 uppercase flex items-center gap-1.5">
              <Network className="w-3.5 h-3.5" /> Stable Node
            </span>
          </div>
          <div className="h-10 w-px bg-white/10 hidden md:block" />
          <div className="flex flex-col items-end">
            <span className="text-[8px] font-black uppercase text-white/20 tracking-widest font-mono">Computational Substrate</span>
            <span className="text-xs font-mono font-bold text-purple-400 mt-1 uppercase flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5" /> Virtual QCOS
            </span>
          </div>
        </div>
      </header>

      {/* Main Content Pane */}
      <main className="flex-1 min-h-[500px]">
        <NeuralProgramming />
      </main>

      {/* Footer */}
      <footer className="flex justify-between items-center px-4 py-2 border-t border-white/5 mt-auto">
        <span className="text-[9px] font-mono text-white/20 uppercase tracking-widest">
          Sovereign Quantum-Cognitive Operating System
        </span>
        <span className="text-[9px] font-mono text-purple-400/60 font-bold uppercase tracking-widest flex items-center gap-2">
          <BrainCircuit className="w-3.5 h-3.5" /> Synchronized Offline
        </span>
      </footer>
    </div>
  );
};

export default App;
