import { View, Text } from 'react-native';
import React from 'react';
import { DiseaseCardProps } from '@/types/component';

export default function DiseaseCard({ name, confidence, description }: DiseaseCardProps) {
    return (
        <View>
            <Text>{name} ({confidence}%)</Text>
            <Text>{description}</Text>
        </View>
    );
}
