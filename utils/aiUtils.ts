import { DiagnosisResult } from "@/types";
import Constants from "expo-constants";
import { FormData } from "undici";

// const API_URL = Constants.expoConfig?.extra?.API_URL ?? "http://localhost:5001";

// Cette fonction simule un appel à une API pour analyser une image de plante
export const analyzePlantImage = async (imageUri: string): Promise<DiagnosisResult> => {
    // Simulation d’un appel API
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Réponse simulée (mock)
    return {
        id: Date.now().toString(),
        plantName: "Tomate",
        disease: "Mildiou tardif",
        confidence: 0.92,
        cause: "Le champignon *Phytophthora infestans* se développe dans des conditions fraîches et humides",
        recommendations: [
            "Retirer et détruire les parties infectées de la plante",
            "Appliquer un fongicide à base de cuivre en prévention",
            "Assurer un bon espacement entre les plantes pour une bonne circulation de l’air",
            "Arroser à la base des plantes pour garder le feuillage sec",
            "Faire une rotation des cultures chaque année pour éviter l’accumulation de maladies dans le sol"
        ],
        imageUri,
        timestamp: Date.now(),
    };
};

// Cette fonction simule la génération de recommandations à l’aide d’une IA
export const getRecommendations = async (
    plantName: string,
    disease: string,
    confidence: number
): Promise<string[]> => {
    // Dans une vraie application, ceci appellerait une API d'IA type LLM
    const messages = [
        {
            role: "system",
            content: "Vous êtes un expert en maladies des plantes. Fournissez des recommandations de traitement.",
        },
        {
            role: "user",
            content: `Fournissez 5 recommandations concises pour traiter ${disease} sur des plants de ${plantName}. Le niveau de confiance du diagnostic est de ${confidence * 100}%.`,
        },
    ];

    try {
        // Simulation d’un appel API
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Réponse simulée - à remplacer par une vraie réponse d’IA dans une app réelle
        return [
            "Retirer et détruire immédiatement les parties infectées",
            "Appliquer un fongicide adapté selon les instructions",
            "Améliorer la circulation de l’air en espaçant les plantes correctement",
            "Arroser à la base pour éviter d’humidifier le feuillage",
            "Pratiquer une rotation des cultures pour réduire les risques"
        ];
    } catch (error) {
        console.error("Erreur lors de la récupération des recommandations :", error);
        return [
            "Retirer les parties infectées",
            "Appliquer un traitement approprié",
            "Assurer un bon entretien des plantes"
        ];
    }
};

/// Simulation d’une API côté backend

// utils/aiUtils.ts

/*
export const analyzePlantImage = async (imageUri: string, userId: string): Promise<DiagnosisResult> => {
    const formData = new FormData();
    formData.append("image", {
        uri: imageUri,
        type: "image/jpeg",
        name: "plant.jpg",
    } as any);
    formData.append("user_id", userId);

    const response = await fetch(`${API_URL}/api/diagnose`, {
        method: "POST",
        body: formData,
    });

    if (!response.ok) throw new Error("Erreur lors du diagnostic");

    const result = await response.json();
    return result;
};

export const fetchDiagnosisHistory = async (userId: string): Promise<DiagnosisResult[]> => {
    const response = await fetch(`${API_URL}/api/history/${userId}`);

    if (!response.ok) throw new Error("Erreur lors du chargement de l'historique");

    const history = await response.json();
    return history;
};
*/
