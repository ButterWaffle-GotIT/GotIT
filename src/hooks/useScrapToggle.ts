import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/contexts/ToastContext";
import { isBookmarked, toggleBookmark } from "@/lib/bookmarks";

/**
 * 스크랩 토글 기능을 제공하는 커스텀 훅
 */
export function useScrapToggle(termId: number) {
	const { user, isScraped, toggleScrap } = useAuth();
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
			const newState = toggleBookmark(termId);
			setLocalOverride(newState);
			showLoginToast();
			return;
		}

		const result = await toggleScrap(termId);
		if (result.success) {
			setLocalOverride(result.isScraped);
			showToast(
				result.isScraped ? "스크랩되었습니다" : "스크랩이 해제되었습니다"
			);
		}
	};

	return { bookmarked, handleToggle };
}
