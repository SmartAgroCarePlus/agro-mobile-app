import React from "react";
import { StyleSheet, Text, View, ViewStyle } from "react-native";
import Colors from "@/constants/colors";
import { theme } from "@/constants/theme";
import Button from "./Button";

interface EmptyStateProps {
    title: string;
    message: string;
    icon?: React.ReactNode;
    actionLabel?: string;
    onAction?: () => void;
    style?: ViewStyle;
}

export default function EmptyState({
                                       title,
                                       message,
                                       icon,
                                       actionLabel,
                                       onAction,
                                       style,
                                   }: EmptyStateProps) {
    return (
        <View style={[styles.container, style]}>
            {icon && <View style={styles.iconContainer}>{icon}</View>}
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.message}>{message}</Text>
            {actionLabel && onAction && (
                <Button
                    title={actionLabel}
                    onPress={onAction}
                    variant="primary"
                    style={styles.button}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        padding: theme.spacing.xl,
    },
    iconContainer: {
        marginBottom: theme.spacing.md,
    },
    title: {
        fontSize: 18,
        fontWeight: "600",
        color: Colors.text,
        textAlign: "center",
        marginBottom: theme.spacing.sm,
    },
    message: {
        fontSize: 16,
        color: Colors.textLight,
        textAlign: "center",
        marginBottom: theme.spacing.lg,
    },
    button: {
        minWidth: 150,
    },
});