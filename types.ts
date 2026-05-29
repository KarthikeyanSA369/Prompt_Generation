
export enum AppMode {
  NORMAL = 'NORMAL',
  PRO = 'PRO'
}

export enum VibeTool {
  CHATGPT = '1',
  LOVABLE = '2',
  V0 = '3',
  CURSOR = '4',
  REPLIT = '5',
  COPILOT = '6',
  CODEIUM = '7',
  CONTINUE = '8',
  LOCAL = '9',
  GENERIC = '10',
  AUTO = '0'
}

export interface ProConfig {
  temperature: string;
  role: string;
  strategy: string;
  structure: string;
  strictness: string;
  failureHandling: string;
}

export interface GeneratedPrompt {
  systemRole: string;
  toolInstructions: string;
  reasoningStrategy: string;
  constraints: string;
  samplingSettings: string;
  task: string;
  rawText: string;
  refinedText?: string;
}

export type Screen = 'MODE' | 'TOOL' | 'INPUT' | 'CONFIG' | 'OUTPUT';
