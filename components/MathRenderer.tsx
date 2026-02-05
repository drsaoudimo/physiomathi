import React from 'react';
import katex from 'katex';

interface MathRendererProps {
  content: string;
  isRtl?: boolean;
}

const MathRenderer: React.FC<MathRendererProps> = ({ content, isRtl }) => {
  // Split content by block math $$...$$
  const parts = content.split(/(\$\$[\s\S]*?\$\$)/g);

  return (
    <div className={`whitespace-pre-wrap ${isRtl ? "font-cairo text-right" : "font-sans text-left"} text-slate-300 leading-relaxed`}>
      {parts.map((part, index) => {
        // Block Math
        if (part.startsWith('$$') && part.endsWith('$$')) {
          const formula = part.slice(2, -2);
          try {
            const html = katex.renderToString(formula, { displayMode: true, throwOnError: false });
            return (
              <div 
                key={index} 
                dangerouslySetInnerHTML={{ __html: html }} 
                className="my-6 text-center overflow-x-auto text-lg text-cyan-200"
              />
            );
          } catch (e) {
            return <code key={index} className="block bg-red-900/30 text-red-200 p-2 rounded my-2">{part}</code>;
          }
        }

        // Inline Math handling within text parts
        const inlineParts = part.split(/(\$[^\$\n]*?\$)/g);
        return (
          <span key={index}>
            {inlineParts.map((subPart, subIndex) => {
              if (subPart.startsWith('$') && subPart.endsWith('$')) {
                const formula = subPart.slice(1, -1);
                // Simple heuristic to avoid accidental $ matches (e.g. currency) if not likely math
                if (formula.length > 0 && !formula.includes(' ')) { 
                   // Ideally we'd use a robust parser, but simple splitting works for well-formed LLM output
                }
                
                try {
                  const html = katex.renderToString(formula, { displayMode: false, throwOnError: false });
                  return (
                    <span 
                      key={subIndex} 
                      dangerouslySetInnerHTML={{ __html: html }} 
                      className="mx-1 font-bold text-cyan-200 inline-block"
                    />
                  );
                } catch (e) {
                  return <span key={subIndex}>{subPart}</span>;
                }
              }
              return <span key={subIndex}>{subPart}</span>;
            })}
          </span>
        );
      })}
    </div>
  );
};

export default MathRenderer;
