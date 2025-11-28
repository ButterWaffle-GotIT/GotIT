// components/SearchBar.tsx
"use client";

import React, { useState, useEffect, useCallback } from "react";
import { SearchIcon } from "@/components/icons/ic_search";
import { TermIndexItem, searchTerms, getTermsByTag, getAllTags } from "@/lib/terms";

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

    // performSearch 정의
    const performSearch = useCallback(
        async (query: string, tag?: string) => {
            let res: TermIndexItem[] = [];

            if (query.trim()) {
                res = await searchTerms(query);
            } else if (tag) {
                res = await getTermsByTag(tag);
            }

            if (tag) {
                res = res.filter((t) => t.tags.includes(tag) || t.primaryTag === tag);
            }

            setResults(res);
        },
        []
    );

    // 검색어 또는 태그 변경 시 재검색
    useEffect(() => {
        performSearch(debouncedTerm, selectedTag);
    }, [debouncedTerm, selectedTag, performSearch]);

    return (
        <div className="flex w-full flex-col items-center justify-start gap-6">
            {/* 로고 */}
            <h1 className="font-['Dela_Gothic_One'] text-6xl font-normal text-white">
                got IT
            </h1>

            {/* 검색 입력창 */}
            <div className="relative w-[864px] h-20">
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
            <div className="flex flex-wrap gap-2 w-[864px]">
                {allTags.map((tag) => (
                    <button
                        key={tag}
                        onClick={() =>
                            setSelectedTag((prev) => (prev === tag ? undefined : tag))
                        }
                        className={`px-3 py-1 rounded-md border ${
                            selectedTag === tag
                                ? "bg-violet-700 text-white border-violet-700"
                                : "bg-black/50 text-gray-400 border-gray-600"
                        }`}
                    >
                        {tag}
                    </button>
                ))}
            </div>

            {/* 검색 결과 카드 */}
            <div className="w-[864px] mt-4 grid grid-cols-2 gap-4 max-h-[500px] overflow-y-auto">
                {results.map((item) => (
                    <div
                        key={item.id}
                        className="p-4 rounded-lg bg-black/50 border border-gray-700 hover:bg-black/70 transition cursor-pointer"
                    >
                        <h3 className="text-lg font-semibold text-white">{item.termKo}</h3>
                        {item.termEn && <p className="text-gray-400">{item.termEn}</p>}
                        <p className="text-gray-300 mt-1 text-sm">{item.summary}</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                            {item.tags.map((t) => (
                                <span
                                    key={t}
                                    className="px-2 py-0.5 text-xs rounded bg-violet-700 text-white"
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
