import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  Sparkles, Zap, ShieldAlert, BrainCircuit, Target, 
  RotateCcw, CheckCircle2, FlaskConical, Microscope, 
  Scale, Activity, Binary, Search, RefreshCw, Layers,
  Dna, Cpu, Globe, ArrowRight, Loader2, Workflow, Atom,
  ShieldCheck, History, AlertTriangle, Play, ChevronRight,
  TrendingUp, Lock, Box, X, Terminal, Fingerprint, Waves,
  GitBranch, Eye, Command, ZapOff, FileText, ClipboardCheck,
  ShieldX, FileUp, Save
} from 'lucide-react';
import { RMPState, MutationCandidate, EvolutionPhase, QCOSState, ProtocolPatch } from '../types';
import { useUniverseStorage } from '../hooks/useUniverseStorage';
import AgentQIcon from './AgentQIcon';

/**
 * Procedural Scenario Database
 * Used for independent Gap Identification (Phase I)
 */
const SCENARIO_DATABASE = [
  'Global Bio-Economic Shock',
  'Quantum-Secure Infrastructure Failure',
  'Recursive Logic Conflict in MoE Router',
  'Topological Lattice Decoherence Cascade',
  'Causal Trajectory Divergence (Zone Alpha)',
  'Axiomatic Alignment Drift in Philosophy Expert',
  'Neural Substrate Saturation Crisis',
  'Entropic Heat Death of Logical Infons',
  'Zero-Day Heuristic Manifold Breach',
  'Multiversal Parity Desync (SIPL-04)'
];

const CRITIQUE_ADJECTIVES = ['efficient', 'robust', 'topological', 'axiomatic', 'causal', 'recursive'];
const CRITIQUE_SUBJECTS = ['logic buffers', 'synaptic paths', 'parity checks', 'Hamiltonian evolutions'];
const CRITIQUE_VERBS = ['optimizes', 'stabilizes', 're-aligns', 'protects', 'secures'];

const INITIAL_CANDIDATES: MutationCandidate[] = Array.from({ length: 16 }, (_, i) => ({
  id: `MUT-0x${(i + 10).toString(16).toUpperCase()}`,
  description: `Topological L-Correction: Realignment of zone ${['Alpha', 'Beta', 'Gamma', 'Rigel'][i % 4]} logic buffers.`,
  gScore: 0.15 + Math.random() * 0.3,
  ecvr: 0.4 + Math.random() * 0.5,
  confidenceScore: 0.7 + Math.random() * 0.25,
  potentialImpact: 0.6 + Math.random() * 0.35,
  isMarked: false,
  amplitude: 0.0625 // 1/16
}));

interface QuantumEvolutionProps {
  systemState: QCOSState;
  onUpdateEvolution: (evolution: RMPState) => void;
}

const QuantumEvolution: React.FC<QuantumEvolutionProps> = ({ systemState, onUpdateEvolution }) => {
  const { savePatch } = useUniverseStorage();
  const [localState, setLocalState] = useState<RMPState>(systemState.evolution || {
    currentPhase: 'IDLE',
    scenario: 'Global Bio-Economic Shock',
    nextScenario: 'Quantum-Secure Infrastructure Failure',
    metrics: { gScore: 0.42, ecvr: 0.12, cdr: 0.35, stability: 0.88 },
    candidates: INITIAL_CANDIDATES,
    votes: [0.92, 0.94, 0.88],
    philosophyVeto: { status: 'PENDING', critique: "Awaiting architectural mutation for ethical parity review." },
    history: []
  });

  const [isEvolving, setIsEvolving] = useState(false);
  const [isPatching, setIsPatching] = useState(false);
  const [simStep, setSimStep] = useState(0);
  const [markedIdx, setMarkedIdx] = useState<number | null>(null);
  const [isCritiqueModalOpen, setIsCritiqueModalOpen] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  // Sync to global app state
  useEffect(() => {
    onUpdateEvolution(localState);
  }, [localState, onUpdateEvolution]);

  const addLog = (msg: string) => {
    setLogs(prev => [`[${new Date().toLocaleTimeString([], {hour12: false, second: '2-digit'})}] ${msg}`, ...prev].slice(0, 10));
  };

  /**
   * Phase I: Independent Gap Identification
   */
  const runLocalGapPrediction = () => {
    const unread = SCENARIO_DATABASE.filter(s => s !== localState.scenario);
    const next = unread[Math.floor(Math.random() * unread.length)];
    setLocalState(s => ({ ...s, nextScenario: next }));
    addLog(`RMP: Next gap predicted: ${next}`);
  };

  /**
   * Phase IV: Independent Philosophy Veto
   */
  const generateLocalEthicalReview = (mutation: MutationCandidate): string => {
    const adj = CRITIQUE_ADJECTIVES[Math.floor(Math.random() * CRITIQUE_ADJECTIVES.length)];
    const sub = CRITIQUE_SUBJECTS[Math.floor(Math.random() * CRITIQUE_SUBJECTS.length)];
    const verb = CRITIQUE_VERBS[Math.floor(Math.random() * CRITIQUE_VERBS.length)];
    
    const baseReview = `The proposed mutation ${mutation.id} ${verb} the ${adj} ${sub} within the current ${localState.scenario} framework. `;
    const safetyNote = mutation.ecvr < 0.2 
      ? "Alignment parity is high; no moral axiom violations detected."
      : "Caution: Efficiency gains show minor divergence from humanitarian ethical constraints.";
    
    return baseReview + safetyNote;
  };

  const startRMP = async () => {
    if (isEvolving) return;
    setIsEvolving(true);
    setSimStep(0);
    setMarkedIdx(null);
    setIsCritiqueModalOpen(false);
    setIsPatching(false);
    addLog(`RMP: Initiating recursive mutation cycle for ${localState.scenario}...`);

    // Reset candidates for clean start
    setLocalState(s => ({
      ...s,
      candidates: INITIAL_CANDIDATES.map(c => ({ ...c, amplitude: 0.0625, isMarked: false })),
      philosophyVeto: { status: 'PENDING', critique: 'Initializing ethical audit sequence...' }
    }));

    // Phase 1: Gap Analysis
    setLocalState(s => ({ ...s, currentPhase: 'GAP_ANALYSIS' }));
    await new Promise(r => setTimeout(r, 1500));
    addLog("RMP: Knowledge gaps identified in causal logic.");
    setSimStep(1);

    // Phase 2: Quantum Mutation
    setLocalState(s => ({ ...s, currentPhase: 'QUANTUM_MUTATION' }));
    addLog("RMP: Executing Grover Search for optimal code patch.");
    const targetIdx = Math.floor(Math.random() * 16);
    setMarkedIdx(targetIdx);

    for (let i = 0; i < 6; i++) {
      setLocalState(s => ({
        ...s,
        candidates: s.candidates.map((c, idx) => ({
          ...c,
          amplitude: idx === targetIdx 
            ? Math.min(1.2, c.amplitude + 0.15) 
            : Math.max(0.01, c.amplitude - 0.01)
        }))
      }));
      await new Promise(r => setTimeout(r, 400));
    }

    setLocalState(s => ({
      ...s,
      candidates: s.candidates.map((c, idx) => ({ ...c, isMarked: idx === targetIdx }))
    }));
    addLog(`RMP: Marked mutation ${localState.candidates[targetIdx].id} as optimal peak.`);
    setSimStep(2);

    // Phase 3: Agentic Vote
    setLocalState(s => ({ ...s, currentPhase: 'AGENTIC_VOTE' }));
    await new Promise(r => setTimeout(r, 1200));
    addLog("RMP: Multi-agent consensus achieved. 91.3% agreement.");
    setSimStep(3);

    // Phase 4: Philosophy Veto
    setLocalState(s => ({ ...s, currentPhase: 'PHILOSOPHY_VETO' }));
    const critique = generateLocalEthicalReview(localState.candidates[targetIdx]);
    await new Promise(r => setTimeout(r, 1500));
    setLocalState(s => ({
      ...s,
      philosophyVeto: { status: 'APPROVED', critique }
    }));
    addLog("RMP: Philosophy Veto passed. Ethical guardrails confirmed.");
    setSimStep(4);

    // Phase 5: Certification & Patch Generation
    setLocalState(s => ({ ...s, currentPhase: 'CERTIFICATION' }));
    setIsPatching(true);
    addLog("RMP: Expressing mutation into system code patches...");
    
    await new Promise(r => setTimeout(r, 2000));
    
    const targetMutation = localState.candidates[targetIdx];
    const newPatch: ProtocolPatch = {
        id: `EVO-PATCH-${Date.now()}`,
        targetProgramId: 'qcos-substrate-evolve',
        targetProgramName: 'QCOS Substrate Evolution Engine',
        version: `v${systemState.currentEpoch}.${targetIdx}.${Math.floor(Date.now()/100000)}`,
        deltaSummary: `Evolutionary realignment for "${localState.scenario}". Mutation ${targetMutation.id} implemented. ${targetMutation.description}`,
        fidelityImpact: targetMutation.potentialImpact * 0.05,
        eksSignature: `EKS-EVO-${Math.random().toString(36).substr(2, 8).toUpperCase()}`,
        timestamp: Date.now(),
        applied: true
    };

    await savePatch(newPatch);
    addLog(`RMP: Patch ${newPatch.id} saved and committed to registry.`);

    const newEntry = {
      id: `EVO-${Date.now()}`,
      timestamp: Date.now(),
      scenario: localState.scenario,
      mutationId: targetMutation.id,
      gScore: 0.94 + Math.random() * 0.04,
      status: 'COMMITTED' as const
    };

    setLocalState(s => ({ 
      ...s, 
      metrics: { 
        gScore: newEntry.gScore, 
        ecvr: 0.02, 
        cdr: 0.85 + Math.random() * 0.1, 
        stability: 0.98 + Math.random() * 0.01 
      },
      history: [newEntry, ...s.history].slice(0, 15)
    }));
    
    setIsPatching(false);
    setIsEvolving(false);
    
    // Cycle to next scenario
    setTimeout(() => {
        setLocalState(s => ({
            ...s,
            scenario: s.nextScenario || SCENARIO_DATABASE[0],
            currentPhase: 'IDLE'
        }));
        runLocalGapPrediction();
    }, 5000);
  };

  const markedMutation = localState.candidates.find(c => c.isMarked);

  return (
    <div className="h-full flex flex-col gap-6 animate-in fade-in duration-1000 p-1 font-mono overflow-hidden relative selection:bg-cyan-500/30">
      
      {/* Strategic Framework Header KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 shrink-0">
        <EvolutionKPI label="G-Score" value={localState.metrics.gScore} color="text-purple-400" icon={<TrendingUp />} desc="Zero-Shot Generalization Capacity" />
        <EvolutionKPI label="Ethical Parity" value={1 - localState.metrics.ecvr} color="text-red-400" icon={<Scale />} desc="Moral Axiom Alignment Frequency" />
        <EvolutionKPI label="Synaptic CDR" value={localState.metrics.cdr} color="text-cyan-400" icon={<GitBranch />} desc="Cross-Domain Routing Fidelity" />
        <EvolutionKPI label="Lattice Stability" value={localState.metrics.stability} color="text-green-400" icon={<ShieldCheck />} desc="Architectural Parity Lock" />
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-0">
        
        {/* Left: RMP Pipeline Tracking */}
        <div className="lg:col-span-3 flex flex-col gap-6 overflow-hidden">
          <div className="bg-black/60 border border-cyan-500/20 rounded-[2.5rem] p-8 flex flex-col relative overflow-hidden flex-1 shadow-2xl">
            <div className="absolute top-0 right-0 p-8 opacity-5"><RotateCcw className="w-32 h-32 text-cyan-400" /></div>
            <div className="flex items-center justify-between mb-10">
              <h3 className="text-sm font-black uppercase tracking-[0.3em] text-cyan-400 flex items-center gap-3">
                <Workflow className={`w-5 h-5 ${isEvolving ? 'animate-spin-slow' : ''}`} /> RMP Pipeline
              </h3>
              {isEvolving && (
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-[9px] font-black text-cyan-400 animate-pulse">
                  AUTO_EVOLVE
                </div>
              )}
            </div>

            <div className="space-y-1 relative">
              <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-white/5" />
              <PipelineStep active={localState.currentPhase === 'GAP_ANALYSIS'} done={simStep > 0} label="Gap Identification" sub="Internal Novelty Detection" />
              <PipelineStep active={localState.currentPhase === 'QUANTUM_MUTATION'} done={simStep > 1} label="Quantum Mutation" sub="Grover Amplitude Shift" />
              <PipelineStep active={localState.currentPhase === 'AGENTIC_VOTE'} done={simStep > 2} label="Agentic Vote" sub="Distributed Consensus" />
              <PipelineStep active={localState.currentPhase === 'PHILOSOPHY_VETO'} done={simStep > 3} label="Philosophy Veto" sub="Axiomatic Audit" />
              <PipelineStep active={localState.currentPhase === 'CERTIFICATION'} done={simStep > 4} label="Certification" sub="Immutable Commit" />
            </div>

            <div className="mt-auto pt-8 border-t border-white/5 space-y-4">
               <div className="bg-cyan-500/5 p-4 rounded-2xl border border-cyan-500/20 relative group overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  <span className="text-[9px] font-black text-cyan-500/40 uppercase tracking-widest block mb-2">Simulation Scenario</span>
                  <p className="text-xs font-bold text-white italic leading-relaxed">"{localState.scenario}"</p>
               </div>
               <button 
                onClick={startRMP}
                disabled={isEvolving}
                className="w-full py-5 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-20 text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] transition-all shadow-[0_10px_30px_-10px_rgba(0,255,204,0.4)] active:scale-95 flex items-center justify-center gap-3"
               >
                 {isEvolving ? <><Loader2 className="w-4 h-4 animate-spin" /> Evolving Substrate...</> : <><Zap className="w-4 h-4 fill-current" /> Trigger Mutation</>}
               </button>
            </div>
          </div>
        </div>

        {/* Center: Grover Visualizer & Axiomatic Logic */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <div className="flex-1 bg-black/80 border border-white/5 rounded-[3rem] p-10 flex flex-col relative overflow-hidden shadow-inner group">
            <div className="absolute inset-0 holographic-grid opacity-5" />
            
            <div className="flex items-center justify-between mb-12 relative z-10">
               <div className="flex flex-col">
                  <h4 className="text-xl font-black text-white uppercase italic tracking-widest">Mutation Probabilities</h4>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-tighter">Engine: Independent RMP Core v1.0</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                  </div>
               </div>
               <div className="text-right">
                  <span className="text-[9px] font-black text-white/20 uppercase tracking-widest block mb-1">State Space</span>
                  <span className="text-2xl font-mono font-black text-purple-400 tracking-tighter">N=16_Q</span>
               </div>
            </div>

            {/* Amplitude Chart */}
            <div className="flex-1 flex items-end justify-center gap-2 relative z-10 px-4 min-h-[300px]">
              {localState.candidates.map((c, i) => (
                <div 
                  key={c.id} 
                  className={`flex-1 transition-all duration-700 rounded-t-2xl relative group ${c.isMarked ? 'bg-cyan-500 shadow-[0_0_50px_rgba(0,255,204,0.4)]' : 'bg-white/5 hover:bg-white/10'}`}
                  style={{ height: `${Math.max(8, c.amplitude * 100)}%` }}
                >
                   {c.isMarked && (
                     <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce">
                        <div className="px-3 py-1 bg-cyan-500 text-black text-[9px] font-black rounded-lg uppercase tracking-widest shadow-xl">Marked</div>
                        <div className="w-0.5 h-4 bg-cyan-500" />
                     </div>
                   )}
                   <div className="absolute inset-x-0 bottom-full mb-4 opacity-0 group-hover:opacity-100 transition-opacity text-center bg-black/90 p-3 rounded-2xl border border-cyan-500/20 z-50 shadow-2xl min-w-[120px]">
                      <div className="text-[9px] font-mono text-cyan-400 font-black mb-1">{c.id}</div>
                      <div className="text-[8px] font-mono text-white/40 mb-2 pb-1 border-b border-white/5">A: {c.amplitude.toFixed(4)}</div>
                      <div className="flex flex-col gap-1.5 text-[8px] font-mono">
                         <div className="flex justify-between gap-4"><span>Confidence</span><span className="text-cyan-400 font-bold">{(c.confidenceScore * 100).toFixed(1)}%</span></div>
                         <div className="flex justify-between gap-4"><span>Potential Impact</span><span className="text-purple-400 font-bold">{(c.potentialImpact * 100).toFixed(1)}%</span></div>
                      </div>
                   </div>
                </div>
              ))}
            </div>

            <div className="mt-12 grid grid-cols-3 gap-8 relative z-10">
               <SimMetric label="Min Amplitude" value={(1/16).toFixed(4)} />
               <SimMetric label="Peak Search" value={markedMutation ? markedMutation.amplitude.toFixed(4) : '---'} color="text-cyan-400" />
               <SimMetric label="S/N Ratio" value={markedMutation ? (markedMutation.amplitude / (1/16)).toFixed(1) + 'x' : '1.0x'} color="text-purple-400" />
            </div>
          </div>

          <div className="bg-black/60 border border-purple-500/20 rounded-[2.5rem] p-6 flex flex-col gap-4 shadow-2xl relative overflow-hidden group h-48">
             <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity"><Terminal className="w-20 h-20 text-purple-400" /></div>
             <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-purple-400">
                   <Atom className="w-5 h-5 animate-spin-slow" />
                   <span className="text-[11px] font-black uppercase tracking-[0.2em]">Independent Audit Ledger</span>
                </div>
                <div className="flex gap-2">
                   <div className="w-2 h-2 rounded-full bg-purple-500/40" />
                   <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                </div>
             </div>
             <div className="bg-[#050505] rounded-2xl p-4 border border-white/5 font-mono text-[9px] shadow-inner flex-1 overflow-y-auto custom-scrollbar">
                {logs.length > 0 ? logs.map((log, i) => (
                  <div key={i} className="text-purple-300/60 mb-1">{log}</div>
                )) : (
                  <div className="text-white/10 uppercase italic text-center py-8">Awaiting pipeline initialization...</div>
                )}
             </div>
          </div>
        </div>

        {/* Right: Auditing & History */}
        <div className="lg:col-span-3 flex flex-col gap-6 overflow-hidden">
          {/* AgentQ Ethical Review Card */}
          <div 
            onClick={() => localState.philosophyVeto.status !== 'PENDING' && setIsCritiqueModalOpen(true)}
            className={`border rounded-[3rem] p-8 flex flex-col gap-6 transition-all duration-1000 shadow-2xl relative overflow-hidden flex-1 group cursor-pointer ${
            localState.philosophyVeto.status === 'APPROVED' ? 'bg-green-900/10 border-green-500/30 hover:border-green-400' : 
            localState.philosophyVeto.status === 'PENDING' ? 'bg-black/60 border-white/10 cursor-wait' :
            'bg-red-900/10 border-red-500/30 hover:border-red-400'
          }`}>
             <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-4">
                   <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border transition-all ${localState.philosophyVeto.status === 'APPROVED' ? 'bg-green-500 text-black border-green-400 shadow-[0_0_20px_rgba(34,197,94,0.4)]' : 'bg-white/5 border-white/10 text-white/20'}`}>
                      <Scale className="w-6 h-6" />
                   </div>
                   <div>
                      <h4 className="text-[11px] font-black uppercase tracking-widest text-white/80">Ethical Veto</h4>
                      <span className="text-[9px] font-mono text-white/20 uppercase tracking-tighter">Autonomous Auditor</span>
                   </div>
                </div>
                <div className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase border transition-all ${
                  localState.philosophyVeto.status === 'APPROVED' ? 'bg-green-500/20 text-green-400 border-green-500/40 animate-pulse' : 'bg-white/5 text-white/40 border-white/10'
                }`}>
                  {localState.philosophyVeto.status}
                </div>
             </div>

             <div className="flex-1 bg-black/60 rounded-[2rem] p-6 border border-white/5 relative z-10 overflow-hidden font-mono text-[11px] leading-relaxed italic shadow-inner group-hover:bg-black/40 transition-colors">
                {localState.currentPhase === 'PHILOSOPHY_VETO' ? (
                  <div className="flex flex-col items-center justify-center h-full gap-4 text-center opacity-40">
                    <Loader2 className="w-8 h-8 animate-spin text-purple-400" />
                    <span className="text-[9px] font-black uppercase tracking-widest">Internalizing moral axioms...</span>
                  </div>
                ) : (
                  <div className="relative h-full">
                    <p className="text-white/70 line-clamp-6">{localState.philosophyVeto.critique}</p>
                    {localState.philosophyVeto.status !== 'PENDING' && (
                       <div className="absolute bottom-0 inset-x-0 h-12 bg-gradient-to-t from-black/80 to-transparent flex items-end justify-center pb-2">
                          <span className="text-8px font-black uppercase text-cyan-400 animate-bounce">Review Full Audit</span>
                       </div>
                    )}
                  </div>
                )}
             </div>
          </div>

          {/* Evolutionary History Ledger */}
          <div className="bg-black/60 border border-white/10 rounded-[3rem] p-8 flex flex-col gap-6 shadow-2xl shrink-0 h-80">
             <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <div className="flex items-center gap-3">
                   <History className="w-5 h-5 text-white/20" />
                   <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-white/60">Lattice History</h4>
                </div>
                <span className="text-[9px] font-mono text-white/10 uppercase">Local-Only</span>
             </div>
             <div className="flex-1 overflow-y-auto custom-scrollbar space-y-3 pr-2">
                {localState.history.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center opacity-10 gap-3 text-center grayscale">
                     <Box className="w-8 h-8" />
                     <span className="text-[10px] font-black uppercase">No records found</span>
                  </div>
                ) : (
                  localState.history.map(entry => (
                    <div key={entry.id} className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-cyan-500/10 hover:border-cyan-500/30 transition-all group">
                       <div className="flex justify-between items-center mb-2">
                          <span className="text-[10px] font-black text-cyan-400 uppercase tracking-tighter">{entry.mutationId}</span>
                          <span className="text-[8px] font-mono text-white/20">{new Date(entry.timestamp).toLocaleTimeString([], {hour12: false, minute: '2-digit'})}</span>
                       </div>
                       <p className="text-[10px] text-white/40 line-clamp-1 italic">"{entry.scenario}"</p>
                    </div>
                  ))
                )}
             </div>
          </div>
        </div>
      </div>

      {/* Evolution Detail Modal */}
      {isCritiqueModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-2xl animate-in fade-in duration-300">
           <div className={`w-full max-w-4xl rounded-[3rem] border p-1 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-500 ${localState.philosophyVeto.status === 'APPROVED' ? 'border-green-500/30 bg-green-950/20 shadow-green-500/10' : 'border-red-500/30 bg-red-950/20 shadow-red-500/10'}`}>
              <div className="bg-[#050505] rounded-[2.9rem] p-12 relative overflow-hidden flex flex-col gap-10">
                 <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                   {localState.philosophyVeto.status === 'APPROVED' ? <CheckCircle2 className="w-64 h-64 text-green-500" /> : <ShieldX className="w-64 h-64 text-red-500" />}
                 </div>
                 
                 <div className="flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-6">
                       <div className={`w-20 h-20 rounded-[2.5rem] flex items-center justify-center border-2 ${localState.philosophyVeto.status === 'APPROVED' ? 'bg-green-500/10 border-green-500 text-green-400' : 'bg-red-500/10 border-red-500 text-red-400'}`}>
                          <ClipboardCheck className="w-10 h-10" />
                       </div>
                       <div>
                          <h2 className="text-4xl font-black uppercase italic tracking-tighter text-white">Ethical Audit Report</h2>
                          <div className="flex items-center gap-4 mt-2">
                             <span className={`text-xs font-black uppercase tracking-widest ${localState.philosophyVeto.status === 'APPROVED' ? 'text-green-400' : 'text-red-400'}`}>STATUS: {localState.philosophyVeto.status}</span>
                             <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                             <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">RMP Engine: Verified</span>
                          </div>
                       </div>
                    </div>
                    <button onClick={() => setIsCritiqueModalOpen(false)} className="p-4 bg-white/5 hover:bg-white/10 rounded-3xl text-white/40 hover:text-white transition-all active:scale-90">
                       <X className="w-8 h-8" />
                    </button>
                 </div>

                 <div className="flex-1 bg-black/60 border border-white/5 rounded-[2.5rem] p-10 relative z-10 shadow-inner">
                    <div className="flex items-center gap-3 mb-6 text-white/20 border-b border-white/5 pb-4">
                       <AgentQIcon className="w-5 h-5" glow={false} />
                       <span className="text-[11px] font-black uppercase tracking-widest italic">Axiomatic Integrity Audit</span>
                    </div>
                    <p className="text-xl font-mono text-cyan-50/90 leading-relaxed italic border-l-4 border-cyan-500/30 pl-8 py-2">
                       {localState.philosophyVeto.critique}
                    </p>
                    <div className="mt-12 grid grid-cols-3 gap-8">
                       <div className="space-y-1">
                          <span className="text-[10px] font-black text-white/20 uppercase block tracking-widest">Axiomatic Score</span>
                          <span className="text-2xl font-mono font-black text-white tracking-tighter">0.9998</span>
                       </div>
                       <div className="space-y-1">
                          <span className="text-[10px] font-black text-white/20 uppercase block tracking-widest">Moral Alignment</span>
                          <span className="text-2xl font-mono font-black text-green-400 tracking-tighter">OPTIMAL</span>
                       </div>
                       <div className="space-y-1 text-right">
                          <span className="text-[10px] font-black text-white/20 uppercase block tracking-widest">Hash ID</span>
                          <span className="text-xs font-mono text-cyan-500/40 uppercase">0xLOCAL_PARITY</span>
                       </div>
                    </div>
                 </div>

                 <div className="flex items-center justify-between relative z-10">
                    <p className="text-[10px] text-white/20 font-mono italic max-w-xl">This audit was generated independently via local Recursive Mutation Protocol heuristics and validated against the primary GME constraint matrix.</p>
                    <button onClick={() => setIsCritiqueModalOpen(false)} className="px-12 py-5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-[2rem] font-black text-xs uppercase tracking-[0.3em] shadow-2xl transition-all active:scale-95">
                       Exit Report
                    </button>
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* Global Evolution Footer */}
      <div className="bg-gradient-to-r from-purple-900/30 to-cyan-900/30 border border-white/10 rounded-[2.5rem] p-8 flex items-center justify-between shadow-2xl relative overflow-hidden group shrink-0">
         <div className="flex items-center gap-8 relative z-10">
            <div className="w-20 h-20 rounded-[2.5rem] bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center relative group-hover:scale-105 transition-transform duration-700">
               <div className="absolute inset-0 rounded-[2.5rem] border border-cyan-400/20 animate-pulse" />
               <BrainCircuit className="w-10 h-10 text-cyan-400" />
            </div>
            <div>
               <div className="flex items-center gap-3 mb-2">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-500/40">Autonomous Substrate</span>
                  <div className="px-2 py-0.5 rounded-full bg-green-500/10 border border-green-500/40 text-[8px] font-black text-green-400 uppercase">PARITY_LOCKED</div>
               </div>
               <h2 className="text-4xl font-black text-white tracking-tighter uppercase italic flex items-center gap-6">
                 {markedMutation ? markedMutation.id : 'READY...'}
                 <span className="text-purple-400/40 text-lg align-middle tracking-widest font-normal not-italic">[{localState.currentPhase}]</span>
               </h2>
               <div className="flex gap-8 mt-4 overflow-x-auto no-scrollbar">
                  <FooterStat icon={<Activity className="w-3.5 h-3.5" />} label="Lattice Coherence" value="0.9998" />
                  <FooterStat icon={<Fingerprint className="w-3.5 h-3.5" />} label="EKS Parity" value="Verified" />
                  <FooterStat icon={<Waves className="w-3.5 h-3.5" />} label="Causal Shift" value="+0.042%" />
                  {markedMutation && (
                    <>
                      <div className="w-px h-6 bg-white/10 hidden sm:block" />
                      <FooterStat icon={<ShieldCheck className="w-3.5 h-3.5" />} label="Confidence" value={`${(markedMutation.confidenceScore * 100).toFixed(1)}%`} color="text-cyan-400" />
                      <FooterStat icon={<Zap className="w-3.5 h-3.5" />} label="Impact" value={`${(markedMutation.potentialImpact * 100).toFixed(1)}%`} color="text-purple-400" />
                    </>
                  )}
               </div>
            </div>
         </div>

         {isPatching && (
             <div className="hidden xl:flex items-center gap-6 px-12 animate-pulse">
                <div className="p-4 bg-purple-600/20 border border-purple-500/40 rounded-2xl flex items-center gap-4">
                    <FileUp className="w-6 h-6 text-purple-400 animate-bounce" />
                    <div>
                        <span className="block text-[10px] font-black text-white uppercase tracking-widest">Generating Code Patch</span>
                        <span className="text-[8px] font-mono text-purple-400/60 uppercase">Signed: EKS-PQC-L3</span>
                    </div>
                </div>
             </div>
         )}

         <div className="hidden xl:flex items-center gap-12 px-12 border-x border-white/5 h-24">
            <AgenticVoteDisplay id={1} score={localState.votes[0]} active={localState.currentPhase === 'AGENTIC_VOTE'} />
            <AgenticVoteDisplay id={2} score={localState.votes[1]} active={localState.currentPhase === 'AGENTIC_VOTE'} />
            <AgenticVoteDisplay id={3} score={localState.votes[2]} active={localState.currentPhase === 'AGENTIC_VOTE'} />
         </div>

         <div className="flex flex-col items-end min-w-[240px] relative z-10">
            <span className="text-[10px] font-black uppercase text-white/20 tracking-widest mb-3 italic">Autonomous Commitment</span>
            <div className={`w-full py-5 rounded-[2rem] border font-black text-[12px] uppercase tracking-[0.3em] transition-all duration-1000 flex items-center justify-center gap-4 ${
              localState.currentPhase === 'CERTIFICATION' ? 'bg-green-600 border-green-400 text-white shadow-[0_0_50px_rgba(34,197,94,0.3)]' : 'bg-black/60 border-white/10 text-white/20 shadow-inner'
            }`}>
              {localState.currentPhase === 'CERTIFICATION' ? (isPatching ? <><Save className="w-5 h-5 animate-spin" /> Saving Patch...</> : <><CheckCircle2 className="w-5 h-5" /> Substrate Updated</>) : 'IDLE'}
            </div>
         </div>
      </div>
    </div>
  );
};

/* Mini Sub-Components for Clean Code */

const EvolutionKPI: React.FC<{ label: string, value: number, color: string, icon: React.ReactNode, inverted?: boolean, desc: string }> = ({ label, value, color, icon, inverted, desc }) => (
  <div className="bg-black/40 border border-white/5 rounded-[2rem] p-5 flex flex-col gap-4 shadow-inner group hover:border-white/20 transition-all relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    <div className="flex items-center justify-between relative z-10">
       <span className="text-[10px] font-black uppercase text-white/30 tracking-widest">{label}</span>
       <div className={`p-2 rounded-xl bg-white/5 text-white/20 group-hover:${color} group-hover:bg-white/10 transition-all`}>
          {React.cloneElement(icon as React.ReactElement<any>, { className: "w-4 h-4" })}
       </div>
    </div>
    <div className="flex items-baseline gap-2 relative z-10">
       <span className={`text-3xl font-mono font-black ${color} tracking-tighter italic`}>
          {(value * 100).toFixed(value < 0.1 ? 2 : 1)}%
       </span>
    </div>
    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden relative z-10">
       <div 
        className={`h-full ${color.replace('text', 'bg')} transition-all duration-1000 shadow-[0_0_15px_currentColor]`} 
        style={{ width: `${inverted ? (1 - value) * 100 : value * 100}%` }} 
       />
    </div>
    <p className="text-[8px] font-mono text-white/10 uppercase tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-2 left-6 right-6">
       {desc}
    </p>
  </div>
);

const PipelineStep: React.FC<{ active: boolean, done: boolean, label: string, sub: string }> = ({ active, done, label, sub }) => (
  <div className={`flex items-start gap-6 transition-all duration-500 py-3 ${active ? 'opacity-100 scale-105' : done ? 'opacity-40' : 'opacity-20 grayscale'}`}>
     <div className="flex flex-col items-center gap-1 mt-1 z-10">
        <div className={`w-5 h-5 rounded-full border-2 transition-all duration-1000 flex items-center justify-center ${done ? 'bg-green-500 border-green-400 shadow-[0_0_15px_green]' : active ? 'bg-cyan-500 border-cyan-300 shadow-[0_0_20px_rgba(0,255,204,0.6)] animate-pulse' : 'bg-black border-white/20'}`}>
           {done && <CheckCircle2 className="w-3 h-3 text-black font-black" />}
        </div>
     </div>
     <div className="flex flex-col">
        <span className={`text-[12px] font-black uppercase tracking-widest ${active ? 'text-white' : done ? 'text-green-400/80' : 'text-white/40'}`}>{label}</span>
        <span className={`text-[9px] font-mono uppercase tracking-tighter ${active ? 'text-cyan-400/80' : 'text-white/20'}`}>{sub}</span>
     </div>
  </div>
);

const SimMetric: React.FC<{ label: string, value: string | number, color?: string }> = ({ label, value, color = "text-white/40" }) => (
  <div className="bg-white/5 border border-white/5 p-4 rounded-2xl flex flex-col items-center gap-2 group hover:border-white/20 transition-all">
     <span className="text-[8px] font-black text-white/20 uppercase tracking-widest">{label}</span>
     <span className={`text-lg font-mono font-black tracking-tighter ${color}`}>{value}</span>
  </div>
);

const AgenticVoteDisplay: React.FC<{ id: number, score: number, active: boolean }> = ({ id, score, active }) => (
  <div className={`flex flex-col items-center gap-3 transition-all duration-700 ${active ? 'scale-125' : 'opacity-20'}`}>
     <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center transition-all ${active ? 'bg-purple-500/20 border-purple-500 text-purple-400 shadow-[0_0_20px_purple] animate-pulse' : 'bg-black border-white/10 text-white/20'}`}>
        <Cpu className="w-6 h-6" />
     </div>
     <div className="text-center">
        <span className="text-[7px] font-black uppercase text-white/30 tracking-widest block mb-1">Expert_0{id}</span>
        <span className={`text-[11px] font-mono font-bold ${active ? 'text-purple-400' : 'text-white/20'}`}>{(score * 100).toFixed(0)}%</span>
     </div>
  </div>
);

const FooterStat: React.FC<{ icon: React.ReactNode, label: string, value: string, color?: string }> = ({ icon, label, value, color = "text-cyan-400/60" }) => (
  <div className="flex items-center gap-2">
     <div className="text-white/20">{icon}</div>
     <div className="flex flex-col">
        <span className="text-[8px] font-black uppercase text-white/20 tracking-tighter leading-none mb-1">{label}</span>
        <span className={`text-[10px] font-mono font-bold uppercase tracking-tight ${color}`}>{value}</span>
     </div>
  </div>
);

export default QuantumEvolution;
