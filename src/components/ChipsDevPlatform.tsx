import React from 'react';

interface ChipsDevPlatformProps {
  onDeploy?: () => void;
}

const ChipsDevPlatform: React.FC<ChipsDevPlatformProps> = () => {
  return (
    <div className="p-8 bg-black/40 border border-white/10 rounded-[2.5rem] h-full flex items-center justify-center">
      <div className="text-center">
        <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter mb-4">CHIPS <span className="text-purple-400">Dev</span> Platform</h3>
        <p className="text-white/40 font-mono text-sm uppercase tracking-widest">Protocol Development Environment</p>
      </div>
    </div>
  );
};

export default ChipsDevPlatform;
