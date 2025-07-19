import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { DiagnosisResult } from "@/types";
import { mockDiagnoses } from "@/mocks/diagnoses";

interface DiagnosisState {
    history: DiagnosisResult[];
    currentDiagnosis: DiagnosisResult | null;
    isAnalyzing: boolean;
    addDiagnosis: (diagnosis: DiagnosisResult) => void;
    clearHistory: () => void;
    setCurrentDiagnosis: (diagnosis: DiagnosisResult | null) => void;
    analyzePlant: (imageUri: string) => Promise<DiagnosisResult>;
    getRecommendations: (diagnosis: DiagnosisResult) => Promise<string[]>;
}

export const useDiagnosisStore = create<DiagnosisState>()(
    persist(
        (set, get) => ({
            history: __DEV__ ? mockDiagnoses : [],
            currentDiagnosis: null,
            isAnalyzing: false,

            addDiagnosis: (diagnosis: DiagnosisResult) => {
                set((state) => ({
                    history: [diagnosis, ...state.history],
                }));
            },

            clearHistory: () => {
                set({ history: [] });
            },

            setCurrentDiagnosis: (diagnosis: DiagnosisResult | null) => {
                set({ currentDiagnosis: diagnosis });
            },

            analyzePlant: async (imageUri: string) => {
                set({ isAnalyzing: true });

                // Simulate API call for plant disease analysis
                await new Promise((resolve) => setTimeout(resolve, 2000));

                // In a real app, we would send the image to an AI service
                // For now, return a mock result
                const mockResult: DiagnosisResult = {
                    id: Date.now().toString(),
                    plantName: "Tomato",
                    disease: "Late Blight",
                    confidence: 0.92,
                    cause: "Phytophthora infestans fungus thrives in cool, wet conditions",
                    recommendations: [
                        "Remove and destroy infected plant parts",
                        "Apply copper-based fungicide as a preventative measure",
                        "Ensure proper spacing between plants for air circulation",
                        "Water at the base of plants to keep foliage dry",
                        "Rotate crops annually to prevent disease buildup in soil"
                    ],
                    imageUri,
                    timestamp: Date.now(),
                };

                set({
                    isAnalyzing: false,
                    currentDiagnosis: mockResult
                });

                return mockResult;
            },

            getRecommendations: async (diagnosis: DiagnosisResult) => {
                // In a real app, we would call an LLM API with the diagnosis details
                // For now, return the mock recommendations
                await new Promise((resolve) => setTimeout(resolve, 1000));
                return diagnosis.recommendations;
            },
        }),
        {
            name: "plant-doctor-diagnoses",
            storage: createJSONStorage(() => AsyncStorage),
            partialize: (state) => ({
                history: state.history,
                // Don't persist these states
                currentDiagnosis: null,
                isAnalyzing: false,
            }),
        }
    )
);