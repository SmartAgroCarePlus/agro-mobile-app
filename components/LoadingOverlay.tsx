import {View, Text, ActivityIndicator, Modal, StyleSheet} from 'react-native'
import React from 'react'
import Colors from "@/constants/colors";
import { theme } from "@/constants/theme";

interface LoadingOverlayProps {
    visible: boolean;
    message?: string;
}

export default function LoadingOverlay({
                                           visible,
                                           message = "Loading...",
                                       }: LoadingOverlayProps) {
    return (
        <Modal
            transparent
            animationType="fade"
            visible={visible}
        >
            <View style={styles.container}>
                <View style={styles.content}>
                    <ActivityIndicator size="large" color={Colors.primary} />
                    {message && <Text style={styles.message}>{message}</Text>}
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    content: {
        backgroundColor: Colors.card,
        borderRadius: theme.borderRadius.lg,
        padding: theme.spacing.xl,
        alignItems: "center",
        justifyContent: "center",
        minWidth: 200,
    },
    message: {
        marginTop: theme.spacing.md,
        fontSize: 16,
        color: Colors.text,
        textAlign: "center",
    },
});
