import {SafeAreaView, ActivityIndicator, Text} from 'react-native'
import React from 'react'
import {Redirect, Slot} from 'expo-router' // Slot était manquant !
import {useGlobalContext} from "@/lib/global-provider";

const RootLayout = () => {
    const { loading, isLogged } = useGlobalContext();

    if (loading) {
        return (
            <SafeAreaView className="bg-white h-full flex justify-center items-center">
                <ActivityIndicator className="text-primary" size="large" />
                <Text className="text-primary">Chargement...</Text>
            </SafeAreaView>
        );
    }

    if (!isLogged) {
        return <Redirect href="/sign-in" />;
    }

    return <Slot />;
}

export default RootLayout