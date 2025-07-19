import React, { useState } from "react";
import { Text, View, ScrollView, Alert, SafeAreaView, ActivityIndicator } from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Camera, Image as ImageIcon, Leaf } from "lucide-react-native";
import Button from "@/components/Button";
import Card from "@/components/Card";
import ImagePickerButton from "@/components/ImagePickerButton";
import LoadingOverlay from "@/components/LoadingOverlay";
import { takePicture, pickImage } from "@/utils/imageUtils";
import { useDiagnosisStore } from "@/store/diagnosisStore";
import {useGlobalContext} from "@/lib/global-provider";
// import { useAuthStore } from "@/store/authStore";

export default function Diagnostic() {
    const router = useRouter();
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const analyzePlant = useDiagnosisStore((state) => state.analyzePlant);
    const addDiagnosis = useDiagnosisStore((state) => state.addDiagnosis);
    // const user = useAuthStore((state) => state.user);
    const {user} = useGlobalContext()

    const handleTakePhoto = async () => {
        const result = await takePicture();
        if (!result.cancelled && result.uri) {
            setSelectedImage(result.uri);
        }
    };

    const handlePickImage = async () => {
        const result = await pickImage();
        if (!result.cancelled && result.uri) {
            setSelectedImage(result.uri);
        }
    };

    const handleAnalyze = async () => {
        if (!selectedImage) {
            Alert.alert("Aucune image sélectionnée", "Veuillez d'abord prendre ou choisir une photo de votre plante.");
            return;
        }

        try {
            setIsLoading(true);
            const result = await analyzePlant(selectedImage);
            if (user) {
                addDiagnosis(result);
            }
            router.push({ pathname: "/diagnosis/result", params: { id: result.id } });
        } catch (error) {
            Alert.alert("Échec de l'analyse", "Un problème est survenu lors de l'analyse. Veuillez réessayer.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <SafeAreaView className="bg-white h-full">
            <View className="px-5">
                <LoadingOverlay visible={isLoading} message="Analyse en cours..." />

                <Text className="text-2xl font-poppins-bold text-black-dark mt-8">Diagnostiquer votre plante</Text>
                <Text className="text-base text-muted mb-6 font-poppins mt-2">
                    Prenez une photo claire de la partie affectée de votre plante pour un diagnostic précis.
                </Text>

                <Card className="p-0 overflow-hidden">
                    {selectedImage ? (
                        <View className="w-full">
                            <Image
                                source={{ uri: selectedImage }}
                                className="w-full h-72"
                                contentFit="cover"
                            />
                            <View className="flex-row justify-center p-4">
                                <Button
                                    title="Changer l'image"
                                    variant="outline"
                                    size="small"
                                    onPress={handlePickImage}
                                    icon={<ImageIcon size={16} color="#22c55e" className="mr-1" />}
                                />
                            </View>
                        </View>
                    ) : (
                        <View className="items-center justify-center px-8 py-10 space-y-4">
                            <Leaf size={48} color="#9ca3af" />
                            <Text className="text-base text-muted text-center mb-2">
                                Prenez ou sélectionnez une photo de votre plante
                            </Text>
                            <ImagePickerButton onCamera={handleTakePhoto} onGallery={handlePickImage} />
                        </View>
                    )}
                </Card>

                {selectedImage && (
                    <View className="mt-6 mb-6">
                        <Text className="text-base font-semibold text-foreground mb-2">Conseils pour de meilleurs résultats :</Text>
                        <Text className="text-sm text-muted mb-1">• Bonne luminosité</Text>
                        <Text className="text-sm text-muted mb-1">• Focus sur la zone affectée</Text>
                        <Text className="text-sm text-muted">• Inclure des parties saines et malades</Text>
                    </View>
                )}

                <Button
                    title="Analyser la plante"
                    onPress={handleAnalyze}
                    disabled={!selectedImage}
                    className="mt-4"
                />

                {!user && (
                    <Text className="text-sm text-muted text-center mt-6">
                        Connectez-vous pour sauvegarder votre historique de diagnostics
                    </Text>
                )}
            </View>
        </SafeAreaView>
    );
}
