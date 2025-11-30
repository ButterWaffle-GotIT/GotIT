"use client";

/**
 * ScrapContext - 스크랩 관리
 */

import { createContext, useContext, type ReactNode } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { useAuthCore } from "./AuthContext";
import { useUserData } from "./UserDataContext";

interface ScrapContextType {
	isScraped: (termId: number) => boolean;
	/** 스크랩 토글 */
	toggleScrap: (
		termId: number
	) => Promise<{ success: boolean; isScraped: boolean }>;
}

const ScrapContext = createContext<ScrapContextType | null>(null);

export function ScrapProvider({ children }: { children: ReactNode }) {
	const { user } = useAuthCore();
	const { userData, updateScrapList } = useUserData();

	/**
	 * 해당 용어가 스크랩되어 있는지 확인
	 */
	const isScraped = (termId: number): boolean => {
		if (!userData) return false;
		return userData.scrapList.includes(termId);
	};

	/**
	 * 스크랩 토글 (추가/제거)
	 */
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
			// Firestore 업데이트
			const userRef = doc(db, "users", user.uid);
			await updateDoc(userRef, {
				scrapList: newScrapList,
			});

			// 로컬 상태 업데이트
			updateScrapList(newScrapList);

			return { success: true, isScraped: !currentlyScraped };
		} catch (error) {
			console.error("스크랩 토글 실패:", error);
			return { success: false, isScraped: currentlyScraped };
		}
	};

	return (
		<ScrapContext.Provider
			value={{
				isScraped,
				toggleScrap,
			}}
		>
			{children}
		</ScrapContext.Provider>
	);
}

export function useScrap() {
	const context = useContext(ScrapContext);
	if (!context) {
		throw new Error("useScrap must be used within a ScrapProvider");
	}
	return context;
}
