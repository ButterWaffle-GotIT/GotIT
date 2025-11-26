import type { FirebaseApp, FirebaseOptions } from "firebase/app";
import { getApp, getApps, initializeApp } from "firebase/app";

const buildFirebaseConfig = (): FirebaseOptions | null => {
	const firebaseConfig: FirebaseOptions = {
		apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
		authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
		projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
		storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
		messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
		appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
		measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
	};

	const missing = Object.entries(firebaseConfig)
		.filter(([, value]) => !value)
		.map(([key]) => key);

	if (missing.length) {
		console.warn(
			`Missing Firebase env values: ${missing.join(
				", "
			)}. Check your .env.local file.`
		);
		return null;
	}

	return firebaseConfig;
};

const getFirebaseApp = (): FirebaseApp | null => {
	if (typeof window === "undefined") return null;

	const firebaseConfig = buildFirebaseConfig();
	if (!firebaseConfig) return null;

	return getApps().length ? getApp() : initializeApp(firebaseConfig);
};

export const initFirebaseAnalytics = async () => {
	if (typeof window === "undefined") return null;

	const app = getFirebaseApp();
	if (!app) return null;

	const { getAnalytics, isSupported } = await import("firebase/analytics");
	if (!(await isSupported())) return null;

	return getAnalytics(app);
};
