import React from 'react';
import { X, FileText } from 'lucide-react';
import MathRenderer from './MathRenderer';

interface ResultModalProps {
  title: string;
  content: string;
  onClose: () => void;
  isRtl: boolean;
}

const ResultModal: React.FC<ResultModalProps> = ({ title, content, onClose, isRtl }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="bg-[#0f1115] border border-slate-800 w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className={`p-6 border-b border-slate-800 flex justify-between items-center bg-slate-950 ${isRtl ? 'flex-row-reverse' : ''}`}>
          <h2 className="text-xl font-bold text-violet-400 flex items-center gap-3">
            <FileText size={24} />
            <span>{title}</span>
          </h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <MathRenderer content={content} isRtl={isRtl} />
        </div>
      </div>
    </div>
  );
};

export default ResultModal;
