import { useEffect, useState } from 'react';
import { router } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity} from "react-native";
import { Ionicons } from '@expo/vector-icons';
// import * as Animatable from 'react-native-animatable';
import Theme from '../constants/theme';

const { width, height } = Dimensions.get('window');

export default function HomeScreen() {
    const [loading, setLoading] = useState(true);
    const plantOptions = [
        { name: 'Tomate', icon: 'leaf' },
        { name: 'Piment', icon: 'flame' },
        { name: 'Maïs', icon: 'nutrition' },
        { name: 'Aubergine', icon: 'egg' },
        { name: 'Manioc', icon: 'flower' },
    ];

    const [selectedPlants, setSelectedPlants] = useState<string[]>([]);

    const togglePlant = (plantName: string) => {
        setSelectedPlants((prev) =>
            prev.includes(plantName)
                ? prev.filter((p) => p !== plantName)
                : prev.length < 3
                    ? [...prev, plantName]
                    : prev
        );
    };

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 5000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <ImageBackground
            source={require('../assets/images/bg.jpg')}
            style={styles.background}
            resizeMode="cover"
            blurRadius={4}
        >
            {!loading && (
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>
                        🍅 SmartAgro
                    </Text>
                    <Text  style={styles.slogan}>
                        L’IA qui protège vos plantations 🌿
                    </Text>
                </View>
            )}

            <View style={styles.overlay}>
                {loading ? (
                    <View style={styles.loaderContainer}>
                        <Text

                            style={styles.loadingText}
                        >
                            Chargement...
                        </Text>
                    </View>
                ) : (
                    <View  style={styles.contentContainer}>
                        <View style={styles.choicesContainer}>
                            <Text style={styles.choicesLabel}>Choisissez jusqu'a trois plantes</Text>
                            {plantOptions.map((plant, index) => {
                                const selected = selectedPlants.includes(plant.name);
                                return (
                                    <View

                                    >
                                        <TouchableOpacity
                                            style={[styles.card, selected && styles.selectedCard]}
                                            onPress={() => togglePlant(plant.name)}
                                        >
                                            <Ionicons
                                                name={plant.icon as any}
                                                size={28}
                                                color={selected ? 'white' : Theme.Colors.primary}
                                            />
                                            <Text style={[styles.cardText, selected && styles.cardTextSelected]}>
                                                {plant.name}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                );
                            })}
                        </View>

                        {selectedPlants.length > 0 && (
                            <View  style={styles.ctaContainer}>
                                <TouchableOpacity
                                    style={styles.ctaButton}
                                    onPress={() => {
                                        const selected = selectedPlants.join(',');
                                        router.push(`/scanner?plants=${encodeURIComponent(selected)}`);
                                    }}


                                >
                                    <Text style={styles.ctaText}>Démarrer le diagnostic</Text>
                                </TouchableOpacity>
                            </View>
                        )}

                    </View>
                )}
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width,
        height,
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // overlay sombre
        justifyContent: 'center',
        alignItems: 'center',
    },
    loaderContainer: {
        alignItems: 'center',
    },
    loadingText: {
        color: Theme.Colors.accent,
        fontSize: Theme.FontSizes.subtitle + 4,
        fontWeight: 'bold',
    },
    contentContainer: {
        paddingHorizontal: 30,
        alignItems: 'center',
    },

    titleContainer: {
        position: 'absolute',
        top: height * 0.15,
        width: '100%',
        alignItems: 'center',
        paddingHorizontal: 20,
    },

    title: {
        fontSize: Theme.FontSizes.title + 8,
        color: 'white',
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.6)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 4,
    },

    slogan: {
        fontSize: Theme.FontSizes.subtitle + 2,
        color: 'white',
        marginTop: 10,
        textAlign: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
    },

    choicesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 12,
        marginTop: 30,
    },

    card: {
        width: 100,
        height: 100,
        backgroundColor: 'white',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },

    selectedCard: {
        backgroundColor: Theme.Colors.primary,
    },

    cardText: {
        marginTop: 6,
        fontSize: 14,
        color: Theme.Colors.textPrimary,
    },

    cardTextSelected: {
        color: 'white',
    },

    choicesLabel: {
        fontSize: Theme.FontSizes.subtitle,
        color: 'white',
        marginBottom: 10,
        textAlign: 'center',
        fontWeight: 'bold',
    },

    ctaContainer: {
        marginTop: 30,
        alignItems: 'center',
    },

    ctaButton: {
        backgroundColor: Theme.Colors.primary,
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },

    ctaText: {
        color: 'white',
        fontSize: Theme.FontSizes.body + 2,
        fontWeight: 'bold',
        cursor: 'pointer',
    },

});
