import type { FirebaseApp, FirebaseOptions } from "firebase/app";
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";

const firebaseConfig: FirebaseOptions = {
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
	authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
	storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
	measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const getFirebaseApp = (): FirebaseApp => {
	return getApps().length ? getApp() : initializeApp(firebaseConfig);
};

const app: FirebaseApp = getFirebaseApp();

export const auth: Auth = getAuth(app);
export const db: Firestore = getFirestore(app);

export const initFirebaseAnalytics = async () => {
	if (typeof window === "undefined") return null;

	const { getAnalytics, isSupported } = await import("firebase/analytics");
	if (!(await isSupported())) return null;

	return getAnalytics(app);
};
