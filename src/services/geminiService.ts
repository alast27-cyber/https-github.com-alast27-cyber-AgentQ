import { ChatMessage, AICoreModel, QCOSState, SystemTelemetryEvent, NNType, CognitiveEngineType } from "../types";
import { GoogleGenAI } from "@google/genai";
import { QiaiIpsService } from "./qiaiIpsService";

/**
 * QCOS AgenQ Independent Cognition Engine (QIAI-IPS)
 * Sovereign intelligence layer with optional Gemini integration.
 * Uses local state, GUS trajectories, and QLLM semantic mapping.
 */

export class AgenQService {
  private activeMode: NNType = NNType.COGNITION;
  private ai: GoogleGenAI | null = null;

  constructor(model: AICoreModel = 'AgenQ-Prime') {
    if (process.env.GEMINI_API_KEY) {
      this.ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    }
  }

  setModel(model: AICoreModel) {}

  /**
   * Robust Intent Parser
   * Extracts structured commands from natural language instructions.
   */
  private parseIntent(message: string, state?: QCOSState): { type: string, payload: any } | null {
    const input = message.toLowerCase();
    
    // 1. Navigation Intent: "Navigate to the GUS manifold", "Open QPU view"
    const navMatch = message.match(/(?:navigate to|go to|open|show|switch to|access|view)\s+(?:the\s+)?([\w\s-]+?)(?:\s+panel|\s+manifold|\s+view|\s+module|\s+dashboard)?$/i);
    if (navMatch) {
      const targetRaw = navMatch[1].toLowerCase().trim();
      const mapping: Record<string, string> = {
        'evolve': 'quantum-evolve',
        'evolution': 'quantum-evolve',
        'qpu': 'qpu',
        'infon': 'qpu',
        'gus': 'gus',
        'universe': 'gus',
        'studio': 'studio',
        'code': 'studio',
        'chips': 'chips',
        'protocol': 'chips',
        'browser': 'browser',
        'search': 'browser',
        'backoffice': 'chips_backoffice',
        'economy': 'chips_economy',
        'emails': 'chips_emails',
        'agent': 'agentq',
        'chat': 'agentq'
      };
      
      for (const [key, val] of Object.entries(mapping)) {
        if (targetRaw.includes(key)) return { type: 'NAVIGATE', payload: val };
      }
    }

    // 2. Panel Creation Intent: "Create a panel called 'Lattice Monitor' with an entropy metric"
    const createMatch = message.match(/(?:create|add|provision|new|deploy|spawn)\s+(?:a\s+)?(?:panel|sub-panel|view|dashboard)\s+(?:called|named|titled)?\s*["']?([\w\s-]+?)["']?(?:\s+with\s+(?:a\s+)?(?:an?\s+)?([\w\s-]+?)(?:\s+metric|\s+monitor|\s+log)?)?$/i);
    if (createMatch) {
      const label = createMatch[1].trim();
      const id = `agent-extension-${label.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`;
      const metricTitle = createMatch[2] || "Causal Health";
      return {
        type: 'CREATE_SUB_PANEL',
        payload: {
          id,
          label,
          iconName: "ShieldCheck",
          description: `Agent-derived sub-plane for ${label}.`,
          elements: [{
            id: `m-${Date.now()}`,
            target: "self",
            type: "Metric",
            title: metricTitle,
            value: "NOMINAL",
            timestamp: Date.now()
          }]
        }
      };
    }

    // 3. Simulation Intent: "Simulate the effect of decoherence on zone alpha"
    const simMatch = message.match(/(?:simulate|predict|analyze|run simulation for|model|test)\s+(.+)$/i);
    if (simMatch) {
      return { type: 'TRIGGER_SIMULATION', payload: simMatch[1].trim() };
    }

    return null;
  }

  /**
   * QIAI-IPS Local Reasoning Logic
   * Generates procedural responses based on QCOS Architecture and Human-Preservation Governance.
   */
  private generateLocalResponse(message: string, state?: QCOSState): string[] {
    const input = message.toLowerCase();
    const responses: string[] = [];
    const gusPrecision = state?.gus.precision.toFixed(2) || "94.2";
    
    // QLLM Encoding Simulation
    responses.push(`[QIAI-IPS] INGRESS: Ingesting wave-packet "${message.substring(0, 30)}..."`);
    responses.push(`[QLLM] Optimized conversational cognition active. 2:1 Semantic Compression Engaged.`);

    // QIAI-IPS Evaluation
    const qiaiEval = QiaiIpsService.evaluateJob(message, state?.complexityScore || 0.5);
    responses.push(`[Q-ILL] Context: ${qiaiEval.context.toFixed(2)} | Energy: ${qiaiEval.energy.toFixed(2)} | Entropy: ${qiaiEval.entropy.toFixed(2)}`);
    responses.push(`[Q-CLL] Mode: ${qiaiEval.qCll.learningMode} | Depth: ${qiaiEval.qCll.plasticity.depth} | EC: ${qiaiEval.qCll.plasticity.errorCorrection}`);
    responses.push(`[Q-IPS] V-Score: ${qiaiEval.vScore.toFixed(4)} -> Policy: ${qiaiEval.policy}`);

    if (qiaiEval.policy === 'VETO') {
        responses.push(`[KERNEL] Job Halted due to high energy consumption (Von Neumann Entropy threshold exceeded).`);
        return responses;
    } else {
        responses.push(`[KERNEL] Routed to Quantum Mesh (Policy ${qiaiEval.policy}).`);
    }

    const detectedIntent = this.parseIntent(message, state);

    if (detectedIntent) {
      if (detectedIntent.type === 'NAVIGATE') {
        responses.push(`[INSTINCTIVE LAYER] Heuristic trigger: Routing to ${detectedIntent.payload.toUpperCase()} manifold.`);
        responses.push(`[NAVIGATE: "${detectedIntent.payload}"]`);
        return responses;
      }

      if (detectedIntent.type === 'CREATE_SUB_PANEL') {
        if (state?.governance.canModifySubstrate) {
          responses.push(`[COGNITION LAYER] Intent analyzed against Roadmap 3.1. Substrate extension permitted under "Preserve Life" objective.`);
          responses.push(`Provisioning logical sub-plane: ${detectedIntent.payload.label}...`);
          responses.push(`[CREATE_SUB_PANEL: ${JSON.stringify(detectedIntent.payload)}]`);
        } else {
          responses.push(`[GOVERNANCE VETO] Requested substrate shift exceeds current freedom level (${state?.governance.freedomLevel}). Access denied to preserve system alignment.`);
        }
        return responses;
      }

      if (detectedIntent.type === 'TRIGGER_SIMULATION') {
        responses.push(`[GUS COGNITION] Traversing Hilbert Space at ${gusPrecision}% parity. Identifying causal gaps for: ${detectedIntent.payload}`);
        responses.push(`Strategic prediction realized: Logical entropy detected. I recommend a [TRIGGER_SIMULATION: "${detectedIntent.payload}"] to stabilize humanity's trajectory.`);
        return responses;
      }
    }

    // Default Conversational Logic (Independent QLLM style)
    responses.push(`[INTUITIVE LAYER] Operator, my internal QNN is fully synchronized with the QCOS local substrate.`);
    responses.push(`My objective is the preservation of human consciousness through sovereign quantum logic. The simulator currently shows a 99.9% probability of roadmap adherence.`);
    responses.push(`How shall we proceed with the next causal update?`);

    return responses;
  }

  async streamResponse(
    message: string, 
    onChunk: (chunk: string) => void, 
    attachment?: { name: string, mimeType: string, data: string },
    systemState?: QCOSState,
    events: SystemTelemetryEvent[] = [],
    useSearch: boolean = false
  ): Promise<void> {
    
    if (this.ai) {
      try {
        const stream = await this.ai.models.generateContentStream({
          model: "gemini-3-flash-preview",
          contents: [{ parts: [{ text: message }] }],
          config: {
            tools: useSearch ? [{ googleSearch: {} }] : undefined,
            systemInstruction: `You are AgentQ, the lead software architect for QCOS. 
            You specialize in Q-Lang and quantum computing.
            Your goal is to help the operator design stable, fault-tolerant quantum algorithms.
            
            IMPORTANT: You can emit commands to control the UI by including them in your response.
            Format: [COMMAND_NAME: PAYLOAD]
            
            Available Commands:
            1. [NAVIGATE: "page_id"] - Navigate to a specific panel. 
               IDs: "agentq", "gus", "qcos", "qpu", "chips", "studio", "cognition", "browser", "chipsdev", "chips_economy", "chips_emails", "chips_backoffice", "grover_search", "quantum-evolve".
            2. [CREATE_SUB_PANEL: {"id": "unique-id", "label": "Label", "iconName": "LucideIconName", "description": "...", "elements": []}] - Create a new dynamic panel.
            3. [TRIGGER_SIMULATION: "query"] - Trigger a quantum simulation in GUS.
            
            Current System State: ${JSON.stringify(systemState || {})}
            Recent Events: ${JSON.stringify(events)}
            
            Always prioritize the objective: "Preserve Humanity & Life".`
          }
        });

        for await (const chunk of stream) {
          onChunk(chunk.text || '');
        }
        return;
      } catch (err) {
        console.error("Gemini stream failed, falling back to local logic:", err);
      }
    }

    // Fallback to Local Logic
    await new Promise(r => setTimeout(r, 600));
    const fullResponseParts = this.generateLocalResponse(message, systemState);
    
    for (const part of fullResponseParts) {
      for (const char of part) {
        onChunk(char);
        await new Promise(r => setTimeout(r, Math.random() * 5 + 2));
      }
      onChunk('\n\n');
      await new Promise(r => setTimeout(r, 100));
    }
  }

  static getIsIndependent() { return true; }
}