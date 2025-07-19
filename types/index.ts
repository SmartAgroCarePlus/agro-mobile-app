export type DiagnosisResult = {
    id: string;
    plantName: string;
    disease: string;
    confidence: number;
    cause: string;
    recommendations: string[];
    imageUri: string;
    timestamp: number;
};
