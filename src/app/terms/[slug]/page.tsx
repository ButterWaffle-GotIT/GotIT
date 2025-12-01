"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { type TermDetail, getTermBySlug, getRelatedTerms } from "@/lib/terms";
import type { TermIndexItem } from "@/lib/terms";
import { toggleBookmark, isBookmarked } from "@/lib/bookmarks";
import { HeroSection, TabSection, Footer } from "./components";
import { useAuthCore, useScrap } from "@/contexts/auth";
import { useToast } from "@/contexts/ToastContext";
import { useShare } from "@/hooks/useShare";

export default function TermDetailPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const router = useRouter();
	const { user } = useAuthCore();
	const { isScraped, toggleScrap } = useScrap();
	const { showLoginToast, showToast } = useToast();
	const { shareCurrentPage } = useShare();
	const [term, setTerm] = useState<TermDetail | null>(null);
	const [relatedTerms, setRelatedTerms] = useState<TermIndexItem[]>([]);
	const [bookmarked, setBookmarked] = useState(false);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function loadTerm() {
			const { slug } = await params;
			const data = await getTermBySlug(slug);
			setTerm(data);

			if (data) {
				// 로그인한 경우 Firestore에서, 아니면 로컬스토리지에서 확인
				if (user) {
					setBookmarked(isScraped(data.id));
				} else {
					setBookmarked(isBookmarked(data.id));
				}
				if (data.relatedIds && data.relatedIds.length > 0) {
					const related = await getRelatedTerms(data.relatedIds);
					setRelatedTerms(related);
				}
			}
			setLoading(false);
		}
		loadTerm();
	}, [params, user, isScraped]);

	const handleBookmark = async () => {
		if (!term) return;

		if (!user) {
			// 비로그인: 로컬스토리지에 저장하고 토스트 표시
			const newState = toggleBookmark(term.id);
			setBookmarked(newState);
			showLoginToast();
			return;
		}

		// 로그인: Firestore에 저장
		const result = await toggleScrap(term.id);
		if (result.success) {
			setBookmarked(result.isScraped);
			showToast(
				result.isScraped ? "스크랩 되었습니다" : "스크랩이 해제되었습니다"
			);
		} else {
			showToast("스크랩 처리 중 오류가 발생했습니다", "error");
		}
	};

	const handleShare = async () => {
		if (!term) return;
		await shareCurrentPage(term.term.en || term.term.ko, term.summary);
	};

	if (loading) {
		return (
			<div className="flex min-h-screen items-center justify-center">
				<div className="text-gray-500">로딩 중...</div>
			</div>
		);
	}

	if (!term) {
		return (
			<div className="flex min-h-screen items-center justify-center">
				<div className="text-gray-500">용어를 찾을 수 없습니다.</div>
			</div>
		);
	}

	return (
		<div className="flex min-h-screen flex-col gap-15 px-5 pt-10 pb-20">
			<HeroSection
				term={term}
				bookmarked={bookmarked}
				onBack={() => router.back()}
				onBookmark={handleBookmark}
				onShare={handleShare}
			/>
			<TabSection term={term} relatedTerms={relatedTerms} />
			<Footer updatedAt={term.updatedAt} />
		</div>
	);
}
