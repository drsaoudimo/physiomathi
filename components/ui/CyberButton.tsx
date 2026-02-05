import React from 'react';
import { Loader2 } from 'lucide-react';

interface CyberButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'icon';
  isLoading?: boolean;
}

const CyberButton: React.FC<CyberButtonProps> = ({ 
  children, 
  variant = 'primary', 
  isLoading, 
  className = '', 
  disabled,
  ...props 
}) => {
  const baseStyles = "transition-all duration-300 relative group overflow-hidden active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "w-full flex items-center justify-center gap-3 py-4 rounded-xl bg-slate-900/80 border border-slate-700 text-slate-300 font-bold text-sm hover:bg-indigo-950/30 hover:border-indigo-500/50 hover:text-indigo-300",
    secondary: "bg-violet-600 hover:bg-violet-500 text-white p-3 rounded-lg",
    icon: "p-2 rounded-lg border bg-slate-900 border-slate-700 text-slate-500 hover:text-white"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading ? <Loader2 className="animate-spin" size={18} /> : children}
    </button>
  );
};

export default CyberButton;
