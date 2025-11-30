"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { ScrapIcon } from "@/components/icons/ic_scrap";
import { SortIcon } from "@/components/icons/ic_sort";
import { ChevronDownIcon } from "@/components/icons/ic_chevron_down";
import { categoryIcons, ScrapCardData } from "@/types/category";
import CategoryTag from "./CategoryTag";
import ScrapCard from "./ScrapCard";

type SortType = "latest" | "alphabetical";

interface ScrapSectionProps {
	totalCount: number;
	selectedCategory: string;
	onCategorySelect: (category: string) => void;
	cards: ScrapCardData[];
	isLoading?: boolean;
}

function getCharTypeOrder(str: string): number {
	if (!str) return 4;
	const char = str.charAt(0);

	if (/[0-9]/.test(char)) return 1;
	if (/[^0-9a-zA-Z가-힣]/.test(char)) return 2;
	if (/[가-힣]/.test(char)) return 3;
	return 4;
}

export default function ScrapSection({
	totalCount,
	selectedCategory,
	onCategorySelect,
	cards,
	isLoading = false,
}: ScrapSectionProps) {
	const categories = Object.keys(categoryIcons);
	const [sortType, setSortType] = useState<SortType>("latest");
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsDropdownOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const sortedCards = [...cards].sort((a, b) => {
		if (sortType === "latest") {
			return new Date(b.date).getTime() - new Date(a.date).getTime();
		} else {
			const termA = a.term;
			const termB = b.term;

			const priorityA = getCharTypeOrder(termA);
			const priorityB = getCharTypeOrder(termB);

			if (priorityA !== priorityB) {
				return priorityA - priorityB;
			}

			return termA.localeCompare(termB, "ko", { sensitivity: "base" });
		}
	});

	return (
		<div className="glass flex w-full flex-col gap-8 rounded-3xl bg-white/10 px-9 py-10">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-[0.69rem]">
					<div className="flex items-center justify-center rounded-[0.6rem] bg-linear-to-r from-[#6E50C8] to-[#CE5E61] p-[0.58rem]">
						<ScrapIcon
							className="h-4 w-4 text-white"
							width={16}
							height={16}
							filled={true}
						/>
					</div>
					<div className="flex flex-col">
						<h2 className="text-subtitle1 text-gray-50">스크랩한 용어</h2>
						<span className="text-caption1 text-gray-300">
							총 {totalCount}개
						</span>
					</div>
				</div>

				<div className="relative" ref={dropdownRef}>
					<button
						className="flex items-center gap-1"
						onClick={() => setIsDropdownOpen(!isDropdownOpen)}
					>
						<SortIcon className="h-4 w-4 text-gray-50" width={16} height={16} />
						<span className="text-button-small text-gray-50">
							{sortType === "latest" ? "최신순" : "가나다순"}
						</span>
						<ChevronDownIcon
							className="h-4 w-4 text-gray-50"
							width={16}
							height={16}
						/>
					</button>

					{isDropdownOpen && (
						<div className="absolute top-full right-0 z-50 mt-2 flex w-30 flex-col overflow-hidden rounded-lg border border-gray-700 bg-gray-900">
							<button
								className="text-body4 px-4 py-3 text-left text-gray-50 transition-colors hover:bg-gray-800"
								onClick={() => {
									setSortType("latest");
									setIsDropdownOpen(false);
								}}
							>
								최신순
							</button>
							<button
								className="text-body4 px-4 py-3 text-left text-gray-50 transition-colors hover:bg-gray-800"
								onClick={() => {
									setSortType("alphabetical");
									setIsDropdownOpen(false);
								}}
							>
								가나다순
							</button>
						</div>
					)}
				</div>
			</div>

			<div className="scrollbar-hide overflow-x-auto">
				<div className="flex gap-5">
					{categories.map((category) => (
						<CategoryTag
							key={category}
							category={category}
							isActive={selectedCategory === category}
							onClick={() => onCategorySelect(category)}
						/>
					))}
				</div>
			</div>

			{isLoading ? (
				<div className="mt-[3.94rem] mb-[3.94rem] flex flex-col items-center">
					<div className="text-gray-500">스크랩 목록을 불러오는 중...</div>
				</div>
			) : cards.length === 0 ? (
				<div className="mt-[3.94rem] mb-[3.94rem] flex flex-col items-center">
					<div className="flex h-15 w-15 items-center justify-center rounded-full bg-gray-800">
						<ScrapIcon
							className="h-7 w-7 text-gray-700"
							width={28}
							height={28}
						/>
					</div>
					<p className="text-body3 mt-5 text-center text-gray-50">
						해당 카테고리에 스크랩한 용어가 없어요
					</p>
					<p className="text-body5 mt-3 text-center text-gray-500">
						관심있는 용어를 스크랩해보세요
					</p>
					<Link
						href="/search"
						className="text-button-medium mt-5 rounded-lg bg-linear-to-r from-[#6E50C8] to-[#CE5E61] px-5 py-2 text-white"
					>
						용어 검색하기
					</Link>
				</div>
			) : (
				<div className="grid grid-cols-3 gap-x-4 gap-y-4">
					{sortedCards.map((card) => (
						<ScrapCard key={card.id} card={card} />
					))}
				</div>
			)}
		</div>
	);
}
