
import React, { useMemo, useState, useEffect, useCallback, memo } from 'react';
import { 
  Cpu, 
  Zap, 
  Activity, 
  Thermometer, 
  Wind, 
  RefreshCw, 
  Layers, 
  Power, 
  PowerOff,
  Share2, 
  Clock, 
  Waypoints, 
  ShieldCheck, 
  Target, 
  Scale,
  Gauge,
  Trash2
} from 'lucide-react';
import { IBQOS, InfonState, CognitiveLink } from '../types';

interface IBQOSSimulatorProps {
  ibqos: IBQOS;
  onNudge: (id: number) => void;
  onCalibrate: (updatedIBQOS?: IBQOS) => void;
  onUpdateInfons: (infons: InfonState[]) => void;
  onUpdateDensity?: (density: number) => void;
  onUpdateIBQOS?: (ibqos: IBQOS) => void;
}

const COLS = 20;
const ROWS = 12;

/**
 * Optimized Individual Infon Component
 * Memoized to prevent re-rendering the entire lattice during single-infon interactions.
 */
const InfonNode = memo(({ 
  infon, 
  ibqos,
  isHovered, 
  isSelected,
  onHover, 
  onNudge 
}: { 
  infon: InfonState; 
  ibqos: IBQOS;
  isHovered: boolean; 
  isSelected: boolean;
  onHover: (id: number | null) => void; 
  onNudge: (id: number) => void;
}) => {
  const getPhaseColor = (phase: number) => {
    const hue = (phase / (Math.PI * 2)) * 360;
    return `hsl(${hue}, 80%, 50%)`;
  };

  const phaseColor = useMemo(() => getPhaseColor(infon.phase), [infon.phase]);

  return (
    <div 
      onMouseEnter={() => onHover(infon.id)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onNudge(infon.id)}
      className="relative aspect-square cursor-crosshair group select-none"
      style={{ willChange: 'transform, opacity', zIndex: isHovered ? 50 : 1 }}
    >
      {/* Infon Visual Representation */}
      <div 
        className={`w-full h-full rounded-sm border transition-all duration-300 ${
          infon.probability > 0.05 
          ? 'border-cyan-400/30' 
          : 'border-white/5 bg-white/5 group-hover:bg-white/10'
        }`}
        style={{ 
          opacity: 0.2 + (infon.coherence * 0.8),
          transform: isHovered ? 'scale(1.3)' : `scale(${0.7 + (infon.probability * 0.3)})`,
          borderColor: infon.probability > 0.2 || isHovered ? phaseColor : undefined,
          backgroundColor: infon.probability > 0.1 || isHovered ? `${phaseColor}33` : undefined,
          boxShadow: isHovered ? `0 0 15px ${phaseColor}` : undefined,
        }}
      >
        <div 
          className="absolute inset-0 transition-opacity duration-500 rounded-sm"
          style={{ 
            backgroundColor: phaseColor,
            opacity: infon.probability * 0.5,
            boxShadow: infon.probability > 0.1 ? `0 0 ${20 * infon.probability}px ${phaseColor}` : 'none'
          }}
        />
        {isSelected && (
          <div className="absolute inset-0 border-2 border-white animate-pulse rounded-sm z-30 shadow-[0_0_10px_white]" />
        )}
        {infon.isEntangled && (
          <>
            <div className="absolute inset-0 border border-purple-500/50 animate-pulse rounded-sm" />
            <div className="absolute -inset-1 border border-purple-400/20 rounded-sm animate-[spin_4s_linear_infinite]" />
            <div className="absolute -inset-2 border border-cyan-400/10 rounded-sm animate-[spin_6s_linear_infinite_reverse]" />
          </>
        )}
        {(() => {
          const cogLink = ibqos?.links?.find(l => l.sourceId === infon.id || l.targetId === infon.id);
          if (!cogLink) return null;
          let color = "border-purple-500/50";
          let glow = "border-purple-400/20";
          if (cogLink.type === 'resonance') {
            color = "border-cyan-500/50";
            glow = "border-cyan-400/20";
          } else if (cogLink.type === 'causal') {
            color = "border-orange-500/50";
            glow = "border-orange-400/20";
          }
          return (
            <>
              <div className={`absolute inset-0 border ${color} animate-pulse rounded-sm`} />
              <div className={`absolute -inset-1 border ${glow} rounded-sm animate-pulse`} />
            </>
          );
        })()}
      </div>

      {/* Hover Tooltip Overlay */}
      {isHovered && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-36 bg-black/95 border border-cyan-500/40 p-3 rounded-xl z-[60] pointer-events-none shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-200">
          <div className="text-[9px] font-black text-cyan-400 uppercase mb-2 pb-1 border-b border-white/10">Infon #{infon.id}</div>
          <div className="space-y-1.5 text-[8px] font-mono">
            <div className="flex justify-between">
              <span className="text-white/40 uppercase">Prob(|1⟩)</span>
              <span className="text-white font-bold">{infon.probability.toFixed(4)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/40 uppercase">Phase</span>
              <span style={{ color: phaseColor }} className="font-bold">{(infon.phase / Math.PI).toFixed(2)}π</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/40 uppercase">Coherence</span>
              <span className="text-green-400 font-bold">{(infon.coherence * 100).toFixed(1)}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/40 uppercase">Entropy</span>
              <span className="text-purple-400 font-bold">{infon.entropy.toFixed(2)} S</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/40 uppercase">Valence</span>
              <span className="text-yellow-400 font-bold">{infon.valence}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/40 uppercase">Loops</span>
              <span className="text-pink-400 font-bold">{infon.loops}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/40 uppercase">Hopping</span>
              <span className="text-orange-400 font-bold">{infon.hopping.toFixed(3)}</span>
            </div>
            {infon.isEntangled && (
              <div className="flex justify-between border-t border-purple-500/30 pt-1 mt-1">
                <span className="text-purple-400 uppercase font-black">Entangled</span>
                <span className="text-purple-300 font-bold">#{infon.entangledWith}</span>
              </div>
            )}
            {(() => {
              const cogLinks = ibqos?.links?.filter(l => l.sourceId === infon.id || l.targetId === infon.id);
              if (cogLinks && cogLinks.length > 0) {
                return cogLinks.map(link => {
                  const partnerId = link.sourceId === infon.id ? link.targetId : link.sourceId;
                  let linkColor = "text-purple-400";
                  if (link.type === 'resonance') linkColor = "text-cyan-400";
                  if (link.type === 'causal') linkColor = "text-orange-400";
                  
                  return (
                    <div key={link.id} className="flex flex-col border-t border-white/10 pt-1 mt-1">
                      <div className="flex justify-between">
                        <span className={`${linkColor} uppercase font-black`}>{link.type}</span>
                        <span className={`${linkColor} font-bold`}>#{partnerId}</span>
                      </div>
                      <div className="flex justify-between text-[7px] text-white/40">
                        <span>STRENGTH</span>
                        <span>{(link.strength * 100).toFixed(0)}%</span>
                      </div>
                    </div>
                  );
                });
              }
              return null;
            })()}
          </div>
        </div>
      )}
    </div>
  );
});

const IBQOSSimulator: React.FC<IBQOSSimulatorProps> = ({ 
  ibqos, 
  onNudge, 
  onCalibrate, 
  onUpdateInfons, 
  onUpdateDensity,
  onUpdateIBQOS 
}) => {
  const [hoveredInfon, setHoveredInfon] = useState<number | null>(null);
  const [selectedInfon, setSelectedInfon] = useState<number | null>(null);
  const [isBooted, setIsBooted] = useState(false);
  const [isBooting, setIsBooting] = useState(false);
  const [bootProgress, setBootProgress] = useState(0);

  const handleNodeClick = (id: number) => {
    const newInfons = [...ibqos.infons];
    const clickedInfon = newInfons[id];

    // Helper to apply nudge effect (probability boost, phase shift)
    const applyNudge = (idx: number) => {
      const q = { ...newInfons[idx] };
      q.probability = Math.min(1, q.probability + 0.2);
      q.phase = (q.phase + Math.PI / 4) % (Math.PI * 2);
      q.lastPulse = Date.now();
      newInfons[idx] = q;
    };

    // 1. Check if node is part of a cognitive link - if so, break it
    const cogLinks = ibqos.links?.filter(l => l.sourceId === id || l.targetId === id);
    if (cogLinks && cogLinks.length > 0) {
      // Break the first link found for this node
      const linkToBreak = cogLinks[0];
      const newLinks = ibqos.links.filter(l => l.id !== linkToBreak.id);
      applyNudge(linkToBreak.sourceId);
      applyNudge(linkToBreak.targetId);
      
      const updatedIBQOS = { ...ibqos, infons: newInfons, links: newLinks };
      if (onUpdateIBQOS) {
        onUpdateIBQOS(updatedIBQOS);
      } else {
        onCalibrate(updatedIBQOS);
      }
      
      if (selectedInfon === id) setSelectedInfon(null);
      return;
    }

    // 2. Check for legacy entanglement - if so, break it
    if (clickedInfon.isEntangled) {
      const partnerId = clickedInfon.entangledWith;
      
      newInfons[id] = { ...newInfons[id], isEntangled: false, entangledWith: undefined };
      if (partnerId !== undefined && newInfons[partnerId]) {
        newInfons[partnerId] = { ...newInfons[partnerId], isEntangled: false, entangledWith: undefined };
        applyNudge(partnerId);
      }
      
      applyNudge(id);
      onUpdateInfons(newInfons);
      if (selectedInfon === id) setSelectedInfon(null);
      return;
    }

    // 3. Handle selection and link creation
    if (selectedInfon === null) {
      // Select first node
      setSelectedInfon(id);
      applyNudge(id);
      onUpdateInfons(newInfons);
    } else if (selectedInfon === id) {
      // Deselect
      setSelectedInfon(null);
      applyNudge(id);
      onUpdateInfons(newInfons);
    } else {
      // Create new Cognitive Link (Default: Entanglement, Strength: 0.6)
      const newLink: CognitiveLink = {
        id: `link-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        sourceId: selectedInfon,
        targetId: id,
        type: 'entanglement',
        strength: 0.6
      };

      applyNudge(selectedInfon);
      applyNudge(id);
      
      const updatedIBQOS = { 
        ...ibqos, 
        infons: newInfons, 
        links: [...(ibqos.links || []), newLink] 
      };

      if (onUpdateIBQOS) {
        onUpdateIBQOS(updatedIBQOS);
      } else {
        onCalibrate(updatedIBQOS);
      }
      
      setSelectedInfon(null);
    }
  };

  // Memoized KPIs
  const kpis = useMemo(() => {
    const total = ibqos.infons.length;
    const entangledCount = ibqos.infons.filter(q => q.isEntangled).length;
    const avgCoherence = ibqos.infons.reduce((acc, q) => acc + q.coherence, 0) / total;
    const qpi = (avgCoherence * 0.6) + ((entangledCount / total) * 0.3) + (0.1 * (1 - ibqos.noiseFloor));

    return {
      count: total,
      entanglementRate: (entangledCount / total) * 100,
      avgCoherence: avgCoherence * 100,
      coherenceTime: avgCoherence * 142.5,
      qpi: qpi * 100,
      logicalInfons: Math.floor(total / 40)
    };
  }, [ibqos.infons, ibqos.noiseFloor]);

  const handleBoot = () => {
    setIsBooting(true);
    setBootProgress(0);
    const interval = setInterval(() => {
      setBootProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsBooting(false);
          setIsBooted(true);
          return 100;
        }
        return prev + 4;
      });
    }, 20);
  };

  const handleCalibrateIBQOS = () => {
    const updatedInfons = ibqos.infons.map(infon => ({
      ...infon,
      probability: infon.probability * 0.8,
      entropy: infon.entropy * 0.9,
      coherence: Math.min(1, infon.coherence + (Math.random() * 0.02))
    }));

    const updatedIBQOS: IBQOS = {
      ...ibqos,
      globalCoherence: 0.999,
      infons: updatedInfons
    };

    onCalibrate(updatedIBQOS);
  };

  const injectPattern = (type: 'GHZ' | 'RANDOM' | 'WAVE') => {
    if (!isBooted) return;
    const newInfons = [...ibqos.infons];
    
    if (type === 'GHZ') {
      newInfons.forEach((q, i) => {
        q.probability = i % 10 === 0 ? 0.9 : 0.01;
        q.isEntangled = i % 10 === 0;
      });
    } else if (type === 'WAVE') {
      newInfons.forEach((q, i) => {
        const x = i % COLS;
        const y = Math.floor(i / COLS);
        q.probability = Math.abs(Math.sin((x + y) / 3));
        q.isEntangled = Math.random() > 0.85;
      });
    } else {
      newInfons.forEach(q => {
        q.probability = Math.random() * 0.4;
        q.phase = Math.random() * Math.PI * 2;
        q.isEntangled = Math.random() > 0.92;
      });
    }
    onUpdateInfons(newInfons);
  };

  const handleHoverChange = useCallback((id: number | null) => {
    setHoveredInfon(id);
  }, []);

  return (
    <div className="flex flex-col h-full gap-6 animate-in fade-in duration-700">
      {/* Simulation Telemetry Bar */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <MetricTile 
          icon={<Thermometer className="w-4 h-4 text-orange-400" />} 
          label="Lattice Temp" 
          value={`${ibqos.temperature.toFixed(2)} mK`} 
          status={isBooted ? "Stable" : "Idle"}
        />
        <MetricTile 
          icon={<Activity className="w-4 h-4 text-cyan-400" />} 
          label="Info Hamiltonian" 
          value={`${ibqos.informationalHamiltonian.toFixed(2)} H`} 
          status={isBooted ? "Optimal" : "Offline"}
        />
        <MetricTile 
          icon={<Wind className="w-4 h-4 text-purple-400" />} 
          label="Dirac Eigenvalue" 
          value={`${ibqos.diracEigenvalue.toFixed(3)} λ`} 
          status="Monitoring"
        />
        <InputMetricTile 
          icon={<Layers className="w-4 h-4 text-pink-400" />} 
          label="Infon Density" 
          value={ibqos.infonDensity ?? 0.85} 
          onChange={(val) => onUpdateDensity && onUpdateDensity(val)}
          status={isBooted ? "Active" : "Idle"}
        />
        <div className="flex flex-col gap-2">
          {!isBooted ? (
            <button 
              onClick={handleBoot}
              disabled={isBooting}
              className="flex-1 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl p-3 flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95 disabled:opacity-50"
            >
              {isBooting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Power className="w-4 h-4" />}
              <span className="text-[10px] font-bold uppercase tracking-widest">{isBooting ? `Booting ${bootProgress}%` : 'Activate QPU'}</span>
            </button>
          ) : (
            <button 
              onClick={handleCalibrateIBQOS}
              className="flex-1 bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-3 flex flex-col items-center justify-center gap-1 hover:bg-cyan-500/20 transition-all group active:scale-95"
            >
              <RefreshCw className="w-4 h-4 text-cyan-400 group-hover:rotate-180 transition-transform duration-500" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-400">Recalibrate</span>
            </button>
          )}
        </div>
      </div>

      {/* KPI Performance Dashboard */}
      <div className={`grid grid-cols-1 lg:grid-cols-4 gap-4 transition-all duration-700 ${isBooted ? 'opacity-100' : 'opacity-20 pointer-events-none'}`}>
        <KpiCard icon={<Cpu className="text-cyan-400" />} label="Physical Infons" value={kpis.count} subValue="Active Fabric" color="cyan" />
        <KpiCard icon={<Waypoints className="text-purple-400" />} label="Entanglement Rate" value={`${kpis.entanglementRate.toFixed(1)}%`} subValue={`${(kpis.entanglementRate * 2.4).toFixed(0)} Links`} color="purple" />
        <KpiCard icon={<Clock className="text-blue-400" />} label="Avg Coherence" value={`${kpis.coherenceTime.toFixed(1)}μs`} subValue={`${kpis.avgCoherence.toFixed(1)}% Stability`} color="blue" />
        <KpiCard icon={<ShieldCheck className="text-green-400" />} label="QPI Score" value={kpis.qpi.toFixed(1)} subValue="System Health" color="green" />
      </div>

      {/* Qernel Architecture Context */}
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 transition-all duration-700 ${isBooted ? 'opacity-100' : 'opacity-20 pointer-events-none'}`}>
        <ArchitectureCard label="Logic-to-Physical Ratio" value="1:40" subValue="(Surface Code)" count={kpis.logicalInfons} color="cyan" icon={<Scale className="w-6 h-6 text-cyan-400" />} />
        <ArchitectureCard label="Feedback Latency" value="0.92 μs" subValue="(Real-time)" count="99.9%" labelSuffix="Circuit Fidelity" color="purple" icon={<Gauge className="w-6 h-6 text-purple-400" />} />
      </div>

      {/* Main Infon Lattice */}
      <div className="flex-1 glass-panel rounded-2xl border border-cyan-500/20 bg-black/40 p-6 flex flex-col min-h-[500px] relative overflow-hidden">
        {!isBooted && !isBooting && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm rounded-2xl">
            <div className="w-16 h-16 rounded-2xl border-2 border-cyan-500/20 flex items-center justify-center mb-4">
              <PowerOff className="w-8 h-8 text-cyan-500/30" />
            </div>
            <h3 className="text-sm font-bold uppercase tracking-[0.3em] text-cyan-500/40">Virtual Lattice Offline</h3>
            <button onClick={handleBoot} className="mt-6 px-8 py-3 bg-cyan-600 border border-cyan-400 text-white text-xs font-bold uppercase tracking-widest hover:bg-cyan-500 transition-all rounded-lg shadow-[0_0_20px_rgba(0,255,204,0.3)] active:scale-95">Initialize Physical Core</button>
          </div>
        )}

        <div className="flex items-center justify-between mb-6 relative z-20">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-700 ${isBooted ? 'bg-cyan-500/20 border-cyan-500/50 shadow-[0_0_15px_rgba(0,255,204,0.3)]' : 'bg-white/5 border-white/10'}`}>
              <Cpu className={`w-6 h-6 ${isBooted ? 'text-cyan-400 animate-pulse' : 'text-white/20'}`} />
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-white">240-Infon IBQOS Fabric</h3>
              <p className="text-[10px] text-cyan-500/50 font-mono">Status: {isBooted ? 'NOMINAL' : isBooting ? 'INITIALIZING' : 'STANDBY'}</p>
            </div>
          </div>
          
          {isBooted && (
            <div className="flex items-center gap-3">
              <span className="text-[9px] font-bold uppercase tracking-widest text-cyan-500/40">Inject Pattern:</span>
              <div className="flex gap-1">
                <PatternBtn onClick={() => injectPattern('GHZ')} label="GHZ" icon={<Share2 className="w-3 h-3" />} />
                <PatternBtn onClick={() => injectPattern('WAVE')} label="Wave" icon={<Activity className="w-3 h-3" />} />
                <PatternBtn onClick={() => injectPattern('RANDOM')} label="Noise" icon={<Zap className="w-3 h-3" />} />
                <div className="w-px h-4 bg-white/10 mx-1 self-center" />
                <button 
                  onClick={() => {
                    const newInfons = ibqos.infons.map(q => ({ ...q, isEntangled: false, entangledWith: undefined }));
                    const newIBQOS = { ...ibqos, infons: newInfons, links: [] };
                    if (onUpdateIBQOS) {
                      onUpdateIBQOS(newIBQOS);
                    } else {
                      onCalibrate(newIBQOS);
                    }
                  }}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-red-500/10 border border-red-500/30 hover:bg-red-500/20 hover:border-red-500/50 text-[9px] font-bold uppercase tracking-tighter text-red-400 transition-all active:scale-95"
                >
                  <Trash2 className="w-3 h-3" /> Clear Links
                </button>
              </div>
            </div>
          )}
        </div>

        <div className={`flex-1 relative min-h-0 overflow-hidden bg-black/40 rounded-xl border border-white/5 p-4 flex items-center justify-center shadow-inner transition-all duration-1000 ${isBooted ? 'opacity-100' : 'opacity-10 scale-105 blur-sm'}`}>
          {/* Cognitive Links Layer */}
          <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
            <svg className="w-full h-full" viewBox={`0 0 ${COLS * 100} ${ROWS * 100}`} preserveAspectRatio="none">
              {(() => {
                const renderedLinks: React.ReactNode[] = [];
                
                // Render legacy entanglement links
                const entangled = ibqos.infons.filter(q => q.isEntangled && q.entangledWith !== undefined && q.entangledWith > q.id);
                for (const q1 of entangled) {
                  const q2 = ibqos.infons[q1.entangledWith!];
                  if (!q2) continue;
                    
                  const x1 = (q1.id % COLS) * 100 + 50;
                  const y1 = Math.floor(q1.id / COLS) * 100 + 50;
                  const x2 = (q2.id % COLS) * 100 + 50;
                  const y2 = Math.floor(q2.id / COLS) * 100 + 50;
                  
                  renderedLinks.push(
                    <g key={`legacy-link-${q1.id}-${q2.id}`}>
                      <line 
                        x1={x1} y1={y1} x2={x2} y2={y2} 
                        stroke="rgba(168, 85, 247, 0.4)" 
                        strokeWidth="12" 
                        strokeLinecap="round"
                        className="animate-pulse"
                      />
                      <line 
                        x1={x1} y1={y1} x2={x2} y2={y2} 
                        stroke="rgba(168, 85, 247, 0.8)" 
                        strokeWidth="4" 
                        strokeLinecap="round"
                        className="animate-quantum-pulse"
                      />
                    </g>
                  );
                }

                // Render new Cognitive Links
                if (ibqos.links) {
                  for (const link of ibqos.links) {
                    const q1 = ibqos.infons[link.sourceId];
                    const q2 = ibqos.infons[link.targetId];
                    if (!q1 || !q2) continue;

                    const x1 = (q1.id % COLS) * 100 + 50;
                    const y1 = Math.floor(q1.id / COLS) * 100 + 50;
                    const x2 = (q2.id % COLS) * 100 + 50;
                    const y2 = Math.floor(q2.id / COLS) * 100 + 50;

                    let color = "#a855f7"; // purple
                    if (link.type === 'resonance') color = "#22d3ee"; // cyan
                    if (link.type === 'causal') color = "#fb923c"; // orange

                    renderedLinks.push(
                      <g key={`cog-link-${link.id}`}>
                        <line 
                          x1={x1} y1={y1} x2={x2} y2={y2} 
                          stroke={color} 
                          strokeWidth={2 + link.strength * 10} 
                          strokeLinecap="round"
                          className="animate-quantum-pulse"
                          style={{ opacity: 0.2 + link.strength * 0.6 }}
                        />
                        {link.type === 'causal' && (
                          <circle cx={x2} cy={y2} r="6" fill={color} className="animate-ping" />
                        )}
                        {link.type === 'resonance' && (
                          <line 
                            x1={x1} y1={y1} x2={x2} y2={y2} 
                            stroke={color} 
                            strokeWidth="1" 
                            strokeDasharray="4 4"
                            className="animate-pulse"
                          />
                        )}
                      </g>
                    );
                  }
                }

                return renderedLinks;
              })()}
            </svg>
          </div>

          <div 
            className="grid gap-2 w-full h-full max-w-[1200px] relative z-20"
            style={{ 
              gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))`,
              gridTemplateRows: `repeat(${ROWS}, minmax(0, 1fr))` 
            }}
          >
            {ibqos.infons.map((q) => (
              <InfonNode 
                key={q.id} 
                infon={q} 
                ibqos={ibqos}
                isHovered={hoveredInfon === q.id} 
                isSelected={selectedInfon === q.id}
                onHover={handleHoverChange} 
                onNudge={handleNodeClick} 
              />
            ))}
          </div>

          <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-5">
            <svg className="w-full h-full">
              {[...Array(8)].map((_, i) => (
                <line 
                  key={i} 
                  x1="-10%" y1={`${Math.random() * 100}%`} x2="110%" y2={`${Math.random() * 100}%`} 
                  stroke="#00ffcc" strokeWidth="0.5" 
                  className="animate-[marquee_15s_linear_infinite]" 
                  style={{ animationDelay: `${i * 1.5}s` }}
                />
              ))}
            </svg>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-4 relative z-20">
          <div className="flex items-center gap-6 text-white/20">
            <div className="flex flex-col">
              <span className="text-[8px] uppercase font-bold mb-1 tracking-widest">Autonomous Decoder</span>
              <span className={`text-xs font-mono ${isBooted ? 'text-cyan-400' : ''}`}>{isBooted ? 'ASIC ONLINE' : 'STANDBY'}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[8px] uppercase font-bold mb-1 tracking-widest">Active Jobs</span>
              <span className={`text-xs font-mono ${isBooted ? 'text-cyan-400' : ''}`}>{isBooted ? '03 Running' : '00 Queue'}</span>
            </div>
          </div>
          <div className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${isBooted ? 'bg-purple-500/10 border-purple-500/30 text-purple-200' : 'bg-white/5 border-white/10 text-white/20'}`}>
            <Layers className={`w-3.5 h-3.5 ${isBooted ? 'text-purple-400' : ''}`} />
            <span className="text-[9px] font-bold uppercase tracking-widest">Virtual Qernel Plane</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const KpiCard: React.FC<{ icon: React.ReactNode, label: string, value: string | number, subValue: string, color: string }> = ({ icon, label, value, subValue, color }) => {
  const colors: Record<string, string> = {
    cyan: 'border-cyan-500/20 text-cyan-400 bg-cyan-400',
    purple: 'border-purple-500/20 text-purple-400 bg-purple-400',
    blue: 'border-blue-500/20 text-blue-400 bg-blue-400',
    green: 'border-green-500/20 text-green-400 bg-green-400',
  };
  const [border, text, bg] = colors[color].split(' ');

  return (
    <div className={`p-5 rounded-2xl border ${border} bg-black/40 flex flex-col gap-4 shadow-inner group relative overflow-hidden`}>
      <div className="flex items-center justify-between relative z-10">
         <div className={`p-2 rounded-xl border border-white/10 transition-transform group-hover:scale-110`}>
           {React.cloneElement(icon as React.ReactElement<any>, { className: "w-5 h-5" })}
         </div>
         <div className="text-right">
           <div className="text-[9px] font-black uppercase text-white/20 tracking-widest">{label}</div>
           <div className={`text-xl font-mono font-black ${text} tracking-tighter`}>{value}</div>
         </div>
      </div>
      <div className="flex items-center justify-between border-t border-white/5 pt-3 relative z-10">
         <span className="text-[8px] font-bold text-white/30 uppercase tracking-tighter">{subValue}</span>
         <div className="flex gap-1">
            {[...Array(3)].map((_, i) => (
              <div key={i} className={`w-1 h-1 rounded-full ${bg} opacity-20`} />
            ))}
         </div>
      </div>
    </div>
  );
};

const ArchitectureCard: React.FC<{ label: string, value: string, subValue: string, count: string | number, icon: React.ReactNode, color: string, labelSuffix?: string }> = ({ label, value, subValue, count, icon, color, labelSuffix }) => {
  const colorClass = color === 'cyan' ? 'border-cyan-500/20 hover:border-cyan-400/50' : 'border-purple-500/20 hover:border-purple-400/50';
  const iconBg = color === 'cyan' ? 'bg-cyan-500/10 border-cyan-500/30' : 'bg-purple-500/10 border-purple-500/30';
  const textClass = color === 'cyan' ? 'text-cyan-400' : 'text-purple-400';

  return (
    <div className={`bg-black/60 border ${colorClass} p-5 rounded-2xl flex items-center justify-between transition-colors group`}>
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-xl border ${iconBg}`}>
          {icon}
        </div>
        <div>
          <div className={`text-[10px] font-black uppercase tracking-widest mb-1 opacity-40`}>{label}</div>
          <div className="text-lg font-mono font-bold text-white tracking-tighter">{value} <span className="text-xs opacity-40 ml-2 font-normal">{subValue}</span></div>
        </div>
      </div>
      <div className="text-right">
         <div className="text-[10px] font-bold text-white/40 uppercase">{labelSuffix || 'Logical Units'}</div>
         <div className={`text-2xl font-mono font-black ${textClass}`}>{count}</div>
      </div>
    </div>
  );
};

const PatternBtn: React.FC<{ onClick: () => void, label: string, icon: React.ReactNode }> = ({ onClick, label, icon }) => (
  <button onClick={onClick} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-cyan-500/40 text-[9px] font-bold uppercase tracking-tighter text-white/60 hover:text-cyan-400 transition-all active:scale-95">
    {icon} {label}
  </button>
);

const MetricTile: React.FC<{ icon: React.ReactNode, label: string, value: string, status: string }> = ({ icon, label, value, status }) => (
  <div className="glass-panel p-4 rounded-xl border border-white/5 bg-black/40 flex flex-col gap-1">
    <div className="flex items-center gap-2 mb-1">
      {icon}
      <span className="text-[9px] uppercase font-bold text-white/40 tracking-widest">{label}</span>
    </div>
    <div className="text-lg font-bold font-mono text-white tracking-tighter">{value}</div>
    <div className="flex items-center gap-1.5 mt-1">
      <div className={`w-1.5 h-1.5 rounded-full ${status === 'Stable' || status === 'Optimal' || status === 'Active' ? 'bg-green-500 shadow-[0_0_5px_green]' : 'bg-white/20'}`} />
      <span className={`text-[8px] font-bold uppercase ${status === 'Stable' || status === 'Optimal' || status === 'Active' ? 'text-green-500/60' : 'text-white/20'}`}>{status}</span>
    </div>
  </div>
);

const InputMetricTile: React.FC<{ icon: React.ReactNode, label: string, value: number, onChange: (val: number) => void, status: string }> = ({ icon, label, value, onChange, status }) => (
  <div className="glass-panel p-4 rounded-xl border border-white/5 bg-black/40 flex flex-col gap-1">
    <div className="flex items-center gap-2 mb-1">
      {icon}
      <span className="text-[9px] uppercase font-bold text-white/40 tracking-widest">{label}</span>
    </div>
    <input 
      type="number" 
      step="0.01"
      value={value} 
      onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
      className="bg-transparent border-b border-white/20 text-lg font-bold font-mono text-white tracking-tighter focus:outline-none focus:border-cyan-400 w-full"
    />
    <div className="flex items-center gap-1.5 mt-1">
      <div className={`w-1.5 h-1.5 rounded-full ${status === 'Stable' || status === 'Optimal' || status === 'Active' ? 'bg-green-500 shadow-[0_0_5px_green]' : 'bg-white/20'}`} />
      <span className={`text-[8px] font-bold uppercase ${status === 'Stable' || status === 'Optimal' || status === 'Active' ? 'text-green-500/60' : 'text-white/20'}`}>{status}</span>
    </div>
  </div>
);

export default IBQOSSimulator;
