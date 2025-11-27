"use client";

import { ScrapIcon } from "@/components/icons/ic_scrap";
import { SortIcon } from "@/components/icons/ic_sort";
import { ChevronDownIcon } from "@/components/icons/ic_chevron_down";
import { categoryIcons, ScrapCardData } from "./categoryData";
import CategoryTag from "./CategoryTag";
import ScrapCard from "./ScrapCard";

interface ScrapSectionProps {
	totalCount: number;
	selectedCategory: string;
	onCategorySelect: (category: string) => void;
	cards: ScrapCardData[];
}

export default function ScrapSection({
	totalCount,
	selectedCategory,
	onCategorySelect,
	cards,
}: ScrapSectionProps) {
	const categories = Object.keys(categoryIcons);

	return (
		<div className="glass flex w-full flex-col gap-8 rounded-3xl bg-white/10 px-9 py-10">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-[0.69rem]">
					<div className="flex items-center justify-center rounded-[0.6rem] bg-linear-to-r from-[#6E50C8] to-[#CE5E61] p-[0.58rem]">
						<ScrapIcon
							className="h-4 w-4 text-gray-700"
							width={16}
							height={16}
						/>
					</div>
					<div className="flex flex-col">
						<h2 className="text-subtitle1 text-gray-50">스크랩한 용어</h2>
						<span className="text-caption1 text-gray-300">
							총 {totalCount}개
						</span>
					</div>
				</div>

				<div className="flex items-center gap-1">
					<SortIcon className="h-4 w-4 text-gray-50" width={16} height={16} />
					<span className="text-button-small text-gray-50">최신순</span>
					<ChevronDownIcon
						className="h-4 w-4 text-gray-50"
						width={16}
						height={16}
					/>
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

			{cards.length === 0 ? (
				<div className="mt-[3.94rem] mb-[3.94rem] flex flex-col items-center">
					<div className="flex h-15 w-15 items-center justify-center rounded-full bg-gray-800">
						<ScrapIcon
							className="h-7 w-7 text-gray-700"
							width={28}
							height={28}
						/>
					</div>
					<div className="mt-5">
						<p className="text-body3 text-center text-gray-50">
							해당 카테고리에 스크랩한 용어가 없어요
						</p>
					</div>
					<div className="mt-3">
						<p className="text-body5 text-center text-gray-500">
							관심있는 용어를 스크랩해보세요
						</p>
					</div>
					<button className="text-button-medium mt-5 rounded-lg bg-linear-to-r from-[#6E50C8] to-[#CE5E61] px-5 py-2 text-white">
						용어 검색하기
					</button>
				</div>
			) : (
				<div className="grid grid-cols-3 gap-x-4 gap-y-4">
					{cards.map((card) => (
						<ScrapCard key={card.id} card={card} />
					))}
				</div>
			)}
		</div>
	);
}
