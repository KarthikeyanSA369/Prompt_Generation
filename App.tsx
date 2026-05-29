
import React, { useState, useEffect } from 'react';
import { AppMode, VibeTool, Screen, ProConfig, GeneratedPrompt } from './types';
import { TOOL_NAMES, PRO_OPTIONS } from './constants';
import { PromptService } from './services/promptService';

const promptService = new PromptService();

export default function App() {
  const [screen, setScreen] = useState<Screen>('MODE');
  const [mode, setMode] = useState<AppMode>(AppMode.NORMAL);
  const [tool, setTool] = useState<VibeTool>(VibeTool.AUTO);
  const [task, setTask] = useState('');
  const [proConfig, setProConfig] = useState<ProConfig>({
    temperature: 'Your Choice',
    role: 'Your Choice',
    strategy: 'Your Choice',
    structure: 'Your Choice',
    strictness: 'Your Choice',
    failureHandling: 'Your Choice'
  });
  const [output, setOutput] = useState<GeneratedPrompt | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleModeSelect = (m: AppMode) => {
    setMode(m);
    setScreen('TOOL');
  };

  const handleToolSelect = (t: VibeTool) => {
    setTool(t);
    setScreen('INPUT');
  };

  const generatePrompt = async () => {
    if (!task.trim()) return;
    setIsLoading(true);
    try {
      const base = promptService.generateBasePrompt(mode, tool, task, proConfig);
      // Polish with AI
      const refined = await promptService.refinePrompt(base);
      setOutput({ ...base, refinedText: refined });
      setScreen('OUTPUT');
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    const text = output?.refinedText || output?.rawText || '';
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const reset = () => {
    setScreen('MODE');
    setTask('');
    setOutput(null);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 min-h-screen flex flex-col">
      {/* Header */}
      <div className="text-center mb-12 animate-in fade-in duration-700">
        <div className="inline-block px-3 py-1 mb-4 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-bold uppercase tracking-widest">
          Rule-Based System v2.1
        </div>
        <h1 className="text-6xl font-black bg-clip-text text-transparent bg-gradient-to-br from-blue-400 via-indigo-400 to-purple-600 mb-4 tracking-tighter">
          PROMPTFORGE
        </h1>
        <p className="text-slate-400 font-medium">Professional Prompt Engineering for the AI Era.</p>
      </div>

      <div className="w-full glass-card rounded-3xl p-8 md:p-12 shadow-2xl relative min-h-[500px] flex flex-col">
        {isLoading && (
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md z-50 rounded-3xl flex flex-col items-center justify-center space-y-6">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-indigo-500/20 rounded-full"></div>
              <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-white mb-2">Engineering Prompt...</p>
              <p className="text-slate-500 text-sm animate-pulse">Running heuristic engine & Gemini refinement</p>
            </div>
          </div>
        )}

        {/* Screens */}
        {screen === 'MODE' && (
          <div className="flex-1 flex flex-col justify-center animate-in fade-in slide-in-from-bottom-4">
            <h2 className="text-3xl font-bold text-center mb-10 text-white">Select Logic Engine</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <button 
                onClick={() => handleModeSelect(AppMode.NORMAL)}
                className="group relative p-8 rounded-2xl border border-slate-700 hover:border-blue-500 bg-slate-800/40 transition-all text-left overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <svg className="w-20 h-20 text-blue-400" fill="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                </div>
                <div className="text-2xl font-bold mb-3 text-white group-hover:text-blue-400">Normal Mode</div>
                <p className="text-slate-400 leading-relaxed">Automatic heuristic mapping. The system decides the best role and strategy based on your input.</p>
              </button>
              <button 
                onClick={() => handleModeSelect(AppMode.PRO)}
                className="group relative p-8 rounded-2xl border border-slate-700 hover:border-purple-500 bg-slate-800/40 transition-all text-left overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <svg className="w-20 h-20 text-purple-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
                </div>
                <div className="text-2xl font-bold mb-3 text-white group-hover:text-purple-400">Pro Mode</div>
                <p className="text-slate-400 leading-relaxed">Full technical override. Control temperature, reasoning path, and constraint strictness manually.</p>
              </button>
            </div>
          </div>
        )}

        {screen === 'TOOL' && (
          <div className="animate-in fade-in slide-in-from-right-4">
            <div className="flex justify-between items-end mb-10">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">Target Tool</h2>
                <p className="text-slate-500">Select the destination AI environment</p>
              </div>
              <button onClick={() => setScreen('MODE')} className="text-slate-500 hover:text-white mb-1 transition-colors font-bold uppercase text-xs tracking-widest">← Back</button>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
              {Object.entries(VibeTool).map(([key, val]) => (
                <button
                  key={val}
                  onClick={() => handleToolSelect(val as VibeTool)}
                  className="group flex flex-col items-center justify-center p-6 rounded-2xl bg-slate-800/60 border border-slate-700 hover:bg-indigo-600/20 hover:border-indigo-500 transition-all aspect-square"
                >
                  <span className="text-3xl font-black text-slate-600 group-hover:text-indigo-400 mb-2 transition-colors">
                    {val === '0' ? '★' : val}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 group-hover:text-white uppercase tracking-tighter text-center leading-none">
                    {TOOL_NAMES[val as VibeTool]}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {screen === 'INPUT' && (
          <div className="flex-1 flex flex-col animate-in fade-in slide-in-from-right-4">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">Define Task</h2>
                <p className="text-slate-500">Provide the core intent for engineering</p>
              </div>
              <button onClick={() => setScreen('TOOL')} className="text-slate-500 hover:text-white mb-1 transition-colors font-bold uppercase text-xs tracking-widest">← Back</button>
            </div>
            <textarea
              value={task}
              onChange={(e) => setTask(e.target.value)}
              placeholder="Describe what you want the AI to do... (e.g., Build a login page with validation)"
              className="flex-1 w-full bg-slate-900/50 border border-slate-700 rounded-2xl p-6 text-white text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none shadow-inner"
            />
            <div className="mt-8 flex justify-end">
              <button
                onClick={mode === AppMode.PRO ? () => setScreen('CONFIG') : generatePrompt}
                disabled={!task.trim()}
                className="group px-10 py-5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-30 text-white font-black rounded-2xl transition-all shadow-xl shadow-indigo-500/20 flex items-center space-x-3"
              >
                <span>{mode === AppMode.PRO ? 'Configure' : 'Forge Prompt'}</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>
          </div>
        )}

        {screen === 'CONFIG' && (
          <div className="animate-in fade-in slide-in-from-right-4">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">Technical Config</h2>
                <p className="text-slate-500">Override system defaults</p>
              </div>
              <button onClick={() => setScreen('INPUT')} className="text-slate-500 hover:text-white mb-1 transition-colors font-bold uppercase text-xs tracking-widest">← Back</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              {(Object.keys(PRO_OPTIONS) as Array<keyof typeof PRO_OPTIONS>).map((key) => (
                <div key={key} className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">{key.replace(/([A-Z])/g, ' $1')}</label>
                  <select
                    value={proConfig[key]}
                    onChange={(e) => setProConfig({ ...proConfig, [key]: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 text-white font-medium focus:ring-2 focus:ring-purple-500 outline-none transition-all appearance-none cursor-pointer hover:bg-slate-800"
                  >
                    {PRO_OPTIONS[key].map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
            <div className="mt-12 flex justify-end">
              <button
                onClick={generatePrompt}
                className="px-12 py-5 bg-purple-600 hover:bg-purple-500 text-white font-black rounded-2xl transition-all shadow-xl shadow-purple-500/20"
              >
                Execute Engineering
              </button>
            </div>
          </div>
        )}

        {screen === 'OUTPUT' && output && (
          <div className="flex-1 flex flex-col animate-in zoom-in-95">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-emerald-400">Prompt Ready</h2>
              <button onClick={reset} className="text-slate-500 hover:text-white transition-colors font-bold uppercase text-xs tracking-widest">Restart System</button>
            </div>
            
            <div className="relative flex-1 group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
              <div className="relative h-full bg-slate-950 rounded-2xl border border-slate-800 flex flex-col overflow-hidden">
                <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">
                  <pre className="fira-code text-sm text-slate-300 whitespace-pre-wrap leading-relaxed">
                    {output.refinedText || output.rawText}
                  </pre>
                </div>
                
                <button 
                  onClick={copyToClipboard}
                  className={`w-full py-5 font-black uppercase tracking-widest text-xs transition-all flex items-center justify-center space-x-2 ${
                    isCopied ? 'bg-emerald-600 text-white' : 'bg-slate-900 text-indigo-400 hover:bg-slate-800 border-t border-slate-800'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                  <span>{isCopied ? 'Copied to Clipboard!' : 'Copy Engineered Prompt'}</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              <div className="p-4 bg-slate-900/40 rounded-xl border border-slate-800">
                <p className="text-[9px] uppercase font-black text-slate-600 tracking-widest mb-1">Architecture</p>
                <p className="text-xs font-bold text-blue-400 truncate">{TOOL_NAMES[tool]}</p>
              </div>
              <div className="p-4 bg-slate-900/40 rounded-xl border border-slate-800">
                <p className="text-[9px] uppercase font-black text-slate-600 tracking-widest mb-1">Strategy</p>
                <p className="text-xs font-bold text-purple-400 truncate">{output.reasoningStrategy.split(': ')[1]}</p>
              </div>
              <div className="p-4 bg-slate-900/40 rounded-xl border border-slate-800">
                <p className="text-[9px] uppercase font-black text-slate-600 tracking-widest mb-1">Temperature</p>
                <p className="text-xs font-bold text-pink-400 truncate">{output.samplingSettings.split('Temperature ')[1]}</p>
              </div>
              <div className="p-4 bg-slate-900/40 rounded-xl border border-slate-800">
                <p className="text-[9px] uppercase font-black text-slate-600 tracking-widest mb-1">Refinement</p>
                <p className="text-xs font-bold text-emerald-400">Gemini 3 Pro</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <footer className="mt-12 text-slate-600 text-[10px] font-black uppercase tracking-[0.2em] text-center">
        Proprietary Rule-Based Prompt Logic &copy; 2024 Forge Systems
      </footer>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #334155; }
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        .animate-in { animation: fade-in 0.5s ease-out forwards; }
      `}</style>
    </div>
  );
}
