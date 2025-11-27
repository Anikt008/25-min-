import React from 'react';
import { Play, Pause, RotateCcw, SkipForward } from 'lucide-react';
import { TimerMode } from '../types';

interface ControlsProps {
  isActive: boolean;
  mode: TimerMode;
  onToggle: () => void;
  onReset: () => void;
  onSkip: () => void;
}

const Controls: React.FC<ControlsProps> = ({ isActive, mode, onToggle, onReset, onSkip }) => {
  const getButtonColor = () => {
    if (mode === TimerMode.WORK) return "bg-rose-500 hover:bg-rose-600 shadow-rose-500/20";
    if (mode === TimerMode.BREAK) return "bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/20";
    return "bg-indigo-500 hover:bg-indigo-600";
  };

  return (
    <div className="flex items-center justify-center gap-6 mt-8">
      <button
        onClick={onReset}
        className="p-4 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-slate-600"
        title="Reset Current Cycle"
      >
        <RotateCcw size={24} />
      </button>

      <button
        onClick={onToggle}
        className={`p-6 rounded-full shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95 text-white ${getButtonColor()}`}
      >
        {isActive ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-1" />}
      </button>

      <button
        onClick={onSkip}
        className="p-4 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-slate-600"
        title="Skip Phase"
      >
        <SkipForward size={24} />
      </button>
    </div>
  );
};

export default Controls;