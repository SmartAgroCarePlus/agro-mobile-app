import { Tabs } from 'expo-router';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

export default function Layout() {
  return (
      <Tabs screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: any;
          if (route.name === 'index') iconName = 'home';
          else if (route.name === 'scanner') iconName = 'camera';
          else if (route.name === 'historique') iconName = 'time';
          else if (route.name === 'settings') iconName = 'settings';

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        headerShown: false,
        tabBarActiveTintColor: '#4CAF50',
      })} />
  );
}
