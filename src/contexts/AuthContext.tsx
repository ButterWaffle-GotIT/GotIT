"use client";

import {
	createContext,
	useContext,
	useEffect,
	useState,
	type ReactNode,
} from "react";
import {
	GoogleAuthProvider,
	signInWithPopup,
	signOut,
	onAuthStateChanged,
	type User,
} from "firebase/auth";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "@/utils/firebase";
import { type CategoryType } from "@/components/ui/category/config";

export type UserData = {
	email: string | null;
	displayName: string | null;
	photoURL: string | null;
	createdAt: string;
	scrapList: string[];
	onboardingCompleted: boolean;
	selectedCategory: CategoryType;
};

type AuthContextType = {
	user: User | null;
	userData: UserData | null;
	loading: boolean;
	isNewUser: boolean;
	loginWithGoogle: () => Promise<boolean>;
	logout: () => Promise<void>;
	completeOnboarding: (category: CategoryType) => Promise<void>;
	updateCategory: (category: CategoryType) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<User | null>(null);
	const [userData, setUserData] = useState<UserData | null>(null);
	const [loading, setLoading] = useState(true);
	const [isNewUser, setIsNewUser] = useState(false);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
			setUser(currentUser);

			if (currentUser) {
				const userRef = doc(db, "users", currentUser.uid);
				const userSnap = await getDoc(userRef);

				if (userSnap.exists()) {
					const data = userSnap.data() as UserData;
					setUserData(data);
					setIsNewUser(!data.onboardingCompleted);
				}
			} else {
				setUserData(null);
				setIsNewUser(false);
			}

			setLoading(false);
		});

		return () => unsubscribe();
	}, []);

	const loginWithGoogle = async (): Promise<boolean> => {
		const provider = new GoogleAuthProvider();
		try {
			const result = await signInWithPopup(auth, provider);
			const userRef = doc(db, "users", result.user.uid);
			const userSnap = await getDoc(userRef);

			if (!userSnap.exists()) {
				const newUserData: UserData = {
					email: result.user.email,
					displayName: result.user.displayName,
					photoURL: result.user.photoURL,
					createdAt: new Date().toISOString(),
					scrapList: [],
					onboardingCompleted: false,
					selectedCategory: "all",
				};
				await setDoc(userRef, newUserData);
				setUserData(newUserData);
				setIsNewUser(true);
				return true;
			} else {
				const data = userSnap.data() as UserData;
				setUserData(data);
				setIsNewUser(!data.onboardingCompleted);
				return !data.onboardingCompleted;
			}
		} catch (error) {
			console.error("Google 로그인 실패:", error);
			throw error;
		}
	};

	const logout = async () => {
		try {
			await signOut(auth);
			setUserData(null);
			setIsNewUser(false);
		} catch (error) {
			console.error("로그아웃 실패:", error);
			throw error;
		}
	};

	const completeOnboarding = async (category: CategoryType) => {
		if (!user) return;

		const userRef = doc(db, "users", user.uid);
		await updateDoc(userRef, {
			onboardingCompleted: true,
			selectedCategory: category,
		});

		setUserData((prev) =>
			prev ? { ...prev, onboardingCompleted: true, selectedCategory: category } : null
		);
		setIsNewUser(false);
	};

	const updateCategory = async (category: CategoryType) => {
		if (!user) return;

		const userRef = doc(db, "users", user.uid);
		await updateDoc(userRef, {
			selectedCategory: category,
		});

		setUserData((prev) =>
			prev ? { ...prev, selectedCategory: category } : null
		);
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				userData,
				loading,
				isNewUser,
				loginWithGoogle,
				logout,
				completeOnboarding,
				updateCategory,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
}
