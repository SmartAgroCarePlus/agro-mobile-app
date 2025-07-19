import React, { useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, Share } from "react-native";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Share2, AlertTriangle, Check, Info } from "lucide-react-native";
import Colors from "@/constants/colors";
import { theme } from "@/constants/theme";
import Button from "@/components/Button";
import Card from "@/components/Card";
import ConfidenceIndicator from "@/components/ConfidenceIndicator";
import { useDiagnosisStore } from "@/store/diagnosisStore";
import { useAuthStore } from "@/store/authStore";
import {useGlobalContext} from "@/lib/global-provider";
import LoadingOverlay from "@/components/LoadingOverlay";


export default function DiagnosisResultScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();

    const history = useDiagnosisStore((state) => state.history);
    const currentDiagnosis = useDiagnosisStore((state) => state.currentDiagnosis);
    // const user = useGlobalContext((state) => state.user);
    const { user } = useGlobalContext();

    // Find the diagnosis from history or use current diagnosis
    const diagnosis = history.find((d) => d.id === id) || currentDiagnosis;

    useEffect(() => {
        // If no diagnosis found and not logged in, redirect to diagnose screen
        if (!diagnosis && !user) {
            router.replace("/diagnose");
        }
    }, [diagnosis, user, router]);

    if (!diagnosis) {
        return (
            <View style={[styles.container, styles.center]}>
                <Text>Chargement du diagnostique...</Text>
            </View>
        );
    }

    const handleShare = async () => {
        try {
            await Share.share({
                message: `J'ai diagnostiqué ma ${diagnosis.plantName}
                avec Smart Agro et j'ai trouvé ${diagnosis.disease} 
                avec ${Math.round(diagnosis.confidence * 100)}% 
                de confiance. Voici quelques recommandations : ${diagnosis.recommendations.join(", ")}`,
            });
        } catch (error) {
            console.error("Erreur de partage du diagnostique:", error);
        }
    };

    const handleNewDiagnosis = () => {
        router.replace("/diagnostic");
    };

    const getSeverityLevel = (confidence: number) => {
        if (confidence >= 0.9) return "High";
        if (confidence >= 0.7) return "Medium";
        return "Low";
    };

    const getSeverityColor = (confidence: number) => {
        if (confidence >= 0.9) return Colors.danger;
        if (confidence >= 0.7) return Colors.warning;
        return Colors.success;
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <View className="flex flex-row items-center justify-between mt-5 px-5">
                <Text className="text-xl font-poppins-bold">Resultat</Text>
            </View>
            <View style={styles.imageContainer} className="mt-5">
                <Image
                    source={{ uri: diagnosis.imageUri }}
                    style={styles.image}
                    contentFit="cover"
                />
            </View>

            <View style={styles.resultContainer}>
                <View style={styles.header}>
                    <View>
                        <Text style={styles.plantName}>{diagnosis.plantName}</Text>
                        <Text style={styles.diseaseName}>{diagnosis.disease}</Text>
                    </View>
                    <ConfidenceIndicator confidence={diagnosis.confidence} />
                </View>

                <Card style={styles.severityCard}>
                    <View style={styles.severityHeader}>
                        <AlertTriangle size={20} color={getSeverityColor(diagnosis.confidence)} />
                        <Text style={[styles.severityText, { color: getSeverityColor(diagnosis.confidence) }]}>
                            {getSeverityLevel(diagnosis.confidence)} Gravité
                        </Text>
                    </View>
                    <Text style={styles.causeText}>{diagnosis.cause}</Text>
                </Card>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Recommendations</Text>
                    {diagnosis.recommendations.map((recommendation, index) => (
                        <View key={index} style={styles.recommendationItem}>
                            <Check size={18} color={Colors.primary} style={styles.checkIcon} />
                            <Text style={styles.recommendationText}>{recommendation}</Text>
                        </View>
                    ))}
                </View>

                <Card style={styles.infoCard} variant="outlined">
                    <View style={styles.infoHeader}>
                        <Info size={18} color={Colors.primary} />
                        <Text style={styles.infoTitle}>Prochaine etape</Text>
                    </View>
                    <Text style={styles.infoText}>
                        Suivez les recommendation suivantes pour traité votre plante. Surveillez son évolution et envisagez un diagnostic de suivi dans 1 à 2 semaines pour vérifier l’amélioration.
                    </Text>
                </Card>

                <View style={styles.actions}>
                    <Button
                        title="Partager le diagnostique"
                        variant="outline"
                        onPress={handleShare}
                        icon={<Share2 size={18} color={Colors.primary} style={{ marginRight: 8 }} />}
                        style={styles.shareButton}
                    />
                    <Button
                        title="Nouveau diagnostique"
                        onPress={handleNewDiagnosis}
                        style={styles.newButton}
                    />
                </View>

                {!user && (
                    <Text style={styles.loginPrompt}>
                        Connectez-vous pour sauvegardez dans votre historique de diagnostique
                    </Text>
                )}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    contentContainer: {
        paddingBottom: theme.spacing.xl,
    },
    center: {
        justifyContent: "center",
        alignItems: "center",
    },
    imageContainer: {
        width: "100%",
        height: 250,
    },
    image: {
        width: "100%",
        height: "100%",
    },
    resultContainer: {
        padding: theme.spacing.lg,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: theme.spacing.lg,
    },
    plantName: {
        fontSize: 16,
        color: Colors.textLight,
        marginBottom: 4,
    },
    diseaseName: {
        fontSize: 24,
        fontWeight: "700",
        color: Colors.text,
    },
    severityCard: {
        backgroundColor: "rgba(211, 47, 47, 0.05)",
        marginBottom: theme.spacing.lg,
    },
    severityHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: theme.spacing.xs,
    },
    severityText: {
        fontSize: 16,
        fontWeight: "600",
        marginLeft: theme.spacing.xs,
    },
    causeText: {
        fontSize: 14,
        color: Colors.text,
        lineHeight: 20,
    },
    section: {
        marginBottom: theme.spacing.lg,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: Colors.text,
        marginBottom: theme.spacing.md,
    },
    recommendationItem: {
        flexDirection: "row",
        marginBottom: theme.spacing.sm,
    },
    checkIcon: {
        marginRight: theme.spacing.sm,
        marginTop: 2,
    },
    recommendationText: {
        flex: 1,
        fontSize: 16,
        color: Colors.text,
        lineHeight: 22,
    },
    infoCard: {
        marginBottom: theme.spacing.lg,
    },
    infoHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: theme.spacing.xs,
    },
    infoTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: Colors.primary,
        marginLeft: theme.spacing.xs,
    },
    infoText: {
        fontSize: 14,
        color: Colors.text,
        lineHeight: 20,
    },
    actions: {
        flexDirection: "row",
        marginBottom: theme.spacing.md,
    },
    shareButton: {
        flex: 1,
        marginRight: theme.spacing.sm,
    },
    newButton: {
        flex: 1,
        marginLeft: theme.spacing.sm,
    },
    loginPrompt: {
        fontSize: 14,
        color: Colors.textLight,
        textAlign: "center",
    },
});