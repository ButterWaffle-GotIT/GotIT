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
import { getBookmarks, clearBookmarks } from "@/lib/bookmarks";

export type UserData = {
	email: string | null;
	displayName: string | null;
	photoURL: string | null;
	createdAt: string;
	scrapList: number[];
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
	toggleScrap: (
		termId: number
	) => Promise<{ success: boolean; isScraped: boolean }>;
	isScraped: (termId: number) => boolean;
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

			// 로컬스토리지에서 스크랩 데이터 가져오기
			const localBookmarks = getBookmarks();

			if (!userSnap.exists()) {
				// 신규 사용자: 로컬스토리지 데이터를 포함하여 생성
				const newUserData: UserData = {
					email: result.user.email,
					displayName: result.user.displayName,
					photoURL: result.user.photoURL,
					createdAt: new Date().toISOString(),
					scrapList: localBookmarks,
					onboardingCompleted: false,
					selectedCategory: "all",
				};
				await setDoc(userRef, newUserData);
				setUserData(newUserData);
				setIsNewUser(true);

				// 마이그레이션 후 로컬스토리지 정리
				if (localBookmarks.length > 0) {
					clearBookmarks();
				}

				return true;
			} else {
				const data = userSnap.data() as UserData;

				// 기존 사용자: 로컬스토리지 데이터와 병합
				if (localBookmarks.length > 0) {
					const mergedScrapList = [
						...new Set([...data.scrapList, ...localBookmarks]),
					];
					await updateDoc(userRef, { scrapList: mergedScrapList });
					data.scrapList = mergedScrapList;
					clearBookmarks();
				}

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
			prev
				? { ...prev, onboardingCompleted: true, selectedCategory: category }
				: null
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

	const isScraped = (termId: number): boolean => {
		if (!userData) return false;
		return userData.scrapList.includes(termId);
	};

	const toggleScrap = async (
		termId: number
	): Promise<{ success: boolean; isScraped: boolean }> => {
		if (!user || !userData) {
			return { success: false, isScraped: false };
		}

		const currentlyScraped = userData.scrapList.includes(termId);
		const newScrapList = currentlyScraped
			? userData.scrapList.filter((id) => id !== termId)
			: [...userData.scrapList, termId];

		try {
			const userRef = doc(db, "users", user.uid);
			await updateDoc(userRef, {
				scrapList: newScrapList,
			});

			setUserData((prev) =>
				prev ? { ...prev, scrapList: newScrapList } : null
			);

			return { success: true, isScraped: !currentlyScraped };
		} catch (error) {
			console.error("스크랩 토글 실패:", error);
			return { success: false, isScraped: currentlyScraped };
		}
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
				toggleScrap,
				isScraped,
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
