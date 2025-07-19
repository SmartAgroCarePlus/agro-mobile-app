import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Camera, Image as ImageIcon } from "lucide-react-native";
import Colors from "@/constants/colors";
import { theme } from "@/constants/theme";

interface ImagePickerButtonProps {
    onCamera: () => void;
    onGallery: () => void;
}

export default function ImagePickerButton({
                                              onCamera,
                                              onGallery,
                                          }: ImagePickerButtonProps) {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.button}
                activeOpacity={0.7}
                onPress={onCamera}
            >
                <Camera size={24} color={Colors.primary} />
                <Text style={styles.buttonText}>Prendre une photo</Text>
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity
                style={styles.button}
                activeOpacity={0.7}
                onPress={onGallery}
            >
                <ImageIcon size={24} color={Colors.primary} />
                <Text style={styles.buttonText}>Choisissez dans la galerie</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        backgroundColor: Colors.card,
        borderRadius: theme.borderRadius.lg,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: Colors.border,
    },
    button: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: theme.spacing.md,
    },
    buttonText: {
        marginTop: theme.spacing.xs,
        fontSize: 14,
        color: Colors.primary,
        fontWeight: "500",
    },
    divider: {
        width: 1,
        backgroundColor: Colors.border,
    },
});