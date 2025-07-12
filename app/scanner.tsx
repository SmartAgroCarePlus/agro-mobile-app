import { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import Theme from '../constants/theme';

type ScannerMode = 'idle' | 'camera' | 'image';

export default function ScannerScreen() {
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const [mode, setMode] = useState<ScannerMode>('idle');
    const [image, setImage] = useState<string | null>(null);
    const [isReady, setIsReady] = useState(false);
    const cameraRef = useRef<Camera>(null);

    const { plants } = useLocalSearchParams();
    const selectedPlants = plants?.toString().split(',') ?? [];

    const requestCamera = async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        if (status === 'granted') {
            setHasPermission(true);
            setMode('camera');
        } else {
            setHasPermission(false);
            Alert.alert("Permission refusée", "Active la caméra dans les paramètres.");
        }
    };

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1,
            base64: true,
        });

        // if (!result.canceled) {
        //     setImage(result.assets[0].uri);
        //     setMode('image');
        // }

        if (!result.canceled) {
            const asset = result.assets[0];
            setImage(asset.uri);
            setMode('image');
            await analyzeImage(asset.base64!);
        }

    };

    const takePicture = async () => {
        if (cameraRef.current) {
            // const photo = await cameraRef.current.takePictureAsync({ base64: true });
            // setImage(photo.uri);
            // setMode('image');

            const photo = await cameraRef.current.takePictureAsync({ base64: true });
            setImage(photo.uri);
            setMode('image');
            await analyzeImage(photo.base64!);
        }
    };

    const analyzeImage = async (base64: string) => {
        try {
            const response = await fetch('http://192.168.X.X:5000/predict', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ image: `data:image/jpeg;base64,${base64}` }),
            });

            const json = await response.json();
            console.log('📊 Résultat IA :', json.predictions);
            // TODO : naviguer vers la page résultat avec les données
            router.push({
                pathname: '/result',
                params: {
                    plants: selectedPlants.join(','),
                    label: response.label,
                    confidence: response.confidence.toString(),
                },
            });

        } catch (error) {
            console.error('Erreur IA :', error);
        }
    };


    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.topBar}>
                <Text style={styles.title}>Diagnostic : {selectedPlants.join(', ')}</Text>
            </View>

            {/* Vue caméra */}
            {mode === 'camera' && (
                <Camera
                    ref={cameraRef}
                    style={styles.camera}
                    type={CameraType.back}
                    onCameraReady={() => setIsReady(true)}
                />
            )}

            {/* Image affichée après capture ou import */}
            {mode === 'image' && image && (
                <Image source={{ uri: image }} style={styles.preview} resizeMode="cover" />
            )}

            {/* Zone des boutons */}
            <View style={styles.actions}>
                {mode === 'idle' && (
                    <>
                        <TouchableOpacity style={styles.actionButton} onPress={requestCamera}>
                            <Ionicons name="camera-outline" size={26} color="white" />
                            <Text style={styles.actionText}>Ouvrir la caméra</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.actionButton} onPress={pickImage}>
                            <Ionicons name="image-outline" size={26} color="white" />
                            <Text style={styles.actionText}>Importer une image</Text>
                        </TouchableOpacity>
                    </>
                )}

                {mode === 'camera' && (
                    <TouchableOpacity style={styles.captureButton} onPress={takePicture} disabled={!isReady}>
                        <Ionicons name="camera" size={34} color="white" />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'black' },

    topBar: {
        paddingTop: 50,
        paddingHorizontal: 20,
        paddingBottom: 10,
        backgroundColor: Theme.Colors.primary,
    },

    title: {
        color: 'white',
        fontSize: Theme.FontSizes.subtitle + 2,
        fontWeight: 'bold',
    },

    camera: {
        flex: 1,
    },

    preview: {
        flex: 1,
        width: '100%',
    },

    actions: {
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#111',
    },

    actionButton: {
        backgroundColor: Theme.Colors.primary,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 14,
        borderRadius: 30,
        marginBottom: 15,
    },

    actionText: {
        color: 'white',
        fontSize: Theme.FontSizes.body + 2,
        marginLeft: 10,
        fontWeight: 'bold',
    },

    captureButton: {
        backgroundColor: Theme.Colors.accent,
        padding: 16,
        borderRadius: 50,
        alignSelf: 'center',
        marginBottom: 20,
    },
});
