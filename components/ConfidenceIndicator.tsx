import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Colors from "@/constants/colors";
import { theme } from "@/constants/theme";

interface ConfidenceIndicatorProps {
    confidence: number;
    size?: "small" | "medium" | "large";
    showLabel?: boolean;
}

export default function ConfidenceIndicator({
                                                confidence,
                                                size = "medium",
                                                showLabel = true,
                                            }: ConfidenceIndicatorProps) {
    const getColor = () => {
        if (confidence >= 0.9) return Colors.success;
        if (confidence >= 0.7) return Colors.warning;
        return Colors.danger;
    };

    const getSize = () => {
        switch (size) {
            case "small":
                return { width: 60, height: 60, fontSize: 14 };
            case "medium":
                return { width: 80, height: 80, fontSize: 18 };
            case "large":
                return { width: 100, height: 100, fontSize: 24 };
            default:
                return { width: 80, height: 80, fontSize: 18 };
        }
    };

    const { width, height, fontSize } = getSize();

    return (
        <View style={styles.container}>
            <View
                style={[
                    styles.circle,
                    {
                        width,
                        height,
                        borderColor: getColor(),
                    },
                ]}
            >
                <Text
                    style={[
                        styles.percentage,
                        {
                            color: getColor(),
                            fontSize,
                        },
                    ]}
                >
                    {Math.round(confidence * 100)}%
                </Text>
            </View>
            {showLabel && (
                <Text style={styles.label}>Probabilité</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
    },
    circle: {
        borderWidth: 3,
        borderRadius: 999,
        alignItems: "center",
        justifyContent: "center",
    },
    percentage: {
        fontWeight: "700",
    },
    label: {
        marginTop: theme.spacing.sm,
        fontSize: 14,
        color: Colors.textLight,
    },
});
