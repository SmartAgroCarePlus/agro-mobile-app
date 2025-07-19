import {Stack, Tabs} from 'expo-router';
import React, {useEffect} from 'react';
import './global.css';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import GlobalProvider from "@/lib/global-provider";

export default function Layout() {
  const [fontsLoaded] = useFonts({
    'Poppins': require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-ExtraBold': require('../assets/fonts/Poppins-ExtraBold.ttf'),
    'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'Poppins-Thin': require('../assets/fonts/Poppins-Thin.ttf'),
    'Poppins-Light': require('../assets/fonts/Poppins-Light.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync()
        .catch((error) => {
          console.warn('Error hiding splash screen:', error);
        });
    }
  }, [fontsLoaded]);
    if (!fontsLoaded) {
        return null; // or a loading indicator
    }
  return (
      <GlobalProvider>
        <Tabs screenOptions={{ headerShown: false }} />
      </GlobalProvider>
  );
}
