import React, { useState, useEffect } from 'react';
import { Globe, Cpu, Search, Sparkles, AlertTriangle, X, BrainCircuit, Activity } from 'lucide-react';
import { UI_TEXT } from './constants';
import { Language, GenerationResult } from './types';
import { mineUnknownTheories, generateScientificArticle } from './services/geminiService';
import ResultModal from './components/ResultModal';
import CyberButton from './components/ui/CyberButton';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('fr');
  const t = UI_TEXT[lang];
  const isRtl = lang === 'ar';

  const [result, setResult] = useState<GenerationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Inputs
  const [topic, setTopic] = useState("Neuro-Immune Interaction");
  const [articleTopic, setArticleTopic] = useState("Hypertension");
  const [isResearcherMode, setIsResearcherMode] = useState(true);
  const [selectedModel, setSelectedModel] = useState("gemini-3-flash-preview");
  const [showArticleModal, setShowArticleModal] = useState(false);

  useEffect(() => {
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang, isRtl]);

  const toggleLang = () => setLang(prev => prev === 'fr' ? 'ar' : 'fr');

  const handleError = (errorType: string | undefined) => {
    let msg = t.errorGeneration;
    if (errorType === 'API_KEY') msg = t.errorApiKey;
    if (errorType === 'CONNECTION') msg = t.errorConnection;
    setError(msg);
  };

  const handleMineTheories = async () => {
    setIsLoading(true);
    setError(null);
    const res = await mineUnknownTheories(topic, lang, isResearcherMode, selectedModel);
    setIsLoading(false);
    
    if (res.success) {
      setResult({ title: t.theoreticalReport, content: res.content });
    } else {
      handleError(res.errorType);
    }
  };

  const handleGenerateArticle = async () => {
    if (!articleTopic.trim()) return;
    setIsLoading(true);
    setShowArticleModal(false); // Close input modal
    setError(null);
    
    const res = await generateScientificArticle(articleTopic, lang, selectedModel);
    setIsLoading(false);

    if (res.success) {
      setResult({ title: t.scientificArticle, content: res.content });
    } else {
      handleError(res.errorType);
    }
  };

  return (
    <div className={`min-h-screen bg-[#09090b] text-slate-200 flex flex-col items-center justify-center font-sans relative overflow-hidden`}>
      
      {/* Language Switcher */}
      <div className="absolute top-6 right-6 z-50">
        <button 
          onClick={toggleLang}
          className="p-2 rounded-full hover:bg-slate-800 text-slate-500 hover:text-white transition-colors"
        >
          <Globe size={20} />
        </button>
      </div>

      {/* Footer Info */}
      <div className="absolute bottom-6 text-center opacity-40 hover:opacity-100 transition-opacity z-10 pointer-events-none">
        <p className="text-[10px] text-slate-500 font-mono tracking-wider">{t.authorName}</p>
        <p className="text-[11px] text-slate-400 font-bold font-cairo mt-1">{t.authorNameAr}</p>
      </div>

      {/* Main Container */}
      <div className="w-full max-w-lg px-6 z-20">
        
        {/* Header Logo */}
        <div className="flex flex-col items-center justify-center mb-10 cursor-default select-none">
          <div className="w-12 h-12 bg-cyan-950/30 border border-cyan-900/50 rounded-2xl flex items-center justify-center mb-3 shadow-[0_0_30px_rgba(6,182,212,0.15)]">
            <Activity className="text-cyan-400" size={24} />
          </div>
          <h1 className="font-bold text-2xl tracking-[0.2em] text-slate-200">
            PHYSIO<span className="text-cyan-500">MATH</span>
          </h1>
          <p className="text-[10px] text-slate-500 font-mono tracking-widest mt-1">
            {t.generatorVersion}
          </p>
        </div>

        {/* Control Panel */}
        <div className="bg-[#0f1115] border border-slate-800 p-8 rounded-3xl shadow-2xl relative overflow-hidden">
          {/* Decorative Glows */}
          <div className="absolute -top-20 -right-20 w-48 h-48 bg-violet-500/10 blur-[60px] rounded-full pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-cyan-500/10 blur-[60px] rounded-full pointer-events-none" />

          {/* Top Controls */}
          <div className="flex items-center justify-between mb-8 relative z-10">
            <div className="flex items-center gap-2">
              <BrainCircuit size={18} className="text-violet-400" />
              <span className="text-sm font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-indigo-400">
                {t.neuroCore}
              </span>
            </div>
            
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setIsResearcherMode(!isResearcherMode)}
                className={`p-2 rounded-lg border transition-all ${isResearcherMode ? 'bg-cyan-950 border-cyan-800 text-cyan-400' : 'bg-slate-900 border-slate-700 text-slate-500'}`}
                title={t.researcherMode}
              >
                <Search size={16} />
              </button>
              
              <select 
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="bg-slate-900 border border-slate-700 text-[10px] text-slate-300 rounded-lg px-2 py-2 focus:outline-none font-mono"
              >
                <option value="gemini-3-flash-preview">Flash 3.0</option>
                <option value="gemini-3-pro-preview">Pro 3.0</option>
              </select>
            </div>
          </div>

          {/* Mine Unknown Theories Input */}
          <div className="relative z-10 mb-4 group">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-indigo-600/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative bg-slate-900/50 border border-slate-800 hover:border-violet-500/50 rounded-xl p-1 flex items-center transition-colors">
              <input 
                type="text" 
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder={t.topicPlaceholder}
                className={`bg-transparent border-none text-sm text-white px-4 py-3 w-full focus:outline-none placeholder:text-slate-600 ${isRtl ? 'text-right' : 'text-left'}`}
              />
              <CyberButton 
                variant="secondary" 
                onClick={handleMineTheories} 
                isLoading={isLoading}
                disabled={isLoading}
              >
                <Cpu size={18} />
              </CyberButton>
            </div>
            <label className="text-[10px] text-slate-500 mt-2 block text-center uppercase tracking-wider">
              {t.mineUnknown}
            </label>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6 opacity-20">
            <div className="h-px bg-white flex-1" />
            <div className="text-[10px] text-white font-mono">{t.orSeparator}</div>
            <div className="h-px bg-white flex-1" />
          </div>

          {/* Generate Article Button */}
          <div className="relative z-10">
            <CyberButton 
              onClick={() => setShowArticleModal(true)} 
              isLoading={isLoading}
              disabled={isLoading}
            >
              <Sparkles size={18} className="text-indigo-500 group-hover:scale-110 transition-transform" />
              {t.generateArticle}
            </CyberButton>
          </div>
        </div>
      </div>

      {/* Error Toast */}
      {error && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[60] bg-red-950/90 border border-red-500 text-red-200 px-6 py-3 rounded-lg shadow-2xl flex items-center gap-3 animate-in slide-in-from-top-2 backdrop-blur-sm">
          <AlertTriangle size={20} />
          <span className="text-sm font-bold">{t.errorTitle}: {error}</span>
          <button onClick={() => setError(null)} className="ml-2 hover:text-white">
            <X size={16} />
          </button>
        </div>
      )}

      {/* Result Modal */}
      {result && (
        <ResultModal 
          title={result.title} 
          content={result.content} 
          onClose={() => setResult(null)} 
          isRtl={isRtl}
        />
      )}

      {/* Article Topic Modal */}
      {showArticleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#0f1115] border border-slate-700 p-6 rounded-2xl w-full max-w-md shadow-2xl animate-in zoom-in-95 duration-200">
            <h3 className={`text-lg font-bold text-white mb-4 flex items-center gap-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
              <Sparkles size={20} className="text-indigo-400" />
              {t.generateArticle}
            </h3>
            <p className={`text-xs text-slate-400 mb-4 ${isRtl ? 'text-right' : 'text-left'}`}>
              {t.articleDesc}
            </p>
            <input 
              type="text" 
              value={articleTopic}
              onChange={(e) => setArticleTopic(e.target.value)}
              placeholder={t.articleTopicLabel}
              className={`w-full bg-black/50 border border-slate-700 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-indigo-500 mb-6 ${isRtl ? 'text-right' : 'text-left'}`}
              autoFocus
            />
            <div className={`flex gap-3 ${isRtl ? 'flex-row-reverse' : 'justify-end'}`}>
              <button 
                onClick={() => setShowArticleModal(false)}
                className="px-4 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors text-sm"
              >
                {t.close}
              </button>
              <button 
                onClick={handleGenerateArticle}
                disabled={!articleTopic.trim()}
                className="px-6 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                {t.generateButton}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
