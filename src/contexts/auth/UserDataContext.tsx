"use client";

/**
 * UserDataContext - 사용자 데이터 관리
 */

import {
	createContext,
	useContext,
	useEffect,
	useState,
	type ReactNode,
} from "react";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { type CategoryType } from "@/components/ui/category/config";
import { getBookmarks, clearBookmarks } from "@/lib/bookmarks";
import { useAuthCore } from "./AuthContext";

/**
 * 사용자 데이터 타입
 */
export interface UserData {
	email: string | null;
	displayName: string | null;
	photoURL: string | null;
	createdAt: string;
	scrapList: number[];
	onboardingCompleted: boolean;
	selectedCategory: CategoryType;
}

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

	// user 변경 시 사용자 데이터 로드
	useEffect(() => {
		if (!user) {
			setUserData(null);
			setIsNewUser(false);
			setUserDataLoading(false);
			return;
		}

		loadOrCreateUserData();
	}, [user]);

	/**
	 * 사용자 데이터 로드 또는 생성
	 */
	const loadOrCreateUserData = async () => {
		if (!user) return;

		setUserDataLoading(true);

		try {
			const userRef = doc(db, "users", user.uid);
			const userSnap = await getDoc(userRef);
			const localBookmarks = getBookmarks();

			if (!userSnap.exists()) {
				// 신규 사용자: Firestore에 데이터 생성
				const newUserData: UserData = {
					email: user.email,
					displayName: user.displayName,
					photoURL: user.photoURL,
					createdAt: new Date().toISOString(),
					scrapList: localBookmarks,
					onboardingCompleted: false,
					selectedCategory: "all",
				};

				await setDoc(userRef, newUserData);
				setUserData(newUserData);
				setIsNewUser(true);

				// 로컬스토리지 마이그레이션 완료 후 정리
				if (localBookmarks.length > 0) {
					clearBookmarks();
				}
			} else {
				// 기존 사용자: 데이터 로드 및 로컬스토리지 병합
				const data = userSnap.data() as UserData;

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
			}
		} catch (error) {
			console.error("사용자 데이터 로드 실패:", error);
			setUserData(null);
			setIsNewUser(false);
		} finally {
			setUserDataLoading(false);
		}
	};

	/**
	 * 사용자 데이터 새로고침
	 */
	const refreshUserData = async () => {
		await loadOrCreateUserData();
	};

	/**
	 * 온보딩 완료 처리
	 */
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

	/**
	 * 카테고리 업데이트
	 */
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

	/**
	 * 스크랩 리스트 업데이트 (ScrapContext에서 호출)
	 */
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
