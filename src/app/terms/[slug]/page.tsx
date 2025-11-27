"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { type TermDetail, getTermBySlug, getRelatedTerms } from "@/lib/terms";
import type { TermIndexItem } from "@/lib/terms";
import { toggleBookmark, isBookmarked } from "@/lib/bookmarks";
import { HeroSection, TabSection, Footer } from "@/components/term-detail";

export default function TermDetailPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const router = useRouter();
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
				setBookmarked(isBookmarked(data.id));
				if (data.relatedIds && data.relatedIds.length > 0) {
					const related = await getRelatedTerms(data.relatedIds);
					setRelatedTerms(related);
				}
			}
			setLoading(false);
		}
		loadTerm();
	}, [params]);

	const handleBookmark = () => {
		if (!term) return;
		const newState = toggleBookmark(term.id);
		setBookmarked(newState);
	};

	const handleShare = async () => {
		if (!term) return;
		try {
			await navigator.share({
				title: term.term.en || term.term.ko,
				text: term.summary,
				url: window.location.href,
			});
		} catch {
			await navigator.clipboard.writeText(window.location.href);
		}
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
