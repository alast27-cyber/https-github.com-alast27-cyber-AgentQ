import React, { useState, useEffect, useMemo } from 'react';
import { 
  Network, 
  Activity, 
  ShieldCheck, 
  Zap, 
  Globe, 
  Box, 
  Radio, 
  Wind, 
  Target, 
  Layers, 
  Cpu, 
  RefreshCw,
  Waypoints,
  Waves,
  Lock,
  ArrowUpRight,
  Database,
  Search, 
  Infinity as InfinityIcon,
  Maximize2,
  Save,
  Library,
  History,
  Trash2,
  CheckCircle2,
  FileCode,
  ArrowRight,
  ToggleLeft,
  ToggleRight,
  Loader2
} from 'lucide-react';
import { useUniverseStorage } from '../hooks/useUniverseStorage';
import { SavedProtocol, ProtocolStep } from '../types';

interface ProtocolPacket {
  id: string;
  state: '|0⟩' | '|1⟩' | '|+⟩' | '|−⟩' | 'ψ';
  fidelity: number;
  causalLink: string;
  status: 'QUANTIZING' | 'ENTANGLED' | 'ROUTING' | 'SYNCED';
}

const CHIPSProtocol: React.FC = () => {
  const { saveProtocol, getProtocols } = useUniverseStorage();
  const [isSimulating, setIsSimulating] = useState(false);
  const [packets, setPackets] = useState<ProtocolPacket[]>([]);
  const [gusSyncLevel, setGusSyncLevel] = useState(94.2);
  const [activeStage, setActiveStage] = useState<'synthesis' | 'ingress' | 'causal' | 'library'>('synthesis');
  const [logs, setLogs] = useState<{ msg: string, type: 'info' | 'warn' | 'success' | 'auto' }[]>([]);
  const [savedProtocols, setSavedProtocols] = useState<SavedProtocol[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [isAutoSaveEnabled, setIsAutoSaveEnabled] = useState(true);
  const [lastAutoSaveTime, setLastAutoSaveTime] = useState(Date.now());

  // Load library on mount or tab change
  const loadLibrary = async () => {
    const protos = await getProtocols();
    setSavedProtocols(protos.sort((a, b) => b.timestamp - a.timestamp));
  };

  useEffect(() => {
    loadLibrary();
  }, []);

  // Simulation and Auto-Save loop
  useEffect(() => {
    if (!isSimulating) return;

    const interval = setInterval(() => {
      // Add a new packet randomly
      if (Math.random() > 0.7 && packets.length < 8) {
        const id = Math.random().toString(36).substr(2, 5).toUpperCase();
        const states: ProtocolPacket['state'][] = ['|0⟩', '|1⟩', '|+⟩', '|−⟩', 'ψ'];
        setPackets(prev => [...prev, {
          id,
          state: states[Math.floor(Math.random() * states.length)],
          fidelity: 0.95 + Math.random() * 0.05,
          causalLink: `GUS-V${Math.floor(Math.random() * 999)}`,
          status: 'QUANTIZING'
        }]);
        addLog(`CHIPS: Quantizing packet ${id}...`, 'info');
      }

      // Progress existing packets
      setPackets(prev => prev.map((p): ProtocolPacket => {
        if (p.status === 'QUANTIZING') return { ...p, status: 'ENTANGLED' };
        if (p.status === 'ENTANGLED') return { ...p, status: 'ROUTING' };
        if (p.status === 'ROUTING') return { ...p, status: 'SYNCED' };
        return p;
      }).filter(p => p.status !== 'SYNCED' || Math.random() > 0.1));

      // Drift GUS sync
      setGusSyncLevel(prev => {
        const drift = (Math.random() - 0.5) * 0.2;
        return Math.min(100, Math.max(90, prev + drift));
      });

      // Periodic Auto-Save Logic (Every 30 seconds of active simulation)
      if (isAutoSaveEnabled && Date.now() - lastAutoSaveTime > 30000 && packets.length > 0) {
        triggerAutoSave();
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [isSimulating, packets.length, isAutoSaveEnabled, lastAutoSaveTime]);

  const addLog = (msg: string, type: 'info' | 'warn' | 'success' | 'auto') => {
    setLogs(prev => [{ msg, type }, ...prev].slice(0, 20));
  };

  const startSimulation = () => {
    setIsSimulating(true);
    setLastAutoSaveTime(Date.now());
    addLog("CHIPS: Initializing Causal Protocol Handshake with GUS...", 'info');
    addLog("CHIPS: SIPL Bridge established on L-Zone 4.", 'success');
  };

  const stopSimulation = () => {
    setIsSimulating(false);
    setPackets([]);
    addLog("CHIPS: Simulation suspended. Hilbert states cached.", 'warn');
  };

  const triggerAutoSave = async () => {
    setLastAutoSaveTime(Date.now());
    addLog("CHIPS: Initiating background auto-save...", 'auto');
    await handleSaveProtocol(true);
  };

  const handleSaveProtocol = async (isAuto = false) => {
    if (packets.length === 0 && !isSimulating) {
        if (!isAuto) addLog("CHIPS: No active state to archive.", 'warn');
        return;
    }
    
    if (!isAuto) setIsSaving(true);
    const id = `SIP-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
    
    const steps: ProtocolStep[] = packets.map((p, i) => ({
        id: `step-${p.id}`,
        gate: 'SIPL_PACKET',
        infons: [i],
        phenomenon: p.status === 'ENTANGLED' ? 'ENTANGLEMENT' : 'SUPERPOSITION',
        status: 'COMPLETED'
    }));

    const protocol: SavedProtocol = {
        id,
        name: isAuto ? `AUTO-Snapshot-${id}` : `CHIPS-Trajectory-${id}`,
        steps,
        timestamp: Date.now(),
        fidelity: gusSyncLevel / 100,
        description: isAuto 
          ? `Autonomous background commit at ${gusSyncLevel.toFixed(2)}% GUS sync.`
          : `Persistent packet manifold captured with ${packets.length} active units at ${gusSyncLevel.toFixed(2)}% GUS sync.`,
        tags: isAuto ? ['AUTO-SAVE', 'CHIPS', 'SIPL'] : ['CHIPS', 'SIPL', 'GENESIS']
    };

    try {
        await saveProtocol(protocol);
        addLog(`CHIPS: Protocol ${id} committed to permanent library.`, isAuto ? 'auto' : 'success');
        await loadLibrary();
    } catch (err) {
        addLog("CHIPS: Registry write failure.", 'warn');
    } finally {
        if (!isAuto) setIsSaving(false);
    }
  };

  return (
    <div className="flex flex-col h-full gap-6 p-6 animate-in fade-in duration-700">
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-0">
        
        {/* Left: Control & Telemetry */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-black/40 border border-cyan-500/20 rounded-2xl p-6 flex flex-col gap-6 shadow-inner relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <InfinityIcon className="w-20 h-20 text-cyan-400" />
            </div>
            
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-black uppercase text-cyan-400 tracking-widest flex items-center gap-2">
                <Target className="w-4 h-4" /> Protocol Config
              </h3>
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setIsAutoSaveEnabled(!isAutoSaveEnabled)}
                  className={`flex items-center gap-2 px-3 py-1 rounded-full border transition-all ${isAutoSaveEnabled ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400' : 'bg-white/5 border-white/10 text-white/20'}`}
                  title="Background state commitment"
                >
                  {isAutoSaveEnabled ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
                  <span className="text-[9px] font-black uppercase tracking-tighter">Auto-Save</span>
                </button>
                <div className={`w-2 h-2 rounded-full ${isSimulating ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] font-bold text-white/40 uppercase">GUS Synchronicity</span>
                <div className="flex justify-between items-end mb-1">
                  <span className="text-2xl font-mono font-bold text-cyan-400 tracking-tighter">{gusSyncLevel.toFixed(2)}%</span>
                  <span className="text-[9px] font-mono text-cyan-50/40 uppercase tracking-widest mb-1">Status: NOMINAL</span>
                </div>
                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-500 transition-all duration-1000 shadow-[0_0_10px_cyan]" style={{ width: `${gusSyncLevel}%` }} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/5 border border-white/5 rounded-xl p-3">
                  <span className="block text-[8px] font-bold text-white/20 uppercase mb-1">Packet Depth</span>
                  <span className="text-sm font-mono text-white">1024-Q</span>
                </div>
                <div className="bg-white/5 border border-white/5 rounded-xl p-3">
                  <span className="block text-[8px] font-bold text-white/20 uppercase mb-1">EKS Encryption</span>
                  <span className="text-sm font-mono text-purple-400">PQC-L3</span>
                </div>
              </div>
            </div>

            <div className="mt-auto space-y-3">
              {!isSimulating ? (
                <button 
                  onClick={startSimulation}
                  className="w-full py-4 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl font-black text-[10px] uppercase tracking-[0.2em] transition-all active:scale-95 shadow-[0_10px_30px_-10px_rgba(0,255,204,0.4)] flex items-center justify-center gap-3"
                >
                  <Zap className="w-4 h-4 fill-current" /> Initialize Protocol Sync
                </button>
              ) : (
                <div className="flex gap-2">
                   <button 
                    onClick={stopSimulation}
                    className="flex-1 py-4 bg-red-950/40 border border-red-500/40 text-red-400 hover:bg-red-900/40 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] transition-all active:scale-95 flex items-center justify-center gap-3"
                   >
                     <Box className="w-4 h-4" /> Suspend
                   </button>
                   <button 
                    onClick={() => handleSaveProtocol(false)}
                    disabled={isSaving}
                    className="flex-1 py-4 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-black text-[10px] uppercase tracking-[0.2em] transition-all active:scale-95 shadow-lg flex items-center justify-center gap-3"
                   >
                     {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                     Save Trajectory
                   </button>
                </div>
              )}
            </div>
          </div>

          {/* Logs */}
          <div className="flex-1 bg-black/60 border border-white/5 rounded-2xl flex flex-col overflow-hidden">
            <div className="px-4 py-2 border-b border-white/5 bg-cyan-950/20 flex items-center justify-between">
              <span className="text-[9px] font-black text-cyan-500/60 uppercase tracking-widest">SIPL Protocol Log</span>
              <Activity className="w-3 h-3 text-cyan-400 animate-pulse" />
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar font-mono text-[9px]">
              {logs.length === 0 && <div className="text-white/10 text-center py-10 uppercase tracking-widest">Simulator Standby</div>}
              {logs.map((log, i) => (
                <div key={i} className={`flex gap-2 animate-in slide-in-from-left-2 duration-300 ${log.type === 'success' ? 'text-green-400' : log.type === 'warn' ? 'text-red-400' : log.type === 'auto' ? 'text-purple-400' : 'text-cyan-500/60'}`}>
                  <span className="opacity-30 shrink-0">[{new Date().toLocaleTimeString([], { hour12: false, second: '2-digit' })}]</span>
                  <span className="leading-relaxed">{log.type === 'auto' && <span className="mr-1">[AUTO]</span>}{log.msg}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Visualization Canvas */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          <div className="flex-1 bg-black/60 border border-cyan-500/10 rounded-3xl relative overflow-hidden shadow-2xl flex flex-col">
            
            {/* Stage Navigation */}
            <div className="flex border-b border-white/5 p-2 gap-2 bg-black/40">
              <StageBtn active={activeStage === 'synthesis'} onClick={() => setActiveStage('synthesis')} label="Synthesis" icon={<Cpu className="w-3.5 h-3.5" />} />
              <StageBtn active={activeStage === 'ingress'} onClick={() => setActiveStage('ingress')} label="Ingress" icon={<Waypoints className="w-3.5 h-3.5" />} />
              <StageBtn active={activeStage === 'causal'} onClick={() => setActiveStage('causal')} label="Routing" icon={<Waves className="w-3.5 h-3.5" />} />
              <div className="ml-auto flex items-center gap-2">
                 <div className="w-px h-6 bg-white/10 mx-2" />
                 <StageBtn active={activeStage === 'library'} onClick={() => setActiveStage('library')} label="Protocol Library" icon={<Library className="w-3.5 h-3.5" />} />
              </div>
            </div>

            <div className="flex-1 relative flex flex-col overflow-hidden">
               {activeStage === 'library' ? (
                  <div className="h-full flex flex-col p-8 animate-in fade-in duration-500 overflow-hidden">
                     <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-4">
                           <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                              <Library className="w-6 h-6" />
                           </div>
                           <div>
                              <h4 className="text-xl font-black text-white uppercase tracking-tighter italic">SIPL Protocol Library</h4>
                              <p className="text-[10px] text-purple-400/60 uppercase font-mono">Archived Causal Trajectories</p>
                           </div>
                        </div>
                        <button onClick={loadLibrary} className="p-2 hover:bg-white/5 rounded-lg text-white/20 hover:text-cyan-400 transition-colors">
                           <RefreshCw className="w-4 h-4" />
                        </button>
                     </div>

                     <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-4">
                        {savedProtocols.length > 0 ? savedProtocols.map(proto => (
                           <div key={proto.id} className="bg-white/5 border border-white/10 rounded-[2rem] p-6 flex items-center justify-between group hover:border-cyan-500/40 transition-all shadow-xl hover:bg-white/[0.07]">
                              <div className="flex items-center gap-6">
                                 <div className="w-16 h-16 rounded-[1.5rem] bg-black/40 border border-white/5 flex items-center justify-center relative">
                                    <FileCode className="w-8 h-8 text-cyan-500/30 group-hover:text-cyan-400 transition-colors" />
                                    {proto.name.includes('AUTO') && (
                                      <div className="absolute -top-2 -left-2 bg-purple-600 text-white text-[7px] font-black px-1.5 py-0.5 rounded shadow-lg uppercase">Auto</div>
                                    )}
                                    <div className="absolute -top-2 -right-2 bg-cyan-600 text-white text-[8px] font-black px-2 py-0.5 rounded-full border border-black shadow-lg">v3.1</div>
                                 </div>
                                 <div className="flex flex-col gap-1">
                                    <h5 className="font-black text-white uppercase tracking-tight text-lg">{proto.name}</h5>
                                    <div className="flex items-center gap-3">
                                       <span className="text-[9px] font-mono text-white/20 uppercase">{new Date(proto.timestamp).toLocaleDateString()} {new Date(proto.timestamp).toLocaleTimeString()}</span>
                                       <div className="w-1 h-1 rounded-full bg-white/10" />
                                       <span className="text-[9px] font-black text-cyan-400 uppercase tracking-widest">Fidelity: {(proto.fidelity * 100).toFixed(2)}%</span>
                                    </div>
                                    <p className="text-[10px] text-white/40 font-mono italic mt-1 line-clamp-1">"{proto.description}"</p>
                                 </div>
                              </div>
                              <div className="flex items-center gap-3">
                                 <button className="px-6 py-2.5 bg-cyan-600/10 border border-cyan-500/30 text-cyan-400 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-cyan-600 hover:text-white transition-all shadow-lg active:scale-95 flex items-center gap-2">
                                    <ArrowUpRight className="w-3.5 h-3.5" /> Re-Initialize
                                 </button>
                                 <button className="p-2.5 rounded-xl border border-white/10 text-white/20 hover:text-red-400 transition-all">
                                    <Trash2 className="w-4 h-4" />
                                 </button>
                              </div>
                           </div>
                        )) : (
                           <div className="h-full flex flex-col items-center justify-center opacity-10 gap-6 p-20 grayscale border-2 border-dashed border-white/10 rounded-[3rem]">
                              <Box className="w-20 h-20" />
                              <div className="text-center">
                                 <h5 className="text-xl font-bold uppercase tracking-[0.2em]">Library Empty</h5>
                                 <p className="text-xs font-mono mt-2">Start a simulation and save a trajectory to archive it here.</p>
                              </div>
                           </div>
                        )}
                     </div>
                  </div>
               ) : !isSimulating ? (
                 <div className="h-full flex flex-col items-center justify-center text-center gap-6 opacity-20 group p-12">
                    <div className="w-24 h-24 rounded-full border-2 border-dashed border-cyan-500 flex items-center justify-center group-hover:rotate-180 transition-transform duration-[4000ms]">
                      <Network className="w-12 h-12" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold uppercase tracking-[0.3em]">Hilbert Manifold Idle</h4>
                      <p className="text-xs font-mono mt-2">Awaiting SIPL-Handshake to begin packet quantization.</p>
                    </div>
                 </div>
               ) : (
                 <div className="w-full h-full flex flex-col items-center justify-center p-12">
                    <div className="relative w-full h-full max-w-2xl flex items-center justify-around">
                      <div className="flex flex-col items-center gap-4 z-10">
                        <div className="w-20 h-20 rounded-2xl bg-cyan-500/10 border border-cyan-500/40 flex items-center justify-center shadow-[0_0_30px_rgba(0,255,204,0.1)] group">
                           <Box className="w-10 h-10 text-cyan-400 group-hover:scale-110 transition-transform" />
                        </div>
                        <span className="text-[10px] font-bold text-white uppercase tracking-widest">DQN-Rigel</span>
                      </div>

                      <div className="flex-1 relative h-64 flex items-center justify-center mx-10">
                         <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                            {[...Array(6)].map((_, i) => (
                              <div key={i} className="absolute w-full h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent animate-[pulse_3s_infinite]" style={{ transform: `rotate(${i * 30}deg)`, animationDelay: `${i * 0.5}s` }} />
                            ))}
                         </div>
                         
                         {packets.map(p => (
                            <div 
                              key={p.id}
                              className={`absolute p-2 rounded-lg bg-black border shadow-2xl transition-all duration-1000 ${p.status === 'QUANTIZING' ? 'border-cyan-500 animate-in zoom-in' : p.status === 'ENTANGLED' ? 'border-purple-500 animate-pulse' : 'border-green-500'}`}
                              style={{ 
                                left: `${Math.random() * 80 + 10}%`,
                                top: `${Math.random() * 80 + 10}%`,
                                opacity: p.status === 'SYNCED' ? 0.4 : 1
                              }}
                            >
                               <div className="flex flex-col items-center gap-1">
                                  <span className="text-[10px] font-mono font-black text-white tracking-tighter">{p.state}</span>
                                  <div className="w-6 h-0.5 bg-white/10 rounded-full overflow-hidden">
                                     <div className="h-full bg-cyan-400" style={{ width: `${p.fidelity * 100}%` }} />
                                  </div>
                               </div>
                               <div className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/80 px-1.5 py-0.5 rounded border border-white/10 text-[7px] font-mono text-cyan-400">
                                  PKT_{p.id}
                               </div>
                            </div>
                         ))}

                         <div className="w-32 h-32 rounded-full bg-purple-500/5 border border-purple-500/20 flex items-center justify-center relative">
                            <Waves className="w-12 h-12 text-purple-400/20 animate-pulse" />
                            <div className="absolute inset-0 rounded-full border-t-2 border-purple-500/40 animate-spin" />
                         </div>
                      </div>

                      <div className="flex flex-col items-center gap-4 z-10">
                        <div className="w-20 h-20 rounded-full bg-purple-500/10 border border-purple-500/40 flex items-center justify-center shadow-[0_0_30px_rgba(168,85,247,0.1)] group">
                           <Globe className="w-10 h-10 text-purple-400 group-hover:scale-110 transition-transform" />
                        </div>
                        <span className="text-[10px] font-bold text-white uppercase tracking-widest">GUS Mirror</span>
                      </div>
                    </div>
                 </div>
               )}
            </div>

            <div className="bg-black/60 border-t border-white/5 p-6 grid grid-cols-1 md:grid-cols-3 gap-6 backdrop-blur-md">
               <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-cyan-500/5 border border-cyan-500/20 text-cyan-400">
                     <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[9px] font-black uppercase text-cyan-500/40 tracking-widest">Causal Integrity</span>
                    <span className="text-xs font-mono font-bold text-white">LOCKED (v3.1)</span>
                  </div>
               </div>
               <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-purple-500/5 border border-purple-500/20 text-purple-400">
                     <Waypoints className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[9px] font-black uppercase text-purple-500/40 tracking-widest">Archived Packs</span>
                    <span className="text-xs font-mono font-bold text-white">{savedProtocols.length} Protocols</span>
                  </div>
               </div>
               <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-green-500/5 border border-green-500/20 text-green-400">
                     <Lock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[9px] font-black uppercase text-green-500/40 tracking-widest">EKS Status</span>
                    <span className="text-xs font-mono font-bold text-white">SYNCED_PERSISTENT</span>
                  </div>
               </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

const StageBtn: React.FC<{ active: boolean, onClick: () => void, label: string, icon: React.ReactNode }> = ({ active, onClick, label, icon }) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-2.5 px-6 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${active ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 shadow-lg' : 'text-white/30 hover:text-white/50 border border-transparent'}`}
  >
    {icon}
    {label}
  </button>
);

export default CHIPSProtocol;
