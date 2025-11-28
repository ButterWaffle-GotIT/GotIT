// components/SearchBar.tsx
"use client";

import React, { useState, useEffect } from "react";
import { SearchIcon } from "@/components/icons/ic_search";
import {
	TermIndexItem,
	searchTerms,
	getTermsByTag,
	getAllTags,
} from "@/lib/terms";

// 디바운스 훅
function useDebounce<T>(value: T, delay: number): T {
	const [debounced, setDebounced] = useState(value);
	useEffect(() => {
		const handler = setTimeout(() => setDebounced(value), delay);
		return () => clearTimeout(handler);
	}, [value, delay]);
	return debounced;
}

export default function SearchBar() {
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedTag, setSelectedTag] = useState<string | undefined>(undefined);
	const [results, setResults] = useState<TermIndexItem[]>([]);
	const [allTags, setAllTags] = useState<string[]>([]);

	const debouncedTerm = useDebounce(searchTerm, 300);

	// 초기 태그 목록 로드
	useEffect(() => {
		getAllTags().then(setAllTags);
	}, []);

	// 검색어 또는 태그 변경 시 재검색
	useEffect(() => {
		async function performSearch() {
			let res: TermIndexItem[] = [];

			if (debouncedTerm.trim()) {
				res = await searchTerms(debouncedTerm);
			} else if (selectedTag) {
				res = await getTermsByTag(selectedTag);
			}

			if (selectedTag) {
				res = res.filter((t) => t.tags.includes(selectedTag) || t.primaryTag === selectedTag);
			}

			setResults(res);
		}

		performSearch();
	}, [debouncedTerm, selectedTag]);

	return (
		<div className="flex w-full flex-col items-center justify-start gap-6">
			{/* 로고 */}
			<h1 className="font-['Dela_Gothic_One'] text-6xl font-normal text-white">
				got IT
			</h1>

			{/* 검색 입력창 */}
			<div className="relative h-20 w-[864px]">
				<div className="absolute top-0 left-0 h-20 w-full rounded-[20px] border border-violet-700 bg-gradient-to-r from-violet-700 to-red-400 opacity-30 blur-sm"></div>

				<div className="absolute top-[4px] left-[4px] inline-flex w-[856px] items-center justify-between overflow-hidden rounded-[20px] bg-black/70 px-7 py-4 outline outline-1 outline-offset-[-1px] outline-violet-700">
					<input
						type="text"
						className="flex-1 bg-transparent font-['Pretendard'] text-base font-normal text-gray-500 placeholder-gray-500 outline-none"
						placeholder="궁금한 IT 용어를 검색해보세요... (예: API, React, Docker)"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
					<div className="relative h-9 w-9 overflow-hidden">
						<SearchIcon className="absolute top-[6px] left-[6px] h-6 w-6 text-violet-700" />
					</div>
				</div>
			</div>

			{/* 태그 선택 */}
			<div className="flex w-[864px] flex-wrap gap-2">
				{allTags.map((tag) => (
					<button
						key={tag}
						onClick={() =>
							setSelectedTag((prev) => (prev === tag ? undefined : tag))
						}
						className={`rounded-md border px-3 py-1 ${
							selectedTag === tag
								? "border-violet-700 bg-violet-700 text-white"
								: "border-gray-600 bg-black/50 text-gray-400"
						}`}
					>
						{tag}
					</button>
				))}
			</div>

			{/* 검색 결과 카드 */}
			<div className="mt-4 grid max-h-[500px] w-[864px] grid-cols-2 gap-4 overflow-y-auto">
				{results.map((item) => (
					<div
						key={item.id}
						className="cursor-pointer rounded-lg border border-gray-700 bg-black/50 p-4 transition hover:bg-black/70"
					>
						<h3 className="text-lg font-semibold text-white">{item.termKo}</h3>
						{item.termEn && <p className="text-gray-400">{item.termEn}</p>}
						<p className="mt-1 text-sm text-gray-300">{item.summary}</p>
						<div className="mt-2 flex flex-wrap gap-1">
							{item.tags.map((t) => (
								<span
									key={t}
									className="rounded bg-violet-700 px-2 py-0.5 text-xs text-white"
								>
									{t}
								</span>
							))}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
