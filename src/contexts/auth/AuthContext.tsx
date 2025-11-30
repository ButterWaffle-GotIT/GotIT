"use client";

/**
 * AuthContext
 */

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
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
	type User,
} from "firebase/auth";
import { auth } from "@/utils/firebase";

interface AuthContextType {
	user: User | null;
	loading: boolean;
	loginWithGoogle: () => Promise<User>;
	loginWithDemo: () => Promise<User>;
	logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);

	// Firebase 인증 상태 구독
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);
			setLoading(false);
		});

		return () => unsubscribe();
	}, []);

	const loginWithGoogle = async (): Promise<User> => {
		const provider = new GoogleAuthProvider();
		try {
			const result = await signInWithPopup(auth, provider);
			return result.user;
		} catch (error) {
			console.error("Google 로그인 실패:", error);
			throw error;
		}
	};

	const loginWithDemo = async (): Promise<User> => {
		const demoEmail = process.env.NEXT_PUBLIC_DEMO_EMAIL;
		const demoPassword = process.env.NEXT_PUBLIC_DEMO_PASSWORD;

		if (!demoEmail || !demoPassword) {
			throw new Error("데모 계정 정보가 설정되지 않았습니다.");
		}

		try {
			const result = await signInWithEmailAndPassword(
				auth,
				demoEmail,
				demoPassword
			);
			return result.user;
		} catch (error) {
			console.error("데모 계정 로그인 실패:", error);
			throw error;
		}
	};

	const logout = async (): Promise<void> => {
		try {
			await signOut(auth);
		} catch (error) {
			console.error("로그아웃 실패:", error);
			throw error;
		}
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				loading,
				loginWithGoogle,
				loginWithDemo,
				logout,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuthCore() {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuthCore must be used within an AuthProvider");
	}
	return context;
}
