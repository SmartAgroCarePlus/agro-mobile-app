// Une maladie détectée par l'IA
export interface DetectedDisease {
    label: string;             // ex : "Tomato Early Blight"
    confidence: number;        // ex : 0.92 (92%)
    description?: string;      // En option : affiché côté UI
    preventionTips?: string[]; // Conseils si dispo
}

// La requête envoyée au modèle (ex: image base64 ou URI)
export interface DetectionRequest {
    imageUri: string;          // URI ou path de l'image dans l'app
    base64Image?: string;      // si l'image est envoyée encodée
    timestamp?: string;        // optionnel : date du scan
}

// Résultat brut renvoyé par l'IA
export interface DetectionResponse {
    status: 'success' | 'error';
    disease?: DetectedDisease;
    errorMessage?: string;
}

// Historique d'une détection effectuée
export interface DetectionHistoryItem {
    id: string;
    imageUri: string;
    detectedAt: string;         // date ISO ex : "2025-06-30T14:55:00Z"
    disease: DetectedDisease;
}
