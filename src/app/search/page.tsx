"use client";

import React, { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import TagList from "@/components/TagList";
import RecommendedTermCard from "@/components/RecommendedTermCard";
import { ChevronsDownIcon } from "@/components/icons/ic_chevrons_down";
import { SearchIcon } from "@/components/icons/ic_search";
import { getTermsIndex, searchTerms, type TermIndexItem } from "@/lib/terms";
import { isBookmarked, toggleBookmark } from "@/lib/bookmarks";

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

// 검색바 컴포넌트 (내장)
function SearchBar({
	value,
	onChange,
}: {
	value: string;
	onChange: (value: string) => void;
}) {
	return (
		<div className="flex w-[864px] flex-col items-center justify-start gap-10">
			{/* 중앙 로고: got IT */}
			<h1 className="font-['Dela_Gothic_One'] text-6xl font-normal leading-[60px] text-white">
				got IT
			</h1>

			{/* 검색 입력창 컨테이너 */}
			<div className="relative h-20 w-full">
				{/* 1. 아우라 레이어 (opacity 30 + blur + gradient border) */}
				<div className="absolute left-0 top-0 h-20 w-[864px] rounded-[20px] border border-violet-700 bg-gradient-to-r from-violet-700 to-red-400 opacity-30 blur-sm"></div>

				{/* 2. 실제 입력창 (내부) */}
				<div className="absolute left-[4px] top-[4px] inline-flex w-[856px] items-center justify-between overflow-hidden rounded-[20px] bg-black/70 px-7 py-4 outline outline-1 outline-offset-[-1px] outline-violet-700">
					<input
						value={value}
						onChange={(e) => onChange(e.target.value)}
						className="flex-1 bg-transparent font-['Pretendard'] text-base font-normal leading-6 text-white placeholder-gray-500 outline-none"
						placeholder="궁금한 IT 용어를 검색해보세요... (예: API, React, Docker)"
					/>
					{/* 검색 아이콘 (SVG placeholder) */}
					<div className="relative h-9 w-9 overflow-hidden">
						<SearchIcon
							className="absolute left-[6px] top-[6px] h-6 w-6 text-violet-700"
							width={24}
							height={24}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

// 검색 결과 카드 컴포넌트
function SearchResultCard({ item }: { item: TermIndexItem }) {
	const router = useRouter();
	const [bookmarked, setBookmarked] = useState(false);

	useEffect(() => {
		setBookmarked(isBookmarked(item.id));
	}, [item.id]);

	const handleBookmark = (e: React.MouseEvent) => {
		e.stopPropagation();
		const newState = toggleBookmark(item.id);
		setBookmarked(newState);
	};

	const handleShare = async (e: React.MouseEvent) => {
		e.stopPropagation();
		const url = `${window.location.origin}/terms/${item.slug}`;
		try {
			await navigator.share({
				title: item.termEn || item.termKo,
				text: item.summary,
				url: url,
			});
		} catch {
			await navigator.clipboard.writeText(url);
		}
	};

	const handleClick = () => {
		router.push(`/terms/${item.slug}`);
	};

	return (
		<div
			onClick={handleClick}
			className="flex cursor-pointer flex-col gap-4 rounded-xl bg-gray-800/50 p-5 transition-colors hover:bg-gray-800/70"
		>
			<div className="flex items-start justify-between">
				<div className="flex items-center gap-3">
					<div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-400">
						<span className="text-lg font-bold text-gray-900">
							{item.termEn?.[0] || item.termKo[0]}
						</span>
					</div>
					<div className="flex flex-col gap-1">
						<h3 className="font-['Pretendard'] text-lg font-bold text-white">
							{item.termEn || item.termKo}
						</h3>
						<div className="flex items-center gap-2 text-sm text-gray-400">
							<span>{item.primaryTag}</span>
							{item.termEn && <span>|</span>}
							{item.termEn && <span>{item.termKo}</span>}
						</div>
					</div>
				</div>
				<div className="flex items-center gap-2">
					<button
						onClick={handleBookmark}
						className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors hover:bg-gray-700"
					>
						<svg
							width="20"
							height="20"
							viewBox="0 0 20 20"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M5 2.5C4.30964 2.5 3.75 3.05964 3.75 3.75V17.5L10 13.75L16.25 17.5V3.75C16.25 3.05964 15.6904 2.5 15 2.5H5Z"
								fill={bookmarked ? "currentColor" : "none"}
								stroke="currentColor"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</button>
					<button
						onClick={handleShare}
						className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors hover:bg-gray-700"
					>
						<svg
							width="20"
							height="20"
							viewBox="0 0 20 20"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M13.75 6.875C15.1307 6.875 16.25 5.75571 16.25 4.375C16.25 2.99429 15.1307 1.875 13.75 1.875C12.3693 1.875 11.25 2.99429 11.25 4.375C11.25 5.75571 12.3693 6.875 13.75 6.875Z"
								stroke="currentColor"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<path
								d="M6.25 12.5C7.63071 12.5 8.75 11.3807 8.75 10C8.75 8.61929 7.63071 7.5 6.25 7.5C4.86929 7.5 3.75 8.61929 3.75 10C3.75 11.3807 4.86929 12.5 6.25 12.5Z"
								stroke="currentColor"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<path
								d="M13.75 18.125C15.1307 18.125 16.25 17.0057 16.25 15.625C16.25 14.2443 15.1307 13.125 13.75 13.125C12.3693 13.125 11.25 14.2443 11.25 15.625C11.25 17.0057 12.3693 18.125 13.75 18.125Z"
								stroke="currentColor"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<path
								d="M8.4375 11.125L11.5625 13.5"
								stroke="currentColor"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<path
								d="M11.5625 6.5L8.4375 8.875"
								stroke="currentColor"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</button>
				</div>
			</div>

			<div className="flex flex-wrap gap-2">
				{item.tags?.slice(0, 3).map((tag, index) => (
					<span
						key={index}
						className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-400"
					>
						# {tag}
					</span>
				))}
			</div>

			<p className="line-clamp-2 text-sm text-gray-400">{item.summary}</p>
		</div>
	);
}

export default function SearchPage() {
	const [selectedTag, setSelectedTag] = useState("전체");
	const [searchTerm, setSearchTerm] = useState("");
	const [searchResults, setSearchResults] = useState<TermIndexItem[]>([]);
	const [allTerms, setAllTerms] = useState<TermIndexItem[]>([]);
	const [isSearching, setIsSearching] = useState(false);
	const [showMoreRecommended, setShowMoreRecommended] = useState(false);

	// 초기 데이터 로드
	useEffect(() => {
		async function loadTerms() {
			const terms = await getTermsIndex();
			setAllTerms(terms);
		}
		loadTerms();
	}, []);

	const handleTagSelect = useCallback((tagName: string) => {
		setSelectedTag(tagName);
		// TODO: 태그별 필터링 로직
	}, []);

	const handleSearchChange = useCallback(
		async (value: string) => {
			setSearchTerm(value);
			setIsSearching(true);

			if (value.trim()) {
				// searchTerms 함수 사용 (이미 한글/영문/요약/태그 검색 포함)
				const results = await searchTerms(value);
				
				// 선택된 태그로 필터링
				const filtered =
					selectedTag === "전체"
						? results
						: results.filter(
								(term) =>
									term.primaryTag === selectedTag ||
									term.tags.includes(selectedTag)
						  );
				
				setSearchResults(filtered);
			} else {
				setSearchResults([]);
			}

			setIsSearching(false);
		},
		[selectedTag]
	);

	// 태그가 변경되면 검색 재실행
	// useEffect(() => {
	// 	if (searchTerm.trim()) {
	// 		performSearch(searchTerm);
	// 	}
	// }, [selectedTag, performSearch]);
	// 태그가 변경되면 검색 재실행
	useEffect(() => {
		const runSearch = async () => {
			if (searchTerm.trim()) {
				// 기존 handleSearchChange 로직을 재사용
				setIsSearching(true);
				const results = await searchTerms(searchTerm);
				const filtered =
					selectedTag === "전체"
						? results
						: results.filter(
								(term) =>
									term.primaryTag === selectedTag || term.tags.includes(selectedTag)
						);
				setSearchResults(filtered);
				setIsSearching(false);
			}
		};
		runSearch();
	}, [selectedTag, searchTerm]);


	const displayedRecommendedTerms = showMoreRecommended
		? recommendedTerms
		: recommendedTerms.slice(0, 3);

	return (
		<>
			<main className="flex w-full justify-center pt-20">
				<div className="flex w-[1040px] flex-col items-center gap-20 px-20 pt-48 pb-20">
					{/* A. 검색 및 필터링 섹션 */}
					<section className="flex flex-col items-center justify-start gap-10 self-stretch">
						<SearchBar value={searchTerm} onChange={handleSearchChange} />
						<TagList selectedTag={selectedTag} onTagSelect={handleTagSelect} />
					</section>

					{/* B. 검색 결과 섹션 */}
					{searchTerm.trim() && (
						<section className="flex flex-col items-start justify-start gap-5 self-stretch">
							<div className="flex items-center justify-between self-stretch">
								<div className="font-['Pretendard'] text-sm font-semibold leading-5 text-gray-500">
									검색 결과 : "{searchTerm}"
								</div>
								<button className="rounded-lg border border-gray-700 px-3 py-1.5 text-sm text-gray-400 transition-colors hover:border-gray-600 hover:text-gray-300">
									최신순 ▼
								</button>
							</div>

							{isSearching ? (
								<div className="flex w-full items-center justify-center py-20">
									<div className="text-gray-500">검색 중...</div>
								</div>
							) : searchResults.length > 0 ? (
								<div className="grid grid-cols-1 gap-4 self-stretch">
									{searchResults.map((item) => (
										<SearchResultCard key={item.id} item={item} />
									))}
								</div>
							) : (
								<div className="flex w-full items-center justify-center py-20">
									<div className="text-center text-gray-500">
										<p className="text-lg">검색 결과가 없습니다.</p>
										<p className="mt-2 text-sm">
											다른 키워드로 검색해보세요.
										</p>
									</div>
								</div>
							)}
						</section>
					)}

					{/* C. 추천 용어 섹션 */}
					{!searchTerm.trim() && (
						<section className="flex flex-col items-start justify-start gap-5 self-stretch">
							<div className="self-stretch font-['Pretendard'] text-sm font-semibold leading-5 text-gray-500">
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
					)}
				</div>
			</main>
		</>
	);
}