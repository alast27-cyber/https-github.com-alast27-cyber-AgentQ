import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Play, 
  Save, 
  Settings, 
  Share2, 
  Sidebar as SidebarIcon, 
  ChevronRight, 
  ChevronDown, 
  Plus, 
  Trash2, 
  FileCode, 
  Box, 
  Sparkles, 
  Zap, 
  Code,
  Terminal as TerminalIcon,
  Cpu,
  Monitor,
  Eye,
  Command,
  MoreVertical,
  History,
  CloudUpload,
  Search,
  MessageSquare,
  PanelLeft,
  PanelRight,
  RefreshCcw,
  Sliders,
  X,
  Files,
  FilePlus,
  FolderPlus,
  Folder,
  Layers,
  Activity,
  Ghost,
  ShieldCheck,
  Copy,
  ChevronUp,
  CircleSlash
} from 'lucide-react';
import { AgenQService } from '../services/geminiService';
import AgentQIcon from './AgentQIcon';
import { AICoreModel, QFile } from '../types';

interface QCOSStudioProps {
  activeCore: AICoreModel;
}

interface LogEntry {
  id: string;
  type: 'info' | 'error' | 'success' | 'agentq';
  message: string;
  timestamp: number;
}

const INITIAL_FILES: QFile[] = [
  { id: '1', name: 'Bell_State_Sync.q', content: '// Bell State Preparation\n// Initialize logical circuit for EPR pair\nEXECUTE OP::H Q[0]\nEXECUTE OP::CNOT Q[0] Q[1]\nMEASURE Q[0] Q[1]\n\n// Monitor for local decoherence\nSYNDROME Q[0] Q[1]', type: 'q-lang', lastModified: Date.now() },
  { id: 'grover', name: 'Grover_Search_Oracle.q', content: '// Grover\'s Unstructured Search Algorithm\n// Complexity: O(√N)\n\n// 1. Initialize Superposition\nEXECUTE OP::H Q[0] Q[1] Q[2] Q[3] Q[4]\n\n// 2. Oracle Sequence (Target Index: 22)\nDEFINE ORACLE::V3 {\n  EXECUTE OP::X Q[0] Q[3]\n  EXECUTE OP::CCNOT Q[0] Q[1] Q[2] Q[3] Q[4]\n  EXECUTE OP::X Q[0] Q[3]\n}\n\n// 3. Amplitude Amplification (√N times)\nEXECUTE ORACLE::V3\nEXECUTE OP::DIFFUSION Q[0..4]\n\n// 4. Measure Resulting State\nMEASURE Q[0..4] -> REGISTER::RESULT', type: 'q-lang', lastModified: Date.now() },
  { id: '2', name: 'GHZ_Logic.q', content: '// GHZ State Logic (3-infon entanglement)\nEXECUTE OP::H Q[0]\nEXECUTE OP::CNOT Q[0] Q[1]\nEXECUTE OP::CNOT Q[1] Q[2]\nSYNC LATTICE::PRIME', type: 'q-lang', lastModified: Date.now() },
  { id: '3', name: 'Qernel_Config.json', content: '{\n  "coherence_target": 0.999,\n  "buffer_ns": 120\n}', type: 'json', lastModified: Date.now() }
];

const QCOSStudio: React.FC<QCOSStudioProps> = ({ activeCore }) => {
  // Sidebar State
  const [activeActivity, setActiveActivity] = useState<'files' | 'search' | 'history'>('files');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  // File System State
  const [files, setFiles] = useState<QFile[]>(INITIAL_FILES);
  const [activeFileId, setActiveFileId] = useState<string>(INITIAL_FILES[0].id);
  const [collaborators, setCollaborators] = useState<{name: string, color: string}[]>([]);
  const [userColor, setUserColor] = useState('#00ffcc');
  
  // WebSocket State
  const socketRef = useRef<WebSocket | null>(null);
  const isRemoteUpdate = useRef(false);
  const fileVersions = useRef<Record<string, number>>({});

  // Initialize WebSocket once
  useEffect(() => {
    let socket: WebSocket | null = null;
    let reconnectTimeout: number;

    const connect = () => {
      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      socket = new WebSocket(`${protocol}//${window.location.host}`);
      socketRef.current = socket;

      socket.onopen = () => {
        addLog('COLLABORATION: Linked to Qernel Sync Mesh.', 'success');
        // Join the current active file
        if (socket?.readyState === WebSocket.OPEN) {
          socket.send(JSON.stringify({ 
            type: 'join', 
            fileId: activeFileId, 
            name: `User_${Math.floor(Math.random() * 1000)}` 
          }));
        }
      };

      socket.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          switch (message.type) {
            case 'sync':
              if (message.content) {
                isRemoteUpdate.current = true;
                updateFileContent(activeFileId, message.content);
                fileVersions.current[activeFileId] = message.version;
              }
              if (message.color) setUserColor(message.color);
              break;
            case 'update':
              if (message.fileId === activeFileId) {
                isRemoteUpdate.current = true;
                updateFileContent(message.fileId, message.content);
                fileVersions.current[message.fileId] = message.version;
                addLog(`REMOTE: ${message.sender} updated ${activeFile.name}`, 'info');
              }
              break;
            case 'presence':
              setCollaborators(message.users);
              break;
          }
        } catch (err) {
          console.error('WS Message Error:', err);
        }
      };

      socket.onerror = (error) => {
        console.error('WS Error:', error);
      };

      socket.onclose = () => {
        console.log('WS Connection closed. Retrying...');
        reconnectTimeout = window.setTimeout(connect, 3000);
      };
    };

    connect();

    return () => {
      if (socket) {
        socket.onclose = null; // Prevent reconnect on unmount
        socket.onopen = null;
        socket.onmessage = null;
        socket.onerror = null;
        if (socket.readyState === WebSocket.CONNECTING || socket.readyState === WebSocket.OPEN) {
          try {
            socket.close();
          } catch (e) {
            // Ignore close errors
          }
        }
      }
      clearTimeout(reconnectTimeout);
    };
  }, []); // Only once on mount

  // Handle file switching without reconnecting
  useEffect(() => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify({ 
        type: 'join', 
        fileId: activeFileId, 
        name: `User_${Math.floor(Math.random() * 1000)}` 
      }));
    }
  }, [activeFileId]);

  // Terminal State
  const [isTerminalOpen, setIsTerminalOpen] = useState(true);
  const [logs, setLogs] = useState<LogEntry[]>([
    { id: 'start', type: 'info', message: 'QCOS Qernel v3.1 Runtime Environment Ready.', timestamp: Date.now() },
    { id: 'auth', type: 'success', message: 'EKS Binding: peer-discovery.chips [VERIFIED]', timestamp: Date.now() + 100 }
  ]);
  const terminalBottomRef = useRef<HTMLDivElement>(null);

  // Google AI Studio Logic State
  const [systemInstruction, setSystemInstruction] = useState('You are AgentQ, the lead software architect for QCOS. You specialize in Q-Lang, a high-level language that abstracts physical infon pulses into logical circuit gates. Your goal is to help the operator design stable, fault-tolerant quantum algorithms.');
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [temperature, setTemperature] = useState(0.7);
  const [tokenCount, setTokenCount] = useState(0);
  const [showPreview, setShowPreview] = useState(true);
  const [activeTab, setActiveTab] = useState<'prompt' | 'code'>('prompt');
  
  const agenqService = useRef(new AgenQService(activeCore));
  const editorRef = useRef<HTMLTextAreaElement>(null);
  const preRef = useRef<HTMLPreElement>(null);

  const activeFile = useMemo(() => 
    files.find(f => f.id === activeFileId) || files[0], 
  [files, activeFileId]);

  useEffect(() => {
    if (terminalBottomRef.current) {
      terminalBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  const addLog = (message: string, type: LogEntry['type'] = 'info') => {
    const newLog: LogEntry = {
      id: Math.random().toString(36).substr(2, 9),
      message,
      type,
      timestamp: Date.now()
    };
    setLogs(prev => [...prev, newLog].slice(-100)); // Keep last 100
  };

  const handleGenerate = async () => {
    if (!prompt.trim() || isGenerating) return;
    
    setIsGenerating(true);
    setActiveTab('code');
    addLog(`AgentQ routing request to ${activeCore}...`, 'agentq');

    let fullResponse = '';
    await agenqService.current.streamResponse(`Instruction: ${systemInstruction}\n\nTask: ${prompt}`, (chunk) => {
      fullResponse += chunk;
      updateFileContent(activeFileId, fullResponse);
    });

    setIsGenerating(false);
    setTokenCount(prev => prev + Math.floor(Math.random() * 500) + 100);
    addLog(`Code generation completed successfully. Output synchronized to ${activeFile.name}.`, 'success');
  };

  const handleRunCode = () => {
    if (activeFile.type !== 'q-lang') {
        addLog(`Cannot execute non-quantum source: ${activeFile.type}`, 'error');
        return;
    }
    
    addLog(`Initiating logical circuit execution: ${activeFile.name}`, 'info');
    setTimeout(() => {
        const errorChance = Math.random() > 0.8;
        if (errorChance) {
            addLog(`CRITICAL: Decoherence detected on physical zone Alpha. SyndromeExtraction failed.`, 'error');
        } else {
            addLog(`Execution completed. Logic-to-Physical Ratio optimized to 1:40.`, 'success');
            addLog(`Lattice Telemetry: Fidelity 99.982%, Latency 0.91μs.`, 'success');
        }
    }, 1500);
  };

  const updateFileContent = (id: string, content: string) => {
    setFiles(prev => prev.map(f => f.id === id ? { ...f, content, lastModified: Date.now() } : f));
    
    // Emit change if it's a local edit
    if (!isRemoteUpdate.current && socketRef.current?.readyState === WebSocket.OPEN) {
      const nextVersion = (fileVersions.current[id] || 0) + 1;
      fileVersions.current[id] = nextVersion;
      socketRef.current.send(JSON.stringify({
        type: 'edit',
        fileId: id,
        content,
        version: nextVersion
      }));
    }
    isRemoteUpdate.current = false;
  };

  const addNewFile = () => {
    const newId = Math.random().toString(36).substr(2, 9);
    const newFile: QFile = {
      id: newId,
      name: `Untitled_${files.length + 1}.q`,
      content: '// New Quantum Script',
      type: 'q-lang',
      lastModified: Date.now()
    };
    setFiles([...files, newFile]);
    setActiveFileId(newId);
    setActiveTab('prompt');
    addLog(`Created new Q-Lang buffer: ${newFile.name}`, 'info');
  };

  const deleteFile = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (files.length <= 1) return;
    const newFiles = files.filter(f => f.id !== id);
    setFiles(newFiles);
    if (activeFileId === id) setActiveFileId(newFiles[0].id);
    addLog(`File deleted from registry.`, 'info');
  };

  // Advanced Syntax Highlighting logic for Q-Lang
  const highlightQLang = (code: string) => {
    if (activeFile.type !== 'q-lang') return code;
    
    // 1. Escape HTML entities to prevent rendering issues
    let highlighted = code
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    // 2. Apply syntax rules in specific order
    highlighted = highlighted
      // Comments: Start with // and go to end of line
      .replace(/(\/\/.*)/g, '<span class="text-gray-500 italic opacity-60">$1</span>')
      
      // Control Directives & Logic: Purple
      .replace(/\b(EXECUTE|MEASURE|RESET|SYNC|LATTICE|MAP|DEFINE|SYNDROME|DECODE|PULSE|CALIBRATE)\b/g, '<span class="text-purple-400 font-bold drop-shadow-[0_0_8px_rgba(168,85,247,0.4)]">$1</span>')
      
      // Infon Registers: Blue
      // Matches Q, Q[n], Qn
      .replace(/\b(Q(\[\d+\]|\d+)?)\b/g, '<span class="text-blue-400 font-mono font-bold">$1</span>')
      
      // Operators & Namespaces: Cyan
      // Matches OP and OP::GATE_NAME
      .replace(/\b(OP(::\w+)?)\b/g, '<span class="text-cyan-400 font-bold">$1</span>')
      
      // Quantum States: Green
      // Matches |0>, |1>, |+>, |->
      .replace(/(\|[01\+\-]&gt;)/g, '<span class="text-green-400 font-bold">$1</span>')
      
      // Numeric literals and Parameters: Yellow
      .replace(/\b(\d+(\.\d+)?)\b/g, '<span class="text-yellow-500 font-mono">$1</span>');
      
    return highlighted;
  };

  const handleScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
    if (preRef.current) {
      preRef.current.scrollTop = e.currentTarget.scrollTop;
      preRef.current.scrollLeft = e.currentTarget.scrollLeft;
    }
  };

  return (
    <div className="flex h-full bg-[#0d0d0d] text-[#e3e3e3] font-sans selection:bg-cyan-500/30 overflow-hidden rounded-2xl border border-white/5 shadow-2xl relative">
      
      {/* 1. Activity Bar */}
      <div className="w-14 flex-shrink-0 bg-[#080808] border-r border-white/5 flex flex-col items-center py-4 gap-4 z-30">
        <div className="mb-4">
          <AgentQIcon className="w-8 h-8" glow={false} />
        </div>
        <ActivityButton active={activeActivity === 'files'} onClick={() => setActiveActivity('files')} icon={<Files />} />
        <ActivityButton active={activeActivity === 'search'} onClick={() => setActiveActivity('search')} icon={<Search />} />
        <ActivityButton active={activeActivity === 'history'} onClick={() => setActiveActivity('history')} icon={<History />} />
        
        <div className="mt-auto flex flex-col gap-4 mb-4">
          <ActivityButton active={false} onClick={() => {}} icon={<Settings />} />
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-600 to-blue-700 flex items-center justify-center font-bold text-[10px] text-white">A</div>
        </div>
      </div>

      {/* 2. Primary Sidebar */}
      {isSidebarOpen && (
        <div className="w-72 flex-shrink-0 border-r border-white/10 flex flex-col bg-[#111111] animate-in slide-in-from-left-4 duration-300">
          
          {activeActivity === 'files' ? (
            <div className="flex flex-col h-full">
              <div className="p-4 border-b border-white/10 flex items-center justify-between">
                <span className="text-[11px] font-bold tracking-tight uppercase text-white/40">Explorer</span>
                <div className="flex gap-2">
                  <button onClick={addNewFile} className="p-1 hover:bg-white/10 rounded transition-colors text-white/40 hover:text-cyan-400" title="New File">
                    <FilePlus className="w-3.5 h-3.5" />
                  </button>
                  <button className="p-1 hover:bg-white/10 rounded transition-colors text-white/40 hover:text-cyan-400" title="New Folder">
                    <FolderPlus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
                <div className="flex items-center gap-2 px-2 py-1.5 text-[10px] font-bold text-white/20 uppercase tracking-widest mb-1">
                  <ChevronDown className="w-3 h-3" />
                  QCOS_PROJECT
                </div>
                <div className="space-y-0.5">
                  {files.map(file => (
                    <button 
                      key={file.id}
                      onClick={() => setActiveFileId(file.id)}
                      className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-all group ${activeFileId === file.id ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'text-white/40 hover:bg-white/5 border border-transparent'}`}
                    >
                      {file.type === 'q-lang' ? <Code className="w-3.5 h-3.5" /> : file.type === 'json' ? <Box className="w-3.5 h-3.5" /> : <FileCode className="w-3.5 h-3.5" />}
                      <span className="truncate flex-1 text-left">{file.name}</span>
                      {activeFileId === file.id && (
                        <Trash2 
                          onClick={(e) => deleteFile(e, file.id)}
                          className="w-3 h-3 opacity-0 group-hover:opacity-100 text-red-500/50 hover:text-red-500 transition-all" 
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="p-4 border-t border-white/10 bg-[#0a0a0a]">
                <div className="flex items-center gap-2 mb-4">
                  <Sliders className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="text-[10px] font-bold uppercase text-white/40 tracking-widest">Configuration</span>
                </div>
                <div className="space-y-4">
                   <div className="flex justify-between items-center text-[10px] font-bold uppercase text-white/40 tracking-wider">
                    <span>Temp</span>
                    <span className="font-mono text-cyan-400">{temperature.toFixed(1)}</span>
                  </div>
                  <input 
                    type="range" min="0" max="2" step="0.1" value={temperature}
                    onChange={(e) => setTemperature(parseFloat(e.target.value))}
                    className="w-full accent-cyan-500 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer" 
                  />
                  <div className="bg-[#080808] border border-white/5 rounded-xl p-3 flex items-center justify-between group hover:border-cyan-500/30 transition-all cursor-pointer">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-white uppercase">{activeCore}</span>
                      <span className="text-[8px] text-white/20 font-mono">Lattice Optimized</span>
                    </div>
                    <ChevronDown className="w-3 h-3 text-white/40" />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-white/20 flex flex-col items-center gap-4">
              <Ghost className="w-12 h-12 opacity-10" />
              <span className="text-[10px] uppercase font-bold tracking-widest">Panel Under Calibration</span>
            </div>
          )}
        </div>
      )}

      {/* 3. Main Workspace */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#0d0d0d] relative z-10">
        
        {/* Workspace Header */}
        <div className="h-14 border-b border-white/10 px-6 flex items-center justify-between bg-[#0e0e0e]">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className={`p-1.5 rounded hover:bg-white/5 transition-colors ${isSidebarOpen ? 'text-cyan-400' : 'text-white/20'}`}
            >
              <PanelLeft className="w-4 h-4" />
            </button>
            <div className="flex bg-white/5 p-1 rounded-xl border border-white/5">
               <button 
                onClick={() => setActiveTab('prompt')}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${activeTab === 'prompt' ? 'bg-[#1a1a1a] text-white shadow-lg border border-white/5' : 'text-white/40 hover:text-white/60'}`}
               >
                 Design
               </button>
               <button 
                onClick={() => setActiveTab('code')}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${activeTab === 'code' ? 'bg-[#1a1a1a] text-white shadow-lg border border-white/5' : 'text-white/40 hover:text-white/60'}`}
               >
                 Source
               </button>
            </div>
            <div className="h-6 w-px bg-white/10 mx-2" />
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-cyan-400/60 uppercase tracking-widest">{activeFile.name}</span>
              <div className="w-1 h-1 rounded-full bg-cyan-500/20" />
              <span className="text-[9px] font-mono text-white/10 uppercase">{new Date(activeFile.lastModified).toLocaleTimeString()}</span>
            </div>
            
            {/* Collaborators Presence */}
            <div className="flex items-center -space-x-2 ml-4">
              {collaborators.map((user, idx) => (
                <div 
                  key={idx} 
                  className="w-6 h-6 rounded-full border-2 border-[#0e0e0e] flex items-center justify-center text-[8px] font-bold text-black uppercase"
                  style={{ backgroundColor: user.color }}
                  title={user.name}
                >
                  {user.name[0]}
                </div>
              ))}
              {collaborators.length > 0 && (
                <span className="ml-4 text-[9px] font-bold text-cyan-400/60 uppercase tracking-widest animate-pulse">
                  {collaborators.length} Peer{collaborators.length > 1 ? 's' : ''} Connected
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button 
                onClick={handleRunCode}
                className="flex items-center gap-2 px-4 py-2 bg-green-600/20 border border-green-500/30 rounded-xl text-[10px] uppercase font-bold text-green-400 hover:bg-green-600/30 hover:text-green-300 transition-all"
            >
              <Play className="w-3.5 h-3.5" /> Execute
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] uppercase font-bold text-white/40 hover:bg-white/10 hover:text-white transition-all">
              <Share2 className="w-3.5 h-3.5" /> Share
            </button>
            <button 
              onClick={handleGenerate}
              disabled={isGenerating || (activeTab === 'prompt' && !prompt.trim())}
              className="flex items-center gap-2 px-6 py-2 bg-cyan-600 border border-cyan-500 rounded-xl text-[10px] uppercase font-bold text-white hover:bg-cyan-500 disabled:opacity-30 transition-all shadow-[0_0_20px_-5px_rgba(0,255,204,0.3)] active:scale-95"
            >
              {isGenerating ? <RefreshCcw className="w-3.5 h-3.5 animate-spin" /> : <Zap className="w-3.5 h-3.5" />}
              Sync with AgentQ
            </button>
          </div>
        </div>

        {/* Interaction Area */}
        <div className="flex-1 flex flex-col min-h-0 relative">
          <div className="flex-1 flex flex-col p-8 overflow-y-auto custom-scrollbar">
            {activeTab === 'prompt' ? (
              <div className="max-w-4xl mx-auto w-full space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                
                <div className="bg-black/40 border border-white/5 p-6 rounded-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Sparkles className="w-12 h-12 text-cyan-400" />
                  </div>
                  <div className="text-[10px] font-bold text-cyan-400/40 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <AgentQIcon className="w-3.5 h-3.5" glow={false} /> System Architecture Constraints
                  </div>
                  <textarea 
                    value={systemInstruction}
                    onChange={(e) => setSystemInstruction(e.target.value)}
                    className="w-full h-24 bg-transparent border-none text-xs leading-relaxed focus:outline-none transition-all resize-none text-white/60 font-mono"
                  />
                </div>

                <div className="flex items-start gap-6">
                   <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 shadow-inner group transition-all hover:border-cyan-400/30">
                      <MessageSquare className="w-6 h-6 text-white/20 group-hover:text-cyan-400 transition-colors" />
                   </div>
                   <div className="flex-1 space-y-4">
                      <div className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Initial Context Prompt</div>
                      <textarea 
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        className="w-full h-96 bg-transparent text-2xl font-light leading-relaxed focus:outline-none placeholder-white/5 resize-none text-white selection:bg-cyan-500/20"
                        placeholder="What quantum logic should we stabilize today?"
                      />
                   </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col animate-in fade-in zoom-in-95 duration-500 relative">
                <div className="flex-1 bg-[#080808] border border-white/10 rounded-2xl p-8 relative overflow-hidden group shadow-inner">
                  <div className="absolute top-4 right-4 flex gap-2 z-20">
                     <button className="p-2 bg-white/5 border border-white/5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-all"><TerminalIcon className="w-4 h-4" /></button>
                     <button className="p-2 bg-white/5 border border-white/5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-all"><Copy className="w-4 h-4" /></button>
                  </div>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,255,204,0.03),transparent)]" />
                  
                  {/* Enhanced Code Editor with Syntax Highlighting */}
                  <div className="relative w-full h-full font-mono text-sm leading-relaxed overflow-hidden">
                    <pre
                      ref={preRef}
                      aria-hidden="true"
                      className="absolute inset-0 p-8 border-none bg-transparent whitespace-pre-wrap break-words pointer-events-none z-0 overflow-hidden"
                      dangerouslySetInnerHTML={{ __html: highlightQLang(activeFile.content) + '\n' }}
                    />
                    <textarea 
                      ref={editorRef}
                      value={activeFile.content}
                      onChange={(e) => updateFileContent(activeFileId, e.target.value)}
                      onScroll={handleScroll}
                      spellCheck={false}
                      className="absolute inset-0 w-full h-full bg-transparent border-none p-8 text-transparent caret-cyan-400 focus:outline-none resize-none z-10 whitespace-pre-wrap break-words overflow-y-auto custom-scrollbar"
                    />
                  </div>

                  {isGenerating && (
                    <div className="absolute bottom-6 left-6 flex items-center gap-3 bg-cyan-950/80 border border-cyan-500/40 px-5 py-2.5 rounded-2xl backdrop-blur-xl animate-pulse z-20 shadow-2xl">
                      <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                      <span className="text-[10px] font-bold uppercase text-cyan-400 tracking-widest">Agentic Stream: Routing logic via DQN-01...</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Terminal Panel */}
          {isTerminalOpen && (
            <div className="h-64 border-t border-white/10 bg-[#080808] flex flex-col animate-in slide-in-from-bottom-4 duration-300 relative z-20">
                <div className="px-4 py-2 border-b border-white/5 bg-[#0a0a0a] flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-[10px] font-bold uppercase text-white/60 tracking-widest">
                            <TerminalIcon className="w-3.5 h-3.5 text-cyan-400" /> Terminal
                        </div>
                        <div className="flex items-center gap-3 text-[9px] font-bold uppercase text-white/20">
                            <button className="hover:text-cyan-400 transition-colors">Output</button>
                            <button className="hover:text-cyan-400 transition-colors">Debug Console</button>
                            <button className="hover:text-cyan-400 transition-colors">Problems</button>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button 
                            onClick={() => setLogs([])}
                            className="p-1 hover:bg-white/5 rounded text-white/20 hover:text-white transition-colors"
                            title="Clear Logs"
                        >
                            <CircleSlash className="w-3.5 h-3.5" />
                        </button>
                        <button 
                            onClick={() => setIsTerminalOpen(false)}
                            className="p-1 hover:bg-white/5 rounded text-white/20 hover:text-white transition-colors"
                        >
                            <X className="w-3.5 h-3.5" />
                        </button>
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto p-4 font-mono text-xs custom-scrollbar bg-black/20">
                    {logs.map((log) => (
                        <div key={log.id} className="flex gap-4 mb-1 animate-in fade-in duration-200">
                            <span className="text-white/10 shrink-0 select-none">[{new Date(log.timestamp).toLocaleTimeString([], { hour12: false })}]</span>
                            <span className={`leading-relaxed break-all ${
                                log.type === 'error' ? 'text-red-400' :
                                log.type === 'success' ? 'text-green-400' :
                                log.type === 'agentq' ? 'text-purple-400 font-bold' :
                                'text-white/60'
                            }`}>
                                {log.type === 'agentq' && <span className="mr-2">AgentQ:</span>}
                                {log.message}
                            </span>
                        </div>
                    ))}
                    <div ref={terminalBottomRef} />
                    {logs.length === 0 && (
                        <div className="h-full flex items-center justify-center text-white/5 uppercase font-bold tracking-[0.3em]">
                            Buffer Empty
                        </div>
                    )}
                </div>
            </div>
          )}

          {/* Right Preview Sidebar */}
          {showPreview && (
            <div className="w-[480px] border-l border-white/10 bg-[#0a0a0a] flex flex-col animate-in slide-in-from-right-4 duration-500 shadow-2xl z-20">
               <div className="p-4 border-b border-white/10 flex items-center justify-between bg-[#0e0e0e]">
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4 text-cyan-400" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">Live Lattice Visualization</span>
                  </div>
                  <button onClick={() => setShowPreview(false)} className="text-white/10 hover:text-white transition-colors">
                    <X className="w-4 h-4" />
                  </button>
               </div>
               
               <div className="flex-1 p-8 flex flex-col gap-8 overflow-y-auto custom-scrollbar">
                  <div className="aspect-square bg-black border border-white/5 rounded-3xl relative overflow-hidden flex items-center justify-center p-6 shadow-inner">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,204,0.07),transparent)]" />
                    <div className="grid grid-cols-8 grid-rows-8 gap-1.5 w-full h-full opacity-30">
                      {[...Array(64)].map((_, i) => (
                        <div key={i} className={`rounded-sm border border-white/5 transition-all duration-1000 ${i % 11 === 0 ? 'bg-cyan-500/20 border-cyan-400/40' : 'bg-white/5'}`} />
                      ))}
                    </div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 gap-4 bg-black/40 backdrop-blur-[1px]">
                       <div className="w-16 h-16 rounded-2xl border border-cyan-500/20 flex items-center justify-center bg-cyan-500/5">
                        <Cpu className="w-8 h-8 text-cyan-400 animate-pulse" />
                       </div>
                       <div>
                        <span className="block text-[11px] font-bold uppercase text-white tracking-[0.25em] mb-1">DQN Core Ready</span>
                        <span className="block text-[9px] font-mono text-cyan-500/40 uppercase">Virtual Mapping Active</span>
                       </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-[10px] font-bold uppercase text-white/20 tracking-widest flex items-center gap-2">
                      <Layers className="w-3.5 h-3.5" /> Logic Telemetry
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      <MetricSmall label="Circuit Depth" value={activeFile.type === 'q-lang' ? "12" : "N/A"} />
                      <MetricSmall label="Allocated Infons" value="4" />
                      <MetricSmall label="Fidelity (Est)" value="99.982%" />
                      <MetricSmall label="Correction Latency" value="0.91μs" />
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-cyan-500/5 to-purple-500/5 border border-cyan-500/10 rounded-3xl p-6 space-y-4 mt-auto">
                    <div className="flex items-center gap-3 text-cyan-400">
                      <ShieldCheck className="w-5 h-5" />
                      <span className="text-[11px] font-bold uppercase tracking-[0.2em]">SIPL Protocol V3.1</span>
                    </div>
                    <div className="space-y-3">
                       <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_green]" />
                          <span className="text-[10px] text-white/60 font-mono tracking-tight">EKS Handshake: Synchronized</span>
                       </div>
                       <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                          <span className="text-[10px] text-white/60 font-mono tracking-tight">Qernel State: Immutable Ledger</span>
                       </div>
                    </div>
                    <button className="w-full py-3 rounded-2xl bg-white/5 border border-white/10 text-[9px] font-bold uppercase tracking-[0.2em] text-white/40 hover:bg-white/10 hover:text-white transition-all mt-2">
                      Verify Checkpoints
                    </button>
                  </div>
               </div>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="h-7 border-t border-white/5 px-4 flex items-center justify-between text-[10px] font-mono text-white/20 uppercase tracking-tighter bg-[#080808] z-30">
           <div className="flex gap-6 items-center">
              <button 
                onClick={() => setIsTerminalOpen(!isTerminalOpen)}
                className={`flex items-center gap-1.5 hover:text-cyan-400 cursor-pointer transition-colors ${isTerminalOpen ? 'text-cyan-400' : ''}`}
              >
                <TerminalIcon className="w-3 h-3" />
                <span>Terminal</span>
              </button>
              <div className="flex items-center gap-1.5 hover:text-cyan-400 cursor-pointer transition-colors">
                <Ghost className="w-3.5 h-3.5" />
                <span>agenq-sync-main</span>
              </div>
              <div className="flex items-center gap-1.5">
                <RefreshCcw className={`w-3 h-3 ${isGenerating ? 'animate-spin' : ''}`} />
                <span>{logs.filter(l => l.type === 'error').length} Errors</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Activity className="w-3 h-3" />
                <span>124ms</span>
              </div>
           </div>
           <div className="flex items-center gap-6">
              <span className="hover:text-white transition-colors cursor-pointer">UTF-8</span>
              <span className="hover:text-white transition-colors cursor-pointer">{activeFile.type.toUpperCase()}</span>
              <div className="flex items-center gap-2 border-l border-white/10 pl-6">
                 <div className="w-1.5 h-1.5 rounded-full bg-green-500/40" />
                 <span>Qernel: Nominal</span>
              </div>
           </div>
        </div>
      </div>

      {!showPreview && (
        <button 
          onClick={() => setShowPreview(true)}
          className="absolute right-6 top-20 w-12 h-12 rounded-2xl bg-cyan-600 border border-cyan-500 text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all z-40 animate-in fade-in zoom-in"
        >
          <Eye className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

const ActivityButton: React.FC<{ active: boolean, onClick: () => void, icon: React.ReactNode }> = ({ active, onClick, icon }) => (
  <button 
    onClick={onClick}
    className={`p-2.5 rounded-xl transition-all duration-300 relative group ${active ? 'text-cyan-400 bg-cyan-500/10' : 'text-white/20 hover:text-white/60 hover:bg-white/5'}`}
  >
    {React.cloneElement(icon as React.ReactElement<any>, { className: "w-6 h-6" })}
    {active && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-8 bg-cyan-400 rounded-r-full shadow-[0_0_10px_rgba(0,255,204,1)]" />}
  </button>
);

const MetricSmall: React.FC<{ label: string, value: string }> = ({ label, value }) => (
  <div className="p-4 rounded-2xl bg-white/5 border border-white/5 group hover:border-cyan-500/20 transition-colors shadow-inner">
    <div className="text-[9px] font-bold uppercase text-white/10 mb-1.5 tracking-widest">{label}</div>
    <div className="text-sm font-mono font-bold text-white/70 group-hover:text-cyan-400 transition-colors">{value}</div>
  </div>
);

export default QCOSStudio;