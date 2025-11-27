import React, { useState, useEffect } from 'react';
import { Sparkles, RefreshCw } from 'lucide-react';
import { fetchMotivation } from '../services/geminiService';
import { TimerMode } from '../types';

interface MotivationCardProps {
  mode: TimerMode;
  isActive: boolean;
}

const MotivationCard: React.FC<MotivationCardProps> = ({ mode, isActive }) => {
  const [motivation, setMotivation] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const getNewMotivation = async () => {
    setLoading(true);
    const text = await fetchMotivation(mode);
    setMotivation(text);
    setLoading(false);
  };

  // Auto-fetch on mode change (optional, but nice)
  useEffect(() => {
    if (mode !== TimerMode.FINISHED) {
      getNewMotivation();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  if (mode === TimerMode.FINISHED) return null;

  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="relative p-6 overflow-hidden rounded-2xl bg-slate-800/50 backdrop-blur-sm border border-slate-700/50">
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 p-4 opacity-10">
            <Sparkles size={64} className="text-yellow-400" />
        </div>

        <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-slate-400 flex items-center gap-2">
                    <Sparkles size={14} className="text-yellow-400" />
                    AI Coach
                </h3>
                <button 
                    onClick={getNewMotivation} 
                    disabled={loading}
                    className="p-1.5 rounded-md hover:bg-slate-700 text-slate-500 hover:text-white transition-colors disabled:opacity-50"
                >
                    <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
                </button>
            </div>
            
            <p className="text-lg font-medium leading-relaxed text-slate-200 min-h-[3.5rem]">
                {loading ? (
                    <span className="animate-pulse text-slate-500">Connecting to Gemini...</span>
                ) : (
                    `"${motivation}"`
                )}
            </p>
        </div>
      </div>
    </div>
  );
};

export default MotivationCard;