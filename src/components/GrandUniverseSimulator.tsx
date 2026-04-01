import React from 'react';
import { GUSMetrics, DataPacket, SimulationTask } from '../types';

interface GrandUniverseSimulatorProps {
  metrics?: GUSMetrics;
  liveDataStream?: DataPacket[];
  onActivateMirroring?: () => void;
  autoTask?: SimulationTask;
  onTaskComplete?: (s: any) => void;
}

const GrandUniverseSimulator: React.FC<GrandUniverseSimulatorProps> = () => {
  return (
    <div className="p-8 bg-black/40 border border-white/10 rounded-[2.5rem] h-full flex items-center justify-center">
      <div className="text-center">
        <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter mb-4">Grand <span className="text-cyan-400">Universe</span> Simulator</h3>
        <p className="text-white/40 font-mono text-sm uppercase tracking-widest">Multi-dimensional Substrate Simulation</p>
      </div>
    </div>
  );
};

export default GrandUniverseSimulator;
