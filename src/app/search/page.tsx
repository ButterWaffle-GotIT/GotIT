"use client";

import { useState, useCallback, useEffect } from "react";
import TagList from "./components/TagList";
import SearchBar from "./components/SearchBar";
import SearchResultsSection from "./components/SearchResultsSection";
import RecommendedTermsSection from "./components/RecommendedTermsSection";
import { searchTerms, getTermsByTag, type TermIndexItem } from "@/lib/terms";
import { useDebounce } from "@/hooks/useDebounce";

export default function SearchPage() {
	const [selectedTag, setSelectedTag] = useState("전체");
	const [searchTerm, setSearchTerm] = useState("");
	const [searchResults, setSearchResults] = useState<TermIndexItem[]>([]);
	const [isSearching, setIsSearching] = useState(false);

	const debouncedSearchTerm = useDebounce(searchTerm, 400);

	const handleTagSelect = useCallback((tagName: string) => {
		setSelectedTag(tagName);
	}, []);

	const handleSearchChange = useCallback((value: string) => {
		setSearchTerm(value);
	}, []);

	// 태그가 변경되거나 debounced 검색어가 변경되면 결과 업데이트
	useEffect(() => {
		const runSearch = async () => {
			setIsSearching(true);

			const trimmedSearchTerm = debouncedSearchTerm.trim();

			// 검색어가 2글자 이상일 때만 검색
			if (trimmedSearchTerm && trimmedSearchTerm.length >= 2) {
				const results = await searchTerms(debouncedSearchTerm);
				const filtered =
					selectedTag === "전체"
						? results
						: results.filter(
								(term) =>
									term.primaryTag === selectedTag ||
									term.tags.includes(selectedTag)
							);
				setSearchResults(filtered);
			} else if (selectedTag !== "전체") {
				// 검색어가 없거나 2글자 미만이지만 태그가 선택된 경우
				const results = await getTermsByTag(selectedTag);
				setSearchResults(results);
			} else {
				// 검색어도 없고(또는 2글자 미만) 태그도 "전체"인 경우
				setSearchResults([]);
			}

			setIsSearching(false);
		};
		runSearch();
	}, [selectedTag, debouncedSearchTerm]);

	return (
		<>
			<main className="flex w-full flex-col items-center pt-20">
				<div className="flex w-[1040px] flex-col items-center gap-20 px-20 pt-48 pb-20">
					{/* 검색 및 필터링 섹션 */}
					<section className="flex flex-col items-center justify-start gap-10 self-stretch">
						<SearchBar value={searchTerm} onChange={handleSearchChange} />
						<TagList selectedTag={selectedTag} onTagSelect={handleTagSelect} />
					</section>

					{/* 검색 결과 섹션 */}
					{(debouncedSearchTerm.trim().length >= 2 ||
						selectedTag !== "전체") && (
						<SearchResultsSection
							searchTerm={debouncedSearchTerm}
							selectedTag={selectedTag}
							isSearching={isSearching}
							searchResults={searchResults}
						/>
					)}
				</div>

				{/* 추천 용어 섹션 */}
				{debouncedSearchTerm.trim().length < 2 && selectedTag === "전체" && (
					<div className="flex w-full justify-center pb-40">
						<div className="w-content px-20">
							<RecommendedTermsSection />
						</div>
					</div>
				)}
			</main>
		</>
	);
}
