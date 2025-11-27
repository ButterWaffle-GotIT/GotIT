"use client";

import React, { useState, useCallback } from "react";
import SearchBar from "@/components/SearchBar";
import TagList from "@/components/TagList";
import RecommendedTermCard from "@/components/RecommendedTermCard";
import { ChevronsDownIcon } from "@/components/icons/ic_chevrons_down";

// --- Mock Data ---
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
// -----------------

export default function HomePage() {
	// 1. 상태 정의
	const [selectedTag, setSelectedTag] = useState("전체");

	// 2. 핸들러 함수 정의
	const handleTagSelect = useCallback((tagName: string) => {
		setSelectedTag(tagName);
		// ⭐️ API 연동 로직이 여기에 추가됩니다. ⭐️
	}, []);

	return (
		<>
			{/* <Header /> */}

			<main className="flex w-full justify-center pt-20">
				<div className="flex w-[1040px] flex-col items-center gap-20 px-20 pt-48 pb-20">
					{/* A. 검색 및 필터링 섹션 */}
					<section className="flex flex-col items-center justify-start gap-10 self-stretch">
						<SearchBar
						//value={searchTerm}
						//onChange={handleSearchChange}
						/>
						<TagList selectedTag={selectedTag} onTagSelect={handleTagSelect} />
					</section>

					{/* B. 추천 용어 섹션 */}
					<section className="flex flex-col items-start justify-start gap-5 self-stretch">
						<div className="justify-center self-stretch font-['Pretendard'] text-sm leading-5 font-semibold text-gray-500">
							추천 용어
						</div>

						<div className="inline-flex items-start justify-start gap-6 self-stretch">
							{recommendedTerms.map((term, index) => (
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
							<button className="inline-flex items-center justify-center gap-1 text-sm font-bold text-neutral-300 transition-colors hover:text-white">
								<ChevronsDownIcon className="h-4 w-4" width={16} height={16} />
								더보기
							</button>
						</div>
					</section>
				</div>
			</main>
		</>
	);
}
