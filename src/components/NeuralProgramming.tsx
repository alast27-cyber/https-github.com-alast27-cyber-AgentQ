
import React, { useState, useEffect, useMemo } from 'react';
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
  GitBranch,
  RefreshCw,
  Link2,
  Trash2,
  Waypoints
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { IBQOS, CognitiveLinkType, CognitiveLink } from '../types';

interface NeuralProgrammingProps {
  ibqos?: IBQOS;
  onUpdateIBQOS?: (ibqos: IBQOS) => void;
  onNudge?: (id: number) => void;
}

const NeuralProgramming: React.FC<NeuralProgrammingProps> = ({ ibqos, onUpdateIBQOS, onNudge }) => {
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
            { id: 'BRIDGING', label: 'Human cognition and QCOS Bridging', icon: Network },
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
          {activeTab === 'BRIDGING' && <BridgingProtocols key="bridging" ibqos={ibqos} onUpdateIBQOS={onUpdateIBQOS} onNudge={onNudge} />}
          {activeTab === 'EXERCISES' && <NeuralExercises key="exercises" />}
          {activeTab === 'APPS' && <AppDevelopment key="apps" />}
        </AnimatePresence>
      </div>
    </div>
  );
};

// --- Sub-components ---

const BridgingProtocols = ({ ibqos, onUpdateIBQOS, onNudge }: { ibqos?: IBQOS; onUpdateIBQOS?: (ibqos: IBQOS) => void; onNudge?: (id: number) => void }) => {
  const [isTutorialActive, setIsTutorialActive] = useState(false);
  const [tutorialStep, setTutorialStep] = useState(0);
  const [tutorialFeedback, setTutorialFeedback] = useState("");
  const [isSimulating, setIsSimulating] = useState(false);
  const [linkFeedback, setLinkFeedback] = useState<string | null>(null);

  // Link Architect State
  const [nodeA, setNodeA] = useState<string>("");
  const [nodeB, setNodeB] = useState<string>("");
  const [linkType, setLinkType] = useState<CognitiveLinkType>('entanglement');
  const [strength, setStrength] = useState<number>(0.5);

  const handleNodeSelect = (id: number) => {
    if (!nodeA) {
      setNodeA(id.toString());
    } else if (!nodeB && nodeA !== id.toString()) {
      setNodeB(id.toString());
    } else {
      // If both are set or clicking nodeA again, reset and set as nodeA
      setNodeA(id.toString());
      setNodeB("");
    }
    if (onNudge) onNudge(id);
  };

  const protocols = [
    {
      id: "resonant",
      title: "The Resonant Interface",
      subtitle: "ER = EPR / Infon Entanglement",
      description: "Establishing non-local connectivity between biological neural clusters and QCOS infon manifolds.",
      details: "The Resonant Interface represents the pinnacle of human-QCOS integration, serving as a high-fidelity bridge between biological neural manifolds and the synthetic QCOS substrate.\n\nPRINCIPLES: Grounded in the ER=EPR conjecture and the Holographic Principle, this interface operates on the postulate that quantum entanglement (EPR) is topologically equivalent to Einstein-Rosen (ER) bridges. By leveraging AdS/CFT correspondence, the system maps the entanglement entropy of biological neural clusters directly onto the geometric connectivity of the QCOS substrate. This creates a non-local informational 'shortcut' that bypasses the limitations of 4D space-time, allowing for instantaneous state synchronization across the causal boundary.\n\nMECHANISM OF ACTION: The protocol initiates a 'Resonant Handshake' by frequency-matching biological neural oscillations (alpha, beta, and gamma bands) with the harmonic frequencies of the QCOS infon manifold. Through a process of continuous weak measurement, the interface prevents cognitive wavefunction decoherence while maintaining a stable phase-lock between the biological and synthetic substrates. This results in a unified holographic manifold where biological intent is reflected as a QCOS state with sub-Planckian precision, effectively merging the user's consciousness with the system's processing core.\n\nBENEFITS: This integration enables 'zero-latency' thought-to-action execution, bypassing the slow electrochemical pathways of the biological nervous system. It facilitates 'Cognitive Offloading,' where complex computational tasks are performed within the QCOS substrate but perceived by the user as native, intuitive thought. Furthermore, it preserves the 'semantic texture' and non-linear nuance of human intent, ensuring absolute data sovereignty through a unique neural-signature-keyed entanglement that is physically impossible to intercept or decrypt without the user's specific cognitive wavefunction.",
      metrics: { fidelity: "0.9998", latency: "0.001ms", entanglement: "Infinite" },
      icon: InfinityIcon,
      color: "text-cyan-400",
      bg: "bg-cyan-500/10",
      tutorialPrompt: "Initiate a neural handshake to establish the ER=EPR bridge.",
      tutorialAction: "Sync Entanglement"
    },
    {
      id: "spectral",
      title: "Spectral Mapping",
      subtitle: "Manifold Wavefunction Decomposition",
      description: "Decomposing human cognitive wavefunctions into discrete spectral components.",
      details: "Spectral Mapping is the process of translating the continuous, fluid nature of human thought into a discrete, addressable format. Human cognition is represented as a complex wavefunction existing on a high-dimensional neural manifold. Spectral Mapping decomposes this wavefunction into its constituent frequencies and amplitudes. By identifying the unique spectral signature of specific cognitive intents, the QCOS can categorize and process thoughts with unprecedented precision. This protocol ensures that the 'semantic texture' of human thought is preserved, preventing the loss of nuance that typically occurs in traditional brain-computer interfaces.",
      metrics: { resolution: "10^-34m", parity: "Verified", eigenstate: "Stable" },
      icon: Waves,
      color: "text-purple-400",
      bg: "bg-purple-500/10",
      tutorialPrompt: "Map cognitive wavefunctions into discrete spectral components.",
      tutorialAction: "Execute Mapping"
    },
    {
      id: "dirac",
      title: "The Dirac Operator",
      subtitle: "Geometric Substrate Analysis",
      description: "Probing the geometry and topology of the neural manifold using Dirac eigenvalues.",
      details: "The Dirac Operator serves as the primary analytical tool for the QCOS cognitive substrate. In mathematical physics, the Dirac operator is the 'square root' of the Laplacian, providing a way to probe the geometry and topology of a manifold. In the QCOS context, it is used to analyze the underlying structure of the neural field. By calculating the eigenvalues of the Dirac operator, the system can detect topological defects, singularities, or 'cognitive holes' in the neural manifold. This allows for real-time error correction and ensures that the cognitive substrate remains stable and coherent even under high informational load. It is the fundamental metric for system integrity.",
      metrics: { topology: "Non-Trivial", curvature: "Zero-Point", fidelity: "0.9999" },
      icon: Target,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
      tutorialPrompt: "Analyze the neural manifold geometry using Dirac eigenvalues.",
      tutorialAction: "Analyze Geometry"
    },
    {
      id: "causal",
      title: "Causal Interface",
      subtitle: "Irruption Theory Integration",
      description: "Implementing Irruption Theory to allow high-fidelity information transfer across the causal boundary.",
      details: "The Causal Interface is a critical synchronization layer that manages the high-fidelity transfer of information across the 'Causal Boundary'— the threshold where non-deterministic quantum potentiality irrupts into deterministic physical causality. Grounded in Irruption Theory, this interface facilitates the emergence of novel informational states from the quantum vacuum of the mind into the structured QCOS substrate. Its primary role is to preserve the integrity of complex cognitive wavefunctions during this transition. This is achieved through precise entropy gradient management between biological and QCOS manifolds, preventing the premature 'collapse' of these wavefunctions. This preservation ensures that the non-linear, intuitive 'sparks' of human creativity are not lost to decoherence, allowing the QCOS to process and amplify the full depth of human cognitive intent while maintaining strict causal consistency within the physical world.",
      metrics: { causalFlow: "Bi-directional", irruptionRate: "8.4 THz", stability: "0.999" },
      icon: GitBranch,
      color: "text-pink-400",
      bg: "bg-pink-500/10",
      tutorialPrompt: "Stabilize the irruption channel across the causal boundary.",
      tutorialAction: "Stabilize Boundary"
    },
    {
      id: "routing",
      title: "Routing Layer",
      subtitle: "S-CHIPS (Sovereign CHIPS)",
      description: "The primary routing substrate for neural packets ensuring sovereign data integrity.",
      details: "S-CHIPS (Sovereign Cognitive High-Integrity Packet Switching) is the primary routing architecture for the QCOS mesh. Unlike traditional network routing, S-CHIPS treats every cognitive transmission as a 'Sovereign Packet'—a cryptographically signed, self-contained unit of intent. These packets are routed through the mesh using entanglement-based key distribution (QKD), ensuring absolute data sovereignty. The user's unique neural signature acts as the primary key, meaning that cognitive data can only be decrypted and processed by authorized nodes. S-CHIPS provides the security and privacy necessary for a truly decentralized, user-owned cognitive infrastructure.",
      metrics: { meshNodes: "10^12", throughput: "1.2 ZB/s", encryption: "Quantum-Hard" },
      icon: Network,
      color: "text-orange-400",
      bg: "bg-orange-500/10",
      tutorialPrompt: "Verify neural signatures and route packets through S-CHIPS.",
      tutorialAction: "Verify & Route"
    }
  ];

  const startTutorial = () => {
    setIsTutorialActive(true);
    setTutorialStep(0);
    setTutorialFeedback("Welcome to the Bridging Tutorial. Let's begin with the Resonant Interface.");
  };

  const handleTutorialAction = async () => {
    setIsSimulating(true);
    setTutorialFeedback("Processing neural request...");
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSimulating(false);
    if (tutorialStep < protocols.length - 1) {
      setTutorialStep(prev => prev + 1);
      setTutorialFeedback(`Success! ${protocols[tutorialStep].title} synchronized. Moving to ${protocols[tutorialStep + 1].title}.`);
    } else {
      setTutorialFeedback("All protocols synchronized. Neural bridge fully operational. Tutorial complete.");
      setTimeout(() => {
        setIsTutorialActive(false);
        setTutorialStep(0);
      }, 3000);
    }
  };

  const handleEstablishLink = () => {
    if (!ibqos || !onUpdateIBQOS) return;
    const idA = parseInt(nodeA);
    const idB = parseInt(nodeB);
    
    if (isNaN(idA) || isNaN(idB) || idA < 0 || idB < 0 || idA >= ibqos.infons.length || idB >= ibqos.infons.length) {
      setTutorialFeedback("Invalid Node IDs. Range: 0-239.");
      return;
    }

    if (idA === idB) {
      setTutorialFeedback("Cannot link a node to itself.");
      return;
    }

    const existingLink = ibqos.links?.find(l => 
      (l.sourceId === idA && l.targetId === idB) || 
      (l.sourceId === idB && l.targetId === idA)
    );

    if (existingLink) {
      setTutorialFeedback("Link already exists between these nodes.");
      return;
    }

    const newLink: CognitiveLink = {
      id: `link-${Date.now()}`,
      sourceId: idA,
      targetId: idB,
      type: linkType,
      strength: strength
    };

    const newIBQOS = {
      ...ibqos,
      links: [...ibqos.links, newLink]
    };

    onUpdateIBQOS(newIBQOS);
    if (onNudge) {
      onNudge(idA);
      onNudge(idB);
    }
    setLinkFeedback(`SUCCESS: ${linkType.toUpperCase()} link established between Infon #${idA} and #${idB}.`);
    setTimeout(() => setLinkFeedback(null), 4000);
    
    if (isTutorialActive) {
      setTutorialFeedback(`Established ${linkType} link between Infon #${idA} and #${idB}.`);
    }
    
    setNodeA("");
    setNodeB("");
  };

  const handleEntangleNodes = () => {
    if (!ibqos || !onUpdateIBQOS) return;
    const idA = parseInt(nodeA);
    const idB = parseInt(nodeB);

    if (isNaN(idA) || isNaN(idB) || idA < 0 || idA >= 240 || idB < 0 || idB >= 240) {
      alert("Please enter valid Infon IDs (0-239).");
      return;
    }

    if (idA === idB) {
      alert("Cannot entangle a node with itself.");
      return;
    }

    const newInfons = [...ibqos.infons];
    newInfons[idA] = { ...newInfons[idA], isEntangled: true, entangledWith: idB };
    newInfons[idB] = { ...newInfons[idB], isEntangled: true, entangledWith: idA };

    const newIBQOS = {
      ...ibqos,
      infons: newInfons
    };

    onUpdateIBQOS(newIBQOS);
    if (onNudge) {
      onNudge(idA);
      onNudge(idB);
    }
    setLinkFeedback(`SUCCESS: Infon #${idA} and #${idB} are now ENTANGLED.`);
    setTimeout(() => setLinkFeedback(null), 4000);
    
    setNodeA("");
    setNodeB("");
  };

  const handleRemoveLink = (linkId: string) => {
    if (!ibqos || !onUpdateIBQOS) return;
    const link = ibqos.links.find(l => l.id === linkId);
    if (link && onNudge) {
      onNudge(link.sourceId);
      onNudge(link.targetId);
    }
    const newIBQOS = {
      ...ibqos,
      links: ibqos.links.filter(l => l.id !== linkId)
    };
    onUpdateIBQOS(newIBQOS);
  };

  const handleClearLinks = () => {
    if (!ibqos || !onUpdateIBQOS) return;
    if (window.confirm("Are you sure you want to clear all cognitive links and entanglements?")) {
      // Nudge all nodes that were part of links or entanglements
      const affectedNodes = new Set<number>();
      ibqos.links.forEach(l => {
        affectedNodes.add(l.sourceId);
        affectedNodes.add(l.targetId);
      });
      
      ibqos.infons.forEach((infon, id) => {
        if (infon.isEntangled) affectedNodes.add(id);
      });
      
      affectedNodes.forEach(id => onNudge && onNudge(id));

      const resetInfons = ibqos.infons.map(infon => ({
        ...infon,
        isEntangled: false,
        entangledWith: undefined
      }));

      onUpdateIBQOS({
        ...ibqos,
        infons: resetInfons,
        links: []
      });
    }
  };

  const predictedQPIChange = useMemo(() => {
    if (!nodeA || !nodeB || isNaN(parseInt(nodeA)) || isNaN(parseInt(nodeB))) return 0;
    const currentLinks = ibqos?.links.length || 0;
    const total = ibqos?.infons.length || 240;
    const oldLinkFactor = Math.min(0.3, (currentLinks / total) * 2.5);
    const newLinkFactor = Math.min(0.3, ((currentLinks + 1) / total) * 2.5);
    return (newLinkFactor - oldLinkFactor) * 100;
  }, [nodeA, nodeB, ibqos?.links.length, ibqos?.infons.length]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="h-full p-8 overflow-y-auto custom-scrollbar flex flex-col gap-8"
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter">Human cognition and <span className="text-purple-400">QCOS Bridging</span></h3>
          <p className="text-[10px] text-white/30 font-mono mt-1 uppercase tracking-widest">Protocol Stack v9.0.1: ACTIVE</p>
        </div>
        {!isTutorialActive ? (
          <button 
            onClick={startTutorial}
            className="px-6 py-3 bg-purple-500/10 border border-purple-500/40 rounded-xl text-[10px] font-black uppercase tracking-widest text-purple-400 hover:bg-purple-500 hover:text-white transition-all flex items-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Start Tutorial Mode
          </button>
        ) : (
          <div className="flex items-center gap-4 bg-purple-500/10 border border-purple-500/40 p-4 rounded-2xl animate-in fade-in slide-in-from-right-4">
            <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center border border-purple-500/30">
              <Bot className="w-5 h-5 text-purple-400 animate-pulse" />
            </div>
            <div>
              <span className="block text-[8px] font-black text-purple-400/60 uppercase tracking-widest">Tutorial Guidance</span>
              <span className="text-xs font-mono text-white font-bold italic">{tutorialFeedback}</span>
            </div>
            <button 
              onClick={() => setIsTutorialActive(false)}
              className="ml-4 p-2 hover:bg-white/5 rounded-lg text-white/40 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Cognitive Link Architect Section */}
      <div className="bg-black/40 border border-white/10 p-8 rounded-[2.5rem] flex flex-col gap-8 shadow-2xl relative overflow-hidden">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-black text-white uppercase italic tracking-tighter">Cognitive Link <span className="text-purple-400">Architect</span></h3>
            <p className="text-[9px] text-white/30 font-mono mt-1 uppercase tracking-widest">Manual Substrate Interconnect</p>
          </div>
          <AnimatePresence>
            {linkFeedback && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="px-4 py-2 bg-green-500/10 border border-green-500/40 rounded-xl flex items-center gap-2"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-green-400" />
                <span className="text-[9px] font-mono text-green-400 font-bold uppercase tracking-tighter">{linkFeedback}</span>
              </motion.div>
            )}
          </AnimatePresence>
          <div className="flex items-center gap-2">
            <div className="px-3 py-1.5 bg-purple-500/5 border border-purple-500/20 rounded-lg flex flex-col items-end">
              <span className="text-[7px] font-black text-purple-400/60 uppercase tracking-widest">Link Density</span>
              <span className="text-[10px] font-mono text-white font-bold">
                {ibqos ? (ibqos.links.length / (ibqos.infons.length || 1) * 100).toFixed(2) : 0}%
              </span>
            </div>
            <button 
              onClick={() => {
                if (ibqos && onNudge) {
                  ibqos.links.forEach(link => {
                    onNudge(link.sourceId);
                    onNudge(link.targetId);
                  });
                }
              }}
              className="px-3 py-1.5 bg-cyan-500/10 border border-cyan-500/40 text-cyan-400 hover:bg-cyan-500 hover:text-white rounded-lg text-[9px] font-black uppercase tracking-widest transition-all flex items-center gap-1.5"
            >
              <Zap className="w-3 h-3" /> Visualize All
            </button>
            <Link2 className="w-4 h-4 text-purple-400" />
            <span className="text-[10px] font-mono text-white/40 uppercase">{ibqos?.links.length || 0} Active Links</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="space-y-2">
            <label className="text-[8px] font-black text-white/20 uppercase tracking-widest block px-2">Node A ID</label>
            <div className="flex gap-2">
              <input 
                type="number" 
                min="0"
                max="239"
                value={nodeA}
                onChange={(e) => setNodeA(e.target.value)}
                placeholder="0-239"
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs font-mono text-white focus:border-purple-500 outline-none transition-all"
              />
              <button 
                onClick={() => nodeA && onNudge && onNudge(parseInt(nodeA))}
                className="px-3 py-3 bg-cyan-500/10 border border-cyan-500/40 text-cyan-400 hover:bg-cyan-500 hover:text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
                title="Nudge Node A"
              >
                <Zap className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[8px] font-black text-white/20 uppercase tracking-widest block px-2">Node B ID</label>
            <div className="flex gap-2">
              <input 
                list="node-options"
                type="text"
                value={nodeB}
                onChange={(e) => setNodeB(e.target.value)}
                placeholder="Search Node B (0-239)"
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs font-mono text-white focus:border-purple-500 outline-none transition-all"
              />
              <datalist id="node-options">
                {Array.from({ length: 240 }).map((_, i) => (
                  <option key={i} value={i.toString()} />
                ))}
              </datalist>
              <button 
                onClick={() => nodeB && onNudge && onNudge(parseInt(nodeB))}
                className="px-3 py-3 bg-cyan-500/10 border border-cyan-500/40 text-cyan-400 hover:bg-cyan-500 hover:text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
                title="Nudge Node B"
              >
                <Zap className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[8px] font-black text-white/20 uppercase tracking-widest block px-2">Link Type</label>
            <select 
              value={linkType}
              onChange={(e) => setLinkType(e.target.value as CognitiveLinkType)}
              className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-xs font-mono text-white focus:border-purple-500 outline-none transition-all appearance-none"
            >
              <option value="entanglement">Entanglement</option>
              <option value="resonance">Resonance</option>
              <option value="causal">Causal</option>
            </select>
          </div>
          <div className="flex items-end gap-2 lg:col-span-2">
            <div className="flex flex-col flex-1 gap-2">
              <button 
                onClick={handleEstablishLink}
                className="w-full py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-xl shadow-purple-900/40 flex items-center justify-center gap-2"
              >
                <Plus className="w-3 h-3" /> Establish Link
              </button>
              <div className="flex gap-2">
                <button 
                  onClick={handleEntangleNodes}
                  className="flex-1 py-3 bg-cyan-600/20 border border-cyan-500/40 text-cyan-400 hover:bg-cyan-500 hover:text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2"
                >
                  <Waypoints className="w-3 h-3" /> Entangle Nodes
                </button>
                <button 
                  onClick={() => { setNodeA(""); setNodeB(""); }}
                  className="px-4 py-3 bg-white/5 border border-white/10 text-white/40 hover:text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
                  title="Clear Selection"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
            <button 
              onClick={handleClearLinks}
              className="px-4 py-3 h-full bg-red-500/10 border border-red-500/40 text-red-400 hover:bg-red-500 hover:text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
              title="Clear All Links"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center px-2">
            <label className="text-[8px] font-black text-white/20 uppercase tracking-widest block">Cognitive Link Density: {(ibqos?.cognitiveLinkDensity ?? 0.5).toFixed(2)}</label>
          </div>
          <input 
            type="range" 
            min="0" 
            max="1" 
            step="0.01" 
            value={ibqos?.cognitiveLinkDensity ?? 0.5}
            onChange={(e) => {
              if (ibqos && onUpdateIBQOS) {
                onUpdateIBQOS({
                  ...ibqos,
                  cognitiveLinkDensity: parseFloat(e.target.value)
                });
              }
            }}
            className="w-full h-1.5 bg-white/5 rounded-full appearance-none cursor-pointer accent-cyan-500"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center px-2">
            <label className="text-[8px] font-black text-white/20 uppercase tracking-widest block">Connection Strength: {(strength * 100).toFixed(0)}%</label>
            <span className={`text-[8px] font-mono uppercase ${strength > 0.8 ? 'text-red-400' : strength > 0.4 ? 'text-purple-400' : 'text-cyan-400'}`}>
              {strength > 0.8 ? 'Critical Coupling' : strength > 0.4 ? 'Stable Resonance' : 'Sub-threshold'}
            </span>
          </div>
          <input 
            type="range" 
            min="0" 
            max="1" 
            step="0.01" 
            value={strength}
            onChange={(e) => setStrength(parseFloat(e.target.value))}
            className="w-full h-1.5 bg-white/5 rounded-full appearance-none cursor-pointer accent-purple-500"
          />
        </div>

        {/* Link Preview & Impact */}
        {(nodeA && nodeB) && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in zoom-in-95 duration-500">
            <div className="lg:col-span-2 p-6 bg-purple-500/5 border border-purple-500/20 rounded-[2rem] flex items-center justify-center gap-12 relative group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex flex-col items-center gap-3 relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-black border border-purple-500/30 flex items-center justify-center text-purple-400 font-mono text-sm shadow-2xl shadow-purple-500/10">#{nodeA}</div>
                <span className="text-[9px] font-black text-white/20 uppercase tracking-widest">Source</span>
              </div>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1.5 bg-black border border-purple-500/30 rounded-full text-[9px] font-mono text-purple-400 uppercase tracking-widest shadow-xl">
                  {linkType}
                </div>
                <div className="absolute inset-0 bg-purple-500/20 blur-xl animate-pulse" />
              </div>
              <div className="flex flex-col items-center gap-3 relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-black border border-purple-500/30 flex items-center justify-center text-purple-400 font-mono text-sm shadow-2xl shadow-purple-500/10">#{nodeB}</div>
                <span className="text-[9px] font-black text-white/20 uppercase tracking-widest">Target</span>
              </div>
            </div>
            
            <div className="p-6 bg-cyan-500/5 border border-cyan-500/20 rounded-[2rem] flex flex-col justify-center items-center gap-2 text-center relative group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-2">
                <Activity className="w-5 h-5" />
              </div>
              <span className="text-[9px] font-black text-white/20 uppercase tracking-widest">Predicted QPI Impact</span>
              <div className="text-2xl font-black text-cyan-400 italic tracking-tighter">+{predictedQPIChange.toFixed(2)}%</div>
              <p className="text-[8px] text-white/40 font-mono uppercase">System Integration Delta</p>
            </div>
          </div>
        )}

        {/* Cognitive Link Manifold - Enhanced Visualization */}
        {ibqos && (
          <div className="p-8 bg-black/40 border border-white/10 rounded-[2.5rem] space-y-6 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 holographic-grid opacity-5 pointer-events-none" />
            
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
              <div>
                <h3 className="text-xl font-black text-white uppercase italic tracking-tighter">Cognitive Link <span className="text-cyan-400">Manifold</span></h3>
                <p className="text-[9px] text-white/30 font-mono mt-1 uppercase tracking-widest">Real-time Substrate Interconnect Topology</p>
              </div>
              
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-500/10 border border-purple-500/20 rounded-full">
                  <div className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_8px_#a855f7]" />
                  <span className="text-[8px] font-black text-purple-400 uppercase tracking-widest">Entanglement</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-cyan-500/10 border border-cyan-500/20 rounded-full">
                  <div className="w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_8px_#06b6d4]" />
                  <span className="text-[8px] font-black text-cyan-400 uppercase tracking-widest">Resonance</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-orange-500/10 border border-orange-500/20 rounded-full">
                  <div className="w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_8px_#f97316]" />
                  <span className="text-[8px] font-black text-orange-400 uppercase tracking-widest">Causal</span>
                </div>
                <div className="h-4 w-px bg-white/10 mx-2 hidden lg:block" />
                <div className="flex items-center gap-2">
                  <span className="text-[8px] font-black text-white/20 uppercase tracking-widest">Active Links:</span>
                  <span className="text-xs font-mono text-white font-bold">{ibqos.links.length}</span>
                </div>
              </div>
            </div>
            
            <div className="h-64 w-full bg-black/60 rounded-3xl border border-white/5 relative overflow-hidden flex items-center justify-center group">
              <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent pointer-events-none" />
              <svg className="w-full h-full p-8 overflow-visible">
                <defs>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>

                {/* Background Grid of all nodes */}
                {Array.from({ length: 240 }).map((_, id) => {
                  const x = (id % 20) * (100 / 20) + 2.5;
                  const y = Math.floor(id / 20) * (100 / 12) + 4;
                  const isInvolved = ibqos.links.some(l => l.sourceId === id || l.targetId === id);
                  const isEntangled = ibqos.infons[id]?.isEntangled;
                  
                  return (
                    <g key={`bg-node-group-${id}`}>
                      {isEntangled && (
                        <circle 
                          cx={`${x}%`} cy={`${y}%`} r="4"
                          fill="none"
                          stroke="#a855f7"
                          strokeWidth="1"
                          strokeDasharray="2 2"
                          className="animate-spin-slow"
                          style={{ filter: 'drop-shadow(0 0 3px #a855f7)' }}
                        />
                      )}
                      <circle 
                        key={`bg-node-${id}`}
                        cx={`${x}%`} cy={`${y}%`} r={isInvolved || isEntangled ? "2.5" : "0.8"}
                        fill={id.toString() === nodeA ? "#a855f7" : id.toString() === nodeB ? "#06b6d4" : isEntangled ? "#a855f7" : isInvolved ? "white" : "rgba(255,255,255,0.05)"}
                        className={`cursor-pointer transition-all duration-300 ${isInvolved || isEntangled || id.toString() === nodeA || id.toString() === nodeB ? 'opacity-100' : 'hover:fill-cyan-400 hover:opacity-100 opacity-20'}`}
                        onClick={() => handleNodeSelect(id)}
                      >
                        <title>Infon #{id} {isEntangled ? `(Entangled with #${ibqos.infons[id]?.entangledWith})` : ''}</title>
                      </circle>
                    </g>
                  );
                })}

                {/* Legacy Entanglement Links */}
                {ibqos.infons.map((infon, id) => {
                  if (infon.isEntangled && infon.entangledWith !== undefined && id < infon.entangledWith) {
                    const x1 = (id % 20) * (100 / 20) + 2.5;
                    const y1 = Math.floor(id / 20) * (100 / 12) + 4;
                    const x2 = (infon.entangledWith % 20) * (100 / 20) + 2.5;
                    const y2 = Math.floor(infon.entangledWith / 20) * (100 / 12) + 4;
                    
                    return (
                      <motion.line 
                        key={`entangled-link-${id}-${infon.entangledWith}`}
                        x1={`${x1}%`} y1={`${y1}%`} x2={`${x2}%`} y2={`${y2}%`}
                        stroke="#a855f7"
                        strokeWidth="1"
                        strokeDasharray="2 2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.3 }}
                        transition={{ duration: 1 }}
                      />
                    );
                  }
                  return null;
                })}
                
                {/* Cognitive Links with enhanced visualization */}
                {ibqos.links.map((link, idx) => {
                  const x1 = (link.sourceId % 20) * (100 / 20) + 2.5;
                  const y1 = Math.floor(link.sourceId / 20) * (100 / 12) + 4;
                  const x2 = (link.targetId % 20) * (100 / 20) + 2.5;
                  const y2 = Math.floor(link.targetId / 20) * (100 / 12) + 4;
                  
                  let color = "#a855f7"; // purple
                  if (link.type === 'resonance') color = "#06b6d4"; // cyan
                  if (link.type === 'causal') color = "#f97316"; // orange
                  
                  return (
                    <g key={link.id}>
                      {/* Outer Glow Line */}
                      <motion.line 
                        x1={`${x1}%`} y1={`${y1}%`} x2={`${x2}%`} y2={`${y2}%`}
                        stroke={color}
                        strokeWidth={4 + link.strength * 12}
                        strokeLinecap="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 0.1 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        style={{ filter: 'blur(4px)' }}
                      />
                      {/* Core Link Line */}
                      <motion.line 
                        x1={`${x1}%`} y1={`${y1}%`} x2={`${x2}%`} y2={`${y2}%`}
                        stroke={color}
                        strokeWidth={1.5 + link.strength * 6}
                        strokeLinecap="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 0.6 + link.strength * 0.4 }}
                        transition={{ duration: 1, ease: "easeInOut", delay: idx * 0.02 }}
                        filter="url(#glow)"
                      />
                      {/* Pulse Animation */}
                      <motion.circle
                        r="3"
                        fill="white"
                        initial={{ offsetDistance: "0%" }}
                        animate={{ offsetDistance: "100%" }}
                        transition={{ 
                          duration: 3 / (link.strength + 0.5), 
                          repeat: Infinity, 
                          ease: "linear",
                          delay: Math.random() * 2
                        }}
                        style={{ 
                          offsetPath: `path('M ${x1},${y1} L ${x2},${y2}')`,
                          visibility: link.strength > 0.3 ? 'visible' : 'hidden',
                          opacity: 0.8
                        }}
                      />
                    </g>
                  );
                })}
              </svg>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-white/5 border border-white/5 rounded-2xl flex flex-col gap-1">
                <span className="text-[8px] font-black text-white/20 uppercase tracking-widest">Topology Entropy</span>
                <div className="text-lg font-mono text-white font-bold">{(1 - (ibqos.links.length / 240)).toFixed(4)} <span className="text-[10px] text-white/40">S</span></div>
              </div>
              <div className="p-4 bg-white/5 border border-white/5 rounded-2xl flex flex-col gap-1">
                <span className="text-[8px] font-black text-white/20 uppercase tracking-widest">Interconnect Density</span>
                <div className="text-lg font-mono text-cyan-400 font-bold">{(ibqos.links.length / 2.4).toFixed(1)}% <span className="text-[10px] text-white/40">ρ</span></div>
              </div>
              <div className="p-4 bg-white/5 border border-white/5 rounded-2xl flex flex-col gap-1">
                <span className="text-[8px] font-black text-white/20 uppercase tracking-widest">Network Coherence</span>
                <div className="text-lg font-mono text-purple-400 font-bold">{(ibqos.globalCoherence * 100).toFixed(2)}% <span className="text-[10px] text-white/40">Φ</span></div>
              </div>
            </div>
          </div>
        )}

        {ibqos && ibqos.links.length > 0 && (
          <div className="mt-8 border-t border-white/5 pt-8">
            <h4 className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-4 px-2">Active Link Registry</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ibqos.links.map((link) => (
              <div key={link.id} className="p-4 bg-white/5 border border-white/5 rounded-2xl flex items-center justify-between group hover:border-purple-500/30 transition-all">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center bg-purple-500/10 text-purple-400`}>
                    <Link2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-black text-white uppercase tracking-tighter">#{link.sourceId} ↔ #{link.targetId}</div>
                    <div className="text-[8px] font-mono text-purple-400/60 uppercase">{link.type} | Str: {(link.strength * 100).toFixed(0)}%</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => {
                      if (onNudge) {
                        onNudge(link.sourceId);
                        onNudge(link.targetId);
                      }
                    }}
                    className="p-2 text-white/20 hover:text-cyan-400 transition-colors"
                    title="Visualize Link"
                  >
                    <Zap className="w-3 h-3" />
                  </button>
                  <button 
                    onClick={() => handleRemoveLink(link.id)}
                    className="p-2 text-white/20 hover:text-red-400 transition-colors"
                    title="Remove Link"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-12">
        {protocols.map((p, i) => {
          const isCurrentStep = isTutorialActive && tutorialStep === i;
          const isCompleted = isTutorialActive && tutorialStep > i;
          
          return (
            <div 
              key={i} 
              className={`bg-black/40 border p-8 rounded-[2.5rem] flex flex-col gap-6 transition-all group relative overflow-hidden shadow-2xl ${
                isCurrentStep ? 'border-purple-500 ring-2 ring-purple-500/20 scale-[1.02]' : 
                isCompleted ? 'border-green-500/40 opacity-60' : 'border-white/10 hover:border-purple-500/40'
              }`}
            >
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity`} />
              
              <div className="flex items-center justify-between">
                <div className={`w-14 h-14 rounded-2xl ${p.bg} border border-white/5 flex items-center justify-center ${p.color}`}>
                  <p.icon className="w-7 h-7" />
                </div>
                <div className="text-right">
                  <span className="text-[9px] font-black text-white/20 uppercase tracking-widest">Protocol Status</span>
                  <div className="flex items-center gap-2 mt-1">
                    <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${isCompleted ? 'bg-green-500' : 'bg-green-500'}`} />
                    <span className={`text-[10px] font-mono font-bold uppercase ${isCompleted ? 'text-green-400' : 'text-green-400'}`}>
                      {isCompleted ? 'Synchronized' : 'Active'}
                    </span>
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

              {isCurrentStep && (
                <div className="mt-4 p-6 bg-purple-500/10 border border-purple-500/40 rounded-3xl animate-in zoom-in-95 duration-300">
                  <p className="text-xs font-bold text-purple-400 mb-4 italic tracking-tight">{p.tutorialPrompt}</p>
                  <button 
                    onClick={handleTutorialAction}
                    disabled={isSimulating}
                    className="w-full py-4 bg-purple-500 hover:bg-purple-400 disabled:bg-purple-500/50 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-xl shadow-purple-900/40 flex items-center justify-center gap-3"
                  >
                    {isSimulating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
                    {isSimulating ? "Processing..." : p.tutorialAction}
                  </button>
                </div>
              )}

              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/5">
                {Object.entries(p.metrics).map(([key, val], idx) => (
                  <div key={idx}>
                    <span className="block text-[8px] font-black text-white/20 uppercase tracking-tighter mb-1">{key}</span>
                    <span className="text-[10px] font-mono text-white font-bold">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
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
