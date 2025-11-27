import { CycleConfig } from './types';

// Standard 25-5 Pomodoro settings
export const DEFAULT_CONFIG: CycleConfig = {
  workDuration: 25 * 60, // 25 minutes in seconds
  breakDuration: 5 * 60,  // 5 minutes in seconds
  cycles: 8
};

// For testing purposes (uncomment to test cycles quickly)
// export const DEFAULT_CONFIG: CycleConfig = {
//   workDuration: 5,
//   breakDuration: 3,
//   cycles: 8
// };

export const SYSTEM_INSTRUCTION = `
You are a high-performance productivity coach. 
Your goal is to provide very short, punchy, and motivating advice.
If the user is in WORK mode, tell them to focus, ignore distractions, and grind.
If the user is in BREAK mode, tell them to stretch, breathe, drink water, and reset.
Keep responses under 25 words.
`;
