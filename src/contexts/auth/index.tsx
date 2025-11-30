"use client";

/**
 * Auth 모듈 통합 Export
 */

import { type ReactNode } from "react";
import { type User } from "firebase/auth";
import { type CategoryType } from "@/components/ui/category/config";

// 개별 Context들
import { AuthProvider, useAuthCore } from "./AuthContext";
import {
	UserDataProvider,
	useUserData,
	type UserData,
} from "./UserDataContext";
import { ScrapProvider, useScrap } from "./ScrapContext";

// 타입 re-export
export type { UserData };

/**
 * Provider
 */
export function CombinedAuthProvider({ children }: { children: ReactNode }) {
	return (
		<AuthProvider>
			<UserDataProvider>
				<ScrapProvider>{children}</ScrapProvider>
			</UserDataProvider>
		</AuthProvider>
	);
}

interface LegacyAuthContextType {
	user: User | null;
	userData: UserData | null;
	loading: boolean;
	isNewUser: boolean;
	loginWithGoogle: () => Promise<boolean>;
	loginWithDemo: () => Promise<boolean>;
	logout: () => Promise<void>;
	completeOnboarding: (category: CategoryType) => Promise<void>;
	updateCategory: (category: CategoryType) => Promise<void>;
	toggleScrap: (
		termId: number
	) => Promise<{ success: boolean; isScraped: boolean }>;
	isScraped: (termId: number) => boolean;
}

/**
 * 기존 useAuth() 훅과 동일한 인터페이스 제공
 */
export function useAuth(): LegacyAuthContextType {
	const auth = useAuthCore();
	const userData = useUserData();
	const scrap = useScrap();

	const loginWithGoogle = async (): Promise<boolean> => {
		await auth.loginWithGoogle();
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve(userData.isNewUser);
			}, 100);
		});
	};

	const loginWithDemo = async (): Promise<boolean> => {
		await auth.loginWithDemo();
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve(userData.isNewUser);
			}, 100);
		});
	};

	const logout = async (): Promise<void> => {
		await auth.logout();
	};

	const loading = auth.loading || userData.userDataLoading;

	return {
		user: auth.user,
		userData: userData.userData,
		loading,
		isNewUser: userData.isNewUser,
		loginWithGoogle,
		loginWithDemo,
		logout,
		completeOnboarding: userData.completeOnboarding,
		updateCategory: userData.updateCategory,
		toggleScrap: scrap.toggleScrap,
		isScraped: scrap.isScraped,
	};
}

export { useAuthCore, useUserData, useScrap };

export { AuthProvider } from "./AuthContext";
export { UserDataProvider } from "./UserDataContext";
export { ScrapProvider } from "./ScrapContext";
