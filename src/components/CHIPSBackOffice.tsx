import React, { useState, useMemo, useEffect } from 'react';
import { 
  Server, 
  Network, 
  Globe, 
  Box, 
  Cpu, 
  Activity, 
  ShieldCheck, 
  Link,
  HardDrive, 
  Cloud, 
  ArrowRight,
  BarChart3, 
  Users, 
  Search, 
  Rocket,
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Lock,
  ExternalLink, 
  Terminal as TerminalIcon, 
  CircleStop, 
  Play,
  RefreshCw, 
  Zap, 
  Scale, 
  Trash, 
  Code,
  Sparkles, 
  Layers, 
  GitBranch, 
  Database,
  MonitorPlay,
  Power,
  ChevronRight,
  // Added Plus and Trash2 icons
  Plus,
  Trash2,
  FileSearch
} from 'lucide-react';
import { URIAssignment, AppDefinition } from '../types';

interface CHIPSBackOfficeProps {
  uriAssignments?: URIAssignment[];
  marketApps?: AppDefinition[];
  onLaunchApp?: (appId: string) => void;
}

const NodeOperationsView = () => {
    const nodes = [
        { id: 'DQN-Alpha', region: 'US-East', status: 'Entangled', latency: '12ms', infons: 128, load: 45 },
        { id: 'DQN-Beta', region: 'EU-West', status: 'Entangled', latency: '24ms', infons: 64, load: 78 },
        { id: 'DQN-Gamma', region: 'Asia-Pac', status: 'Syncing', latency: '140ms', infons: 256, load: 12 },
        { id: 'DQN-Local', region: 'Localhost', status: 'Active', latency: '0ms', infons: 32, load: 5 },
    ];

    return (
        <div className="h-full flex flex-col space-y-4 animate-in fade-in duration-500 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-black/40 p-4 rounded-xl border border-cyan-500/20 flex items-center justify-between">
                    <div>
                        <p className="text-[10px] text-cyan-500 uppercase tracking-widest font-bold">Active Nodes</p>
                        <p className="text-2xl font-mono text-white">4</p>
                    </div>
                    <Cpu className="w-8 h-8 text-cyan-500/20" />
                </div>
                <div className="bg-black/40 p-4 rounded-xl border border-green-500/20 flex items-center justify-between">
                    <div>
                        <p className="text-[10px] text-green-500 uppercase tracking-widest font-bold">Mesh Health</p>
                        <p className="text-2xl font-mono text-green-400">99.9%</p>
                    </div>
                    <Activity className="w-8 h-8 text-green-500/20" />
                </div>
                <div className="bg-black/40 p-4 rounded-xl border border-purple-500/20 flex items-center justify-between">
                    <div>
                        <p className="text-[10px] text-purple-500 uppercase tracking-widest font-bold">Total Infons</p>
                        <p className="text-2xl font-mono text-purple-400">480</p>
                    </div>
                    <Network className="w-8 h-8 text-purple-500/20" />
                </div>
            </div>

            <div className="flex-grow bg-black/40 border border-cyan-500/10 rounded-xl overflow-hidden flex flex-col">
                <div className="p-3 bg-cyan-950/20 border-b border-cyan-500/10 flex justify-between items-center">
                    <h3 className="font-bold text-xs text-cyan-200 flex items-center uppercase tracking-widest">
                        <Server className="w-4 h-4 mr-2 text-cyan-400" /> Node Registry
                    </h3>
                    <span className="text-[10px] text-cyan-600 font-mono">PROTOCOL: EKS-V2</span>
                </div>
                <div className="flex-grow overflow-y-auto custom-scrollbar">
                    <table className="w-full text-[11px] text-left">
                        <thead className="bg-cyan-950/40 text-cyan-500 font-mono uppercase sticky top-0 z-10">
                            <tr>
                                <th className="p-4">Node ID</th>
                                <th className="p-4">Region</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Infons</th>
                                <th className="p-4 text-right">Load</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {nodes.map(node => (
                                <tr key={node.id} className="hover:bg-cyan-500/5 transition-colors group">
                                    <td className="p-4 font-bold text-white flex items-center gap-2">
                                        <div className={`w-2 h-2 rounded-full ${node.status === 'Entangled' || node.status === 'Active' ? 'bg-green-500 shadow-[0_0_5px_#22c55e]' : 'bg-yellow-500 animate-pulse'}`}></div>
                                        {node.id}
                                    </td>
                                    <td className="p-4 text-white/40">{node.region}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-0.5 rounded border text-[9px] font-bold uppercase ${node.status.includes('Sync') ? 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400' : 'bg-green-500/10 border-green-500/20 text-green-400'}`}>
                                            {node.status}
                                        </span>
                                    </td>
                                    <td className="p-4 font-mono text-purple-400">{node.infons}I</td>
                                    <td className="p-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <span className="text-cyan-400 font-mono">{node.load}%</span>
                                            <div className="w-16 h-1.5 bg-white/5 rounded-full overflow-hidden">
                                                <div className={`h-full ${node.load > 80 ? 'bg-red-500' : 'bg-cyan-500'}`} style={{width: `${node.load}%`}}></div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const GatewayHostingView = ({ apps = [] }: { apps?: AppDefinition[] }) => {
    const pods = useMemo(() => {
        const basePods = [
            { id: 'pod-q-core', app: 'System Kernel', type: 'Q-State Cache', uptime: '100%', bandwidth: '4.5 GB/s', status: 'Active' },
            { id: 'pod-bridge-1', app: 'Gateway Root', type: 'Hybrid-Bridge', uptime: '99.99%', bandwidth: '1.2 GB/s', status: 'Active' },
        ];
        
        const appPods = apps.filter(a => a.status === 'installed').map((app, i) => ({
            id: `pod-app-${i + 1}`,
            app: app.name,
            type: 'Application Instance',
            uptime: '99.95%',
            bandwidth: `${(Math.random() * 0.5 + 0.5).toFixed(2)} GB/s`,
            status: 'Provisioned'
        }));

        return [...basePods, ...appPods];
    }, [apps]);

    return (
        <div className="h-full flex flex-col space-y-4 animate-in fade-in duration-500 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-900/20 to-cyan-900/20 p-5 rounded-2xl border border-white/5 flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-bold text-white flex items-center gap-2 tracking-tight">
                        <Cloud className="w-6 h-6 text-purple-400" /> Hybrid Infrastructure Provisioning
                    </h3>
                    <p className="text-xs text-white/40 mt-1 font-mono">Auto-allocated bridge pods translating Q-Lang packets to HTTPS responses.</p>
                </div>
                <div className="text-right">
                    <p className="text-[10px] text-purple-400 uppercase tracking-widest font-bold">Active Hybrid Pods</p>
                    <p className="text-2xl font-mono text-white">{pods.length}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-grow min-h-0">
                <div className="bg-black/40 rounded-xl border border-cyan-500/10 p-4 flex flex-col overflow-hidden">
                    <h4 className="text-xs font-bold text-cyan-400 mb-4 flex items-center border-b border-white/5 pb-3 uppercase tracking-widest">
                        <HardDrive className="w-4 h-4 mr-2" /> Server Pod Clusters
                    </h4>
                    <div className="space-y-2 overflow-y-auto custom-scrollbar flex-1 pr-1">
                        {pods.map(pod => (
                            <div key={pod.id} className="bg-black/40 p-3 rounded-xl border border-white/5 flex justify-between items-center group hover:border-cyan-500/40 transition-all">
                                <div>
                                    <div className="font-bold text-white text-xs flex items-center gap-2">
                                        {pod.id} 
                                        <span className="text-[10px] text-cyan-600 font-normal">({pod.app})</span>
                                    </div>
                                    <div className="text-[9px] text-white/20 font-mono mt-0.5">{pod.type}</div>
                                </div>
                                <div className="text-right">
                                    <div className={`text-[10px] font-mono font-bold ${pod.status === 'Active' ? 'text-green-400' : 'text-cyan-400 animate-pulse'}`}>{pod.status}</div>
                                    <div className="text-[9px] text-cyan-500/40 font-mono">{pod.bandwidth}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-black/40 rounded-xl border border-cyan-500/10 p-4 flex flex-col overflow-hidden">
                    <h4 className="text-xs font-bold text-cyan-400 mb-4 flex items-center border-b border-white/5 pb-3 uppercase tracking-widest">
                        <ShieldCheck className="w-4 h-4 mr-2" /> Security Policy Enforcer
                    </h4>
                    <div className="space-y-4 text-[11px]">
                        <div className="bg-green-500/5 p-3 rounded-xl border border-green-500/20 flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-green-500" />
                                <span className="text-white/60">DDoS Protection</span>
                            </div>
                            <span className="text-green-400 font-bold uppercase text-[9px]">Active</span>
                        </div>
                        <div className="bg-green-500/5 p-3 rounded-xl border border-green-500/20 flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-green-500" />
                                <span className="text-white/60">Q-Packet Verification</span>
                            </div>
                            <span className="text-green-400 font-bold uppercase text-[9px]">Enforced</span>
                        </div>
                        
                        <div className="pt-2 border-t border-white/5">
                            <p className="text-[10px] text-cyan-500/40 mb-3 uppercase font-bold tracking-widest">Cipher Stack</p>
                            <div className="grid grid-cols-2 gap-2">
                                <div className="bg-black/40 p-2.5 rounded-lg border border-purple-500/20 text-purple-300 font-mono text-center text-[10px]">
                                    Kyber-1024
                                </div>
                                <div className="bg-black/40 p-2.5 rounded-lg border border-purple-500/20 text-purple-300 font-mono text-center text-[10px]">
                                    Dilithium-5
                                </div>
                            </div>
                        </div>
                        <div className="bg-yellow-500/5 p-3 rounded-xl border border-yellow-500/10 text-[10px] text-yellow-500/60 italic text-center mt-auto">
                            Auto-Scaling Protocol: ACTIVE (Based on Neural Load)
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const CHIPSBackOffice: React.FC<CHIPSBackOfficeProps> = ({ uriAssignments = [], marketApps = [], onLaunchApp }) => {
    const [activeTab, setActiveTab] = useState<number>(4); // Default to App Admin for this view

    const tabs = [
        { id: 1, label: 'Decentralized Nodes', icon: Server },
        { id: 2, label: 'Gateway & Hosting', icon: Cloud },
        { id: 3, label: 'Domain Registry', icon: Globe },
        { id: 4, label: 'Chips App Admin', icon: Box },
        { id: 5, label: 'Search Oversight', icon: FileSearch },
    ];

    return (
        <div className="flex flex-col h-full animate-in fade-in duration-700 bg-black/20 rounded-2xl border border-cyan-500/10 overflow-hidden">
            {/* Navigation Tabs */}
            <div className="px-6 py-4 border-b border-cyan-500/10 bg-black/40">
              <div className="flex space-x-1 overflow-x-auto no-scrollbar">
                  {tabs.map(tab => (
                      <button 
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`px-4 py-2.5 text-[10px] font-bold rounded-xl transition-all flex items-center gap-2 whitespace-nowrap uppercase tracking-wider border ${
                              activeTab === tab.id 
                                  ? 'bg-cyan-500/20 border-cyan-400 text-cyan-400 shadow-[0_0_15px_rgba(0,255,204,0.2)]' 
                                  : 'border-transparent text-white/40 hover:text-white/80 hover:bg-white/5'
                          }`}
                      >
                          <tab.icon className="w-3.5 h-3.5" />
                          {tab.label}
                      </button>
                  ))}
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 min-h-0 overflow-hidden p-6">
                {activeTab === 1 && <NodeOperationsView />}
                {activeTab === 2 && <GatewayHostingView apps={marketApps} />}
                {activeTab === 3 && (
                    <div className="h-full flex flex-col items-center justify-center opacity-20 text-center">
                        <Globe className="w-16 h-16 mb-4" />
                        <h3 className="text-xl font-bold uppercase tracking-[0.2em]">Domain Registry</h3>
                        <p className="text-xs font-mono mt-2 italic">Mapping universal Q-URIs to classical endpoints.</p>
                    </div>
                )}
                {activeTab === 4 && (
                   <div className="h-full flex flex-col gap-6 animate-in fade-in duration-500 overflow-hidden">
                      <div className="flex items-center justify-between">
                         <div>
                            <h3 className="text-lg font-black text-white uppercase tracking-widest italic">Managed Chips Applications</h3>
                            <p className="text-[10px] text-cyan-500/60 font-mono mt-1">Registry of all administrator-deployed logical units.</p>
                         </div>
                         <button className="flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-cyan-900/40">
                            <Plus className="w-4 h-4" /> Deploy New Unit
                         </button>
                      </div>

                      <div className="flex-1 overflow-y-auto custom-scrollbar space-y-4 pr-2">
                         {marketApps.map(app => (
                            <div key={app.id} className="bg-black/60 border border-white/5 rounded-2xl p-5 flex flex-col md:flex-row items-center justify-between gap-6 hover:border-cyan-500/30 transition-all group relative overflow-hidden">
                               <div className="absolute top-0 right-0 p-3 opacity-5 group-hover:opacity-10 transition-opacity">
                                  <app.icon className="w-16 h-16" />
                               </div>
                               
                               <div className="flex items-center gap-5 flex-1">
                                  <div className="w-14 h-14 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                                     <app.icon className="w-8 h-8" />
                                  </div>
                                  <div>
                                     <div className="flex items-center gap-2 mb-1">
                                        <h4 className="font-black text-white uppercase tracking-tight">{app.name}</h4>
                                        <span className="text-[8px] font-mono text-cyan-500/40 uppercase">v{app.version}</span>
                                     </div>
                                     <p className="text-[10px] text-white/40 font-mono max-w-md line-clamp-1">{app.description}</p>
                                     <div className="flex items-center gap-4 mt-2">
                                        <div className="flex items-center gap-1.5"><Cpu className="w-3 h-3 text-purple-400" /><span className="text-[9px] font-bold text-white/60 uppercase">{app.infonRequirement}I Allocation</span></div>
                                        <div className="flex items-center gap-1.5"><ShieldCheck className="w-3 h-3 text-green-400" /><span className="text-[9px] font-bold text-white/60 uppercase">EKS-PQC Verified</span></div>
                                     </div>
                                  </div>
                               </div>

                               <div className="flex items-center gap-3">
                                  <button 
                                    onClick={() => onLaunchApp?.(app.id)}
                                    className="px-6 py-2.5 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-cyan-500 hover:text-black transition-all shadow-lg active:scale-95 flex items-center gap-2"
                                  >
                                     <Play className="w-3.5 h-3.5" /> Launch Unit
                                  </button>
                                  <button className="p-2.5 rounded-xl border border-white/10 text-white/20 hover:text-red-400 transition-all">
                                     <Trash2 className="w-4 h-4" />
                                  </button>
                               </div>
                            </div>
                         ))}
                      </div>

                      <div className="bg-cyan-950/20 p-6 rounded-3xl border border-cyan-500/20 flex items-center justify-between gap-10">
                         <div className="flex items-center gap-5">
                            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                               <Sparkles className="w-6 h-6" />
                            </div>
                            <div>
                               <span className="block text-[10px] font-black text-cyan-400 uppercase tracking-widest">Unified Registry Insights</span>
                               <p className="text-[11px] text-white/40 font-mono italic leading-relaxed">System is hosting {marketApps.length} Logical Units across 4 Entangled Nodes. Logic-to-Physical stability verified at 1:40 ratio.</p>
                            </div>
                         </div>
                         <button className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-[9px] font-black uppercase tracking-widest text-white/60 hover:text-white hover:bg-white/10 transition-all flex items-center gap-2">
                            <RefreshCw className="w-3 h-3" /> Audit Registry
                         </button>
                      </div>
                   </div>
                )}
                {activeTab === 5 && (
                  <div className="h-full flex flex-col items-center justify-center opacity-20 text-center gap-6">
                    <div className="w-24 h-24 rounded-full border-2 border-cyan-500/40 flex items-center justify-center animate-pulse">
                        <FileSearch className="w-12 h-12 text-cyan-400" />
                    </div>
                    <div className="max-w-md">
                        <h3 className="text-xl font-bold uppercase tracking-[0.2em] text-white">Search Oversight Core</h3>
                        <p className="text-xs font-mono mt-2 italic text-cyan-500/60 leading-relaxed">
                            Monitor the decision-making pipeline for Grover search queries. This sub-plane evaluates causal vs factual complexity and routes requests to GUS or Web Ingress.
                        </p>
                    </div>
                    <button 
                        onClick={() => onLaunchApp?.('grover-search')}
                        className="px-8 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-cyan-900/40 active:scale-95"
                    >
                        Access Decision Dashboard
                    </button>
                  </div>
                )}
            </div>
        </div>
    );
};

export default CHIPSBackOffice;
