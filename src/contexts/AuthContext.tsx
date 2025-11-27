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
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "@/utils/firebase";

type AuthContextType = {
	user: User | null;
	loading: boolean;
	loginWithGoogle: () => Promise<void>;
	logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
			setUser(currentUser);
			setLoading(false);

			// 최초 로그인 시 Firestore에 유저 문서 생성
			if (currentUser) {
				const userRef = doc(db, "users", currentUser.uid);
				const userSnap = await getDoc(userRef);

				if (!userSnap.exists()) {
					await setDoc(userRef, {
						email: currentUser.email,
						displayName: currentUser.displayName,
						photoURL: currentUser.photoURL,
						createdAt: new Date().toISOString(),
						scrapList: [],
					});
				}
			}
		});

		return () => unsubscribe();
	}, []);

	const loginWithGoogle = async () => {
		const provider = new GoogleAuthProvider();
		try {
			await signInWithPopup(auth, provider);
		} catch (error) {
			console.error("Google 로그인 실패:", error);
			throw error;
		}
	};

	const logout = async () => {
		try {
			await signOut(auth);
		} catch (error) {
			console.error("로그아웃 실패:", error);
			throw error;
		}
	};

	return (
		<AuthContext.Provider value={{ user, loading, loginWithGoogle, logout }}>
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
