/**
 * 사용자 데이터 Firestore 서비스
 */

import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { type CategoryType } from "@/config/categories";
import type { User } from "firebase/auth";

export interface UserData {
	email: string | null;
	displayName: string | null;
	photoURL: string | null;
	createdAt: string;
	scrapList: number[];
	onboardingCompleted: boolean;
	selectedCategory: CategoryType;
}

/**
 * Firestore에서 사용자 데이터 조회
 */
export async function fetchUserData(uid: string): Promise<UserData | null> {
	const userRef = doc(db, "users", uid);
	const userSnap = await getDoc(userRef);

	if (!userSnap.exists()) {
		return null;
	}

	const data = userSnap.data();
	return {
		email: data.email ?? null,
		displayName: data.displayName ?? null,
		photoURL: data.photoURL ?? null,
		createdAt: data.createdAt ?? "",
		scrapList: data.scrapList ?? [],
		onboardingCompleted: data.onboardingCompleted ?? false,
		selectedCategory: data.selectedCategory ?? "all",
	};
}

/**
 * 신규 사용자 데이터 생성
 */
export async function createUserData(
	user: User,
	initialScrapList: number[] = []
): Promise<UserData> {
	const newUserData: UserData = {
		email: user.email,
		displayName: user.displayName,
		photoURL: user.photoURL,
		createdAt: new Date().toISOString(),
		scrapList: initialScrapList,
		onboardingCompleted: false,
		selectedCategory: "all",
	};

	const userRef = doc(db, "users", user.uid);
	await setDoc(userRef, newUserData);

	return newUserData;
}

/**
 * 스크랩 리스트 병합 및 업데이트
 */
export async function mergeScrapList(
	uid: string,
	existingList: number[],
	newItems: number[]
): Promise<number[]> {
	const mergedList = [...new Set([...existingList, ...newItems])];

	const userRef = doc(db, "users", uid);
	await updateDoc(userRef, { scrapList: mergedList });

	return mergedList;
}

/**
 * 온보딩 완료 처리
 */
export async function completeUserOnboarding(
	uid: string,
	category: CategoryType
): Promise<void> {
	const userRef = doc(db, "users", uid);
	await updateDoc(userRef, {
		onboardingCompleted: true,
		selectedCategory: category,
	});
}

/**
 * 카테고리 업데이트
 */
export async function updateUserCategory(
	uid: string,
	category: CategoryType
): Promise<void> {
	const userRef = doc(db, "users", uid);
	await updateDoc(userRef, { selectedCategory: category });
}
