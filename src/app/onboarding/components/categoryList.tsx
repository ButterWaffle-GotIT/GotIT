"use client";

import { type CategoryType } from "@/components/ui/category/config";
import CategoryButton from "./categoruButton";

interface CategoryListProps {
	selectedCategory: CategoryType | null;
	onSelectCategory: (category: CategoryType) => void;
}

const row1Categories: CategoryType[] = ["frontend", "backend", "uiux", "ai"];
const row2Categories: CategoryType[] = [
	"cloud",
	"data",
	"security",
	"devops",
	"business",
];

export default function CategoryList({
	selectedCategory,
	onSelectCategory,
}: CategoryListProps) {
	return (
		<div className="w-content flex flex-col gap-10">
			<div className="flex justify-center gap-10">
				{row1Categories.map((category) => (
					<CategoryButton
						key={category}
						category={category}
						isSelected={selectedCategory === category}
						onClick={() => onSelectCategory(category)}
					/>
				))}
			</div>

			<div className="flex justify-between">
				{row2Categories.map((category) => (
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
