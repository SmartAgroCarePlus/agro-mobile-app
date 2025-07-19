import { StyleSheet } from "react-native";
import Colors from "./colors";

export const theme = {
    spacing: {
        xs: 4,
        sm: 8,
        md: 16,
        lg: 24,
        xl: 32,
        xxl: 48,
    },
    borderRadius: {
        sm: 4,
        md: 8,
        lg: 12,
        xl: 16,
        xxl: 24,
        full: 9999,
    },
};

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    card: {
        backgroundColor: Colors.card,
        borderRadius: theme.borderRadius.lg,
        padding: theme.spacing.md,
        marginVertical: theme.spacing.sm,
        marginHorizontal: theme.spacing.md,
        shadowColor: Colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 2,
    },
    title: {
        fontSize: 24,
        fontWeight: "700",
        color: Colors.text,
        marginBottom: theme.spacing.sm,
    },
    subtitle: {
        fontSize: 18,
        fontWeight: "600",
        color: Colors.text,
        marginBottom: theme.spacing.sm,
    },
    text: {
        fontSize: 16,
        color: Colors.text,
        lineHeight: 24,
    },
    textLight: {
        fontSize: 16,
        color: Colors.textLight,
        lineHeight: 24,
    },
    button: {
        backgroundColor: Colors.primary,
        borderRadius: theme.borderRadius.md,
        paddingVertical: theme.spacing.md,
        paddingHorizontal: theme.spacing.lg,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonText: {
        color: Colors.background,
        fontSize: 16,
        fontWeight: "600",
    },
    buttonOutline: {
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: Colors.primary,
        borderRadius: theme.borderRadius.md,
        paddingVertical: theme.spacing.md,
        paddingHorizontal: theme.spacing.lg,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonOutlineText: {
        color: Colors.primary,
        fontSize: 16,
        fontWeight: "600",
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
    },
    center: {
        alignItems: "center",
        justifyContent: "center",
    },
    spaceBetween: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
});
