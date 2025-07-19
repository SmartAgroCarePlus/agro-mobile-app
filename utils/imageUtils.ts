import * as ImagePicker from "expo-image-picker";
import { Platform } from "react-native";

export const requestCameraPermission = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    return status === "granted";
};

export const requestMediaLibraryPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    return status === "granted";
};

export const takePicture = async () => {
    const hasPermission = await requestCameraPermission();

    if (!hasPermission) {
        return { cancelled: true };
    }

    const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
    });

    if (result.canceled || !result.assets || result.assets.length === 0) {
        return { cancelled: true };
    }

    return {
        cancelled: false,
        uri: result.assets[0].uri
    };
};

export const pickImage = async () => {
    const hasPermission = await requestMediaLibraryPermission();

    if (!hasPermission) {
        return { cancelled: true };
    }

    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
    });

    if (result.canceled || !result.assets || result.assets.length === 0) {
        return { cancelled: true };
    }

    return {
        cancelled: false,
        uri: result.assets[0].uri
    };
};

export const getImageFormData = (uri: string) => {
    const formData = new FormData();

    const filename = uri.split("/").pop() || "image.jpg";
    const match = /\.(\w+)$/.exec(filename);
    const type = match ? `image/${match[1]}` : "image/jpeg";

    // @ts-ignore
    formData.append("image", {
        uri: Platform.OS === "android" ? uri : uri.replace("file://", ""),
        name: filename,
        type,
    });

    return formData;
};