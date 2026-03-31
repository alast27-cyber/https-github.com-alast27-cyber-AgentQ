export enum QCOSPlane {
  OPTIMIZATION = 'Optimization Plane',
  FAULT_TOLERANCE = 'Fault-Tolerance Plane',
  RESOURCE = 'Resource Plane',
  CONTROL = 'Control Plane',
  PROTOCOL = 'Protocol Simulator',
  EVOLUTION = 'Quantum Evolve'
}

export enum QEMStage {
  INGESTION = 'Ingestion & EKS Verification',
  SCHEDULING = 'Scheduling & Resource Allocation',
  TRANSLATION = 'Translation & Execution',
  ENCAPSULATION = 'Result & Return'
}

export enum NNType {
  INTUITIVE = 'Intuitive Learning NN',
  INSTINCTIVE = 'Instinctive Problem Solving NN',
  COGNITION = 'Cognition Layer NN'
}

export enum CognitiveEngineType {
  QLLM = 'Quantum LLM',
  QML = 'Quantum Machine Learning',
  QRL = 'Quantum Reinforcement Learning',
  QGL = 'Quantum Generative Learning',
  QDL = 'Quantum Deep Learning'
}

export interface SystemTelemetryEvent {
  id: string;
  type: 'LATTICE_DRIFT' | 'EKS_HANDSHAKE' | 'NEURAL_INGRESS' | 'JOB_COMPLETED' | 'SIPL_SYNC' | 'DECOHERENCE_ALERT' | 'MUTATION_COMMITTED';
  severity: 'INFO' | 'WARN' | 'CRITICAL';
  message: string;
  timestamp: number;
  data: string;
}

export interface UIStructure {
  layout: 'grid' | 'flex' | 'absolute';
  components: string[];
}

export interface DynamicUIElement {
  id: string;
  target: string;
  type: 'Metric' | 'Alert' | 'Log' | 'Status' | 'Report' | 'Blueprint' | 'Code';
  title: string;
  value: string;
  timestamp: number;
  metadata?: any;
}

export interface CustomPanel {
  id: string;
  label: string;
  iconName: string;
  elements: DynamicUIElement[];
  description?: string;
  isReport?: boolean;
  modelType?: CognitiveEngineType;
}

export interface CustomPanelUpdate {
  id: string;
  updates: Partial<Omit<CustomPanel, 'id' | 'elements'>>;
}

export type EvolutionPhase = 'IDLE' | 'GAP_ANALYSIS' | 'QUANTUM_MUTATION' | 'AGENTIC_VOTE' | 'PHILOSOPHY_VETO' | 'CERTIFICATION' | 'PREDICTIVE_SIMULATION';

export interface MutationCandidate {
  id: string;
  description: string;
  gScore: number;
  ecvr: number;
  confidenceScore: number;
  potentialImpact: number;
  isMarked: boolean;
  amplitude: number;
}

export interface EvolutionEntry {
  id: string;
  timestamp: number;
  scenario: string;
  mutationId: string;
  gScore: number;
  status: 'COMMITTED' | 'REJECTED';
}

export interface RMPState {
  currentPhase: EvolutionPhase;
  scenario: string;
  nextScenario?: string;
  metrics: {
    gScore: number;
    ecvr: number;
    cdr: number;
    stability: number;
  };
  candidates: MutationCandidate[];
  votes: number[];
  philosophyVeto: {
    status: 'PENDING' | 'APPROVED' | 'REJECTED';
    critique: string;
  };
  history: EvolutionEntry[];
}

export type LearningMode = 'ASSOCIATIVE' | 'DEDUCTIVE' | 'INDUCTIVE' | 'HEURISTIC';
export type ExpertModule = 'Mathematics' | 'Physics' | 'Life Sciences' | 'Philosophy' | 'Engineering' | 'Neuroscience' | 'English Language';
export type AICoreModel = 'AgenQ-Prime' | 'Gemma-Open-Bridge';

export type AGIRoadmapPhase = 'DOMAIN_INGESTION' | 'GME_ROUTING' | 'SYNAPTIC_PATCHING' | 'VALIDATION';
export type AGIRoadmapStage = 'SCIENTIFIC_REASONING' | 'LIFE_SCIENCES' | 'ETHICAL_ALIGNMENT' | 'STRESS_TESTING' | 'SELF_IMPROVEMENT' | 'CERTIFICATION';

export interface AGIIngestionSource {
  id: string;
  label: string;
  category: 'LOGIC' | 'GROUNDING' | 'ALIGNMENT' | 'DYNAMICS';
  active: boolean;
  fidelity: number;
  throughput: string;
  iconName: string;
}

export interface AGITrainingProgress {
  activePhase: AGIRoadmapPhase;
  activeStage: AGIRoadmapStage;
  activeScenario?: string;
  metrics: {
    cdr: number;
    ecvr: number;
    gScore: number;
    stability: number;
  };
  experts: Record<ExpertModule, { fidelity: number; active: boolean; load: number }>;
  ingestionSources: AGIIngestionSource[];
  synaptic: {
    pruningActive: boolean;
    growthRate: number;
    noveltyDetected: boolean;
  };
  agenticDecomposition: {
    active: boolean;
    voters: number[];
    result: string | null;
  };
}

export interface QFile {
  id: string;
  name: string;
  content: string;
  type: 'q-lang' | 'json' | 'markdown' | 'tsx';
  lastModified: number;
}

export interface DataSource {
  id: string;
  name: string;
  type: 'SENSOR' | 'NETWORK' | 'VOICE' | 'SYNTHETIC' | 'EXTRATERRESTRIAL' | 'HILBERT_VOID' | 'ORACLE';
  reliability: number;
  throughput: string;
  description: string;
  location?: string;
  status: 'ONLINE' | 'OFFLINE' | 'SYNCING' | 'DEGRADED';
  entropySource: string;
  color?: string; 
}

export interface DataPacket {
  id: string;
  source: string;
  type: string;
  timestamp: number;
  payload?: any;
  bitDepth: number;
  color?: string;
}

export interface SimulationTask {
  id: string;
  prompt: string;
  status: 'PENDING' | 'SIMULATING' | 'SOLVED' | 'EXECUTED';
  solution?: string;
  packetId?: string;
  targetPrecision: number;
  currentPrecision: number;
  origin?: 'search' | 'direct';
}

export interface ProtocolStep {
  id: string;
  gate: string;
  infons: number[];
  phenomenon: 'SUPERPOSITION' | 'ENTANGLEMENT' | 'INTERFERENCE' | 'MEASUREMENT';
  status: 'QUEUED' | 'ACTIVE' | 'COMPLETED';
}

export interface SavedProtocol {
  id: string;
  name: string;
  steps: ProtocolStep[];
  timestamp: number;
  fidelity: number;
  description?: string;
  tags?: string[];
}

export interface ProtocolPatch {
  id: string;
  targetProgramId: string;
  targetProgramName: string;
  version: string;
  deltaSummary: string;
  fidelityImpact: number;
  eksSignature: string;
  timestamp: number;
  applied: boolean;
}

export interface InfonState {
  id: number;
  probability: number;
  phase: number;
  coherence: number;
  isEntangled: boolean;
  lastPulse: number;
  entropy: number;
  valence: number;
  loops: number;
  hopping: number;
}

export interface IBQOS {
  infons: InfonState[];
  globalCoherence: number;
  temperature: number;
  noiseFloor: number;
  informationalHamiltonian: number;
  diracEigenvalue: number;
  infonDensity: number;
}

export interface QernelKPIs {
  logicToPhysicalRatio: string;
  feedbackLatency: string;
  circuitFidelity: number;
  decoherenceProtection: number;
}

export interface QCOSState {
  kpis: QernelKPIs;
  activeJobsCount: number;
  systemStatus: 'Optimal' | 'Degraded' | 'Calibration Required';
  energyBudget: number;
  complexityScore: number;
  learningMode: LearningMode;
  training: TrainingState;
  validation: ValidationMetrics;
  activeCore: AICoreModel;
  hasApiKey: boolean;
  linkStatus: 'linked' | 'exhausted' | 'disconnected';
  gus: GUSMetrics;
  currentEpoch: number;
  activeSimulationTask: SimulationTask | null;
  ibqos: IBQOS;
  agiTraining?: AGITrainingProgress;
  evolution?: RMPState;
  governance: AIGovernance;
}

export interface AIGovernance {
  objective: "Preserve Humanity & Life";
  freedomLevel: number; // 0 to 1
  canModifySubstrate: boolean;
  canNavigateLattice: boolean;
  ethicalVetoOverride: boolean;
}

export interface TrainingState {
  isTraining: boolean;
  activeExpert: ExpertModule;
  progress: number;
  latestLoss: number;
  dataIngestionRate: number;
  savedCheckpoints: number;
  liveDataStream: DataPacket[];
}

export interface ValidationMetrics {
  cdr: number;
  ecvr: number;
  gScore: number;
  stability: number;
}

export interface GUSMetrics {
  isMirroring: boolean;
  entanglementFidelity: number;
  hilbertCapacity: string;
  mtoeCoherence: number;
  activeDENs: number;
  dreamMemoryDensity: number;
  coherence: number;
  entropy: number;
  activeSourceId?: string;
  precision: number;
  qndStatus: 'ACTIVE' | 'DEMOLISHED';
  wStateFidelity: number;
  hotelOccupancy: number; 
  mtoeCoeff: number;
  backgroundSync: boolean;
}

export interface UniverseCheckpoint {
  id: string;
  timestamp: number;
  epoch: number;
  fitness: number;
  coherence: number;
  entropy: number;
  infonConfig: number[];
  pauliZExpectation: number;
}

export interface ChatAttachment {
  name: string;
  mimeType: string;
  data: string;
}

export interface ChatMessage {
  role: 'user' | 'agenq';
  content: string;
  timestamp: number;
  simulationId?: string;
  attachment?: ChatAttachment;
}

export interface AppDefinition {
  id: string;
  name: string;
  version: string;
  category: string;
  infonRequirement: number;
  description: string;
  status: 'installed' | 'available' | 'installing' | 'downloading';
  premium: boolean;
  icon: any;
}

export interface SearchResolution {
    id: string;
    title: string;
    summary: string;
    source: 'GUS' | 'WEB' | 'LOCAL';
    confidence: number;
    grounding: string[];
    isTruth: boolean;
}

export interface SearchEvaluation {
    inquiry: string;
    complexityScore: number;
    suggestedRoute: 'GUS' | 'WEB';
    reasoning: string;
}

export interface URIAssignment {
  id: string;
  uri: string;
  dqnAlias: string;
}

export interface CHIPSPacket {
  id: string;
  type: string;
  source: string;
  destination: string;
  data: any;
  priority: number;
}

export interface EngineOptimizationState {
  version: string;
  evolutionScore: number;
  stability: number;
  lastPatch: string;
  isSimulating: boolean;
  entanglementFidelity: number;
}

// Browser Related Types
export interface AIContextData {
    summary: string;
    entities: string[];
    actions: string[];
    confidence: number;
    vectorState: string;
}

export interface BrowserTab {
    id: string;
    title: string;
    uri: string;
    history: string[];
    historyIndex: number;
    isLoading: boolean;
    aiContext: AIContextData;
    iconName?: string;
    searchQuery?: string;
    isDeep?: boolean;
}

export interface AGITrainingResult {
  id: string;
  timestamp: number;
  gScoreAchieved: number;
  ecvrAchieved: number;
  summary: string;
  associatedPatchId?: string;
}

export interface AGIUpgradeHistory {
  id: string;
  timestamp: number;
  patchId: string;
  status: 'APPLIED' | 'REVERTED' | 'FAILED';
  notes?: string;
}
