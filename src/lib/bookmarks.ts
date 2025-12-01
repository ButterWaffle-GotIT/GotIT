/**
 * 북마크(스크랩) 관리 헬퍼 (추후 서버 연동 고려)
 */

const STORAGE_KEY = "gotit:bookmarks:v1";

/**
 * 저장된 북마크 ID 목록 가져오기
 */
export function getBookmarks(): number[] {
	if (typeof window === "undefined") return [];

	try {
		const stored = localStorage.getItem(STORAGE_KEY);
		return stored ? JSON.parse(stored) : [];
	} catch {
		return [];
	}
}

/**
 * 북마크 여부 확인
 */
export function isBookmarked(id: number): boolean {
	return getBookmarks().includes(id);
}

/**
 * 북마크 토글 (추가/제거)
 * @returns 토글 후 북마크 상태 (true: 추가됨, false: 제거됨)
 */
export function toggleBookmark(id: number): boolean {
	const bookmarks = new Set(getBookmarks());

	if (bookmarks.has(id)) {
		bookmarks.delete(id);
	} else {
		bookmarks.add(id);
	}

	localStorage.setItem(STORAGE_KEY, JSON.stringify([...bookmarks]));

	return bookmarks.has(id);
}

/**
 * 모든 북마크 삭제
 */
export function clearBookmarks(): void {
	localStorage.removeItem(STORAGE_KEY);
}
