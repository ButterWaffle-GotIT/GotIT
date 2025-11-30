/**
 * 공유 기능 커스텀 훅
 */

interface ShareParams {
	title: string;
	text: string;
	url: string;
}

export function useShare() {
	const share = async (params: ShareParams): Promise<void> => {
		try {
			// Web Share API 지원 여부 확인 및 공유
			if (navigator.share) {
				await navigator.share({
					title: params.title,
					text: params.text,
					url: params.url,
				});
			} else {
				// 지원하지 않으면 클립보드에 복사
				await navigator.clipboard.writeText(params.url);
			}
		} catch {
			// 사용자가 공유를 취소했거나 에러 발생 시 클립보드에 복사
			try {
				await navigator.clipboard.writeText(params.url);
			} catch {
				// 클립보드 복사도 실패한 경우 조용히 무시
			}
		}
	};

	/**
	 * 용어 상세 페이지 공유 (slug 기반)
	 */
	const shareTerm = async (
		title: string,
		summary: string,
		slug: string
	): Promise<void> => {
		const url = `${window.location.origin}/terms/${slug}`;
		await share({ title, text: summary, url });
	};

	/**
	 * 현재 페이지 공유
	 */
	const shareCurrentPage = async (
		title: string,
		text: string
	): Promise<void> => {
		await share({ title, text, url: window.location.href });
	};

	return {
		share,
		shareTerm,
		shareCurrentPage,
	};
}
