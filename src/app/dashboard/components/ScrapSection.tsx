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
		<div className="glass flex flex-col gap-8 bg-white/10 px-9 py-10 rounded-3xl w-full">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-[0.69rem]">
					<div className="bg-linear-to-r from-[#6E50C8] to-[#CE5E61] p-[0.58rem] rounded-[0.6rem] flex items-center justify-center">
  <ScrapIcon className="w-4 h-4 text-white" width={16} height={16} />
</div>
					<div className="flex flex-col">
						<h2 className="text-subtitle1 text-gray-50">스크랩한 용어</h2>
						<span className="text-caption1 text-gray-300">
							총 {totalCount}개
						</span>
					</div>
				</div>

				<div className="flex items-center gap-1">
					<SortIcon className="w-4 h-4 text-gray-50" width={16} height={16} />
					<span className="text-button-small text-gray-50">최신순</span>
					<ChevronDownIcon
						className="w-4 h-4 text-gray-50"
						width={16}
						height={16}
					/>
				</div>
			</div>

			<div className="overflow-x-auto scrollbar-hide">
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

			<div className="grid grid-cols-3 gap-x-4 gap-y-4">
				{cards.map((card) => (
					<ScrapCard key={card.id} card={card} />
				))}
			</div>
		</div>
	);
}
