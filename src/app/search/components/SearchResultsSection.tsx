"use client";

import { useState } from "react";
import SearchResultCard from "./SearchResultCard";
import type { TermIndexItem } from "@/lib/terms";
import { sortTerms, SortType } from "@/lib/sortTerms";
import SortDropdown from "@/components/ui/dropdowns/SortDropdown";

interface SearchResultsSectionProps {
	searchTerm: string;
	selectedTag: string;
	isSearching: boolean;
	searchResults: TermIndexItem[];
}

export default function SearchResultsSection({
	searchTerm,
	selectedTag,
	isSearching,
	searchResults,
}: SearchResultsSectionProps) {
	const [sortType, setSortType] = useState<SortType>("latest");

	const sortedResults = sortTerms(searchResults, sortType);

	return (
		<section className="flex flex-col items-start justify-start gap-5 self-stretch">
			<div className="flex items-center justify-between self-stretch">
				<div className="font-['Pretendard'] text-sm leading-5 font-semibold text-gray-500">
					{searchTerm.trim()
						? `검색 결과 : "${searchTerm}"`
						: `${selectedTag} 카테고리의 모든 용어`}
				</div>
				<SortDropdown sortType={sortType} onSortChange={setSortType} />
			</div>

			{isSearching ? (
				<div className="flex w-full items-center justify-center py-20">
					<div className="text-gray-500">검색 중...</div>
				</div>
			) : sortedResults.length > 0 ? (
				<div className="grid grid-cols-1 gap-4 self-stretch">
					{sortedResults.map((item) => (
						<SearchResultCard key={item.id} item={item} />
					))}
				</div>
			) : (
				<div className="flex w-full items-center justify-center py-20">
					<div className="text-center text-gray-500">
						<p className="text-lg">검색 결과가 없습니다.</p>
						<p className="mt-2 text-sm">다른 키워드로 검색해보세요.</p>
					</div>
				</div>
			)}
		</section>
	);
}
