import React, { useState, useMemo } from 'react';
import { 
  ShoppingBag, 
  Zap, 
  Download, 
  Layers, 
  ShieldCheck, 
  Search,
  CheckCircle2,
  Lock,
  Star,
  Cpu,
  RefreshCcw,
  Sparkles,
  Play,
  LayoutGrid,
  Gamepad2,
  Coins,
  Beaker,
  Server,
  Puzzle
} from 'lucide-react';
import { AppDefinition } from '../types';

const CATEGORIES = ['All', 'Installed', 'Games', 'Finance', 'Science', 'Security', 'Utilities'];

const categoryIcons: { [key: string]: any } = {
    'All': LayoutGrid,
    'Installed': CheckCircle2,
    'Games': Gamepad2,
    'Finance': Coins,
    'Science': Beaker, 
    'Security': ShieldCheck,
    'Utilities': Server,
};

const INITIAL_APPS: AppDefinition[] = [
  { id: 'app1', name: "Shor's Factorization", version: "4.2.0", category: "Security", infonRequirement: 2048, description: "Highly optimized implementation for prime factorization via period finding.", status: 'installed', premium: false, icon: Lock },
  { id: 'app2', name: "Grover Search v3", version: "3.1.2", category: "Utilities", infonRequirement: 128, description: "Quadratic speedup for unstructured database searching in Hilbert space.", status: 'available', premium: false, icon: Search },
  { id: 'app3', name: "VQE Catalyst", version: "1.0.4", category: "Science", infonRequirement: 1024, description: "Variational Quantum Eigensolver for molecular energy level optimization.", status: 'available', premium: true, icon: Beaker },
  { id: 'app4', name: "QAOA Optimizer", version: "2.5.0", category: "Science", infonRequirement: 256, description: "Quantum Approximate Optimization Algorithm for combinatorial problems.", status: 'available', premium: true, icon: Zap },
  { id: 'app5', name: "Hilbert Mirror 3D", version: "1.2.0", category: "Utilities", infonRequirement: 64, description: "Visual mapping of 3D state probabilities via universal ledger injection.", status: 'installed', premium: false, icon: Layers },
  { id: 'app6', name: "Q-Snake Arcade", version: "0.9.1", category: "Games", infonRequirement: 32, description: "Classic snake mechanics in a non-deterministic quantum lattice.", status: 'available', premium: false, icon: Gamepad2 },
];

const CHIPSAppStore: React.FC = () => {
    const [apps, setApps] = useState<AppDefinition[]>(INITIAL_APPS);
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
    const [installingId, setInstallingId] = useState<string | null>(null);

    const filteredApps = useMemo(() => {
        return apps.filter(app => {
            const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                  app.description.toLowerCase().includes(searchTerm.toLowerCase());
            
            if (!matchesSearch) return false;
            if (activeCategory === 'All') return true;
            if (activeCategory === 'Installed') return app.status === 'installed';
            return app.category === activeCategory;
        });
    }, [apps, activeCategory, searchTerm]);

    const featuredApp = useMemo(() => {
        return apps.find(a => a.status === 'installed') || apps[0];
    }, [apps]);

    const handleInstall = (id: string) => {
        setInstallingId(id);
        setTimeout(() => {
            setInstallingId(null);
            setApps(prev => prev.map(a => a.id === id ? { ...a, status: 'installed' } : a));
        }, 2500);
    };

    return (
        <div className="h-full flex flex-col animate-in fade-in duration-500 overflow-hidden">
            {/* Search & Nav Bar */}
            <div className="bg-black/40 border-b border-cyan-500/10 px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="relative w-full md:w-96 group">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-500/40 group-focus-within:text-cyan-400 transition-colors" />
                    <input 
                        type="text" 
                        placeholder="Search quantum apps..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-cyan-950/20 border border-cyan-500/20 rounded-xl py-3 pl-11 pr-4 text-sm text-cyan-100 focus:outline-none focus:border-cyan-400/50 transition-all font-mono placeholder-cyan-900"
                    />
                </div>
                
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full md:w-auto pb-1 md:pb-0">
                    {CATEGORIES.map(cat => {
                        const Icon = categoryIcons[cat] || Puzzle;
                        return (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-4 py-2 rounded-xl text-[10px] font-bold whitespace-nowrap transition-all border flex items-center gap-2 uppercase tracking-widest ${
                                    activeCategory === cat 
                                        ? 'bg-cyan-500/20 border-cyan-400 text-cyan-400 shadow-[0_0_10px_rgba(0,255,204,0.1)]' 
                                        : 'bg-transparent border-transparent text-white/30 hover:text-cyan-400 hover:bg-white/5'
                                }`}
                            >
                                <Icon className="w-3.5 h-3.5" />
                                {cat}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Scrollable Content Area */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
                <div className="max-w-7xl mx-auto space-y-10">
                    
                    {/* Featured Hero */}
                    {featuredApp && !searchTerm && activeCategory === 'All' && (
                        <div className="relative rounded-3xl overflow-hidden border border-cyan-500/20 group cursor-pointer shadow-2xl transition-all duration-500 hover:border-cyan-400/40">
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-950/80 to-purple-950/40 z-0"></div>
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,255,204,0.1),transparent)] z-0"></div>
                            <div className="relative z-10 p-8 flex flex-col md:flex-row items-center gap-8">
                                <div className="w-32 h-32 bg-black/60 rounded-3xl border border-cyan-500/30 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform duration-500">
                                    <featuredApp.icon className="w-16 h-16 text-cyan-400 drop-shadow-[0_0_10px_rgba(0,255,204,0.5)]" />
                                </div>
                                <div className="flex-1 text-center md:text-left">
                                    <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                                        <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 text-[10px] font-black uppercase tracking-[0.2em] border border-cyan-500/20">
                                            Featured Algorithm
                                        </span>
                                        {featuredApp.premium && <span className="px-2.5 py-0.5 rounded-full bg-yellow-500/10 text-yellow-500 text-[10px] font-black uppercase tracking-[0.2em] border border-yellow-500/20">Premium</span>}
                                    </div>
                                    <h2 className="text-3xl font-bold text-white mb-2 tracking-tight uppercase">{featuredApp.name}</h2>
                                    <p className="text-cyan-100/60 text-sm mb-6 max-w-2xl font-mono leading-relaxed">{featuredApp.description}</p>
                                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                                        <button 
                                            className={`px-8 py-3 rounded-2xl font-bold text-[10px] uppercase tracking-[0.2em] transition-all duration-300 flex items-center gap-3 active:scale-95 shadow-lg ${
                                                featuredApp.status === 'installed' 
                                                    ? 'bg-green-600 hover:bg-green-500 text-white' 
                                                    : 'bg-cyan-500 hover:bg-cyan-400 text-black'
                                            }`}
                                        >
                                            {featuredApp.status === 'installed' ? <><Play className="w-4 h-4" /> Open App</> : <><Download className="w-4 h-4" /> Install Now</>}
                                        </button>
                                        <div className="flex items-center gap-4 text-white/40 text-[10px] font-mono">
                                            <span className="flex items-center gap-1.5"><Cpu className="w-3.5 h-3.5" /> {featuredApp.infonRequirement}I Req.</span>
                                            <span className="flex items-center gap-1.5 text-yellow-500/60"><Star className="w-3.5 h-3.5 fill-current" /> 4.9 Rating</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* App Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 pb-20">
                        {filteredApps.map(app => (
                            <div key={app.id} className="bg-black/40 border border-white/5 hover:border-cyan-500/30 rounded-3xl p-6 transition-all duration-300 group flex flex-col relative overflow-hidden shadow-inner hover:shadow-[0_20px_50px_-20px_rgba(0,255,204,0.15)]">
                                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                     {app.status === 'installed' && <CheckCircle2 className="w-5 h-5 text-green-500" />}
                                </div>
                                <div className="flex items-start gap-5 mb-6">
                                    <div className="w-16 h-16 bg-cyan-950/20 rounded-2xl flex items-center justify-center border border-white/5 group-hover:border-cyan-500/30 transition-colors">
                                        <app.icon className="w-8 h-8 text-cyan-500/60 group-hover:text-cyan-400 transition-colors" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="text-[10px] font-black text-cyan-500/40 uppercase tracking-[0.2em] mb-1">{app.category}</div>
                                        <h3 className="font-bold text-white text-lg tracking-tight truncate group-hover:text-cyan-50 transition-colors uppercase">{app.name}</h3>
                                        <div className="flex items-center gap-1.5 text-[10px] font-mono text-white/20 mt-0.5">
                                            <span>v{app.version}</span>
                                            <span>•</span>
                                            <span className="text-cyan-500/30">{app.infonRequirement} Infons</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <p className="text-xs text-white/40 font-mono line-clamp-3 mb-8 flex-1 leading-relaxed">
                                    {app.description}
                                </p>
                                
                                <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                                    <div className="flex items-center gap-1 text-[10px] text-yellow-500/40 font-mono">
                                        <Star className="w-3 h-3 fill-current" />
                                        <span>4.9</span>
                                    </div>

                                    <button
                                        onClick={() => app.status === 'available' && handleInstall(app.id)}
                                        disabled={installingId === app.id}
                                        className={`px-6 py-2.5 rounded-xl text-[10px] font-black transition-all duration-200 flex items-center gap-2 uppercase tracking-widest active:scale-95 ${
                                            app.status === 'installed' 
                                                ? 'bg-green-500/10 text-green-400 border border-green-500/20 hover:bg-green-500/20' 
                                                : installingId === app.id
                                                    ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 animate-pulse'
                                                    : 'bg-cyan-600 text-white shadow-lg hover:bg-cyan-500'
                                        }`}
                                    >
                                        {app.status === 'installed' ? <><Play className="w-3 h-3" /> Launch</> : 
                                         // Fix: Changed RefreshCw to RefreshCcw
                                         installingId === app.id ? <><RefreshCcw className="w-3 h-3 animate-spin" /> Syncing</> : 
                                         <><Download className="w-3 h-3" /> Get</>}
                                    </button>
                                </div>
                            </div>
                        ))}
                        
                        {filteredApps.length === 0 && (
                            <div className="col-span-full py-32 flex flex-col items-center justify-center text-white/10 text-center gap-4">
                                <ShoppingBag className="w-20 h-20 opacity-10" />
                                <div>
                                    <h4 className="text-xl font-bold uppercase tracking-[0.2em]">State Not Found</h4>
                                    <p className="text-xs font-mono mt-2">Try adjusting your filters to find new Gateware.</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CHIPSAppStore;