import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Cpu, 
  Activity, 
  Shield, 
  ShieldCheck,
  Layers, 
  Settings, 
  Code, 
  BarChart3, 
  Binary,
  ArrowRight,
  RefreshCcw,
  AlertCircle,
  CheckCircle2,
  Lock,
  Box,
  ChevronRight,
  Terminal as TerminalIcon,
  Play,
  Zap,
  Globe,
  Waypoints,
  Waves,
  Target,
  Save,
  FolderOpen,
  Trash2,
  Share2,
  Download,
  Loader2,
  Archive,
  ToggleLeft,
  ToggleRight,
  Infinity as InfinityIcon,
  Search,
  Eye,
  Microscope,
  Gauge,
  Workflow,
  Atom,
  Wind,
  FileUp,
  History,
  Check
} from 'lucide-react';
import { QCOSState, QCOSPlane, QEMStage, CHIPSPacket, SimulationTask, ProtocolStep, SavedProtocol, ProtocolPatch } from '../types';
import { useUniverseStorage } from '../hooks/useUniverseStorage';

interface QCOSCoreProps {
  state: QCOSState;
  externalTask: SimulationTask | null;
}

const AUTONOMOUS_PROTOCOLS: SavedProtocol[] = [
  {
    id: 'p-eks-sync',
    name: 'EKS State Synchronization',
    timestamp: Date.now(),
    fidelity: 0.9998,
    steps: [
      { id: 'step-1', gate: 'H', infons: [0], phenomenon: 'SUPERPOSITION', status: 'COMPLETED' },
      { id: 'step-2', gate: 'CNOT', infons: [0, 1], phenomenon: 'ENTANGLEMENT', status: 'ACTIVE' },
      { id: 'step-3', gate: 'MEASURE', infons: [1], phenomenon: 'MEASUREMENT', status: 'QUEUED' }
    ]
  },
  {
    id: 'p-lattice-surgery',
    name: 'Modular Lattice Surgery',
    timestamp: Date.now(),
    fidelity: 0.9982,
    steps: [
      { id: 'ls-1', gate: 'PULSE', infons: [0, 1, 2, 3], phenomenon: 'INTERFERENCE', status: 'ACTIVE' },
      { id: 'ls-2', gate: 'PATCH', infons: [4, 5], phenomenon: 'ENTANGLEMENT', status: 'QUEUED' }
    ]
  },
  {
    id: 'p-syndrome-extract',
    name: 'Recursive Syndrome Extraction',
    timestamp: Date.now(),
    fidelity: 0.9999,
    steps: [
      { id: 'se-1', gate: 'X', infons: [10], phenomenon: 'MEASUREMENT', status: 'COMPLETED' },
      { id: 'se-2', gate: 'Z', infons: [11], phenomenon: 'MEASUREMENT', status: 'COMPLETED' }
    ]
  }
];

const QCOSCore: React.FC<QCOSCoreProps> = ({ state, externalTask }) => {
  const [activePlane, setActivePlane] = useState<QCOSPlane | 'REGISTRY'>(QCOSPlane.PROTOCOL);
  const [logs, setLogs] = useState<string[]>([]);
  const [isAutonomous, setIsAutonomous] = useState(true);
  const [calibrationProgress, setCalibrationProgress] = useState(100);
  const [activeProtocolIdx, setActiveProtocolIdx] = useState(0);
  const [stepTimer, setStepTimer] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);
  const lastAutoSavedIdx = useRef<number | null>(null);
  const protocolStartTime = useRef<number>(Date.now());
  const lastTimeAutoSaved = useRef<number>(0);
  const { saveProtocol, savePatch, getProtocols, getPatches } = useUniverseStorage();

  const [savedProtocols, setSavedProtocols] = useState<SavedProtocol[]>([]);
  const [activePatches, setActivePatches] = useState<ProtocolPatch[]>([]);

  // Simulated Fault-Tolerance Data
  const [syndromes, setSyndromes] = useState<{id: number, error: boolean}[]>(
    Array.from({length: 16}, (_, i) => ({id: i, error: false}))
  );

  useEffect(() => {
    if (activePlane === QCOSPlane.FAULT_TOLERANCE) {
      const interval = setInterval(() => {
        setSyndromes(prev => prev.map(s => ({
          ...s,
          error: Math.random() > 0.95
        })));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [activePlane]);

  // Load Registry Data
  const loadRegistry = async () => {
    const [protos, patches] = await Promise.all([getProtocols(), getPatches()]);
    setSavedProtocols(protos);
    // Sort patches by timestamp descending
    setActivePatches(patches.sort((a, b) => b.timestamp - a.timestamp));
  };

  useEffect(() => {
    loadRegistry();
  }, [activePlane]);

  // Autonomous Protocol Step Sequencing
  useEffect(() => {
    if (activePlane === QCOSPlane.PROTOCOL && isAutonomous) {
      const interval = setInterval(() => {
        setStepTimer(prev => {
          if (prev >= 100) {
            const nextIdx = (activeProtocolIdx + 1) % AUTONOMOUS_PROTOCOLS.length;
            setActiveProtocolIdx(nextIdx);
            protocolStartTime.current = Date.now(); // Reset start time for new protocol
            lastTimeAutoSaved.current = 0;
            addLog(`PROTOCOL: Switching to ${AUTONOMOUS_PROTOCOLS[nextIdx].name}`);
            return 0;
          }
          return prev + 1;
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [activePlane, isAutonomous, activeProtocolIdx]);

  // Time-based Auto-save logic (Every 30s if active > 5m and not saving/patching)
  useEffect(() => {
    if (activePlane === QCOSPlane.PROTOCOL && isAutonomous && autoSaveEnabled && !isSaving) {
      const interval = setInterval(() => {
        const now = Date.now();
        const activeDuration = (now - protocolStartTime.current) / 1000; // in seconds
        
        if (activeDuration > 300) { // 5 minutes
          if (now - lastTimeAutoSaved.current >= 30000) { // 30 seconds since last time-based save
            handleSaveCurrentProtocol(true);
            lastTimeAutoSaved.current = now;
            addLog(`REGISTRY: Periodic 30s auto-save triggered (Active: ${Math.floor(activeDuration / 60)}m).`);
          }
        }
      }, 5000); // Check every 5 seconds
      return () => clearInterval(interval);
    }
  }, [activePlane, isAutonomous, autoSaveEnabled, isSaving, activeProtocolIdx]);

  const addLog = (msg: string) => {
    setLogs(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev].slice(0, 50));
  };

  const handleSaveCurrentProtocol = async (isAuto = false) => {
    setIsSaving(true);
    const protocolToSave = AUTONOMOUS_PROTOCOLS[activeProtocolIdx];
    const newProtocol: SavedProtocol = {
      ...protocolToSave,
      id: `saved-${Date.now()}`,
      timestamp: Date.now(),
      name: `${protocolToSave.name} ${isAuto ? '(Auto-Archived)' : '(Snapshot)'}`
    };
    await saveProtocol(newProtocol);
    addLog(`REGISTRY: Protocol '${newProtocol.name}' successfully archived to physical ledger.`);
    await loadRegistry();
    setIsSaving(false);
  };

  // Auto-save logic
  useEffect(() => {
    if (activePlane === QCOSPlane.PROTOCOL && isAutonomous && autoSaveEnabled && stepTimer >= 99) {
      if (lastAutoSavedIdx.current !== activeProtocolIdx) {
        handleSaveCurrentProtocol(true);
        lastAutoSavedIdx.current = activeProtocolIdx;
      }
    }
  }, [stepTimer, activePlane, isAutonomous, autoSaveEnabled, activeProtocolIdx]);

  const handleCreatePatch = async () => {
    setIsSaving(true);
    const patch: ProtocolPatch = {
      id: `patch-${Date.now()}`,
      targetProgramId: 'qcos-core',
      targetProgramName: 'Qernel Refinement Engine',
      version: `v3.1.${Math.floor(Math.random() * 100)}`,
      deltaSummary: 'Optimized SyndromeExtraction pulse timings based on latest simulator trajectory.',
      fidelityImpact: 0.042,
      eksSignature: `EKS-SIG-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      timestamp: Date.now(),
      applied: false
    };
    await savePatch(patch);
    addLog(`REGISTRY: New upgrade patch ${patch.version} created and signed with EKS.`);
    await loadRegistry();
    setIsSaving(false);
  };

  const handleApplyPatch = async (patch: ProtocolPatch) => {
    if (patch.applied) return;
    setIsSaving(true);
    addLog(`REGISTRY: Applying patch ${patch.version}... Synchronizing logic gates.`);
    
    // Artificial delay for effect
    await new Promise(r => setTimeout(r, 1200));
    
    const updatedPatch = { ...patch, applied: true };
    await savePatch(updatedPatch);
    addLog(`REGISTRY: Patch ${patch.version} applied. System fidelity improved.`);
    await loadRegistry();
    setIsSaving(false);
  };

  const handleApplyAllPatches = async () => {
    const unapplied = activePatches.filter(p => !p.applied);
    if (unapplied.length === 0) return;
    
    setIsSaving(true);
    addLog(`REGISTRY: Batch processing ${unapplied.length} patches. Initiating global sync...`);
    
    for (const patch of unapplied) {
      addLog(`REGISTRY: Deploying ${patch.version}...`);
      await new Promise(r => setTimeout(r, 600));
      await savePatch({ ...patch, applied: true });
    }
    
    addLog(`REGISTRY: All patches successfully integrated into the Qernel substrate.`);
    await loadRegistry();
    setIsSaving(false);
  };

  const handleRecalibrate = () => {
    setCalibrationProgress(0);
    addLog("CONTROL PLANE: Initiating automated calibration loop for magnetic drift...");
    const interval = setInterval(() => {
      setCalibrationProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          addLog("CONTROL PLANE: Calibration nominal. Qernel drift corrected.");
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };

  const currentProtocol = AUTONOMOUS_PROTOCOLS[activeProtocolIdx];
  const unappliedPatchesCount = activePatches.filter(p => !p.applied).length;

  return (
    <div className="flex flex-col h-full glass-panel rounded-2xl border border-cyan-500/30 overflow-hidden bg-black/60 backdrop-blur-3xl shadow-[0_0_100px_-30px_rgba(0,255,204,0.3)] animate-in zoom-in-95 duration-700">
      {/* QCOS Header */}
      <div className="px-6 py-5 border-b border-cyan-500/20 flex flex-col md:flex-row items-center justify-between gap-4 bg-gradient-to-r from-cyan-950/30 to-black/80">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-cyan-500/5 border border-cyan-500/40 flex items-center justify-center relative group">
            <Cpu className="w-8 h-8 text-cyan-400 group-hover:scale-110 transition-transform" />
            <div className="absolute -inset-1 rounded-2xl border border-cyan-400/20 animate-pulse" />
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tighter text-white uppercase flex items-center gap-2">QCOS <span className="text-cyan-400">Qernel</span> <span className="text-xs opacity-50 font-mono">DQN-NODE_rigel-01</span></h2>
            <div className="flex items-center gap-4 mt-1">
              <span className="text-[10px] text-cyan-500/60 font-mono tracking-widest uppercase">Hybrid Framework v3.1</span>
              <div className="flex items-center gap-1.5 text-green-400"><CheckCircle2 className="w-2.5 h-2.5" /><span className="text-[9px] font-bold uppercase">Surface Code Active</span></div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <KPIMini label="Logic:Physical" value="1:40" />
          <KPIMini label="Fidelity" value="99.92%" />
          <KPIMini label="Latency" value="0.92μs" />
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden min-h-0">
        <div className="w-full lg:w-72 border-r border-cyan-500/10 bg-black/40 p-4 flex flex-col gap-2 overflow-y-auto custom-scrollbar">
          <PlaneTab active={activePlane === QCOSPlane.OPTIMIZATION} onClick={() => setActivePlane(QCOSPlane.OPTIMIZATION)} icon={<Code />} label="Optimization Plane" sub="Compiler & Transpiler" />
          <PlaneTab active={activePlane === QCOSPlane.FAULT_TOLERANCE} onClick={() => setActivePlane(QCOSPlane.FAULT_TOLERANCE)} icon={<Shield />} label="Fault-Tolerance" sub="Syndrome Extraction" />
          <PlaneTab active={activePlane === QCOSPlane.RESOURCE} onClick={() => setActivePlane(QCOSPlane.RESOURCE)} icon={<Layers />} label="Resource Plane" sub="Multi-Zone Scheduler" />
          <PlaneTab active={activePlane === QCOSPlane.CONTROL} onClick={() => setActivePlane(QCOSPlane.CONTROL)} icon={<Settings />} label="Control Plane" sub="Pulse Shaping Engine" />
          <PlaneTab active={activePlane === QCOSPlane.PROTOCOL} onClick={() => setActivePlane(QCOSPlane.PROTOCOL)} icon={<Waypoints />} label="Protocol Simulator" sub="Phenomenon Lab" />
          <div className="h-px bg-white/5 my-2" />
          <PlaneTab active={activePlane === 'REGISTRY'} onClick={() => setActivePlane('REGISTRY')} icon={<Archive />} label="Registry & Updates" sub="Patches & Protocols" />

          <div className="mt-auto p-4 bg-cyan-500/5 rounded-xl border border-cyan-500/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[9px] font-bold text-cyan-400 uppercase">Qernel Load</span>
              <span className="text-[9px] font-mono text-cyan-400">12%</span>
            </div>
            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-cyan-500" style={{width: '12%'}} />
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 bg-black/20 custom-scrollbar flex flex-col gap-6">
          <div className="flex-1 bg-black/40 border border-white/5 rounded-2xl p-8 relative overflow-hidden group">
            {activePlane === QCOSPlane.OPTIMIZATION && (
              <div className="h-full flex flex-col animate-in fade-in duration-500">
                <div className="flex justify-between items-start">
                  <PlaneHeader title="Optimization Plane (The Compiler)" desc="High-level Q-Lang ingestion and circuit compression." />
                  <button onClick={handleCreatePatch} className="flex items-center gap-2 px-4 py-2 bg-purple-600/20 border border-purple-500/40 text-purple-400 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-purple-600/30 transition-all">
                    <Zap className="w-3.5 h-3.5" /> Generate Patch
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 flex-1">
                  <div className="space-y-6">
                    <h5 className="text-[11px] font-bold uppercase text-cyan-400 tracking-widest flex items-center gap-2"><Workflow className="w-4 h-4" /> Gate Decomposition</h5>
                    <div className="space-y-3">
                      <GateProcess label="Toffoli -> Native" pulses="6 CNOTs" progress={100} />
                      <GateProcess label="Hadamard -> Pulse" pulses="2 Microwave" progress={100} />
                      <GateProcess label="RZ(θ) -> Z-Rotation" pulses="Virtual" progress={100} />
                    </div>
                  </div>
                  <div className="bg-black/60 rounded-xl border border-white/10 p-6">
                    <h5 className="text-[11px] font-bold uppercase text-white/40 tracking-widest mb-4">Circuit Depth Compression</h5>
                    <div className="flex flex-col items-center justify-center h-full gap-4">
                      <div className="flex items-center gap-4">
                        <div className="text-center"><div className="text-2xl font-mono text-white">42</div><div className="text-[8px] uppercase opacity-40">Original Depth</div></div>
                        <ArrowRight className="w-6 h-6 text-cyan-500" />
                        <div className="text-center"><div className="text-2xl font-mono text-cyan-400">12</div><div className="text-[8px] uppercase text-cyan-500/60 font-bold">Transpiled Depth</div></div>
                      </div>
                      <div className="text-[10px] text-green-400 font-mono bg-green-500/10 px-4 py-2 rounded-lg border border-green-500/20">Optimization: 71.4% Loss Reduction</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activePlane === QCOSPlane.FAULT_TOLERANCE && (
              <div className="h-full flex flex-col animate-in fade-in duration-500">
                <PlaneHeader title="Fault-Tolerance Plane (Error Management)" desc="Continuous syndrome monitoring and real-time decoder correction." />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 flex-1">
                  <div className="md:col-span-2">
                    <h5 className="text-[11px] font-bold uppercase text-red-400 tracking-widest flex items-center gap-2 mb-6"><Microscope className="w-4 h-4" /> Ancilla Qubit Syndrome Lattice</h5>
                    <div className="grid grid-cols-4 gap-3">
                      {syndromes.map(s => (
                        <div key={s.id} className={`aspect-square rounded-lg border flex flex-col items-center justify-center transition-all duration-300 ${s.error ? 'bg-red-500/20 border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.4)]' : 'bg-black/40 border-white/10 opacity-40'}`}>
                          <span className="text-[10px] font-bold text-white mb-1">A-{s.id}</span>
                          {s.error && <AlertCircle className="w-3 h-3 text-red-500 animate-pulse" />}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="bg-red-500/5 border border-red-500/20 p-5 rounded-2xl">
                      <h6 className="text-[9px] font-black uppercase text-red-400 tracking-widest mb-3">Decoder Status (ASIC)</h6>
                      <div className="space-y-3">
                        <div className="flex justify-between text-[10px] font-mono"><span>Latency</span><span className="text-red-400">0.82μs</span></div>
                        <div className="flex justify-between text-[10px] font-mono"><span>Correction Rate</span><span className="text-red-400">12/s</span></div>
                      </div>
                    </div>
                    <div className="p-4 bg-white/5 border border-white/5 rounded-xl text-center">
                       <p className="text-[10px] text-white/40 leading-relaxed italic">"Surface Code logic prevents local bit-flips from cascading into logical errors."</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activePlane === QCOSPlane.RESOURCE && (
              <div className="h-full flex flex-col animate-in fade-in duration-500">
                <PlaneHeader title="Resource Plane (Multi-Programming)" desc="Fidelity-aware scheduling across modular QPU zones." />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 flex-1">
                  <div className="space-y-4">
                    <h5 className="text-[11px] font-bold uppercase text-purple-400 tracking-widest flex items-center gap-2"><Target className="w-4 h-4" /> Zone Allocation</h5>
                    <QPUZone label="Zone Alpha (Superconducting)" infons="0-63" load={75} fidelity={0.999} status="Occupied" />
                    <QPUZone label="Zone Beta (Trapped Ion)" infons="64-127" load={12} fidelity={0.9999} status="Available" />
                    <QPUZone label="Zone Gamma (Photonic)" infons="128-191" load={0} fidelity={0.998} status="Calibrating" />
                  </div>
                  <div className="bg-purple-500/5 border border-purple-500/10 rounded-2xl p-6 flex flex-col">
                    <h5 className="text-[11px] font-bold uppercase text-purple-400 tracking-widest mb-6">Active Jobs Queue</h5>
                    <div className="space-y-2 flex-1">
                       <JobItem id="JOB-8822" title="Bell State Sync" zone="Alpha" priority="High" />
                       <JobItem id="JOB-8823" title="Grover-128-D" zone="Alpha" priority="Std" />
                       <JobItem id="JOB-8824" title="VQE Catalyst" zone="Beta" priority="High" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activePlane === QCOSPlane.CONTROL && (
              <div className="h-full flex flex-col animate-in fade-in duration-500">
                <PlaneHeader title="Control Plane (Hardware Interface)" desc="Translating logical gates into microwave and laser pulses." />
                <div className="grid grid-cols-1 md:grid-cols-1 gap-8 mt-8 flex-1">
                   <div className="bg-black/60 rounded-2xl border border-white/5 p-8 flex flex-col relative overflow-hidden">
                      <div className="flex items-center justify-between mb-8">
                         <h5 className="text-[11px] font-bold uppercase text-cyan-400 tracking-widest flex items-center gap-2"><Gauge className="w-4 h-4" /> Native CNOT Pulse Shaper</h5>
                         <button onClick={handleRecalibrate} className="text-[10px] font-bold uppercase text-cyan-400 border border-cyan-400/30 px-4 py-2 rounded-xl hover:bg-cyan-400/10 transition-all">Start Auto-Calibration</button>
                      </div>
                      
                      {/* Waveform Visualization */}
                      <div className="flex-1 flex items-center justify-center gap-1 h-48 bg-black/40 rounded-xl border border-white/5 relative">
                         {[...Array(60)].map((_, i) => (
                           <div 
                             key={i} 
                             className="w-1 bg-cyan-400/40 rounded-full transition-all duration-300"
                             style={{
                               height: `${(Math.sin(i * 0.2) * 40 + 50) * (calibrationProgress / 100)}%`,
                               opacity: 0.1 + (calibrationProgress / 100) * 0.5
                             }}
                           />
                         ))}
                         <div className="absolute inset-0 flex items-center justify-center">
                            <div className="flex flex-col items-center">
                               <div className="text-4xl font-mono font-bold text-white">{calibrationProgress}%</div>
                               <div className="text-[10px] font-bold uppercase text-cyan-500 tracking-widest">Coherence Matching</div>
                            </div>
                         </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-6 mt-8">
                        <ControlKnob label="MW Frequency" value="4.82 GHz" />
                        <ControlKnob label="Pulse Width" value="20 ns" />
                        <ControlKnob label="Power" value="-12.4 dBm" />
                      </div>
                   </div>
                </div>
              </div>
            )}

            {activePlane === QCOSPlane.PROTOCOL && (
              <div className="h-full flex flex-col animate-in fade-in duration-500">
                <div className="flex justify-between items-start">
                  <PlaneHeader title="Protocol Simulator" desc="Modeling advanced quantum phenomena and multiversal re-connections." />
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-xl border border-white/10">
                      <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Auto-Save</span>
                      <button 
                        onClick={() => setAutoSaveEnabled(!autoSaveEnabled)}
                        className="text-cyan-400 transition-all active:scale-90"
                      >
                        {autoSaveEnabled ? <ToggleRight className="w-5 h-5" /> : <ToggleLeft className="w-5 h-5 opacity-40" />}
                      </button>
                    </div>
                    <button onClick={() => handleSaveCurrentProtocol(false)} className="flex items-center gap-2 px-4 py-2 bg-cyan-600/20 border border-cyan-500/40 text-cyan-400 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-cyan-600/30 transition-all">
                      <Save className="w-3.5 h-3.5" /> Save Protocol
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8 flex-1 min-h-0 overflow-hidden">
                  <div className="lg:col-span-2 flex flex-col gap-6">
                    <div className="bg-black/60 border border-cyan-500/20 rounded-2xl p-8 flex flex-col items-center justify-center relative overflow-hidden flex-1 shadow-inner group">
                       <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle,rgba(0,255,204,0.3)_1px,transparent_1px)] bg-[length:24px_24px]" />
                       
                       <div className="relative mb-8">
                         <div className={`w-32 h-32 rounded-full border-2 border-cyan-500/20 flex items-center justify-center transition-all duration-1000 ${isAutonomous ? 'scale-110 shadow-[0_0_50px_rgba(0,255,204,0.2)]' : ''}`}>
                            <Atom className={`w-16 h-16 text-cyan-400 ${isAutonomous ? 'animate-spin-slow' : 'opacity-20'}`} />
                         </div>
                         {isAutonomous && (
                           <div className="absolute inset-0 rounded-full border-t-2 border-cyan-400 animate-spin" />
                         )}
                       </div>
                       
                       <div className="text-center">
                          <h5 className="text-lg font-black uppercase italic tracking-widest text-white mb-2">{currentProtocol.name}</h5>
                          <div className="flex items-center justify-center gap-3">
                             <div className="flex items-center gap-1.5"><Zap className="w-3.5 h-3.5 text-yellow-400" /><span className="text-[10px] font-mono text-white/60">FIDELITY: {(currentProtocol.fidelity * 100).toFixed(2)}%</span></div>
                             <div className="h-3 w-px bg-white/10" />
                             <div className="flex items-center gap-1.5 text-cyan-400"><div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" /><span className="text-[10px] font-bold uppercase tracking-widest">AUTONOMOUS MODE</span></div>
                          </div>
                       </div>

                       <div className="w-full mt-10 space-y-4">
                          <div className="flex justify-between items-center text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">
                             <span>Simulation Cycle Progress</span>
                             <span>{stepTimer}%</span>
                          </div>
                          <div className="h-1.5 w-full bg-black/60 rounded-full overflow-hidden border border-white/5">
                             <div className="h-full bg-gradient-to-r from-cyan-600 to-purple-600 transition-all duration-300" style={{ width: `${stepTimer}%` }} />
                          </div>
                       </div>
                    </div>

                    <div className="bg-gradient-to-r from-cyan-900/20 to-purple-900/20 border border-white/5 rounded-2xl p-6 flex items-center justify-between">
                       <div className="flex items-center gap-4">
                          <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                             <Wind className="w-5 h-5 animate-pulse" />
                          </div>
                          <div>
                             <span className="block text-[10px] font-black uppercase text-cyan-400 tracking-widest">Phenomenon Lock</span>
                             <span className="text-xs text-white/60 font-mono italic">Observing {currentProtocol.steps.find(s => s.status === 'ACTIVE')?.phenomenon || 'IDLE'}...</span>
                          </div>
                       </div>
                       <button className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-[9px] uppercase tracking-[0.15em] transition-all shadow-lg active:scale-95">Manual Override</button>
                    </div>
                  </div>

                  <div className="flex flex-col gap-6">
                    <div className="bg-black/40 border border-white/10 rounded-2xl p-6 flex flex-col flex-1 overflow-hidden">
                       <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
                          <h6 className="text-[11px] font-bold uppercase text-white/60 tracking-widest flex items-center gap-2"><Layers className="w-4 h-4 text-purple-400" /> Protocol Stack</h6>
                          <span className="text-[9px] font-mono text-white/20">SEQ: v4.2</span>
                       </div>
                       <div className="space-y-3 overflow-y-auto custom-scrollbar flex-1 pr-2">
                          {currentProtocol.steps.map((step) => (
                            <div key={step.id} className={`p-4 rounded-xl border transition-all duration-500 ${step.status === 'ACTIVE' ? 'bg-cyan-500/10 border-cyan-400 shadow-[0_0_15px_rgba(0,255,204,0.1)]' : 'bg-black/20 border-white/5'}`}>
                               <div className="flex justify-between items-start mb-2">
                                  <div className="flex flex-col">
                                     <span className={`text-[10px] font-bold uppercase tracking-tight ${step.status === 'ACTIVE' ? 'text-cyan-400' : 'text-white/60'}`}>{step.gate} Logic</span>
                                     <span className="text-[8px] font-mono text-white/20">Target Infons: {step.infons.join(', ')}</span>
                                  </div>
                                  <div className={`px-2 py-0.5 rounded text-[8px] font-black uppercase ${step.status === 'COMPLETED' ? 'bg-green-500/20 text-green-400' : step.status === 'ACTIVE' ? 'bg-cyan-50 text-black animate-pulse' : 'bg-white/5 text-white/30'}`}>
                                     {step.status}
                                  </div>
                               </div>
                               <div className="flex items-center gap-2 mt-3">
                                  <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                                     <div className={`h-full transition-all duration-1000 ${step.status === 'COMPLETED' ? 'w-full bg-green-500' : step.status === 'ACTIVE' ? 'bg-cyan-400' : 'w-0'}`} style={{ width: step.status === 'ACTIVE' ? `${stepTimer}%` : undefined }} />
                                  </div>
                               </div>
                            </div>
                          ))}
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activePlane === 'REGISTRY' && (
              <div className="h-full flex flex-col animate-in fade-in duration-500">
                <div className="flex justify-between items-start">
                  <PlaneHeader title="Registry & Updates" desc="Manage saved quantum protocols and deployed system patches." />
                  <div className="flex gap-3">
                    {unappliedPatchesCount > 1 && (
                      <button 
                        onClick={handleApplyAllPatches}
                        disabled={isSaving}
                        className="flex items-center gap-2 px-5 py-2 bg-green-600/20 border border-green-500/40 text-green-400 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-green-600/30 transition-all shadow-[0_0_15px_rgba(34,197,94,0.1)] active:scale-95"
                      >
                        <Check className="w-3.5 h-3.5" /> Apply All Patches ({unappliedPatchesCount})
                      </button>
                    )}
                    <button onClick={handleCreatePatch} className="flex items-center gap-2 px-4 py-2 bg-purple-600/20 border border-purple-500/40 text-purple-400 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-purple-600/30 transition-all">
                      <Zap className="w-3.5 h-3.5" /> Generate Test Patch
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 flex-1 min-h-0 overflow-hidden">
                  <div className="flex flex-col gap-4 min-h-0 overflow-hidden">
                    <h5 className="text-[11px] font-bold uppercase text-cyan-400 tracking-widest flex items-center gap-2 mb-2"><History className="w-4 h-4" /> Saved Protocols</h5>
                    <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-3">
                      {savedProtocols.length > 0 ? savedProtocols.map(proto => (
                        <div key={proto.id} className="p-4 bg-black/40 border border-cyan-500/10 rounded-xl flex items-center justify-between hover:bg-cyan-500/5 transition-all">
                          <div className="flex items-center gap-4">
                            <div className="p-2 bg-cyan-500/10 rounded-lg"><Waypoints className="w-4 h-4 text-cyan-400" /></div>
                            <div>
                              <div className="text-xs font-bold text-white uppercase">{proto.name}</div>
                              <div className="text-[9px] font-mono text-white/20 uppercase tracking-tighter">Archived: {new Date(proto.timestamp).toLocaleDateString()}</div>
                            </div>
                          </div>
                          <div className="text-right">
                             <div className="text-[10px] font-mono text-cyan-400 font-bold">{(proto.fidelity * 100).toFixed(2)}% FID</div>
                             <button className="text-[8px] font-bold text-cyan-500/40 hover:text-cyan-400 uppercase mt-1">Load State</button>
                          </div>
                        </div>
                      )) : (
                        <div className="h-full flex flex-col items-center justify-center opacity-20 border-2 border-dashed border-white/10 rounded-2xl text-[10px] uppercase font-black tracking-[0.2em]">No protocols archived</div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-4 min-h-0 overflow-hidden">
                    <h5 className="text-[11px] font-bold uppercase text-purple-400 tracking-widest flex items-center gap-2 mb-2"><RefreshCcw className="w-4 h-4" /> Active System Patches</h5>
                    <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-3">
                      {activePatches.length > 0 ? activePatches.map(patch => (
                        <div key={patch.id} className={`p-4 border rounded-xl flex flex-col gap-3 relative overflow-hidden group transition-all duration-500 ${patch.applied ? 'bg-green-950/10 border-green-500/20 opacity-60' : 'bg-purple-950/10 border-purple-500/20'}`}>
                          <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-100 transition-opacity">
                            {patch.applied ? <CheckCircle2 className="w-6 h-6 text-green-500" /> : <ShieldCheck className="w-6 h-6 text-purple-500" />}
                          </div>
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${patch.applied ? 'bg-green-500/20 text-green-400' : 'bg-purple-500/20 text-purple-400'}`}>
                              {patch.applied ? <ShieldCheck className="w-4 h-4" /> : <Zap className="w-4 h-4" />}
                            </div>
                            <div>
                              <div className="text-xs font-bold text-white uppercase">{patch.targetProgramName} <span className={patch.applied ? 'text-green-400' : 'text-purple-400'}>({patch.version})</span></div>
                              <div className="text-[8px] font-mono text-white/30 uppercase tracking-widest truncate max-w-[200px]">{patch.applied ? 'VERIFIED_SIGNATURE' : `EKS: ${patch.eksSignature}`}</div>
                            </div>
                          </div>
                          <p className="text-[10px] text-white/40 leading-relaxed font-mono italic">"{patch.deltaSummary}"</p>
                          <div className="flex justify-between items-center border-t border-white/5 pt-2">
                             <span className={`text-[8px] font-bold uppercase ${patch.applied ? 'text-green-400/60' : 'text-purple-400/60'}`}>
                               Fidelity delta: +{(patch.fidelityImpact * 100).toFixed(3)}%
                             </span>
                             {patch.applied ? (
                               <div className="flex items-center gap-1 text-[9px] font-black text-green-500 uppercase tracking-widest">
                                 <Check className="w-3 h-3" /> Integrated
                               </div>
                             ) : (
                               <button 
                                onClick={() => handleApplyPatch(patch)}
                                disabled={isSaving}
                                className="px-3 py-1 bg-purple-500 text-black text-[9px] font-black uppercase rounded shadow-lg hover:bg-purple-400 transition-all active:scale-95 disabled:opacity-50"
                               >
                                Apply Patch
                               </button>
                             )}
                          </div>
                        </div>
                      )) : (
                        <div className="h-full flex flex-col items-center justify-center opacity-20 border-2 border-dashed border-white/10 rounded-2xl text-[10px] uppercase font-black tracking-[0.2em]">No patches identified</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="bg-black/80 border border-cyan-500/10 rounded-xl overflow-hidden flex flex-col h-40 shrink-0">
             <div className="px-4 py-2 border-b border-white/5 bg-cyan-950/20 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TerminalIcon className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="text-[9px] font-bold uppercase tracking-widest text-cyan-400/80">Qernel Runtime Log</span>
                </div>
                {isSaving && <div className="flex items-center gap-2"><Loader2 className="w-3 h-3 text-cyan-400 animate-spin" /><span className="text-[8px] font-mono text-cyan-400 uppercase">Synchronizing Ledger...</span></div>}
             </div>
             <div className="flex-1 p-4 font-mono text-[10px] space-y-1 overflow-y-auto custom-scrollbar">
                {logs.length > 0 ? logs.map((log, i) => (<div key={i} className="flex gap-4"><span className="text-white/20 shrink-0">{i}</span><span className="text-white/60">{log}</span></div>)) : (
                  <div className="text-white/10 uppercase font-bold text-center py-8">No events logged in current session.</div>
                )}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PlaneTab: React.FC<{ active: boolean, onClick: () => void, icon: React.ReactNode, label: string, sub: string }> = ({ active, onClick, icon, label, sub }) => (
  <button onClick={onClick} className={`w-full p-4 rounded-2xl border transition-all text-left group flex items-start gap-4 ${active ? 'bg-cyan-500/10 border-cyan-500/40 shadow-[0_0_20px_-5px_rgba(0,255,204,0.3)]' : 'border-transparent hover:bg-white/5 opacity-40 hover:opacity-80'}`}><div className={`p-2 rounded-xl border transition-all ${active ? 'bg-cyan-500/20 border-cyan-400/50 text-cyan-400' : 'bg-white/5 border-white/10'}`}>{React.cloneElement(icon as React.ReactElement<any>, { className: "w-4 h-4" })}</div><div className="flex flex-col"><span className={`text-xs font-bold uppercase tracking-widest ${active ? 'text-white' : 'text-white/60'}`}>{label}</span><span className="text-[9px] font-mono text-cyan-500/40 mt-0.5">{sub}</span></div></button>
);

const PlaneHeader: React.FC<{ title: string, desc: string }> = ({ title, desc }) => (
  <div><h4 className="text-lg font-bold text-white uppercase tracking-wider">{title}</h4><p className="text-[10px] text-white/40 font-mono mt-1">{desc}</p></div>
);

const KPIMini: React.FC<{ label: string, value: string }> = ({ label, value }) => (
  <div className="flex flex-col items-end">
    <span className="text-[8px] uppercase text-white/20 font-black tracking-widest">{label}</span>
    <span className="text-xs font-mono font-bold text-cyan-400">{value}</span>
  </div>
);

const GateProcess: React.FC<{ label: string, pulses: string, progress: number }> = ({ label, pulses, progress }) => (
  <div className="bg-white/5 border border-white/5 p-4 rounded-xl flex flex-col gap-2">
    <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-tight">
      <span className="text-white/80">{label}</span>
      <span className="text-cyan-500/60 font-mono">{pulses}</span>
    </div>
    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
      <div className="h-full bg-cyan-500/40" style={{width: `${progress}%`}} />
    </div>
  </div>
);

const QPUZone: React.FC<{ label: string, infons: string, load: number, fidelity: number, status: string }> = ({ label, infons, load, fidelity, status }) => (
  <div className="p-4 rounded-xl bg-black/40 border border-white/5 hover:border-purple-500/30 transition-all flex flex-col gap-3">
    <div className="flex justify-between items-center">
      <span className="text-[11px] font-bold text-white uppercase">{label}</span>
      <span className={`text-[9px] font-bold px-2 py-0.5 rounded border ${status === 'Available' ? 'bg-green-500/10 border-green-500/20 text-green-400' : status === 'Occupied' ? 'bg-purple-500/10 border-purple-500/40 text-purple-400' : 'bg-white/5 border-white/10 text-white/40'}`}>{status}</span>
    </div>
    <div className="flex justify-between text-[9px] font-mono text-white/30">
      <span>Index: {infons}</span>
      <span>Fid: {(fidelity * 100).toFixed(2)}%</span>
    </div>
    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
      <div className="h-full bg-purple-500" style={{width: `${load}%`}} />
    </div>
  </div>
);

const JobItem: React.FC<{ id: string, title: string, zone: string, priority: string }> = ({ id, title, zone, priority }) => (
  <div className="p-3 bg-black/60 rounded-xl border border-white/5 flex items-center justify-between group hover:bg-white/5 transition-all">
    <div className="flex flex-col">
      <span className="text-[10px] font-bold text-white uppercase">{title}</span>
      <span className="text-[8px] font-mono text-white/20">{id} | Zone: {zone}</span>
    </div>
    <span className={`text-[8px] font-bold px-2 py-1 rounded-md ${priority === 'High' ? 'text-red-400 bg-red-400/10' : 'text-cyan-400 bg-cyan-400/10'}`}>{priority}</span>
  </div>
);

const ControlKnob: React.FC<{ label: string, value: string }> = ({ label, value }) => (
  <div className="p-3 bg-white/5 border border-white/5 rounded-xl text-center">
    <div className="text-[8px] uppercase text-white/20 mb-1 font-bold tracking-widest">{label}</div>
    <div className="text-xs font-mono font-bold text-cyan-400">{value}</div>
  </div>
);

export default QCOSCore;