"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ProfileCard from "@/app/dashboard/components/ProfileCard";
import TodayTermCard from "@/app/dashboard/components/TodayTermCard";
import ScrapSection from "@/app/dashboard/components/ScrapSection";
import { useAuth } from "@/contexts/AuthContext";
import { getRelatedTerms, type TermIndexItem } from "@/lib/terms";
import { type ScrapCardData } from "@/types/category";

const tagToCategoryMap: Record<string, string> = {
	frontend: "프론트엔드",
	backend: "백엔드",
	uiux: "UI/UX",
	ai: "AI",
	cloud: "클라우드",
	data: "데이터",
	security: "보안/네트워크",
	devops: "DevOps",
	business: "IT비즈니스",
};

function termToScrapCard(term: TermIndexItem): ScrapCardData {
	const category = tagToCategoryMap[term.primaryTag] || term.primaryTag;
	return {
		id: String(term.id),
		slug: term.slug,
		category,
		term: term.termEn || term.termKo,
		tag: term.tags[0] || "",
		description: term.summary,
		date: new Date()
			.toLocaleDateString("ko-KR", {
				year: "numeric",
				month: "2-digit",
				day: "2-digit",
			})
			.replace(/\. /g, ".")
			.replace(/\.$/, ""),
	};
}

export default function DashboardPage() {
	const router = useRouter();
	const { user, userData, loading } = useAuth();
	const [selectedCategory, setSelectedCategory] = useState("전체");
	const [scrapCards, setScrapCards] = useState<ScrapCardData[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function loadScrapTerms() {
			if (!userData || userData.scrapList.length === 0) {
				setScrapCards([]);
				setIsLoading(false);
				return;
			}

			try {
				const terms = await getRelatedTerms(userData.scrapList);
				const cards = terms.map(termToScrapCard);
				setScrapCards(cards);
			} catch (error) {
				console.error("스크랩 목록 로드 실패:", error);
				setScrapCards([]);
			} finally {
				setIsLoading(false);
			}
		}

		if (!loading) {
			loadScrapTerms();
		}
	}, [userData, loading]);

	useEffect(() => {
		if (!loading && !user) {
			router.push("/login");
		}
	}, [user, loading, router]);

	if (loading || !user) {
		return (
			<div className="flex min-h-screen items-center justify-center">
				<div className="text-gray-500">로딩 중...</div>
			</div>
		);
	}

	const filteredCards =
		selectedCategory === "전체"
			? scrapCards
			: scrapCards.filter((card) => card.category === selectedCategory);

	return (
		<div className="w-content flex flex-col items-start justify-start gap-10 pt-20 pb-20">
			<div className="inline-flex items-stretch justify-start gap-5 self-stretch">
				<div className="w-80 shrink-0">
					<ProfileCard />
				</div>

				<div className="flex-1">
					<TodayTermCard />
				</div>
			</div>

			<div className="self-stretch">
				<ScrapSection
					totalCount={filteredCards.length}
					selectedCategory={selectedCategory}
					onCategorySelect={setSelectedCategory}
					cards={filteredCards}
					isLoading={isLoading}
				/>
			</div>
		</div>
	);
}
