import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import Colors from "@/constants/colors";
import { theme } from "@/constants/theme";
import Card from "./Card";

interface PlantInfoCardProps {
    name: string;
    scientificName: string;
    imageUrl: string;
}

export default function PlantInfoCard({
                                          name,
                                          scientificName,
                                          imageUrl,
                                      }: PlantInfoCardProps) {
    return (
        <Card style={styles.card}>
            <View style={styles.content}>
                <Image
                    source={{ uri: imageUrl }}
                    style={styles.image}
                    contentFit="cover"
                    transition={200}
                />
                <View style={styles.textContainer}>
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.scientificName}>{scientificName}</Text>
                </View>
            </View>
        </Card>
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
        width: 60,
        height: 60,
        borderRadius: theme.borderRadius.md,
    },
    textContainer: {
        marginLeft: theme.spacing.md,
    },
    name: {
        fontSize: 16,
        fontWeight: "600",
        color: Colors.text,
    },
    scientificName: {
        fontSize: 14,
        fontStyle: "italic",
        color: Colors.textLight,
    },
});
