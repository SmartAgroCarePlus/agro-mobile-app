import { DiagnosisResult } from "@/types";

export const mockDiagnoses: DiagnosisResult[] = [
    {
        id: "1",
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
        imageUri: "https://images.unsplash.com/photo-1592496001020-d31bd830651f?q=80&w=1000",
        timestamp: Date.now() - 86400000 * 2, // 2 days ago
    },
    {
        id: "2",
        plantName: "Apple Tree",
        disease: "Apple Scab",
        confidence: 0.88,
        cause: "Venturia inaequalis fungus that overwinters in fallen leaves",
        recommendations: [
            "Rake and destroy fallen leaves in autumn",
            "Prune trees to improve air circulation",
            "Apply fungicide sprays in early spring",
            "Choose resistant apple varieties for new plantings",
            "Maintain proper tree nutrition with balanced fertilizer"
        ],
        imageUri: "https://images.unsplash.com/photo-1610397962076-02407a169a5b?q=80&w=1000",
        timestamp: Date.now() - 86400000 * 5, // 5 days ago
    },
    {
        id: "3",
        plantName: "Rose",
        disease: "Black Spot",
        confidence: 0.95,
        cause: "Diplocarpon rosae fungus spreads in warm, humid conditions",
        recommendations: [
            "Remove and dispose of infected leaves",
            "Apply fungicide at first sign of disease",
            "Water at soil level to avoid wetting foliage",
            "Ensure adequate spacing between plants",
            "Choose resistant rose varieties for future plantings"
        ],
        imageUri: "https://images.unsplash.com/photo-1559563362-c667ba5f5480?q=80&w=1000",
        timestamp: Date.now() - 86400000 * 10, // 10 days ago
    },
];
