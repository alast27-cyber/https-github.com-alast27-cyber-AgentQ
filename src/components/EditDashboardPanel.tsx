import React from 'react';
import { CustomPanel } from '../types';

interface EditDashboardPanelProps {
  panel?: CustomPanel;
  onSave?: (u: any) => void;
  onClose?: () => void;
}

const EditDashboardPanel: React.FC<EditDashboardPanelProps> = () => {
  return (
    <div className="p-8 bg-black/40 border border-white/10 rounded-[2.5rem] h-full flex items-center justify-center">
      <div className="text-center">
        <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter mb-4">Dashboard <span className="text-cyan-400">Architect</span></h3>
        <p className="text-white/40 font-mono text-sm uppercase tracking-widest">Interface Configuration Module</p>
      </div>
    </div>
  );
};

export default EditDashboardPanel;
