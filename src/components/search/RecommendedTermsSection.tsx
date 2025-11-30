"use client";

import { useState } from "react";
import RecommendedTermCard from "@/components/RecommendedTermCard";
import { ChevronsDownIcon } from "@/components/icons/ic_chevrons_down";

// Mock Data
const recommendedTerms = [
	{
		term: "React",
		category: "프론트엔드",
		description: "사용자 인터페이스를 만들기 위한 JavaScript 라이브러리",
		iconColor: "bg-cyan-400",
	},
	{
		term: "Next.js",
		category: "프론트엔드",
		description: "React 애플리케이션을 위한 강력한 풀스택 프레임워크",
		iconColor: "bg-cyan-400",
	},
	{
		term: "Docker",
		category: "DevOps",
		description: "애플리케이션을 컨테이너화하여 쉽게 배포하는 도구",
		iconColor: "bg-amber-400",
	},
];

export default function RecommendedTermsSection() {
	const [showMoreRecommended, setShowMoreRecommended] = useState(false);

	const displayedRecommendedTerms = showMoreRecommended
		? recommendedTerms
		: recommendedTerms.slice(0, 3);

	return (
		<section className="flex flex-col items-start justify-start gap-5 self-stretch">
			<div className="self-stretch font-['Pretendard'] text-sm leading-5 font-semibold text-gray-500">
				추천 용어
			</div>
			<div className="inline-flex flex-wrap items-start justify-start gap-6 self-stretch">
				{displayedRecommendedTerms.map((term, index) => (
					<RecommendedTermCard
						key={index}
						term={term.term}
						category={term.category}
						description={term.description}
						iconColor={term.iconColor}
					/>
				))}
			</div>
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
		</section>
	);
}
