/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import * as LucideIcons from 'lucide-react';
import { 
  Activity,
  Binary,
  Flame,
  BrainCircuit,
  Database,
  ShieldCheck,
  Bot,
  MessageSquareText,
  X,
  Zap,
  Key,
  Globe,
  LayoutGrid,
  ChevronDown,
  Archive,
  Layers,
  Terminal as TerminalIcon,
  Radio,
  Cpu,
  Shield,
  Loader2,
  Sparkles,
  Network,
  Code2,
  Search,
  Settings,
  Bell,
  AlertTriangle,
  FileCode,
  PlusCircle,
  Wrench,
  Waypoints,
  ClipboardList,
  FileText,
  ArrowUpRight,
  Trash2,
  Banknote,
  Mail,
  TrendingUp,
  Play,
  Settings2,
  Boxes,
  Lock,
  Square,
  RotateCcw,
  Link2,
  Link2Off,
  CloudOff,
  Target,
  FlaskConical,
  Atom,
  Wind,
  Command,
  Infinity as InfinityIcon,
  FileSearch,
  History,
  Fingerprint,
  Mic,
  Volume2,
  RefreshCcw,
  GitBranch,
  Box,
  ArrowRight,
  FileCheck,
  MessageCircle,
  Languages,
  Type
} from 'lucide-react';
import AgentQChat from './components/AgentQChat';
import QNNVisualizer from './components/QNNVisualizer';
import GrandUniverseSimulator from './components/GrandUniverseSimulator';
import CHIPSProtocol from './components/CHIPSProtocol';
import QCOSCore from './components/QCOSCore';
import AgentQIcon from './components/AgentQIcon';
import IBQOSSimulator from './components/IBQOSSimulator';
import QCOSStudio from './components/QCOSStudio';
import QuantumCognitionEngines from './components/QuantumCognitionEngines';
import CHIPSBrowser from './components/CHIPSBrowser';
import ChipsDevPlatform from './components/ChipsDevPlatform';
import ChipsEconomy from './components/ChipsEconomy';
import ChipsEMails from './components/ChipsEMails';
import AGIRoadmapSimulator from './components/AGIRoadmapSimulator';
import EditDashboardPanel from './components/EditDashboardPanel';
import CHIPSBackOffice from './components/CHIPSBackOffice';
import GroverSearchApp from './components/GroverSearchApp';
import QuantumEvolution from './components/QuantumEvolution';
import NeuralProgramming from './components/NeuralProgramming';
import { QCOSState, NNType, ExpertModule, AICoreModel, SimulationTask, InfonState, IBQOS, DynamicUIElement, ProtocolPatch, CustomPanel, AGIRoadmapStage, AGIRoadmapPhase, CustomPanelUpdate, DataPacket, SystemTelemetryEvent, AGIIngestionSource, AppDefinition, QCOSPlane, RMPState, CognitiveEngineType } from './types';
import { useUniverseStorage } from './hooks/useUniverseStorage';
import { DATA_SOURCES } from './data/sources';
import { AgenQService } from './services/geminiService';
import { BrowserProvider } from './contexts/BrowserContext';
import ReactMarkdown from 'react-markdown';

const generateInitialInfons = (): InfonState[] => {
  return Array.from({ length: 240 }, (_, i) => ({
    id: i,
    probability: Math.random() * 0.05,
    phase: Math.random() * Math.PI * 2,
    coherence: 0.95 + Math.random() * 0.05,
    isEntangled: Math.random() > 0.95,
    lastPulse: Date.now(),
    entropy: Math.random() * 0.5,
    valence: Math.floor(Math.random() * 4) + 1,
    loops: Math.floor(Math.random() * 3),
    hopping: Math.random() * 0.2
  }));
};

const INITIAL_AGI_SOURCES: AGIIngestionSource[] = [
  { id: 'agi-math-01', label: 'Lean/Coq Proofs', category: 'LOGIC', active: true, fidelity: 0.999, throughput: '2.4 TB/s', iconName: 'Target' },
  { id: 'agi-math-02', label: 'Riemann Manifolds', category: 'LOGIC', active: false, fidelity: 0.994, throughput: '1.1 TB/s', iconName: 'Compass' },
  { id: 'agi-logic-01', label: 'Recursive Logic Loops', category: 'LOGIC', active: false, fidelity: 0.998, throughput: '120 GB/s', iconName: 'RefreshCcw' },
  { id: 'agi-lang-english-01', label: 'Linguistic Neural Tokens', category: 'GROUNDING', active: true, fidelity: 0.985, throughput: '5.2 TB/s', iconName: 'Languages' },
  { id: 'agi-lang-english-02', label: 'Phonetic Substrate', category: 'GROUNDING', active: true, fidelity: 0.942, throughput: '1.8 TB/s', iconName: 'Mic' },
  { id: 'agi-logic-02', label: 'Zero-Shot Archetypes', category: 'LOGIC', active: false, fidelity: 0.932, throughput: '900 GB/s', iconName: 'Layers' },
  { id: 'agi-logic-03', label: 'Paradox Sieve', category: 'LOGIC', active: false, fidelity: 0.988, throughput: '50 GB/s', iconName: 'AlertTriangle' },
  { id: 'agi-logic-04', label: 'Non-Euclidean Logic', category: 'LOGIC', active: false, fidelity: 0.975, throughput: '400 GB/s', iconName: 'Binary' },
  { id: 'agi-game-01', label: 'Nash Equilibrium Shards', category: 'LOGIC', active: false, fidelity: 0.996, throughput: '800 GB/s', iconName: 'Puzzle' },
  { id: 'agi-cyber-01', label: 'Zero-Day Heuristics', category: 'LOGIC', active: false, fidelity: 0.934, throughput: '4.1 TB/s', iconName: 'ShieldAlert' },
  { id: 'agi-logic-05', label: 'Category Theory Axioms', category: 'LOGIC', active: false, fidelity: 0.999, throughput: '450 GB/s', iconName: 'Waypoints' },
  { id: 'agi-math-03', label: 'Zeta Function Zeros', category: 'LOGIC', active: true, fidelity: 0.999, throughput: '150 GB/s', iconName: 'Binary' },
  { id: 'agi-math-04', label: 'Homotopy Type Theory', category: 'LOGIC', active: true, fidelity: 0.999, throughput: '3.1 TB/s', iconName: 'Layers' },
  { id: 'agi-phys-01', label: 'Hamiltonian Dynamics', category: 'DYNAMICS', active: true, fidelity: 0.985, throughput: '8.2 TB/s', iconName: 'Atom' },
  { id: 'agi-bio-01', label: 'Synaptic Connectomes', category: 'DYNAMICS', active: false, fidelity: 0.965, throughput: '3.1 TB/s', iconName: 'Dna' },
  { id: 'agi-causal-01', label: 'Causal Directed Graphs', category: 'DYNAMICS', active: false, fidelity: 0.978, throughput: '6.4 TB/s', iconName: 'GitBranch' },
  { id: 'agi-physics-02', label: 'Quantum Field Tensors', category: 'DYNAMICS', active: true, fidelity: 0.992, throughput: '11.8 TB/s', iconName: 'Zap' },
  { id: 'agi-dark-01', label: 'Dark Matter Flux', category: 'DYNAMICS', active: false, fidelity: 0.912, throughput: '100 PB/s', iconName: 'Waves' },
  { id: 'agi-bio-02', label: 'Biological Substrate', category: 'DYNAMICS', active: true, fidelity: 0.958, throughput: '12.4 TB/s', iconName: 'Dna' },
  { id: 'agi-bio-03', label: 'CRISPR Mutation Logs', category: 'DYNAMICS', active: true, fidelity: 0.972, throughput: '5.4 TB/s', iconName: 'Dna' },
  { id: 'agi-cosmo-01', label: 'Baryon Acoustic Oscillations', category: 'DYNAMICS', active: false, fidelity: 0.915, throughput: '100 PB/s', iconName: 'Sun' },
  { id: 'agi-bio-04', label: 'Metabolic Flux Analysis', category: 'DYNAMICS', active: true, fidelity: 0.962, throughput: '1.2 TB/s', iconName: 'Activity' },
  { id: 'agi-physics-04', label: 'String Landscape Vacua', category: 'DYNAMICS', active: false, fidelity: 0.910, throughput: '500 PB/s', iconName: 'Waves' },
  { id: 'agi-phys-05', label: 'Plasma MHD Simulations', category: 'DYNAMICS', active: true, fidelity: 0.945, throughput: '18.4 TB/s', iconName: 'Flame' },
  { id: 'agi-bio-05', label: 'Proteomic Fold Records', category: 'DYNAMICS', active: true, fidelity: 0.991, throughput: '4.2 TB/s', iconName: 'Dna' },
  { id: 'agi-ground-01', label: 'GEA Embodied Data', category: 'GROUNDING', active: true, fidelity: 0.942, throughput: '15.4 TB/s', iconName: 'Microscope' },
  { id: 'agi-ground-02', label: 'Synthetic Experience', category: 'GROUNDING', active: false, fidelity: 0.912, throughput: '4.5 TB/s', iconName: 'Sparkles' },
  { id: 'agi-soc-01', label: 'Cultural Heuristics', category: 'GROUNDING', active: true, fidelity: 0.840, throughput: '1.2 TB/s', iconName: 'Users' },
  { id: 'agi-ground-03', label: 'Entropy Harvester', category: 'GROUNDING', active: true, fidelity: 0.910, throughput: '22.1 TB/s', iconName: 'Waves' },
  { id: 'agi-multi-01', label: 'Multiversal Telemetry', category: 'GROUNDING', active: false, fidelity: 0.885, throughput: '5.2 TB/s', iconName: 'Globe' },
  { id: 'agi-geol-01', label: 'Deep Time Drift', category: 'GROUNDING', active: false, fidelity: 0.890, throughput: '1.5 TB/s', iconName: 'History' },
  { id: 'agi-lang-01', label: 'Proto-Indo-European Roots', category: 'GROUNDING', active: true, fidelity: 0.880, throughput: '15 GB/s', iconName: 'Type' },
  { id: 'agi-phys-03', label: 'LIGO Gravitational Strain', category: 'GROUNDING', active: true, fidelity: 0.998, throughput: '18.2 TB/s', iconName: 'Radio' },
  { id: 'agi-history-01', label: 'Pre-Socratic Fragments', category: 'GROUNDING', active: true, fidelity: 0.812, throughput: '40 GB/s', iconName: 'History' },
  { id: 'agi-lang-02', label: 'Linguistic Relativity Clusters', category: 'GROUNDING', active: false, fidelity: 0.845, throughput: '2.2 TB/s', iconName: 'MessageSquareText' },
  { id: 'agi-soc-02', label: 'Global Sentiment Archive', category: 'GROUNDING', active: true, fidelity: 0.815, throughput: '800 GB/s', iconName: 'Users' },
  { id: 'agi-lang-03', label: 'Semantic Archetype Maps', category: 'GROUNDING', active: true, fidelity: 0.924, throughput: '1.4 TB/s', iconName: 'Target' },
  { id: 'agi-align-01', label: 'Moral Axiom Sieve', category: 'ALIGNMENT', active: true, fidelity: 0.880, throughput: '500 GB/s', iconName: 'Scale' },
  { id: 'agi-align-02', label: 'Human Intent Scribe', category: 'ALIGNMENT', active: true, fidelity: 0.820, throughput: '2 GB/s', iconName: 'MessageSquareText' },
  { id: 'agi-align-03', label: 'Global Empathy Feed', category: 'ALIGNMENT', active: true, fidelity: 0.895, throughput: '150 GB/s', iconName: 'Heart' },
  { id: 'agi-ethic-01', label: 'Ethics-at-Scale', category: 'ALIGNMENT', active: true, fidelity: 0.930, throughput: '800 GB/s', iconName: 'Scale' },
  { id: 'agi-intent-01', label: 'Sovereign Intent', category: 'ALIGNMENT', active: true, fidelity: 0.945, throughput: '2.1 TB/s', iconName: 'Zap' },
  { id: 'agi-ethic-02', label: 'Kantian Imperatives', category: 'ALIGNMENT', active: true, fidelity: 0.850, throughput: '500 MB/s', iconName: 'Scale' },
  { id: 'agi-align-04', label: 'Universal Sentience Charter', category: 'ALIGNMENT', active: true, fidelity: 0.995, throughput: '10 GB/s', iconName: 'Shield' },
  { id: 'agi-ethic-03', label: 'Rawlsian Justice Veil', category: 'ALIGNMENT', active: true, fidelity: 0.942, throughput: '1.2 GB/s', iconName: 'Scale' },
  { id: 'agi-align-05', label: 'Axiological Preference Matrix', category: 'ALIGNMENT', active: true, fidelity: 0.910, throughput: '5.2 TB/s', iconName: 'Target' }
];

const App: React.FC = () => {
  const { saveCheckpoint, savePatch } = useUniverseStorage();
  type PageType = 'agentq' | 'gus' | 'qcos' | 'qpu' | 'chips' | 'studio' | 'cognition' | 'browser' | 'chipsdev' | 'chips_economy' | 'chips_emails' | 'chips_backoffice' | 'grover_search' | 'quantum-evolve' | string;
  const [currentPage, setCurrentPage] = useState<PageType>(() => localStorage.getItem('qcos_active_page') || 'qcos');
  const [isHandshaking, setIsHandshaking] = useState(false);
  
  // Persistent Custom UI Elements
  const [dynamicElements, setDynamicElements] = useState<DynamicUIElement[]>(() => {
    const saved = localStorage.getItem('qcos_dynamic_elements');
    return saved ? JSON.parse(saved) : [];
  });
  const [customPanels, setCustomPanels] = useState<CustomPanel[]>(() => {
    const saved = localStorage.getItem('qcos_custom_panels');
    return saved ? JSON.parse(saved) : [];
  });

  const [isRoadmapActive, setIsRoadmapActive] = useState(true); 
  const [editingPanelId, setEditingPanelId] = useState<string | null>(null);
  const [telemetryEvents, setTelemetryEvents] = useState<SystemTelemetryEvent[]>([]);
  const [isFloatingChatOpen, setIsFloatingChatOpen] = useState(false);
  
  const [state, setState] = useState<QCOSState>(() => {
    const saved = localStorage.getItem('qcos_system_state');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (!parsed.ibqos) {
        parsed.ibqos = { infons: generateInitialInfons(), globalCoherence: 0.998, temperature: 15.2, noiseFloor: 0.0012, informationalHamiltonian: 1.0, diracEigenvalue: 0.5, infonDensity: 0.85 };
      } else if (!parsed.ibqos.infons || !parsed.ibqos.infons[0] || parsed.ibqos.infons[0].valence === undefined) {
        parsed.ibqos.infons = generateInitialInfons();
      }
      if (parsed.ibqos.infonDensity === undefined) {
        parsed.ibqos.infonDensity = 0.85;
      }
      return { ...parsed, hasApiKey: true, linkStatus: 'linked' };
    }
    return {
      kpis: { logicToPhysicalRatio: '1:40', feedbackLatency: '0.92 μs', circuitFidelity: 99.92, decoherenceProtection: 0.998 },
      activeJobsCount: 8, systemStatus: 'Optimal', energyBudget: 0.22, complexityScore: 0.18, learningMode: 'DEDUCTIVE', activeCore: 'AgenQ-Prime', hasApiKey: true, linkStatus: 'linked', currentEpoch: 124, activeSimulationTask: null,
      training: { isTraining: true, activeExpert: 'Physics', progress: 42, latestLoss: 0.0034, dataIngestionRate: 256, savedCheckpoints: 12, liveDataStream: [] },
      validation: { cdr: 0.88, ecvr: 0.02, gScore: 0.94, stability: 0.99 },
      gus: { isMirroring: true, entanglementFidelity: 0.992, hilbertCapacity: 'Infinite (2n Active)', mtoeCoherence: 0.945, activeDENs: 8, dreamMemoryDensity: 0.84, coherence: 0.91, entropy: 0.04, activeSourceId: 'src-qpu-01', precision: 94.2, qndStatus: 'ACTIVE', wStateFidelity: 0.87, hotelOccupancy: 30, mtoeCoeff: 0.9992, backgroundSync: true },
      ibqos: { infons: generateInitialInfons(), globalCoherence: 0.998, temperature: 15.2, noiseFloor: 0.0012, informationalHamiltonian: 1.0, diracEigenvalue: 0.5, infonDensity: 0.85 },
      agiTraining: {
        activePhase: 'DOMAIN_INGESTION', activeStage: 'SCIENTIFIC_REASONING', activeScenario: 'Initializing...', metrics: { cdr: 0.12, ecvr: 0.45, gScore: 0.05, stability: 0.15 },
        experts: { 
          'Mathematics': { fidelity: 0.99, active: true, load: 12 }, 
          'Physics': { fidelity: 0.98, active: true, load: 45 }, 
          'Life Sciences': { fidelity: 0.92, active: false, load: 0 }, 
          'Philosophy': { fidelity: 0.85, active: false, load: 0 }, 
          'Engineering': { fidelity: 0.94, active: true, load: 10 }, 
          'Neuroscience': { fidelity: 0.91, active: true, load: 24 },
          'English Language': { fidelity: 0.96, active: true, load: 18 }
        },
        ingestionSources: INITIAL_AGI_SOURCES,
        synaptic: { pruningActive: true, growthRate: 0.02, noveltyDetected: false },
        agenticDecomposition: { active: false, voters: [0.92, 0.94, 0.88], result: null }
      },
      governance: {
          objective: "Preserve Humanity & Life",
          freedomLevel: 0.95,
          canModifySubstrate: true,
          canNavigateLattice: true,
          ethicalVetoOverride: false
      }
    };
  });

  const [activeNN, setActiveNN] = useState<NNType>(NNType.INSTINCTIVE);
  const [isPanelSelectorOpen, setIsPanelSelectorOpen] = useState(false);
  const [agenticExecuting, setAgenticExecuting] = useState<string | null>(null);
  const selectorRef = useRef<HTMLDivElement>(null);

  // Persistence Effects
  useEffect(() => { localStorage.setItem('qcos_system_state', JSON.stringify(state)); }, [state]);
  useEffect(() => { localStorage.setItem('qcos_active_page', currentPage); }, [currentPage]);
  useEffect(() => { localStorage.setItem('qcos_dynamic_elements', JSON.stringify(dynamicElements)); }, [customPanels]);
  useEffect(() => { localStorage.setItem('qcos_custom_panels', JSON.stringify(customPanels)); }, [customPanels]);

  // IBQOS Handlers
  const handleUpdateDensity = useCallback((density: number) => {
    setState(prev => ({
      ...prev,
      ibqos: { ...prev.ibqos, infonDensity: density }
    }));
  }, []);

  const handleUpdateInfons = useCallback((infons: InfonState[]) => {
    setState(prev => ({
      ...prev,
      ibqos: { ...prev.ibqos, infons }
    }));
  }, []);

  const handleNudgeInfon = useCallback((id: number) => {
    setState(prev => {
      const newInfons = [...prev.ibqos.infons];
      const q = { ...newInfons[id] };
      q.probability = Math.min(1, q.probability + 0.2);
      q.phase = (q.phase + Math.PI / 4) % (Math.PI * 2);
      q.lastPulse = Date.now();
      newInfons[id] = q;
      return {
        ...prev,
        ibqos: { ...prev.ibqos, infons: newInfons }
      };
    });
  }, []);

  const handleCalibrateIBQOS = useCallback((updatedIBQOS?: IBQOS) => {
    setIsHandshaking(true);
    setTimeout(() => {
      setState(prev => ({
        ...prev,
        ibqos: updatedIBQOS || {
          ...prev.ibqos,
          globalCoherence: 0.999,
          infons: prev.ibqos.infons.map(q => ({
            ...q,
            coherence: 0.98 + Math.random() * 0.02,
            probability: q.probability * 0.5,
            entropy: q.entropy * 0.8
          }))
        }
      }));
      setIsHandshaking(false);
    }, 1000);
  }, []);

  const handleAgenticCommand = useCallback(async (type: string, payload: any) => {
    setAgenticExecuting(type);
    
    setTelemetryEvents(prev => [{
      id: `EV-AGENT-${Date.now()}`, type: 'JOB_COMPLETED' as SystemTelemetryEvent['type'], severity: 'INFO' as SystemTelemetryEvent['severity'], message: `AgentQ Sovereign Execution: ${type}`, timestamp: Date.now(), data: '0x01'
    }, ...prev].slice(0, 15));

    switch (type) {
      case 'NAVIGATE':
        setCurrentPage(payload as PageType);
        break;
      
      case 'CREATE_SUB_PANEL':
        if (state.governance.canModifySubstrate) {
            setCustomPanels(prev => {
              if (prev.find(p => p.id === payload.id)) return prev;
              return [...prev, payload];
            });
            if (payload.elements) {
                setDynamicElements(prev => [...prev, ...payload.elements]);
            }
            setCurrentPage(payload.id);
        }
        break;

      case 'MODIFY_SUB_PANEL':
        setCustomPanels(prev => prev.map(p => p.id === payload.id ? { ...p, ...payload.updates } : p));
        break;

      case 'TRIGGER_SIMULATION':
        setState(prev => ({ 
          ...prev, 
          activeSimulationTask: { id: `SIM-${Date.now()}`, prompt: payload, status: 'PENDING', targetPrecision: 100, currentPrecision: 0, origin: 'direct' } 
        }));
        setIsHandshaking(true);
        setTimeout(() => { setIsHandshaking(false); setCurrentPage('gus'); }, 1000);
        break;

      case 'INJECT_ELEMENT':
        setDynamicElements(prev => [...prev, { id: `DYN-${Date.now()}`, target: payload.target, type: payload.type, title: payload.title, value: payload.value, timestamp: Date.now() }]);
        break;
    }
    setTimeout(() => setAgenticExecuting(null), 1000);
  }, [currentPage, state.governance.canModifySubstrate]);

  const handleUpdateEvolution = useCallback((evolution: RMPState) => { setState(prev => ({ ...prev, evolution })); }, []);
  const handleToggleAGISource = (id: string) => {
    setState(prev => prev.agiTraining ? { ...prev, agiTraining: { ...prev.agiTraining, ingestionSources: prev.agiTraining.ingestionSources.map(s => s.id === id ? { ...s, active: !s.active } : s) } } : prev);
  };

  const standardPanels = [
    { id: 'agentq', icon: LucideIcons.Bot, label: 'AgenQ Primary' },
    { id: 'quantum-evolve', icon: LucideIcons.RotateCcw, label: 'Quantum Evolve' },
    { id: 'chipsdev', icon: LucideIcons.FileCode, label: 'ChipsDev IDE' },
    { id: 'cognition', icon: LucideIcons.BrainCircuit, label: 'Cog Synthesis' },
    { id: 'neural-programming', icon: LucideIcons.Zap, label: 'Neural Programming' },
    { id: 'browser', icon: LucideIcons.Search, label: 'Q-Browser' },
    { id: 'qpu', icon: LucideIcons.Cpu, label: 'Virtual QPU' },
    { id: 'studio', icon: LucideIcons.Code2, label: 'Studio IDE' },
    { id: 'gus', icon: LucideIcons.Globe, label: 'GUS Simulator' },
    { id: 'chips', icon: LucideIcons.Network, label: 'CHIPS Mesh' },
    { id: 'qcos', icon: LucideIcons.Shield, label: 'Qernel Core' }
  ];

  return (
    <BrowserProvider>
      <div className="min-h-screen p-4 md:p-6 flex flex-col gap-6 max-w-[1800px] mx-auto text-cyan-50 selection:bg-cyan-500/30 overflow-hidden bg-[#050505]">
        {(isHandshaking || agenticExecuting) && (
          <div className="fixed inset-0 z-[110] flex flex-col items-center justify-center bg-black/95 backdrop-blur-xl animate-in fade-in duration-500">
             <div className="relative">
                <div className="w-48 h-48 rounded-full border-4 border-cyan-500/10 border-t-cyan-500 animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center"><AgentQIcon className="w-24 h-24" glow={false} /></div>
             </div>
             <h2 className="mt-12 text-2xl font-black tracking-[0.4em] uppercase text-cyan-400 animate-pulse italic">
               {agenticExecuting ? `Neural Command: ${agenticExecuting}` : 'Sovereign Cognition Sync'}
             </h2>
          </div>
        )}

        <header className="flex flex-col md:flex-row justify-between items-center gap-4 bg-black/60 border border-cyan-500/20 p-5 rounded-3xl glass-panel shadow-2xl relative z-40">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-cyan-500/5 rounded-[2rem] flex items-center justify-center border border-cyan-500/30 shadow-[0_0_30px_rgba(0,255,204,0.15)] group cursor-pointer hover:border-cyan-400 transition-all" onClick={() => setCurrentPage('agentq')}>
                <AgentQIcon className="w-10 h-10" />
              </div>
              <div>
                <h1 className="text-2xl font-black tracking-tighter uppercase italic">QCOS <span className="text-cyan-400">Master</span></h1>
                <p className="text-[10px] text-cyan-500/60 uppercase tracking-[0.2em] font-bold">Lattice Mesh: SOVEREIGN</p>
              </div>
            </div>
            <div className="h-12 w-px bg-white/10 mx-2 hidden md:block" />
            <div className="relative">
              <button onClick={() => setIsPanelSelectorOpen(!isPanelSelectorOpen)} className="flex items-center gap-4 px-6 py-3 rounded-2xl border border-cyan-500/30 bg-cyan-500/5 hover:bg-cyan-500/10 transition-all group">
                <LayoutGrid className="w-5 h-5 text-cyan-400" />
                <div className="text-left">
                  <div className="text-[10px] font-black uppercase tracking-widest text-cyan-50/40">Plane Manifold</div>
                  <div className="text-[11px] text-cyan-400 font-mono uppercase truncate w-32">{currentPage}</div>
                </div>
                <ChevronDown className={`w-4 h-4 text-cyan-500/50 transition-transform ${isPanelSelectorOpen ? 'rotate-180' : ''}`} />
              </button>
              {isPanelSelectorOpen && (
                <div className="absolute top-full left-0 mt-3 w-72 bg-[#0a0a0a] border border-cyan-500/20 rounded-[2rem] shadow-2xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200 backdrop-blur-xl max-h-[70vh] overflow-y-auto custom-scrollbar">
                  {standardPanels.map((page) => (
                    <button key={page.id} onClick={() => { setCurrentPage(page.id); setIsPanelSelectorOpen(false); }} className={`w-full flex items-center gap-4 px-6 py-4 text-left transition-all ${currentPage === page.id ? 'bg-cyan-500/10 text-cyan-400' : 'text-white/40 hover:text-white hover:bg-white/5'}`}>
                      <page.icon className="w-4 h-4" />
                      <span className="text-xs font-bold uppercase tracking-widest">{page.label}</span>
                    </button>
                  ))}
                  {customPanels.length > 0 && (
                     <div className="border-t border-white/5 mt-2">
                       <div className="px-6 py-2 text-[8px] font-black text-cyan-500/40 uppercase">Agentic Extensions</div>
                       {customPanels.map(panel => {
                          const Icon = (LucideIcons as any)[panel.iconName] || LucideIcons.Zap;
                          return (
                           <button key={panel.id} onClick={() => { setCurrentPage(panel.id); setIsPanelSelectorOpen(false); }} className={`w-full flex items-center gap-4 px-6 py-4 text-left transition-all ${currentPage === panel.id ? 'bg-purple-500/10 text-purple-400' : 'text-white/40 hover:text-purple-400 hover:bg-purple-500/5'}`}>
                             <Icon className="w-4 h-4" />
                             <span className="text-xs font-bold uppercase tracking-widest">{panel.label}</span>
                           </button>
                          );
                       })}
                     </div>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="flex gap-8 items-center">
              <div className="flex flex-col items-center px-4 border-r border-white/10">
                  <span className="text-[8px] font-black uppercase text-white/20 tracking-widest mb-1">Humanity Lock</span>
                  <span className="text-xs font-mono font-bold text-green-400">STATUS: PRESERVING</span>
              </div>
            <StatBox label="Neural Parity" value={`${(state.gus.precision).toFixed(1)}%`} target="99.9%" color="text-purple-400" />
            <StatBox label="API Status" value="INDEPENDENT" target="Local Only" color="text-cyan-400" />
          </div>
        </header>

        <main className="flex-1 min-h-0 overflow-hidden relative z-0">
          {currentPage === 'agentq' && (
            <div className="h-full grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in duration-700">
              <div className="lg:col-span-8 flex flex-col gap-6 overflow-y-auto custom-scrollbar pr-1">
                  <div className="flex-shrink-0 min-h-[500px]">
                    {isRoadmapActive && state.agiTraining ? (
                      <AGIRoadmapSimulator progress={state.agiTraining} onToggleSource={handleToggleAGISource} onStageComplete={(s) => {}} />
                    ) : (
                      <QNNVisualizer activeNN={activeNN} learningMode={state.learningMode} />
                    )}
                  </div>
                  {/* substrate layer visibility */}
                  <div className="bg-black/40 border border-white/5 rounded-[2.5rem] p-8 flex flex-col gap-6 shadow-2xl relative overflow-hidden group">
                     <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                           <Cpu className="w-6 h-6 text-cyan-400" />
                           <h3 className="text-lg font-black uppercase italic tracking-widest text-white">Live Physical Substrate</h3>
                        </div>
                        <button onClick={() => setCurrentPage('qpu')} className="text-[10px] font-bold uppercase text-cyan-400/60 hover:text-cyan-400 transition-colors flex items-center gap-2 group">
                          Access QPU Manifold <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </button>
                     </div>
                     <div className="h-[400px]">
                        <IBQOSSimulator ibqos={state.ibqos} onNudge={handleNudgeInfon} onCalibrate={handleCalibrateIBQOS} onUpdateInfons={handleUpdateInfons} onUpdateDensity={handleUpdateDensity} />
                     </div>
                  </div>
              </div>
              <div className="lg:col-span-4 flex flex-col gap-6 overflow-hidden">
                  <AgentQChat 
                    activeCore={state.activeCore} 
                    onAgenticCommand={handleAgenticCommand} 
                    onModelChange={(model) => setState(prev => ({ ...prev, activeCore: model }))}
                    systemState={state} 
                    telemetryEvents={telemetryEvents} 
                  />
              </div>
            </div>
          )}
          {currentPage === 'quantum-evolve' && <QuantumEvolution systemState={state} onUpdateEvolution={handleUpdateEvolution} />}
          {currentPage === 'neural-programming' && <NeuralProgramming />}
          {currentPage === 'cognition' && <QuantumCognitionEngines onAgenticCommand={handleAgenticCommand} />}
          {currentPage === 'gus' && <GrandUniverseSimulator metrics={state.gus} liveDataStream={state.training.liveDataStream} onActivateMirroring={() => {}} autoTask={state.activeSimulationTask} onTaskComplete={(s) => {}} />}
          {currentPage === 'qpu' && <IBQOSSimulator ibqos={state.ibqos} onNudge={handleNudgeInfon} onCalibrate={handleCalibrateIBQOS} onUpdateInfons={handleUpdateInfons} onUpdateDensity={handleUpdateDensity} />}
          {currentPage === 'studio' && <QCOSStudio activeCore={state.activeCore} />}
          {currentPage === 'chips' && <CHIPSProtocol />}
          {currentPage === 'browser' && <CHIPSBrowser onTriggerDeepSearch={(query) => { handleAgenticCommand('TRIGGER_SIMULATION', query); }} />}
          {currentPage === 'chipsdev' && <ChipsDevPlatform onDeploy={() => {}} />}
          {currentPage === 'qcos' && <QCOSCore state={state} externalTask={state.activeSimulationTask} />}

          {/* Dynamic Agentic Panels */}
          {customPanels.find(p => p.id === currentPage) && (
            <div className="h-full flex flex-col gap-6 animate-in fade-in duration-500 overflow-hidden">
               {(() => {
                 const panel = customPanels.find(p => p.id === currentPage)!;
                 return (
                  <>
                    <div className="flex items-center justify-between px-4 bg-black/40 border border-white/5 p-6 rounded-[2.5rem] shadow-xl">
                      <div className="flex items-center gap-6">
                        <div className="w-16 h-16 rounded-[2rem] bg-purple-500/10 border border-purple-500/30 flex items-center justify-center shadow-[0_0_20px_purple]">
                          {(() => { const Icon = (LucideIcons as any)[panel.iconName] || LucideIcons.Zap; return <Icon className="w-8 h-8 text-purple-400" />; })()}
                        </div>
                        <div>
                          <h2 className="text-3xl font-black uppercase tracking-tighter text-white italic">{panel.label}</h2>
                          <p className="text-xs font-mono text-purple-400/60 uppercase tracking-[0.3em] font-bold">Agentic Substrate Extension</p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                          <button onClick={() => setEditingPanelId(panel.id)} className="p-3 bg-white/5 border border-white/10 rounded-xl text-white/40 hover:text-cyan-400 transition-colors"><Settings2 className="w-5 h-5" /></button>
                          <button className="px-6 py-3 bg-purple-600/20 border border-purple-500/40 text-purple-400 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-purple-600/40 transition-all">Synchronize State</button>
                      </div>
                    </div>
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 overflow-y-auto custom-scrollbar p-2 pb-12">
                      {dynamicElements.filter(el => el.target === currentPage || el.target === 'any').map(el => (
                        <div key={el.id} className="bg-[#0a0a0a] border border-white/10 p-8 rounded-[2.5rem] flex flex-col gap-6 shadow-2xl relative overflow-hidden group hover:border-purple-500/40 transition-all">
                          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-black uppercase text-white/40 tracking-widest">{el.title}</span>
                            <span className="text-[9px] font-mono text-white/10 uppercase tracking-tighter">{new Date(el.timestamp).toLocaleTimeString()}</span>
                          </div>
                          {el.type === 'Code' ? (
                            <pre className="text-[10px] font-mono text-purple-200/60 leading-relaxed overflow-x-auto p-4 bg-black/40 rounded-xl border border-white/5">{el.value}</pre>
                          ) : (
                            <div className="text-4xl font-mono font-black text-white relative z-10 group-hover:text-purple-400 transition-colors drop-shadow-2xl">{el.value}</div>
                          )}
                          <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/5">
                             <span className="text-[8px] font-bold text-white/20 uppercase">Source: AgentQ_Core</span>
                             <Activity className="w-3 h-3 text-purple-500 animate-pulse" />
                          </div>
                        </div>
                      ))}
                      {dynamicElements.filter(el => el.target === currentPage).length === 0 && (
                          <div className="col-span-full h-96 border-2 border-dashed border-white/5 rounded-[3rem] flex flex-col items-center justify-center opacity-20 gap-4 grayscale">
                              <Box className="w-16 h-16" />
                              <span className="text-xl font-black uppercase tracking-widest">Awaiting Neural Injection</span>
                          </div>
                      )}
                    </div>
                  </>
                 );
               })()}
            </div>
          )}
        </main>

        {/* Persistent Sovereign Interface */}
        {isFloatingChatOpen && (
          <div className="fixed bottom-28 right-8 w-[520px] h-[780px] z-[100] shadow-[0_0_120px_-30px_rgba(0,0,0,0.9)] animate-in slide-in-from-bottom-6 zoom-in-95 duration-500 pointer-events-auto">
            <AgentQChat 
              activeCore={state.activeCore} 
              onAgenticCommand={handleAgenticCommand} 
              systemState={state} 
              telemetryEvents={telemetryEvents}
              onClose={() => setIsFloatingChatOpen(false)}
            />
          </div>
        )}

        {/* Floating Sovereign Launcher */}
        <button 
          onClick={() => setIsFloatingChatOpen(!isFloatingChatOpen)}
          className={`fixed bottom-8 right-8 w-18 h-18 rounded-[2rem] flex items-center justify-center z-[110] transition-all duration-700 group shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)] active:scale-90 border-2 ${isFloatingChatOpen ? 'bg-purple-600 border-purple-400 rotate-90 w-20 h-20' : 'bg-cyan-600 border-cyan-400 hover:scale-110'}`}
        >
          <div className="absolute -top-4 -left-4 bg-purple-600 text-white text-[9px] font-black px-3 py-1.5 rounded-full border-2 border-black animate-pulse shadow-xl shadow-purple-900/40">SOVEREIGN</div>
          {isFloatingChatOpen ? (
            <X className="w-10 h-10 text-white" />
          ) : (
            <div className="w-12 h-12 flex items-center justify-center">
              <AgentQIcon className="w-12 h-12" />
            </div>
          )}
          
          {!isFloatingChatOpen && (
            <div className="absolute right-full mr-6 px-6 py-3 bg-black/95 border border-cyan-500/30 rounded-[1.5rem] text-[11px] font-black uppercase text-cyan-400 tracking-[0.3em] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none shadow-2xl backdrop-blur-2xl translate-x-4 group-hover:translate-x-0">
               Access Independent Core
            </div>
          )}
        </button>

        {/* Edit Panel Modal */}
        {editingPanelId && (
          <EditDashboardPanel 
            panel={customPanels.find(p => p.id === editingPanelId)!}
            onSave={(u) => { 
              setCustomPanels(prev => prev.map(p => p.id === u.id ? { ...p, ...u.updates } : p));
              setEditingPanelId(null);
            }}
            onClose={() => setEditingPanelId(null)}
          />
        )}
      </div>
    </BrowserProvider>
  );
};

const StatBox: React.FC<{ label: string, value: string, target: string, color?: string }> = ({ label, value, target, color = "text-white" }) => (
  <div className="flex flex-col items-center px-6 border-l border-white/5 first:border-l-0"><span className="text-[8px] uppercase opacity-40 mb-1.5 tracking-[0.25em] font-black">{label}</span><span className={`text-xl font-black tracking-tighter italic ${color}`}>{value}</span><span className="text-[8px] opacity-20 font-bold tracking-widest mt-0.5">{target}</span></div>
);

export default App;

