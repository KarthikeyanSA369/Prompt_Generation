
import React from 'react';
import { VibeTool } from './types';

export const TOOL_NAMES: Record<VibeTool, string> = {
  [VibeTool.CHATGPT]: 'ChatGPT',
  [VibeTool.LOVABLE]: 'Lovable',
  [VibeTool.V0]: 'v0 by Vercel',
  [VibeTool.CURSOR]: 'Cursor AI',
  [VibeTool.REPLIT]: 'Replit AI',
  [VibeTool.COPILOT]: 'GitHub Copilot',
  [VibeTool.CODEIUM]: 'Codeium',
  [VibeTool.CONTINUE]: 'Google Veo3(Video Generation)',
  [VibeTool.LOCAL]: 'Local LLM',
  [VibeTool.GENERIC]: 'Generic LLM',
  [VibeTool.AUTO]: 'Auto-Select'
};

export const TOOL_RULES: Record<string, string> = {
  CHATGPT: "Detailed, structured, section-based prompts using markdown headers.",
  LOVABLE: "Product-oriented, UI-aware prompts. Focus on the 'why' of the user experience.",
  V0: "React and UI generation–focused prompts. Emphasize Tailwind and shadcn/ui patterns.",
  CURSOR: "Inline coding instruction prompts. Use comments and specific file path references.",
  REPLIT: "Runnable, project-level prompts. Include full environment setup instructions.",
  COPILOT: "Concise, code-centric prompts. Avoid conversational filler.",
  CODEIUM: "Function-level clarity prompts. Focus on signatures and logical flow.",
  CONTINUE: "IDE-agent–style prompts. Contextualize within the workspace.",
  LOCAL: "Explicit instructions with low temperature. Avoid complex abstractions.",
  GENERIC: "Balanced, tool-agnostic prompts with high compatibility.",
  AUTO: "Intelligently balanced prompts based on identified tool strengths."
};

export const PRO_OPTIONS = {
  temperature: ['0.1', '0.3', '0.5', '0.7', '0.9', 'Your Choice'],
  role: ['Domain Expert', 'Research Analyst', 'Software Engineer', 'Instructor', 'Autonomous Agent', 'Your Choice'],
  strategy: ['None', 'Step-by-step', 'Decomposed', 'Algorithmic', 'Chain-of-thought suppressed', 'Your Choice'],
  structure: ['Role→Task→Constraints', 'Role→Context→Task→Output', 'Instruction-only', 'Multi-section', 'Your Choice'],
  strictness: ['Hard', 'Soft', 'Mixed', 'None', 'Your Choice'],
  failureHandling: ['Ask clarification', 'State uncertainty', 'Best-effort', 'Refuse ambiguity', 'Your Choice']
};
