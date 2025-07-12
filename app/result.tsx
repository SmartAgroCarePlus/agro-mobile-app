import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import Theme from '../constants/theme';

export default function ResultScreen() {
    const { plants } = useLocalSearchParams();
    const { label, confidence } = useLocalSearchParams();
    const selectedPlants = plants?.toString().split(',') ?? [];

    // 🧪 Exemple simulé de prédiction
    const prediction = {
        label: 'Tomato Bacterial Spot',
        confidence: 0.91,
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>🧠 Résultat du diagnostic</Text>

            <View style={styles.card}>
                <Text style={styles.label}>🌿 Maladie détectée :</Text>
                <Text style={styles.resultText}>{prediction.label}</Text>

                <Text style={styles.label}>🔬 Confiance du modèle :</Text>
                <Text style={styles.confidence}>{(prediction.confidence * 100).toFixed(1)}%</Text>

                {/* Suggestions optionnelles */}
                <Text style={styles.label}>💡 Conseils :</Text>
                <Text style={styles.tips}>
                    Inspectez vos plantes pour des taches noires. Évitez l’humidité excessive. Utilisez un
                    fongicide adapté si nécessaire.
                </Text>
            </View>

            <Text style={styles.subtitle}>Plantes analysées :</Text>
            {selectedPlants.map((plant) => (
                <Text key={plant} style={styles.plantItem}>• {plant}</Text>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: Theme.Colors.background,
    },
    title: {
        fontSize: Theme.FontSizes.title + 2,
        fontWeight: 'bold',
        color: Theme.Colors.primary,
        marginBottom: 20,
        textAlign: 'center',
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
        elevation: 5,
        marginBottom: 20,
    },
    label: {
        fontWeight: 'bold',
        fontSize: Theme.FontSizes.subtitle,
        color: Theme.Colors.textPrimary,
        marginTop: 10,
    },
    resultText: {
        fontSize: 20,
        color: Theme.Colors.accent,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    confidence: {
        fontSize: 18,
        fontWeight: '600',
        color: Theme.Colors.primary,
        marginBottom: 10,
    },
    tips: {
        marginTop: 6,
        fontSize: Theme.FontSizes.body,
        color: '#444',
    },
    subtitle: {
        fontSize: Theme.FontSizes.subtitle + 2,
        marginBottom: 8,
        color: Theme.Colors.textPrimary,
    },
    plantItem: {
        fontSize: Theme.FontSizes.body,
        marginBottom: 4,
    },
});
