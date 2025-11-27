import { GoogleGenAI } from "@google/genai";
import { TimerMode } from "../types";
import { SYSTEM_INSTRUCTION } from "../constants";

const getClient = () => {
  // Check if API key exists to avoid runtime crashes if environment is not set up
  if (!process.env.API_KEY) {
    console.warn("API Key is missing. Gemini features will not work.");
    return null;
  }
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const fetchMotivation = async (mode: TimerMode): Promise<string> => {
  const ai = getClient();
  if (!ai) return "Keep pushing forward! (API Key missing)";

  try {
    const prompt = mode === TimerMode.WORK 
      ? "Give me a quick aggressive motivation boost to focus on work right now." 
      : "Give me a quick tip on how to relax effectively during a short 5 minute break.";

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      }
    });

    return response.text || "Stay focused.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Focus on the process, not the outcome.";
  }
};