import React from 'react';
import { AGITrainingProgress, AGIRoadmapStage } from '../types';

interface AGIRoadmapSimulatorProps {
  progress?: AGITrainingProgress;
  onToggleSource?: (id: string) => void;
  onStageComplete?: (s: AGIRoadmapStage) => void;
}

const AGIRoadmapSimulator: React.FC<AGIRoadmapSimulatorProps> = () => {
  return (
    <div className="p-8 bg-black/40 border border-white/10 rounded-[2.5rem] h-full flex items-center justify-center">
      <div className="text-center">
        <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter mb-4">AGI <span className="text-red-400">Roadmap</span> Simulator</h3>
        <p className="text-white/40 font-mono text-sm uppercase tracking-widest">Predictive Cognitive Evolution Pathing</p>
      </div>
    </div>
  );
};

export default AGIRoadmapSimulator;
