// import {View, Text, Image} from 'react-native'
// import React from 'react'
// import {Tabs} from "expo-router";
// import icons from "@/constants/icons";
// import Colors from "@/constants/colors";
// import {Leaf, History} from 'lucide-react-native';
//
// const TabIcon = ({ focused, icon, title } : {focused: boolean, icon: any, title: string}) => {
//     return (
//         <View className="flex-1 mt-3 flex flex-col items-center">
//             <Image source={icon} tintColor={focused ? '#4CAF50' : '#666666'} resizeMode="contain" className="size-6"/>
//             <Text className={`${focused ? 'text-primary font-poppins-medium' : 'text-textSecondary font-poppins'} text-xs w-full text-center mt-1`}>{title}</Text>
//         </View>
//     );
// }
//
// const TabsLayout = () => {
//     return (
//         <Tabs
//             screenOptions={{ // Correction: screenOptions au lieu de ScreenOptions
//                 tabBarShowLabel: false,
//                 tabBarStyle: {
//                     backgroundColor: 'white',
//                     position: 'absolute',
//                     borderTopColor: '#4CAF50',
//                     borderTopWidth: 1,
//                     minHeight: 70,
//                 }
//             }}
//         >
//             <Tabs.Screen
//                 name="index"
//                 options={{
//                     title: 'Accueil',
//                     headerShown: false,
//                     tabBarLabel: () => null,
//                     tabBarIcon: ({focused}) => (
//                         <TabIcon icon={icons.home} title="Accueil" focused={focused} />
//                     ),
//                 }}
//             />
//             <Tabs.Screen
//                 name="diagnostic"
//                 options={{
//                     title: 'Diagnostic',
//                     headerShown: false,
//                     tabBarLabel: () => null,
//                     tabBarIcon: ({focused}) => (
//                         <TabIcon icon={<Leaf size={18} color={Colors.primary}/>} title="Diagnostic" focused={focused} />
//                     ),
//                 }}
//             />
//             <Tabs.Screen
//                 name="historique"
//                 options={{
//                     title: 'Historique',
//                     headerShown: false,
//                     tabBarLabel: () => null,
//                     tabBarIcon: ({focused}) => (
//                         <TabIcon icon={<History size={22} color={Colors.primary} />} title="Historique" focused={focused} />
//                     ),
//                 }}
//             />
//
//             <Tabs.Screen
//                 name="profile"
//                 options={{
//                     title: 'Profile',
//                     headerShown: false,
//                     tabBarLabel: () => null,
//                     tabBarIcon: ({focused}) => (
//                         <TabIcon icon={icons.user} title="Profile" focused={focused} />
//                     ),
//                 }}
//             />
//         </Tabs>
//     )
// }
// export default TabsLayout

import {View, Text} from 'react-native'
import React from 'react'
import {Tabs} from "expo-router";

const TabsLayout = () => {
    console.log("📱 TabsLayout - Initialisation");

    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel: true,
                tabBarStyle: {
                    backgroundColor: 'white',
                    borderTopColor: '#4CAF50',
                    borderTopWidth: 1,
                    minHeight: 70,
                },
                headerShown: false,
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Accueil',
                    tabBarLabel: 'Accueil',
                }}
            />
            <Tabs.Screen
                name="diagnostic"
                options={{
                    title: 'Diagnostic',
                    tabBarLabel: 'Diagnostic',
                }}
            />
            <Tabs.Screen
                name="historique"
                options={{
                    title: 'Historique',
                    tabBarLabel: 'Historique',
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarLabel: 'Profile',
                }}
            />
        </Tabs>
    )
}

export default TabsLayout