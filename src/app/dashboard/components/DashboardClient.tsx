"use client";

import React, { useState, useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import ProfileCard from "@/app/dashboard/components/ProfileCard";
import ScrapSection from "@/app/dashboard/components/ScrapSection";
import { useAuthCore, useUserData } from "@/contexts/auth";
import { getRelatedTerms } from "@/lib/terms";
import { termToScrapCard } from "@/lib/scrap";
import { type ScrapCardData } from "@/types/category";

interface DashboardClientProps {
	todayTermCard: ReactNode;
}

export default function DashboardClient({
	todayTermCard,
}: DashboardClientProps) {
	const router = useRouter();
	const { user, loading: authLoading } = useAuthCore();
	const { userData, userDataLoading } = useUserData();
	const [selectedCategory, setSelectedCategory] = useState("전체");
	const [scrapCards, setScrapCards] = useState<ScrapCardData[]>([]);
	const [scrapLoading, setScrapLoading] = useState(true);

	const loading = authLoading || userDataLoading;

	useEffect(() => {
		async function loadScrapTerms() {
			if (!userData || userData.scrapList.length === 0) {
				setScrapCards([]);
				setScrapLoading(false);
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
				setScrapLoading(false);
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

				<div className="flex-1">{todayTermCard}</div>
			</div>

			<div className="self-stretch">
				<ScrapSection
					totalCount={filteredCards.length}
					selectedCategory={selectedCategory}
					onCategorySelect={setSelectedCategory}
					cards={filteredCards}
					isLoading={scrapLoading}
				/>
			</div>
		</div>
	);
}
