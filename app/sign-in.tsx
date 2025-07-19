import {View, Text, ScrollView, Image, TouchableOpacity, Alert} from 'react-native'
import React from 'react'
import {SafeAreaView} from "react-native-safe-area-context";
import {login} from '@/lib/appwrite';
import {useGlobalContext} from "@/lib/global-provider";

import images from '@/constants/images'
import icons from "@/constants/icons";
import {Redirect, router} from "expo-router";

const SignIn = () => {
    const {refetch, loading, isLogged} = useGlobalContext();

    if (!loading && isLogged) return <Redirect href="/" />; // Route plus spécifique

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

    return (
        <SafeAreaView className="bg-white h-full">
            <ScrollView contentContainerClassName="h-full">
                <Image source={images.onboarding} className="w-full h-4/6" resizeMode="contain" />

                <View className="px-10">
                    <Text className="text-base text-center uppercase font-poppins text-black-100">Bienvenu sur SmartAgro</Text>
                    <Text className="text-3xl text-center mt-2 font-poppins-bold text-black-dark">La santé de vos plantes au {"\n"}
                        <Text className="text-primary">Bout des doigts</Text>
                    </Text>
                    <Text className="text-lg text-center mt-8 font-poppins text-black-100">Se connecter à SmartAgro avec Google</Text>

                    <TouchableOpacity onPress={handleLogin}
                                      className="bg-white shadow-md shadow-zinc-300 rounded-full w-full py-4 mt-5">
                        <View className="flex flex-row justify-center items-center">
                            <Image source={icons.google}
                                   className="w-5 h-5" resizeMode="contain"/>
                            <Text className="text-lg font-poppins-medium ml-2 text-black-dark">Continuez avec Google</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default SignIn