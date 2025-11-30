"use client";

import { type CategoryType } from "@/config/categories";
import CategoryButton from "./CategoryButton";

interface CategoryListProps {
	selectedCategory: CategoryType | null;
	onSelectCategory: (category: CategoryType) => void;
}

// 온보딩용 2줄 배열 (all 제외)
const ONBOARDING_ROWS: [CategoryType[], CategoryType[]] = [
	["frontend", "backend", "uxui", "ai"],
	["cloud", "data", "security", "devops", "business"],
];

export default function CategoryList({
	selectedCategory,
	onSelectCategory,
}: CategoryListProps) {
	return (
		<div className="w-content flex flex-col gap-10">
			<div className="flex justify-center gap-10">
				{ONBOARDING_ROWS[0].map((category) => (
					<CategoryButton
						key={category}
						category={category}
						isSelected={selectedCategory === category}
						onClick={() => onSelectCategory(category)}
					/>
				))}
			</div>

			<div className="flex justify-between">
				{ONBOARDING_ROWS[1].map((category) => (
					<CategoryButton
						key={category}
						category={category}
						isSelected={selectedCategory === category}
						onClick={() => onSelectCategory(category)}
					/>
				))}
			</div>
		</div>
	);
}
