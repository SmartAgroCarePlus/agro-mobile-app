import {View, Text, SafeAreaView, Image, TouchableOpacity, ScrollView, Alert} from 'react-native'
import React from 'react'
import {useGlobalContext} from "@/lib/global-provider";
import icons from "@/constants/icons";
import {Redirect, router} from "expo-router";
import images from "@/constants/images";
import Button from "@/components/Button";
import {Leaf, AlertCircle, ArrowRight} from "lucide-react-native";
import {Colors} from "@/constants/colors";
import Card from "@/components/Card";
import {commonPlants, commonDiseases} from "@/mocks/plant";
import {login} from "@/lib/appwrite";



const Index = () => {
    const {user} = useGlobalContext()

    const handleDiagnose = () => {
        router.push("/diagnostic");
    };

    const handleLogin = async () => {
        try {
            console.log("🔐 Début du processus de connexion");
            const result = await login();

            if (result) {
                console.log("✅ Login réussi, mise à jour du contexte...");
                await refetch();
                console.log("✅ Contexte mis à jour, redirection en cours...");
                // La redirection sera gérée automatiquement par le contexte global
            } else {
                console.log("❌ Échec du login");
                Alert.alert('Erreur', 'Échec de la connexion');
            }
        } catch (error) {
            console.error("❌ Erreur lors du handleLogin:", error);
            Alert.alert('Erreur', 'Une erreur est survenue lors de la connexion');
        }
    };



    console.log("🏠 Page d'accueil - Rendu en cours");
    console.log("👤 Utilisateur:", user);
    console.log("🖼️ Avatar URL:", user?.avatar);

    try {
        return (
            <SafeAreaView className="bg-white h-full">
                <ScrollView className="px-5 mt-10">
                    <View className="flex flex-row items-center justify-between mt-5">
                        <View className="flex flex-row">
                            <Image
                                source={{ uri: user?.avatar }}
                                className="size-12 rounded-full"
                            />

                            <View className="flex flex-col items-start ml-2 justify-center">
                                <Text className="text-xs font-poppins text-black-100">
                                    Bonjour
                                </Text>
                                <Text className="text-base font-poppins-medium text-black-300">
                                    {user?.name}
                                </Text>
                            </View>
                        </View>
                        <Image source={icons.bell} className="size-6" />
                    </View>
                    <View>
                        <Text className="text-2xl font-poppins-bold text-black-dark mt-8">Smart Agro</Text>
                        <Text className="text-base text-muted mb-6 font-poppins mt-2">
                            Votre assistant personnel pour la santé de vos plantes </Text>
                    </View>
                    <Card className="bg-primary rounded-2xl p-5 shadow-lg">
                        <Text className="text-xl font-poppins-semibold text-white">Diagnostiquer votre plante</Text>
                        <Text className="text-sm text-white/80 mb-4 mt-3">
                            Prenez une photo de votre plante pour identifier les maladies et recevoir des recommandations de traitement.
                        </Text>
                        <Button
                            title="Lancer le diagnostic"
                            style={{backgroundColor: "#FFC107"}}
                            onPress={handleDiagnose}
                            icon={<Leaf size={18} color={"#FFFFFF"} style={{ marginRight: 8 }}/>}
                            className=" py-3 px-4 rounded-xl text-white flex-row items-center justify-center"
                        />
                    </Card>

                    {!user && (
                        <Card className="border border-muted rounded-xl p-4 mt-4 bg-background">
                            <View className="flex-row justify-between items-center">
                                <View className="flex-1 mr-4">
                                    <Text className="text-base font-poppins-semibold text-text">Sauvegardez vos diagnostics</Text>
                                    <Text className="text-sm text-muted-foreground">
                                        Connectez-vous pour suivre l’historique de santé de vos plantes.
                                    </Text>
                                </View>
                                <Button
                                    title="Se connecter"
                                    variant="outline"
                                    size="small"
                                    onPress={handleLogin}
                                    className="border border-primary text-primary rounded px-3 py-1"
                                />
                            </View>
                        </Card>
                    )}

                    <View className="mt-6">
                        <View className="flex-row justify-between items-center mb-2 px-1">
                            <Text className="text-lg font-poppins-semibold text-text">Plantes courantes</Text>
                            <TouchableOpacity>
                                <Text className="text-primary font-poppins-medium">Voir tout</Text>
                            </TouchableOpacity>
                        </View>

                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ paddingHorizontal: 4 }}
                        >
                            {commonPlants.slice(0, 4).map((plant) => (
                                <TouchableOpacity
                                    key={plant.id}
                                    className="mr-3 w-24 items-center"
                                    activeOpacity={0.8}
                                >
                                    <Image
                                        source={{ uri: plant.imageUrl }}
                                        className="w-24 h-24 rounded-xl mb-1"
                                        contentFit="cover"
                                    />
                                    <Text className="text-center text-sm text-text font-medium">{plant.name}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>

                    <View className="mt-6">
                        <View className="flex-row justify-between items-center mb-2 px-1">
                            <Text className="text-lg font-poppins-semibold text-text">Maladies fréquentes</Text>
                            <TouchableOpacity>
                                <Text className="text-primary font-poppins-medium">Voir tout</Text>
                            </TouchableOpacity>
                        </View>

                        {commonDiseases.slice(0, 3).map((disease) => (
                            <TouchableOpacity
                                key={disease.id}
                                className="flex-row items-start bg-muted rounded-xl p-4 mb-3"
                                activeOpacity={0.8}
                            >
                                <View className="w-8 h-8 bg-danger rounded-full items-center justify-center mr-3">
                                    <AlertCircle size={20} color={"#ffffff"} />
                                </View>
                                <View className="flex-1">
                                    <Text className="text-base font-semibold text-text">{disease.name}</Text>
                                    <Text className="text-sm text-muted-foreground">Affecte : {disease.affectedPlants.join(", ")}</Text>
                                    <Text className="text-sm text-black-darkGray mt-1" numberOfLines={2}>{disease.symptoms}</Text>
                                </View>
                                <ArrowRight size={16} color={"#666666"} />
                            </TouchableOpacity>
                        ))}
                    </View>

                </ScrollView>
            </SafeAreaView>
        );
    } catch (error) {
        console.error("❌ Erreur dans le rendu Index:", error);
        return (
            <SafeAreaView className="bg-white h-full">
                <View className="px-5 mt-10">
                    <Text>Erreur de rendu</Text>
                </View>
            </SafeAreaView>
        );
    }
}

export default Index;