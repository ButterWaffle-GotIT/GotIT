"use client";

/**
 * ScrapContext - 스크랩 관리
 */

import { createContext, useContext, useState, type ReactNode } from "react";
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
	addMultipleToScrap: (termIds: number[]) => Promise<number>;
}

const ScrapContext = createContext<ScrapContextType | null>(null);

export function ScrapProvider({ children }: { children: ReactNode }) {
	const { user } = useAuthCore();
	const { userData, updateScrapList } = useUserData();
	const [pendingTerms, setPendingTerms] = useState<Set<number>>(new Set());

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

		// 이미 처리 중인 경우 무시
		if (pendingTerms.has(termId)) {
			return { success: false, isScraped: userData.scrapList.includes(termId) };
		}

		setPendingTerms((prev) => new Set(prev).add(termId));

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
		} finally {
			setPendingTerms((prev) => {
				const next = new Set(prev);
				next.delete(termId);
				return next;
			});
		}
	};

	/**
	 * 여러 항목을 한 번에 스크랩에 추가
	 */
	const addMultipleToScrap = async (termIds: number[]): Promise<number> => {
		if (!user || !userData) {
			return 0;
		}

		// 이미 스크랩된 항목 제외
		const newTermIds = termIds.filter((id) => !userData.scrapList.includes(id));

		if (newTermIds.length === 0) {
			return 0;
		}

		const newScrapList = [...userData.scrapList, ...newTermIds];

		try {
			const userRef = doc(db, "users", user.uid);
			await updateDoc(userRef, {
				scrapList: newScrapList,
			});

			updateScrapList(newScrapList);

			return newTermIds.length;
		} catch (error) {
			console.error("다중 스크랩 추가 실패:", error);
			throw error;
		}
	};

	return (
		<ScrapContext.Provider
			value={{
				isScraped,
				toggleScrap,
				addMultipleToScrap,
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
