export enum TimerMode {
  WORK = 'WORK',
  BREAK = 'BREAK',
  FINISHED = 'FINISHED'
}

export interface TimerState {
  timeLeft: number;
  isActive: boolean;
  mode: TimerMode;
  currentCycle: number;
  totalCycles: number;
}

export interface GeminiResponse {
  text: string;
}

export interface CycleConfig {
  workDuration: number;
  breakDuration: number;
  cycles: number;
}