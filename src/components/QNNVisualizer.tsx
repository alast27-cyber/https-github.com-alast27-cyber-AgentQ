import React from 'react';
import { NNType, LearningMode } from '../types';

interface QNNVisualizerProps {
  activeNN?: NNType;
  learningMode?: LearningMode;
}

const QNNVisualizer: React.FC<QNNVisualizerProps> = () => {
  return (
    <div className="p-8 bg-black/40 border border-white/10 rounded-[2.5rem] h-full flex items-center justify-center">
      <div className="text-center">
        <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter mb-4">QNN <span className="text-purple-400">Visualizer</span></h3>
        <p className="text-white/40 font-mono text-sm uppercase tracking-widest">Neural Network Substrate Topology</p>
      </div>
    </div>
  );
};

export default QNNVisualizer;
