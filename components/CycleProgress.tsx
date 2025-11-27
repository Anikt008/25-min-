import React from 'react';
import { CheckCircle2, Circle } from 'lucide-react';

interface CycleProgressProps {
  currentCycle: number;
  totalCycles: number;
  completedCycles: number; // For keeping track if current is active or done
}

const CycleProgress: React.FC<CycleProgressProps> = ({ currentCycle, totalCycles }) => {
  return (
    <div className="w-full max-w-md mx-auto mt-8">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold tracking-wider text-slate-500 uppercase">Cycle Progress</span>
        <span className="text-xs font-semibold text-slate-400">{Math.min(currentCycle, totalCycles)} / {totalCycles}</span>
      </div>
      
      <div className="flex justify-between gap-1">
        {Array.from({ length: totalCycles }).map((_, index) => {
          const cycleNum = index + 1;
          const isCompleted = cycleNum < currentCycle;
          const isCurrent = cycleNum === currentCycle;

          return (
            <div key={index} className="flex flex-col items-center gap-2 flex-1">
              <div 
                className={`
                  w-full h-1.5 rounded-full transition-all duration-300
                  ${isCompleted ? 'bg-indigo-500' : isCurrent ? 'bg-rose-500 animate-pulse' : 'bg-slate-800'}
                `}
              />
              <div className="hidden sm:block">
                 {isCompleted ? (
                   <CheckCircle2 size={12} className="text-indigo-500" />
                 ) : (
                   <Circle size={12} className={isCurrent ? 'text-rose-500' : 'text-slate-800'} fill={isCurrent ? "currentColor" : "none"} />
                 )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CycleProgress;