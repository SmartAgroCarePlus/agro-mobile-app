import { DiagnosisResult } from "@/types";
import Constants from "expo-constants";
import {FormData} from "undici";

// const API_URL = Constants.expoConfig?.extra?.API_URL ?? "http://localhost:5001";


// This would be a real API call in a production app
export const analyzePlantImage = async (imageUri: string): Promise<DiagnosisResult> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock response
    return {
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
};

export const getRecommendations = async (
    plantName: string,
    disease: string,
    confidence: number
): Promise<string[]> => {
    // In a real app, this would call an LLM API
    const messages = [
        {
            role: "system",
            content: "You are a plant disease expert. Provide treatment recommendations for plant diseases.",
        },
        {
            role: "user",
            content: `Provide 5 concise treatment recommendations for ${disease} on ${plantName} plants. The diagnosis confidence is ${confidence * 100}%.`,
        },
    ];

    try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Mock response - in a real app we would call the LLM API
        return [
            "Remove and destroy infected plant parts immediately",
            "Apply appropriate fungicide according to label instructions",
            "Improve air circulation around plants by proper spacing",
            "Water at the base of plants to keep foliage dry",
            "Practice crop rotation to prevent disease buildup in soil"
        ];
    } catch (error) {
        console.error("Error getting recommendations:", error);
        return [
            "Remove infected plant parts",
            "Apply appropriate treatment",
            "Ensure proper plant care"
        ];
    }
};

/// Backend API simulation

// utils/aiUtils.ts

// export const analyzePlantImage = async (imageUri: string, userId: string): Promise<DiagnosisResult> => {
//     const formData = new FormData();
//     formData.append("image", {
//         uri: imageUri,
//         type: "image/jpeg",
//         name: "plant.jpg",
//     } as any);
//     formData.append("user_id", userId);
//
//     const response = await fetch(`${API_URL}/api/diagnose`, {
//         method: "POST",
//         body: formData,
//     });
//
//     if (!response.ok) throw new Error("Erreur lors du diagnostic");
//
//     const result = await response.json();
//     return result;
// };
//
// export const fetchDiagnosisHistory = async (userId: string): Promise<DiagnosisResult[]> => {
//     const response = await fetch(`${API_URL}/api/history/${userId}`);
//
//     if (!response.ok) throw new Error("Erreur lors du chargement de l'historique");
//
//     const history = await response.json();
//     return history;
// };
