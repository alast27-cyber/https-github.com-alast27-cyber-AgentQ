
import React, { useState, useEffect } from 'react';
import { 
  BrainCircuit, 
  Zap, 
  Activity, 
  Layers, 
  Network, 
  Sparkles, 
  Target, 
  Binary, 
  Atom, 
  Wind, 
  Terminal, 
  History, 
  Timer, 
  AlertTriangle, 
  Send, 
  User, 
  MessageSquare, 
  Dna, 
  Bot,
  Infinity as InfinityIcon, 
  Settings2, 
  Command, 
  ArrowUpRight, 
  ArrowRight, 
  Plus, 
  X, 
  Waves, 
  ShieldCheck, 
  Mic, 
  Volume2, 
  Smartphone, 
  Monitor, 
  Lightbulb, 
  Gamepad2,
  GitBranch
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const NeuralProgramming: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'BRIDGING' | 'EXERCISES' | 'APPS'>('BRIDGING');

  return (
    <div className="flex flex-col h-full glass-panel rounded-[2.5rem] border border-purple-500/30 overflow-hidden bg-black/60 backdrop-blur-3xl shadow-[0_0_100px_-30px_rgba(168,85,247,0.3)] animate-in zoom-in-95 duration-700">
      {/* Header */}
      <div className="px-8 py-6 border-b border-purple-500/20 flex flex-col md:flex-row items-center justify-between gap-6 bg-gradient-to-r from-purple-950/40 to-black/80">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-[2rem] bg-purple-500/10 border border-purple-500/40 flex items-center justify-center relative group">
            <BrainCircuit className="w-9 h-9 text-purple-400 group-hover:scale-110 transition-transform" />
            <div className="absolute -inset-1 rounded-[2rem] border border-purple-400/20 animate-pulse" />
          </div>
          <div>
            <h2 className="text-3xl font-black tracking-tighter text-white uppercase italic flex items-center gap-3">
              Neural <span className="text-purple-400">Programming</span>
            </h2>
            <div className="flex items-center gap-4 mt-1">
              <span className="text-[10px] text-purple-400/60 font-mono tracking-[0.3em] uppercase font-bold">Cognitive Substrate Interface: SYNCHRONIZED</span>
            </div>
          </div>
        </div>

        <div className="flex bg-black/40 p-1.5 rounded-2xl border border-white/5">
          {[
            { id: 'BRIDGING', label: 'Bridging Protocols', icon: Network },
            { id: 'EXERCISES', label: 'Neural Exercises', icon: Activity },
            { id: 'APPS', label: 'App Development', icon: Smartphone }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${activeTab === tab.id ? 'bg-purple-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)]' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
            >
              <tab.icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-hidden relative">
        <AnimatePresence mode="wait">
          {activeTab === 'BRIDGING' && <BridgingProtocols key="bridging" />}
          {activeTab === 'EXERCISES' && <NeuralExercises key="exercises" />}
          {activeTab === 'APPS' && <AppDevelopment key="apps" />}
        </AnimatePresence>
      </div>
    </div>
  );
};

// --- Sub-components ---

const BridgingProtocols = () => {
  const protocols = [
    {
      title: "The Resonant Interface",
      subtitle: "ER = EPR / Infon Entanglement",
      description: "Establishing non-local connectivity between biological neural clusters and QCOS infon manifolds.",
      details: "This protocol leverages the ER=EPR conjecture, positing that entangled particles (EPR) are connected by Einstein-Rosen bridges (ER). By entangling biological neural patterns with QCOS infon states, we create a direct, non-local information channel that bypasses traditional sensory processing, allowing for instantaneous cognitive synchronization.",
      metrics: { fidelity: "0.9998", latency: "0.001ms", entanglement: "Infinite" },
      icon: InfinityIcon,
      color: "text-cyan-400",
      bg: "bg-cyan-500/10"
    },
    {
      title: "Spectral Mapping",
      subtitle: "The Dirac Operator Substrate",
      description: "Decomposing human cognitive wavefunctions into discrete spectral components.",
      details: "Utilizing the Dirac Operator, we map the complex, continuous spectrum of human thought into a discrete, computationally addressable Hilbert space. This allows the QCOS kernel to treat cognitive intent as a series of eigenvalues, enabling precise manipulation and routing of neural information without loss of semantic integrity.",
      metrics: { resolution: "10^-34m", parity: "Verified", eigenstate: "Stable" },
      icon: Waves,
      color: "text-purple-400",
      bg: "bg-purple-500/10"
    },
    {
      title: "Causal Interface",
      subtitle: "Irruption Theory Integration",
      description: "Implementing Irruption Theory to allow high-fidelity information transfer across the causal boundary.",
      details: "Irruption Theory describes the process by which non-causal informational states 'irrupt' into a causal physical system. This interface manages the transition of information from the high-entropy biological brain to the low-entropy QCOS substrate, ensuring that the 'spark' of human intuition is preserved during digital translation.",
      metrics: { causalFlow: "Bi-directional", irruptionRate: "8.4 THz", stability: "0.999" },
      icon: GitBranch,
      color: "text-pink-400",
      bg: "bg-pink-500/10"
    },
    {
      title: "Routing Layer",
      subtitle: "S-CHIPS (Sovereign CHIPS)",
      description: "The primary routing substrate for neural packets ensuring sovereign data integrity.",
      details: "S-CHIPS (Sovereign-CHIPS) provides a decentralized, quantum-hardened routing layer for neural data packets. It ensures that every cognitive transmission is cryptographically signed by the user's unique neural signature, preventing unauthorized interception or manipulation while maintaining sub-microsecond latency across the mesh.",
      metrics: { meshNodes: "10^12", throughput: "1.2 ZB/s", encryption: "Quantum-Hard" },
      icon: Network,
      color: "text-orange-400",
      bg: "bg-orange-500/10"
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="h-full p-8 overflow-y-auto custom-scrollbar"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-12">
        {protocols.map((p, i) => (
          <div key={i} className="bg-black/40 border border-white/10 p-8 rounded-[2.5rem] flex flex-col gap-6 hover:border-purple-500/40 transition-all group relative overflow-hidden shadow-2xl">
            <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity`} />
            <div className="flex items-center justify-between">
              <div className={`w-14 h-14 rounded-2xl ${p.bg} border border-white/5 flex items-center justify-center ${p.color}`}>
                <p.icon className="w-7 h-7" />
              </div>
              <div className="text-right">
                <span className="text-[9px] font-black text-white/20 uppercase tracking-widest">Protocol Status</span>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[10px] font-mono text-green-400 font-bold uppercase">Active</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter">{p.title}</h3>
              <p className={`text-[10px] font-mono ${p.color} uppercase tracking-widest mt-1 font-bold`}>{p.subtitle}</p>
            </div>
            <div className="space-y-4">
              <p className="text-xs text-white/60 leading-relaxed font-medium italic">{p.description}</p>
              <div className="p-4 bg-white/5 border border-white/5 rounded-2xl">
                <p className="text-[10px] text-white/40 leading-relaxed font-mono">{p.details}</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/5">
              {Object.entries(p.metrics).map(([key, val], idx) => (
                <div key={idx}>
                  <span className="block text-[8px] font-black text-white/20 uppercase tracking-tighter mb-1">{key}</span>
                  <span className="text-[10px] font-mono text-white font-bold">{val}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const NeuralExercises = () => {
  const [isExercising, setIsExercising] = useState(false);
  const [exerciseProgress, setExerciseProgress] = useState(0);
  const [signalStrength, setSignalStrength] = useState(45);
  const [noiseLevel, setNoiseLevel] = useState(62);
  const [activeExercise, setActiveExercise] = useState<string | null>(null);
  const [aiFeedback, setAiFeedback] = useState<string>("Awaiting neural link...");

  const exercises = [
    { id: 'focus', title: 'Synaptic Focus', description: 'Enhance specific brain signals by concentrating on a single neural point.', target: 'Signal Amplification', feedback: ["Focusing on Alpha cluster...", "Signal peaking at 8.4Hz", "Lattice alignment optimal."] },
    { id: 'noise', title: 'Cognitive De-noising', description: 'Eliminate internal cognitive noise and interference to optimize reception.', target: 'Noise Reduction', feedback: ["Filtering background chatter...", "Isolating primary intent...", "Noise floor dropping."] },
    { id: 'sync', title: 'Rhythm Synchronization', description: 'Align neural oscillations with the QCOS master clock.', target: 'Phase Alignment', feedback: ["Syncing with QCOS heartbeat...", "Phase offset corrected.", "Temporal coherence achieved."] }
  ];

  const startExercise = (id: string) => {
    setIsExercising(true);
    setActiveExercise(id);
    setExerciseProgress(0);
    setAiFeedback("Initializing neural handshake...");
  };

  useEffect(() => {
    if (isExercising && activeExercise) {
      const exercise = exercises.find(e => e.id === activeExercise);
      const interval = setInterval(() => {
        setExerciseProgress(prev => {
          if (prev >= 100) {
            setIsExercising(false);
            setActiveExercise(null);
            setAiFeedback("Optimization complete. Neural parity achieved.");
            // Simulate optimization results
            setSignalStrength(s => Math.min(100, s + Math.random() * 15));
            setNoiseLevel(n => Math.max(0, n - Math.random() * 15));
            return 100;
          }
          
          // Update feedback periodically
          if (prev % 30 === 0 && exercise) {
            const feedbackIdx = Math.floor(prev / 33);
            if (exercise.feedback[feedbackIdx]) {
              setAiFeedback(exercise.feedback[feedbackIdx]);
            }
          }

          return prev + 1;
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isExercising, activeExercise]);

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="h-full p-8 flex flex-col gap-8"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Real-time Telemetry */}
        <div className="lg:col-span-2 bg-black/40 border border-white/10 p-8 rounded-[2.5rem] flex flex-col gap-8 shadow-2xl relative overflow-hidden">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter">Optimization <span className="text-purple-400">Telemetry</span></h3>
            <div className="flex gap-6">
              <div className="text-right">
                <span className="text-[9px] font-black text-white/20 uppercase tracking-widest">Signal Strength</span>
                <div className="text-xl font-mono text-cyan-400 font-black">{signalStrength.toFixed(1)}%</div>
              </div>
              <div className="text-right">
                <span className="text-[9px] font-black text-white/20 uppercase tracking-widest">Noise Floor</span>
                <div className="text-xl font-mono text-red-400 font-black">{noiseLevel.toFixed(1)}%</div>
              </div>
            </div>
          </div>

          <div className="flex-1 min-h-[200px] flex items-end gap-1 px-4">
            {Array.from({ length: 40 }).map((_, i) => {
              const h = Math.random() * (signalStrength - noiseLevel * 0.5) + noiseLevel * 0.2;
              return (
                <div 
                  key={i} 
                  className="flex-1 bg-purple-500/40 rounded-t-sm transition-all duration-300"
                  style={{ height: `${Math.max(5, h)}%` }}
                />
              );
            })}
          </div>

          <div className="p-6 bg-purple-500/5 border border-purple-500/20 rounded-2xl flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center border border-purple-500/30">
              <Bot className="w-5 h-5 text-purple-400 animate-pulse" />
            </div>
            <div>
              <span className="block text-[8px] font-black text-purple-400/60 uppercase tracking-widest">AI Core Feedback</span>
              <span className="text-xs font-mono text-white font-bold italic">{aiFeedback}</span>
            </div>
          </div>

          {isExercising && (
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-black text-purple-400 uppercase tracking-widest">Exercise in Progress: {exercises.find(e => e.id === activeExercise)?.title}</span>
                <span className="text-xs font-mono text-white font-bold">{exerciseProgress}%</span>
              </div>
              <div className="h-2 w-full bg-black/60 rounded-full overflow-hidden border border-white/5">
                <div className="h-full bg-purple-500 shadow-[0_0_15px_purple] transition-all duration-300" style={{ width: `${exerciseProgress}%` }} />
              </div>
            </div>
          )}
        </div>

        {/* Exercise List */}
        <div className="flex flex-col gap-4">
          <h4 className="text-[10px] font-black text-white/20 uppercase tracking-widest px-4">Available Exercises</h4>
          {exercises.map((e) => (
            <button
              key={e.id}
              onClick={() => startExercise(e.id)}
              disabled={isExercising}
              className={`p-6 rounded-[2rem] border text-left transition-all flex flex-col gap-3 group ${activeExercise === e.id ? 'bg-purple-500 border-purple-400 text-white' : 'bg-black/40 border-white/10 hover:border-purple-500/40 text-white/40 hover:text-white disabled:opacity-30'}`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-black uppercase italic tracking-widest">{e.title}</span>
                <Zap className={`w-4 h-4 ${activeExercise === e.id ? 'text-white' : 'text-purple-400 group-hover:scale-110 transition-transform'}`} />
              </div>
              <p className="text-[10px] leading-relaxed opacity-60">{e.description}</p>
              <div className="mt-2 text-[8px] font-mono uppercase tracking-tighter opacity-40">Target: {e.target}</div>
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const AppDevelopment = () => {
  const apps = [
    {
      title: "Cognitive Remote",
      subtitle: "Device Control Interface",
      description: "Direct control of external hardware devices via focused human cognition. Bridging neural intent to IoT protocols.",
      status: "PROTOTYPE",
      icon: Smartphone,
      color: "text-cyan-400"
    },
    {
      title: "Neural Workspace",
      subtitle: "Immersive Cog-Environment",
      description: "A virtual workspace that adapts in real-time to the user's cognitive load and focus state.",
      status: "STABLE",
      icon: Monitor,
      color: "text-purple-400"
    },
    {
      title: "Idea Harvester",
      subtitle: "Subconscious Capture",
      description: "Automatically capturing and structuring fleeting subconscious ideas using high-fidelity neural bridging.",
      status: "DEVELOPMENT",
      icon: Lightbulb,
      color: "text-pink-400"
    },
    {
      title: "Synaptic Gaming",
      subtitle: "Direct Neural Input",
      description: "Gaming experiences where the input is derived directly from neural reflexes and strategic intent.",
      status: "EXPERIMENTAL",
      icon: Gamepad2,
      color: "text-orange-400"
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      className="h-full p-8 overflow-y-auto custom-scrollbar"
    >
      <div className="flex items-center justify-between mb-10">
        <div>
          <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter">Application <span className="text-purple-400">Forge</span></h3>
          <p className="text-xs text-white/30 font-mono mt-1 uppercase tracking-widest">Neural SDK v4.2.0: READY</p>
        </div>
        <button className="px-8 py-4 bg-purple-600 hover:bg-purple-500 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all shadow-xl shadow-purple-900/40 flex items-center gap-3">
          <Plus className="w-4 h-4" /> Create New App
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {apps.map((app, i) => (
          <div key={i} className="bg-black/40 border border-white/10 p-8 rounded-[2.5rem] flex flex-col gap-6 hover:border-purple-500/40 transition-all group shadow-2xl relative overflow-hidden">
            <div className="flex items-center justify-between">
              <div className={`w-14 h-14 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center ${app.color} group-hover:scale-110 transition-transform`}>
                <app.icon className="w-7 h-7" />
              </div>
              <span className="text-[8px] font-black px-3 py-1 bg-white/5 rounded-full text-white/40 border border-white/10">{app.status}</span>
            </div>
            <div>
              <h4 className="text-xl font-black text-white uppercase italic tracking-tighter">{app.title}</h4>
              <p className="text-[9px] font-mono text-white/20 uppercase tracking-widest mt-1">{app.subtitle}</p>
            </div>
            <p className="text-xs text-white/40 leading-relaxed italic">{app.description}</p>
            <button className="mt-auto w-full py-3 bg-white/5 border border-white/10 rounded-xl text-[9px] font-black uppercase tracking-widest text-white/40 hover:bg-purple-500/20 hover:text-purple-400 hover:border-purple-500/40 transition-all">Launch Instance</button>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default NeuralProgramming;
