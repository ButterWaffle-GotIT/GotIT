"use client";

import { useState, useEffect } from "react";
import RecommendedTermCard from "@/components/RecommendedTermCard";
import RecommendedTermCardSkeleton from "@/components/RecommendedTermCardSkeleton";
import { ChevronsDownIcon } from "@/components/icons/ic_chevrons_down";
import { useAuth } from "@/contexts/AuthContext";
import {
	getRecommendedTerms,
	type RecommendedTerm,
} from "@/lib/recommendations";

export default function RecommendedTermsSection() {
	const { userData } = useAuth();
	const [showMoreRecommended, setShowMoreRecommended] = useState(false);
	const [recommendedTerms, setRecommendedTerms] = useState<RecommendedTerm[]>(
		[]
	);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const loadTerms = async () => {
			// userData가 로드되지 않았으면 로딩 상태 유지
			if (!userData) {
				return;
			}

			setIsLoading(true);
			const category = userData.selectedCategory || "all";
			const terms = await getRecommendedTerms(category, 6);
			setRecommendedTerms(terms);
			setIsLoading(false);
		};

		loadTerms();
	}, [userData]);

	const displayedRecommendedTerms = showMoreRecommended
		? recommendedTerms
		: recommendedTerms.slice(0, 3);

	return (
		<section className="flex flex-col items-center justify-start gap-5 self-stretch">
			<div className="self-stretch text-left font-['Pretendard'] text-sm leading-5 font-semibold text-gray-500">
				추천 용어
			</div>
			<div className="inline-flex flex-wrap items-start justify-center gap-6 self-stretch">
				{isLoading ? (
					// 로딩 중일 때 스켈레톤 3개 표시
					<>
						<RecommendedTermCardSkeleton />
						<RecommendedTermCardSkeleton />
						<RecommendedTermCardSkeleton />
					</>
				) : (
					// 데이터 로드 완료 시 실제 카드 표시
					displayedRecommendedTerms.map((term, index) => (
						<RecommendedTermCard
							key={index}
							term={term.term}
							category={term.category}
							description={term.description}
							iconColor={term.iconColor}
						/>
					))
				)}
			</div>
			{!isLoading && (
				<div className="flex flex-col items-center justify-center gap-2.5 self-stretch overflow-hidden pt-5">
					<button
						onClick={() => setShowMoreRecommended(!showMoreRecommended)}
						className="inline-flex items-center justify-center gap-1 text-sm font-bold text-neutral-300 transition-colors hover:text-white"
					>
						<ChevronsDownIcon
							className={`h-4 w-4 transition-transform ${showMoreRecommended ? "rotate-180" : ""}`}
							width={16}
							height={16}
						/>
						{showMoreRecommended ? "접기" : "더보기"}
					</button>
				</div>
			)}
		</section>
	);
}
