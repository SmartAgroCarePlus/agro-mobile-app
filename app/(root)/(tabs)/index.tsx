import {View, Text, SafeAreaView, Image} from 'react-native'
import React from 'react'
import {useGlobalContext} from "@/lib/global-provider";
import icons from "@/constants/icons";
import {Redirect, router} from "expo-router";
import images from "@/constants/images";

const Index = () => {
    const {user} = useGlobalContext()

    console.log("🏠 Page d'accueil - Rendu en cours");
    console.log("👤 Utilisateur:", user);
    console.log("🖼️ Avatar URL:", user?.avatar);

    try {
        return (
            <SafeAreaView className="bg-white h-full">
                <View className="px-5 mt-10">
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
                 </View>
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