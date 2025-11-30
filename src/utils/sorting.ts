/**
 * 정렬 유틸리티 함수
 */

/**
 * 문자열의 첫 글자 타입에 따른 우선순위 반환
 *
 * 우선순위 순서:
 * 1. 숫자 (0-9)
 * 2. 특수문자
 * 3. 한글 (가-힣)
 * 4. 영문 (a-zA-Z)
 *
 */
export function getCharTypeOrder(str: string): number {
	if (!str) return 4;
	const char = str.charAt(0);

	if (/[0-9]/.test(char)) return 1;
	if (/[^0-9a-zA-Z가-힣]/.test(char)) return 2;
	if (/[가-힣]/.test(char)) return 3;
	return 4;
}

/**
 * 한글 자모 순서를 고려한 알파벳 정렬
 */
export function sortByKorean<T>(items: T[], getKey: (item: T) => string): T[] {
	return [...items].sort((a, b) => {
		const keyA = getKey(a);
		const keyB = getKey(b);

		// 문자 타입 우선순위 비교
		const priorityA = getCharTypeOrder(keyA);
		const priorityB = getCharTypeOrder(keyB);

		if (priorityA !== priorityB) {
			return priorityA - priorityB;
		}

		// 같은 타입이면 한글 자모 순서로 정렬
		return keyA.localeCompare(keyB, "ko", { sensitivity: "base" });
	});
}

/**
 * 날짜 기준 정렬 (최신순)
 */
export function sortByDateDesc<T>(
	items: T[],
	getDate: (item: T) => string | Date
): T[] {
	return [...items].sort((a, b) => {
		const dateA = new Date(getDate(a)).getTime();
		const dateB = new Date(getDate(b)).getTime();
		return dateB - dateA;
	});
}

/**
 * 정렬 타입
 */
export type SortType = "latest" | "alphabetical";
