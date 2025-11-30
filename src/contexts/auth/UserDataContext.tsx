"use client";

/**
 * UserDataContext - 사용자 데이터 상태 관리
 */

import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
	type ReactNode,
} from "react";
import { type CategoryType } from "@/config/categories";
import { getBookmarks, clearBookmarks } from "@/lib/bookmarks";
import {
	fetchUserData,
	createUserData,
	mergeScrapList,
	completeUserOnboarding,
	updateUserCategory,
	type UserData,
} from "@/lib/userService";
import { useAuthCore } from "./AuthContext";

export type { UserData };

interface UserDataContextType {
	userData: UserData | null;
	userDataLoading: boolean;
	isNewUser: boolean;
	completeOnboarding: (category: CategoryType) => Promise<void>;
	updateCategory: (category: CategoryType) => Promise<void>;
	refreshUserData: () => Promise<void>;
	updateScrapList: (newScrapList: number[]) => void;
}

const UserDataContext = createContext<UserDataContextType | null>(null);

export function UserDataProvider({ children }: { children: ReactNode }) {
	const { user } = useAuthCore();
	const [userData, setUserData] = useState<UserData | null>(null);
	const [userDataLoading, setUserDataLoading] = useState(true);
	const [isNewUser, setIsNewUser] = useState(false);

	const loadUserData = useCallback(async () => {
		if (!user) return;

		setUserDataLoading(true);

		try {
			const localBookmarks = getBookmarks();
			let data = await fetchUserData(user.uid);

			if (!data) {
				// 신규 사용자
				data = await createUserData(user, localBookmarks);
				setIsNewUser(true);
				if (localBookmarks.length > 0) clearBookmarks();
			} else {
				// 기존 사용자 - 로컬 북마크 병합
				if (localBookmarks.length > 0) {
					data.scrapList = await mergeScrapList(
						user.uid,
						data.scrapList,
						localBookmarks
					);
					clearBookmarks();
				}
				setIsNewUser(!data.onboardingCompleted);
			}

			setUserData(data);
		} catch (error) {
			console.error("사용자 데이터 로드 실패:", error);
			setUserData(null);
			setIsNewUser(false);
		} finally {
			setUserDataLoading(false);
		}
	}, [user]);

	useEffect(() => {
		if (!user) {
			setUserData(null);
			setIsNewUser(false);
			setUserDataLoading(false);
			return;
		}

		loadUserData();
	}, [user, loadUserData]);

	const refreshUserData = async () => {
		await loadUserData();
	};

	const completeOnboarding = async (category: CategoryType) => {
		if (!user) return;

		await completeUserOnboarding(user.uid, category);
		setUserData((prev) =>
			prev
				? { ...prev, onboardingCompleted: true, selectedCategory: category }
				: null
		);
		setIsNewUser(false);
	};

	const updateCategory = async (category: CategoryType) => {
		if (!user) return;

		await updateUserCategory(user.uid, category);
		setUserData((prev) =>
			prev ? { ...prev, selectedCategory: category } : null
		);
	};

	const updateScrapList = (newScrapList: number[]) => {
		setUserData((prev) => (prev ? { ...prev, scrapList: newScrapList } : null));
	};

	return (
		<UserDataContext.Provider
			value={{
				userData,
				userDataLoading,
				isNewUser,
				completeOnboarding,
				updateCategory,
				refreshUserData,
				updateScrapList,
			}}
		>
			{children}
		</UserDataContext.Provider>
	);
}

export function useUserData() {
	const context = useContext(UserDataContext);
	if (!context) {
		throw new Error("useUserData must be used within a UserDataProvider");
	}
	return context;
}
