export interface Disease {
    id: string;
    name: string;
    description: string;
    preventionTips: string[];
}

export interface ScanResult {
    imageUri: string;
    date: string;
    disease: Disease;
    confidence: number;
}

export interface HistoryItem extends ScanResult {}
