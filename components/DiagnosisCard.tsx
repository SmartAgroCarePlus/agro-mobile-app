import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { Calendar, ChevronRight } from "lucide-react-native";
import { DiagnosisResult } from "@/types";
import Colors from "@/constants/colors";
import { theme } from "@/constants/theme";
import Card from "./Card";

interface DiagnosisCardProps {
    diagnosis: DiagnosisResult;
    onPress: (diagnosis: DiagnosisResult) => void;
}

export default function DiagnosisCard({ diagnosis, onPress }: DiagnosisCardProps) {
    const formatDate = (timestamp: number) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    const getConfidenceColor = (confidence: number) => {
        if (confidence >= 0.9) return Colors.success;
        if (confidence >= 0.7) return Colors.warning;
        return Colors.danger;
    };

    return (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => onPress(diagnosis)}
        >
            <Card style={styles.card}>
                <View style={styles.content}>
                    <Image
                        source={{ uri: diagnosis.imageUri }}
                        style={styles.image}
                        contentFit="cover"
                        transition={200}
                    />
                    <View style={styles.details}>
                        <Text style={styles.plantName}>{diagnosis.plantName}</Text>
                        <Text style={styles.disease}>{diagnosis.disease}</Text>
                        <View style={styles.confidenceContainer}>
                            <Text style={styles.confidenceLabel}>Confiance:</Text>
                            <Text
                                style={[
                                    styles.confidenceValue,
                                    { color: getConfidenceColor(diagnosis.confidence) },
                                ]}
                            >
                                {Math.round(diagnosis.confidence * 100)}%
                            </Text>
                        </View>
                        <View style={styles.dateContainer}>
                            <Calendar size={14} color={Colors.textLight} />
                            <Text style={styles.date}>{formatDate(diagnosis.timestamp)}</Text>
                        </View>
                    </View>
                    <ChevronRight size={20} color={Colors.textLight} />
                </View>
            </Card>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        marginVertical: theme.spacing.sm,
        marginHorizontal: theme.spacing.md,
    },
    content: {
        flexDirection: "row",
        alignItems: "center",
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: theme.borderRadius.md,
    },
    details: {
        flex: 1,
        marginLeft: theme.spacing.md,
    },
    plantName: {
        fontSize: 16,
        fontWeight: "600",
        color: Colors.text,
    },
    disease: {
        fontSize: 14,
        color: Colors.textLight,
        marginBottom: theme.spacing.xs,
    },
    confidenceContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 2,
    },
    confidenceLabel: {
        fontSize: 12,
        color: Colors.textLight,
        marginRight: 4,
    },
    confidenceValue: {
        fontSize: 12,
        fontWeight: "600",
    },
    dateContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    date: {
        fontSize: 12,
        color: Colors.textLight,
        marginLeft: 4,
    },
});
