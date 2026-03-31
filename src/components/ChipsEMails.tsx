import React, { useState, useMemo, useEffect } from 'react';
import { 
  Mail, Inbox, Send, Archive, Trash2, ShieldCheck, 
  Search, Filter, ChevronRight, Star, Clock, 
  MoreVertical, Paperclip, RefreshCcw, Zap, 
  Activity, Lock, Bot, Database, Sparkles, 
  ArrowUpRight, AlertCircle, FileText, Fingerprint,
  Plus, Key, SendHorizonal, X
} from 'lucide-react';

interface QEmail {
  id: string;
  sender: string;
  recipient?: string;
  subject: string;
  preview: string;
  content: string;
  timestamp: number;
  read: boolean;
  starred: boolean;
  fidelity: number;
  packetId: string;
  eksSignature: string;
  category: 'System' | 'Agentic' | 'Substrate' | 'Security' | 'User';
  qkdSecured: boolean;
}

const INITIAL_EMAILS: QEmail[] = [
  {
    id: 'q-101',
    sender: 'Kernel-Root@qcos.local',
    subject: 'Substrate Parity Warning: Zone Rigel-04',
    preview: 'Decoherence drift detected in physical lattice surgery layer. Syndrome extraction is currently running at 82% efficiency...',
    content: '## Critical Lattice Update\n\nDirect physical monitoring of **Zone Rigel-04** indicates a significant increase in thermal noise (magnetic drift). This is affecting logical infon mapping.\n\n**Telemetry Data:**\n- Noise Floor: -114dB\n- Coherence Time: < 40μs\n- Syndrome Delta: +14/cycle\n\n**Action Required:**\nInitiate automatic recalibration of pulse-shaping engines or migrate active jobs to Zone Alpha immediately.\n\n---\n*Verified via EKS-PQC-L3*',
    timestamp: Date.now() - 1000 * 60 * 15,
    read: false,
    starred: true,
    fidelity: 0.992,
    packetId: 'CHIPS-PKT-8F9A',
    eksSignature: 'SIG_0x7721A...',
    category: 'System',
    qkdSecured: true
  },
  {
    id: 'q-102',
    sender: 'AgentQ-Principal',
    subject: 'Neural Strategy: Abundance Matrix 2026',
    preview: 'I have analyzed the current market trajectory of CyChips against AGI scaling projections. Abundance is the only stable outcome...',
    content: '# Strategic Synthesis Report\n\nOperator, I have completed a recursive analysis of the **QUL (Quantum Universal Ledger)** states. \n\nOur current growth in decentralized compute nodes is outpacing classical infrastructure degradation. By enabling **Genesis Invite Bonuses**, we have locked in 40% of the required neural capacity for the next epoch.\n\n**Recommendation:**\nExpand the Chips Economy sub-plane to include micro-equity dividends for participating DQN nodes.\n\n*Abundance through sovereign intelligence.*',
    timestamp: Date.now() - 1000 * 60 * 60 * 2,
    read: true,
    starred: false,
    fidelity: 1.00,
    packetId: 'CHIPS-PKT-22BC',
    eksSignature: 'SIG_0xNN991...',
    category: 'Agentic',
    qkdSecured: true
  }
];

const ChipsEMails: React.FC = () => {
  const [emails, setEmails] = useState<QEmail[]>(INITIAL_EMAILS);
  const [sentEmails, setSentEmails] = useState<QEmail[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(INITIAL_EMAILS[0].id);
  const [activeTab, setActiveTab] = useState<'inbox' | 'sent' | 'compose' | 'starred' | 'archive' | 'trash'>('inbox');
  const [searchQuery, setSearchQuery] = useState('');
  const [qkdStatus, setQkdStatus] = useState<'active' | 'inactive' | 'error'>('active');

  // Compose State
  const [composeTo, setComposeTo] = useState('');
  const [composeSubject, setComposeSubject] = useState('');
  const [composeBody, setComposeBody] = useState('');
  const [isSending, setIsSending] = useState(false);

  const selectedEmail = useMemo(() => {
    const all = [...emails, ...sentEmails];
    return all.find(e => e.id === selectedId);
  }, [emails, sentEmails, selectedId]);

  const displayedEmails = useMemo(() => {
    let list: QEmail[] = [];
    if (activeTab === 'inbox') list = emails;
    else if (activeTab === 'sent') list = sentEmails;
    else if (activeTab === 'starred') list = emails.filter(e => e.starred);
    // filter logic for others...

    return list.filter(e => 
      e.subject.toLowerCase().includes(searchQuery.toLowerCase()) || 
      e.sender.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [emails, sentEmails, activeTab, searchQuery]);

  const handleRead = (id: string) => {
    setEmails(prev => prev.map(e => e.id === id ? { ...e, read: true } : e));
    setSelectedId(id);
    if (activeTab === 'compose') setActiveTab('inbox');
  };

  const handleStar = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setEmails(prev => prev.map(email => email.id === id ? { ...email, starred: !email.starred } : email));
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!composeTo || !composeSubject) return;

    setIsSending(true);
    // Simulate entanglement and dispatch
    await new Promise(r => setTimeout(r, 1500));

    const newMail: QEmail = {
      id: `sent-${Date.now()}`,
      sender: 'Operator@qcos.local',
      recipient: composeTo,
      subject: composeSubject,
      preview: composeBody.substring(0, 100) + '...',
      content: composeBody,
      timestamp: Date.now(),
      read: true,
      starred: false,
      fidelity: 1.0,
      packetId: `CHIPS-PKT-${Math.random().toString(36).substr(2, 4).toUpperCase()}`,
      eksSignature: `SIG_0x${Math.random().toString(16).substr(2, 8).toUpperCase()}`,
      category: 'User',
      qkdSecured: true
    };

    setSentEmails(prev => [newMail, ...prev]);
    setIsSending(false);
    setComposeTo('');
    setComposeSubject('');
    setComposeBody('');
    setActiveTab('sent');
    setSelectedId(newMail.id);
  };

  return (
    <div className="flex h-full bg-black/40 rounded-2xl border border-cyan-500/30 overflow-hidden backdrop-blur-3xl animate-in fade-in duration-700 font-sans shadow-2xl">
      
      {/* Sidebar: Navigation */}
      <div className="w-64 border-r border-cyan-500/10 flex flex-col bg-black/60 relative z-20">
        <div className="p-6">
          <button 
            onClick={() => setActiveTab('compose')}
            className={`w-full py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all active:scale-95 flex items-center justify-center gap-3 shadow-lg ${activeTab === 'compose' ? 'bg-purple-600 text-white border border-purple-400' : 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-[0_0_20px_rgba(0,255,204,0.3)]'}`}
          >
            <Plus className="w-4 h-4" /> Entangle Packet
          </button>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar px-3 space-y-1">
          <FolderItem active={activeTab === 'inbox'} onClick={() => setActiveTab('inbox')} icon={<Inbox />} label="Entangled Inbox" count={emails.filter(e => !e.read).length} />
          <FolderItem active={activeTab === 'starred'} onClick={() => setActiveTab('starred')} icon={<Star />} label="Causal Stars" />
          <FolderItem active={activeTab === 'sent'} onClick={() => setActiveTab('sent')} icon={<Send />} label="Dispatched" />
          <FolderItem active={activeTab === 'archive'} onClick={() => setActiveTab('archive')} icon={<Archive />} label="Universal Ledger" />
          <FolderItem active={activeTab === 'trash'} onClick={() => setActiveTab('trash')} icon={<Trash2 />} label="Entropy Bin" />
          
          <div className="pt-8 px-4 pb-2">
            <span className="text-[9px] font-black uppercase text-cyan-500/30 tracking-[0.2em]">Logical Zones</span>
          </div>
          <ZoneItem color="bg-red-500" label="Critical Alerts" />
          <ZoneItem color="bg-purple-500" label="Agentic Directives" />
          <ZoneItem color="bg-cyan-500" label="Kernel Logs" />
        </div>

        <div className="p-6 mt-auto border-t border-white/5 bg-cyan-950/20 flex flex-col gap-4">
           <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                 <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${qkdStatus === 'active' ? 'bg-green-500/10 border-green-500/30 text-green-400 shadow-[0_0_10px_rgba(34,197,94,0.2)]' : 'bg-red-500/10 border-red-500/30 text-red-400'}`}>
                    <Key className={`w-4 h-4 ${qkdStatus === 'active' ? 'animate-pulse' : ''}`} />
                 </div>
                 <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-white uppercase tracking-tighter">QKD Status</span>
                    <span className={`text-[8px] font-mono uppercase ${qkdStatus === 'active' ? 'text-green-400' : 'text-red-400'}`}>{qkdStatus}</span>
                 </div>
              </div>
           </div>
           <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
              <div className={`h-full transition-all duration-1000 ${qkdStatus === 'active' ? 'bg-cyan-500 shadow-[0_0_8px_cyan]' : 'bg-red-500'}`} style={{ width: '100%' }} />
           </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex min-w-0">
        
        {/* Email List (Hidden if Compose is full screen or similar, but here we'll keep it for navigation) */}
        <div className="w-96 border-r border-cyan-500/10 flex flex-col bg-black/20">
          <div className="p-4 border-b border-white/5 flex flex-col gap-4">
             <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-500/30 group-focus-within:text-cyan-400 transition-colors" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Query packet headers..."
                  className="w-full bg-cyan-950/20 border border-cyan-500/20 rounded-xl py-2.5 pl-10 pr-4 text-xs font-mono text-cyan-100 placeholder-cyan-900 focus:outline-none focus:border-cyan-400 transition-all"
                />
             </div>
             <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[9px] font-black uppercase text-cyan-500/40 tracking-widest">
                   <Filter className="w-3 h-3" /> Filter: All Trajectories
                </div>
                <button 
                  onClick={() => {}} // Could refresh list
                  className="text-cyan-500/40 hover:text-cyan-400 transition-colors"
                >
                   <RefreshCcw className="w-3.5 h-3.5" />
                </button>
             </div>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar">
             {displayedEmails.map(email => (
               <div 
                key={email.id} 
                onClick={() => handleRead(email.id)}
                className={`p-5 border-b border-white/5 cursor-pointer transition-all relative group overflow-hidden ${selectedId === email.id && activeTab !== 'compose' ? 'bg-cyan-500/10' : 'hover:bg-white/5'}`}
               >
                 {selectedId === email.id && activeTab !== 'compose' && <div className="absolute left-0 top-0 w-1 h-full bg-cyan-400 shadow-[0_0_10px_cyan]" />}
                 <div className="flex justify-between items-start mb-1.5">
                    <div className="flex items-center gap-2 min-w-0">
                       {!email.read && <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shrink-0" />}
                       <span className={`text-[11px] font-bold uppercase truncate tracking-tight transition-colors ${email.read ? 'text-white/40' : 'text-white'}`}>
                          {activeTab === 'sent' ? `To: ${email.recipient?.split('@')[0]}` : email.sender.split('@')[0]}
                       </span>
                    </div>
                    <span className="text-[9px] font-mono text-white/20 shrink-0">
                       {new Date(email.timestamp).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit' })}
                    </span>
                 </div>
                 <h4 className={`text-xs font-bold mb-1 truncate ${email.read ? 'text-cyan-100/40' : 'text-cyan-100'}`}>{email.subject}</h4>
                 <p className="text-[10px] text-white/20 line-clamp-2 font-mono italic leading-relaxed">{email.preview}</p>
                 
                 <div className="mt-3 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex items-center gap-2">
                       <span className={`text-[8px] font-black uppercase px-1.5 py-0.5 rounded border ${
                         email.category === 'Security' ? 'bg-red-500/10 border-red-500/40 text-red-400' : 
                         email.category === 'Agentic' ? 'bg-purple-500/10 border-purple-500/40 text-purple-400' :
                         'bg-cyan-500/10 border-cyan-500/40 text-cyan-400'
                       }`}>
                          {email.category}
                       </span>
                       {email.qkdSecured && (
                         <span className="text-green-500/60" title="Quantum Secured"><ShieldCheck className="w-3 h-3" /></span>
                       )}
                    </div>
                    <button onClick={(e) => handleStar(e, email.id)} className={`transition-colors ${email.starred ? 'text-yellow-400' : 'text-white/10 hover:text-yellow-400/50'}`}>
                       <Star className={`w-3.5 h-3.5 ${email.starred ? 'fill-current' : ''}`} />
                    </button>
                 </div>
               </div>
             ))}
             {displayedEmails.length === 0 && (
               <div className="flex flex-col items-center justify-center p-12 text-center opacity-20 gap-4 mt-12">
                  <Mail className="w-8 h-8" />
                  <span className="text-[10px] uppercase font-bold tracking-widest italic">No trajectories found.</span>
               </div>
             )}
          </div>
        </div>

        {/* Email Content Detail / Compose View */}
        <div className="flex-1 flex flex-col bg-black/10 overflow-hidden relative">
           
           {activeTab === 'compose' ? (
             <div className="flex-1 flex flex-col min-h-0 animate-in fade-in slide-in-from-bottom-2 duration-500 p-12">
                <div className="max-w-4xl mx-auto w-full flex flex-col h-full">
                   <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-4">
                         <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                            <Plus className="w-6 h-6" />
                         </div>
                         <div>
                            <h2 className="text-xl font-black uppercase tracking-widest text-white italic">New Entangled Packet</h2>
                            <p className="text-[10px] text-purple-400/60 font-mono uppercase">Initializing EKS-signed payload...</p>
                         </div>
                      </div>
                      <button onClick={() => setActiveTab('inbox')} className="p-2 hover:bg-white/5 rounded-full text-white/20 hover:text-white transition-colors">
                        <X className="w-5 h-5" />
                      </button>
                   </div>

                   <form onSubmit={handleSend} className="flex-1 flex flex-col gap-6">
                      <div className="space-y-4">
                         <div className="relative">
                            <label className="text-[10px] font-black uppercase text-cyan-500/40 absolute left-4 top-3 tracking-widest">To</label>
                            <input 
                               type="text" 
                               value={composeTo}
                               onChange={(e) => setComposeTo(e.target.value)}
                               placeholder="logical-address@dqn.mesh"
                               className="w-full bg-cyan-950/20 border border-cyan-500/20 rounded-2xl py-6 pl-12 pr-6 text-sm font-mono text-cyan-50 focus:outline-none focus:border-cyan-400 transition-all placeholder-cyan-900"
                            />
                         </div>
                         <div className="relative">
                            <label className="text-[10px] font-black uppercase text-cyan-500/40 absolute left-4 top-3 tracking-widest">Subject</label>
                            <input 
                               type="text" 
                               value={composeSubject}
                               onChange={(e) => setComposeSubject(e.target.value)}
                               placeholder="Lattice synchronization objective..."
                               className="w-full bg-cyan-950/20 border border-cyan-500/20 rounded-2xl py-6 pl-24 pr-6 text-sm font-mono text-cyan-50 focus:outline-none focus:border-cyan-400 transition-all placeholder-cyan-900"
                            />
                         </div>
                      </div>

                      <div className="flex-1 relative">
                         <textarea 
                            value={composeBody}
                            onChange={(e) => setComposeBody(e.target.value)}
                            placeholder="Define the causal intent of this transmission..."
                            className="w-full h-full bg-cyan-950/20 border border-cyan-500/20 rounded-[2.5rem] p-8 text-sm font-mono text-cyan-50/80 focus:outline-none focus:border-cyan-400 transition-all placeholder-cyan-900 resize-none custom-scrollbar leading-relaxed"
                         />
                      </div>

                      <div className="flex items-center justify-between pt-4">
                         <div className="flex items-center gap-6">
                            <div className="flex items-center gap-2 text-[10px] font-bold text-white/20 uppercase tracking-widest">
                               <Paperclip className="w-4 h-4" /> Attachments (0)
                            </div>
                            <div className="flex items-center gap-2 text-[10px] font-bold text-green-500/60 uppercase tracking-widest">
                               <ShieldCheck className="w-4 h-4" /> EKS-PQC Encryption
                            </div>
                         </div>
                         <button 
                            type="submit"
                            disabled={isSending || !composeTo || !composeSubject}
                            className="px-10 py-4 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-30 text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] transition-all active:scale-95 shadow-2xl flex items-center gap-3"
                         >
                            {isSending ? <RefreshCcw className="w-4 h-4 animate-spin" /> : <SendHorizonal className="w-4 h-4" />}
                            {isSending ? 'Synthesizing...' : 'Dispatch Packet'}
                         </button>
                      </div>
                   </form>
                </div>
             </div>
           ) : selectedEmail ? (
             <div className="flex-1 flex flex-col min-h-0 animate-in fade-in slide-in-from-right-2 duration-500">
                {/* Email Header */}
                <div className="p-8 border-b border-white/5 flex items-center justify-between bg-black/40">
                   <div className="flex items-center gap-6">
                      <div className="w-16 h-16 rounded-[2rem] bg-gradient-to-br from-cyan-900/50 to-purple-900/50 border border-white/10 flex items-center justify-center relative shadow-2xl group">
                         <div className="absolute inset-0 rounded-[2rem] border border-cyan-400/20 animate-pulse group-hover:border-cyan-400/50 transition-all" />
                         {selectedEmail.category === 'Agentic' ? <Bot className="w-8 h-8 text-purple-400" /> : <FileText className="w-8 h-8 text-cyan-400" />}
                      </div>
                      <div>
                         <h2 className="text-2xl font-black uppercase italic tracking-tighter text-white mb-1 leading-none">{selectedEmail.subject}</h2>
                         <div className="flex items-center gap-3">
                            <span className="text-[11px] font-mono text-cyan-500/60 font-bold uppercase">
                               {activeTab === 'sent' ? `To: ${selectedEmail.recipient}` : selectedEmail.sender}
                            </span>
                            <div className="w-1 h-1 rounded-full bg-white/20" />
                            <span className="text-[10px] font-mono text-white/20 uppercase">{new Date(selectedEmail.timestamp).toLocaleString()}</span>
                         </div>
                      </div>
                   </div>
                   <div className="flex gap-2">
                      <EmailAction icon={<Trash2 className="w-4 h-4" />} />
                      <EmailAction icon={<Archive className="w-4 h-4" />} />
                      <EmailAction icon={<MoreVertical className="w-4 h-4" />} />
                   </div>
                </div>

                {/* Technical Meta Bar */}
                <div className="px-8 py-3 bg-cyan-950/20 border-b border-white/5 flex items-center gap-8 overflow-x-auto no-scrollbar">
                   <TechnicalStat label="Packet-ID" value={selectedEmail.packetId} icon={<Database />} />
                   <TechnicalStat label="EKS-Signature" value={selectedEmail.eksSignature} icon={<Fingerprint />} />
                   <TechnicalStat label="Fidelity" value={`${(selectedEmail.fidelity * 100).toFixed(2)}%`} icon={<Activity />} />
                   <TechnicalStat label="Status" value="Verified Trajectory" icon={<ShieldCheck />} color="text-green-400" />
                </div>

                {/* Email Body */}
                <div className="flex-1 overflow-y-auto p-12 custom-scrollbar">
                   <div className="max-w-3xl mx-auto">
                      <div className="prose prose-invert prose-cyan max-w-none">
                         <p className="text-sm font-mono text-cyan-50/80 leading-relaxed whitespace-pre-wrap">
                            {selectedEmail.content}
                         </p>
                      </div>
                      
                      <div className="mt-16 pt-8 border-t border-white/5 flex flex-col gap-6">
                         <div className="flex items-center gap-3">
                            <Paperclip className="w-4 h-4 text-white/20" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-white/20">Entangled Attachments (0)</span>
                         </div>
                         <div className="flex gap-4">
                            <button className="flex-1 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-widest text-white/60 transition-all active:scale-95">
                               <RefreshCcw className="w-4 h-4" /> Reply via Causal Bridge
                            </button>
                            <button className="flex-1 py-4 bg-cyan-600/10 hover:bg-cyan-600/20 border border-cyan-500/30 rounded-2xl flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-widest text-cyan-400 transition-all active:scale-95">
                               <ArrowUpRight className="w-4 h-4" /> Export to Study
                            </button>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
           ) : (
             <div className="h-full flex flex-col items-center justify-center text-center p-20 gap-6 opacity-20 group">
                <div className="w-24 h-24 rounded-full border-2 border-dashed border-cyan-500 flex items-center justify-center group-hover:rotate-45 transition-transform duration-[2000ms]">
                   <Mail className="w-12 h-12" />
                </div>
                <div>
                   <h3 className="text-xl font-bold uppercase tracking-[0.3em]">No Packet Observed</h3>
                   <p className="text-xs font-mono mt-2 italic">Select an entangled packet to collapse the wave function.</p>
                </div>
             </div>
           )}

           {/* Content Decoration */}
           <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
              <Sparkles className="w-64 h-64 text-cyan-500" />
           </div>
        </div>
      </div>
    </div>
  );
};

const FolderItem: React.FC<{ active: boolean, onClick: () => void, icon: React.ReactNode, label: string, count?: number }> = ({ active, onClick, icon, label, count }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all border group ${active ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-400 shadow-[0_0_15px_rgba(0,255,204,0.1)]' : 'border-transparent text-white/40 hover:text-white/80 hover:bg-white/5'}`}
  >
    <div className="flex items-center gap-4">
      {React.cloneElement(icon as React.ReactElement<any>, { className: "w-4 h-4" })}
      <span className="text-[11px] font-bold uppercase tracking-widest">{label}</span>
    </div>
    {count !== undefined && count > 0 && (
      <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-full ${active ? 'bg-cyan-400 text-black' : 'bg-white/10 text-white/60'}`}>{count}</span>
    )}
  </button>
);

const ZoneItem: React.FC<{ color: string, label: string }> = ({ color, label }) => (
  <div className="flex items-center gap-4 px-4 py-2 hover:bg-white/5 rounded-xl cursor-pointer group">
    <div className={`w-1.5 h-1.5 rounded-full ${color} opacity-40 group-hover:opacity-100 transition-opacity`} />
    <span className="text-[10px] font-bold text-white/30 group-hover:text-white/60 transition-colors uppercase tracking-tight">{label}</span>
  </div>
);

const EmailAction: React.FC<{ icon: React.ReactNode }> = ({ icon }) => (
  <button className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-white/40 hover:text-cyan-400 hover:border-cyan-500/40 hover:bg-cyan-500/10 transition-all active:scale-90">
    {icon}
  </button>
);

const TechnicalStat: React.FC<{ label: string, value: string, icon: React.ReactNode, color?: string }> = ({ label, value, icon, color = "text-white/60" }) => (
  <div className="flex items-center gap-3 shrink-0">
     <div className="text-cyan-500/40">{icon}</div>
     <div className="flex flex-col">
        <span className="text-[8px] font-black uppercase text-white/20 tracking-tighter leading-none">{label}</span>
        <span className={`text-[10px] font-mono font-bold ${color} truncate max-w-[120px]`}>{value}</span>
     </div>
  </div>
);

export default ChipsEMails;