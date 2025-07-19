import * as Linking from 'expo-linking';
import {openAuthSessionAsync} from "expo-web-browser";
import {Account, Avatars, Client, OAuthProvider} from 'react-native-appwrite';

export const config = {
    platform: 'com.uds.smartagro',
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
}

export const client = new Client();

client
    .setEndpoint(config.endpoint!)
    .setProject(config.projectId!)
    .setLocale('fr'); // Set the locale to French

export const avatar = new Avatars(client);
export const account = new Account(client);

export async function login()  {
    try {
        const redirectUri = Linking.createURL("/");

        const response = await account.createOAuth2Token(
            OAuthProvider.Google,
            redirectUri
        );
        if (!response) throw new Error("Echec de creation de token OAuth");

        const browserResult = await openAuthSessionAsync(
            response.toString(),
            redirectUri
        );
        if (browserResult.type !== "success")
            throw new Error("Echec de creation de token OAuth");

        const url = new URL(browserResult.url);
        const secret = url.searchParams.get("secret")?.toString();
        const userId = url.searchParams.get("userId")?.toString();
        if (!secret || !userId) throw new Error("Echec de creation de token OAuth");

        const session = await account.createSession(userId, secret);
        if (!session) throw new Error("Echec lors de la creation de la session");

        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export async function logout() {
    try {
        await account.deleteSession("current");
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export async function getCurrentUser() {
    try {
        const result = await account.get();
        if (result.$id) {
            // Correction : Créer une URL valide pour l'avatar
            let userAvatar = "";

            try {
                // Méthode 1: Utiliser getInitials avec une URL complète
                userAvatar = `${config.endpoint}/avatars/initials?name=${encodeURIComponent(result.name)}&width=100&height=100`;
            } catch (avatarError) {
                // Méthode 2: Avatar par défaut si erreur
                console.log("Erreur avatar:", avatarError);
                userAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(result.name)}&size=100&background=4CAF50&color=fff`;
            }

            console.log("🖼️ Avatar URL généré:", userAvatar);

            return {
                ...result,
                avatar: userAvatar,
            };
        }

        return null;
    } catch (error) {
        console.log("❌ Erreur getCurrentUser:", error);
        return null;
    }
}

export {account}