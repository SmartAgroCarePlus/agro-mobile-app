import React from "react";
import { Text, View, FlatList, SafeAreaView } from "react-native";
import { useRouter } from "expo-router";
import { History as HistoryIcon } from "lucide-react-native";
import DiagnosisCard from "@/components/DiagnosisCard";
import EmptyState from "@/components/EmptyState";
import { useDiagnosisStore } from "@/store/diagnosisStore";
import { useAuthStore } from "@/store/authStore";
import { DiagnosisResult } from "@/types";
import {useGlobalContext} from "@/lib/global-provider";
import LoadingOverlay from "@/components/LoadingOverlay";

export default function Historique() {
    const router = useRouter();
    const historique = useDiagnosisStore((state) => state.history);
    // const utilisateur = useAuthStore((state) => state.user);
    const {user } = useGlobalContext();

    const handleVoirDiagnostic = (diagnostic: DiagnosisResult) => {
        router.push({
            pathname: "/diagnosis/result",
            params: { id: diagnostic.id },
        });
    };

    const handleConnexion = () => {
        router.push("/sign-in");
    };

    const handleNouveauDiagnostic = () => {
        router.push("/diagnosis");
    };

    if (!user) {
        return (
            <View className="flex-1 bg-white justify-center">
                <EmptyState
                    title="Connectez-vous pour voir votre historique"
                    message="Créez un compte pour sauvegarder et suivre vos diagnostics au fil du temps."
                    icon={<HistoryIcon size={48} color="#94a3b8" />} // textLight
                    actionLabel="Se connecter"
                    onAction={handleConnexion}
                />
            </View>
        );
    }

    if (historique.length === 0) {
        return (
            <View className="flex-1 bg-white justify-center">
                <EmptyState
                    title="Aucun diagnostic pour l’instant"
                    message="Votre historique de diagnostics s’affichera ici après votre première analyse."
                    icon={<HistoryIcon size={48} color="#94a3b8" />}
                    actionLabel="Diagnostiquer une plante"
                    onAction={handleNouveauDiagnostic}
                />
            </View>
        );
    }

    return (
        <SafeAreaView className="bg-white h-full">

        <View className="flex-1 bg-white">
            <FlatList
                data={historique}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <DiagnosisCard
                        diagnosis={item}
                        onPress={handleVoirDiagnostic}
                    />
                )}
                contentContainerStyle={{ paddingBottom: 32 }}
                ListHeaderComponent={
                    <View className="px-5">
                        <View className="flex flex-row items-center justify-between mt-5">
                            <Text className="text-xl font-poppins-bold">Historique</Text>
                        </View>
                        <Text className="text-2xl font-poppins-bold text-gray-900 mb-1 mt-5">
                            Historique des diagnostics
                        </Text>
                        <Text className="text-base text-gray-500 font-poppins">
                            Consultez vos analyses précédentes
                        </Text>
                    </View>
                }
            />
        </View>

        </SafeAreaView>
    );
}
