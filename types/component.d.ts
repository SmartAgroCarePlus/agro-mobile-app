import { ReactNode } from 'react';

export interface BaseScreenProps {
    title?: string;
    children: ReactNode;
    backgroundColor?: string;
}

export interface DiseaseCardProps {
    name: string;
    confidence: number; // pourcentage de détection
    description: string;
}
