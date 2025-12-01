import { useState } from "react";
import { useAuthCore, useScrap } from "@/contexts/auth";
import { useToast } from "@/contexts/ToastContext";
import { isBookmarked, toggleBookmark } from "@/lib/bookmarks";

/**
 * 스크랩 토글 기능을 제공하는 커스텀 훅
 */
export function useScrapToggle(termId: number) {
	const { user } = useAuthCore();
	const { isScraped, toggleScrap } = useScrap();
	const { showLoginToast, showToast } = useToast();

	// 서버/로컬 북마크 상태
	const serverBookmarked = user ? isScraped(termId) : isBookmarked(termId);

	// 로컬 오버라이드
	const [localOverride, setLocalOverride] = useState<boolean | null>(null);
	const [lastUser, setLastUser] = useState(user);

	// user가 변경되면 로컬 오버라이드 초기화
	if (user !== lastUser) {
		setLastUser(user);
		setLocalOverride(null);
	}

	// 최종 북마크 상태
	const bookmarked = localOverride ?? serverBookmarked;

	/**
	 * 스크랩 토글 핸들러
	 */
	const handleToggle = async () => {
		if (!user) {
			try {
				const newState = toggleBookmark(termId);
				setLocalOverride(newState);
				showLoginToast();
			} catch (error) {
				console.error("Local bookmark toggle failed:", error);
				showToast("북마크 처리 중 오류가 발생했습니다");
			}
			return;
		}

		try {
			const result = await toggleScrap(termId);
			if (result.success) {
				setLocalOverride(result.isScraped);
				showToast(
					result.isScraped ? "스크랩되었습니다" : "스크랩이 해제되었습니다"
				);
			} else {
				showToast("스크랩 처리에 실패했습니다");
			}
		} catch (error) {
			console.error("Server scrap toggle failed:", error);
			showToast("스크랩 처리 중 오류가 발생했습니다");
		}
	};

	return { bookmarked, handleToggle };
}
