import React from 'react';
import { TimerMode } from '../types';

interface TimerDisplayProps {
  timeLeft: number;
  totalTime: number;
  mode: TimerMode;
}

const TimerDisplay: React.FC<TimerDisplayProps> = ({ timeLeft, totalTime, mode }) => {
  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Calculate circle progress
  // Radius 120, Circumference = 2 * PI * 120 ≈ 753.98
  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  const progress = timeLeft / totalTime;
  const dashoffset = circumference * (1 - progress);

  // Dynamic colors based on mode
  const getColor = () => {
    switch (mode) {
      case TimerMode.WORK: return 'stroke-rose-500 text-rose-500 drop-shadow-[0_0_15px_rgba(244,63,94,0.5)]';
      case TimerMode.BREAK: return 'stroke-emerald-500 text-emerald-500 drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]';
      default: return 'stroke-indigo-500 text-indigo-500';
    }
  };

  return (
    <div className="relative flex items-center justify-center w-80 h-80 mx-auto my-8">
      {/* Background Circle */}
      <svg className="absolute w-full h-full transform -rotate-90">
        <circle
          cx="160"
          cy="160"
          r={radius}
          className="stroke-slate-800 fill-none"
          strokeWidth="12"
        />
        {/* Progress Circle */}
        <circle
          cx="160"
          cy="160"
          r={radius}
          className={`fill-none transition-all duration-1000 ease-linear ${getColor()}`}
          strokeWidth="12"
          strokeDasharray={circumference}
          strokeDashoffset={dashoffset}
          strokeLinecap="round"
        />
      </svg>
      
      {/* Text Display */}
      <div className="z-10 text-center">
        <div className={`text-7xl font-mono font-bold tracking-tighter transition-colors duration-300 ${mode === TimerMode.WORK ? 'text-rose-100' : 'text-emerald-100'}`}>
          {formatTime(timeLeft)}
        </div>
        <div className={`mt-2 text-sm font-semibold uppercase tracking-widest opacity-80 ${mode === TimerMode.WORK ? 'text-rose-400' : 'text-emerald-400'}`}>
          {mode === TimerMode.FINISHED ? 'COMPLETED' : mode === TimerMode.WORK ? 'FOCUS TIME' : 'BREAK TIME'}
        </div>
      </div>
    </div>
  );
};

export default TimerDisplay;