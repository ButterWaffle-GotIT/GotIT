"use client";

import Link from "next/link";
import { useState } from "react";
import { ScrapIcon } from "@/components/icons/ic_scrap";
import { CATEGORIES, CATEGORY_KEYS } from "@/config/categories";
import type { ScrapCardData } from "@/types/scrapCard";
import CategoryTag from "./CategoryTag";
import ScrapCard from "./ScrapCard";
import { sortCards, SortType } from "../utils/order";
import SortDropdown from "@/components/ui/SortDropdown";
import { BRAND_GRADIENT } from "@/constants/theme";

interface ScrapSectionProps {
	totalCount: number;
	selectedCategory: string;
	onCategorySelect: (category: string) => void;
	cards: ScrapCardData[];
	isLoading?: boolean;
}

export default function ScrapSection({
	totalCount,
	selectedCategory,
	onCategorySelect,
	cards,
	isLoading = false,
}: ScrapSectionProps) {
	// 한글 라벨 목록 생성
	const categories = CATEGORY_KEYS.map((key) => CATEGORIES[key].label);
	const [sortType, setSortType] = useState<SortType>("latest");

	const sortedCards = sortCards(cards, sortType);

	return (
		<div className="glass flex w-full flex-col gap-8 rounded-3xl bg-white/10 px-9 py-10">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-[0.69rem]">
					<div
						className={`flex items-center justify-center rounded-[0.6rem] ${BRAND_GRADIENT.bg} p-[0.58rem]`}
					>
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

				<SortDropdown sortType={sortType} onSortChange={setSortType} />
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
						className={`text-button-medium mt-5 rounded-lg ${BRAND_GRADIENT.bg} px-5 py-2 text-white`}
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
