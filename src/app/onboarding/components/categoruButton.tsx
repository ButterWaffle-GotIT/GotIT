"use client";

import { CategorySquareBadge } from "@/components/ui/category/CategorySquareBadge";
import {
	categoryLabels,
	type CategoryType,
} from "@/components/ui/category/config";
import { cn } from "@/utils/cn";

interface CategoryButtonProps {
	category: CategoryType;
	isSelected: boolean;
	onClick: () => void;
}

export default function CategoryButton({
	category,
	isSelected,
	onClick,
}: CategoryButtonProps) {
	return (
		<div
			onClick={onClick}
			className={cn(
				"glass flex h-36 w-44 cursor-pointer flex-col items-center justify-center rounded-lg transition-all",
				isSelected ? "bg-white/20" : "bg-white/5 hover:bg-white/10"
			)}
		>
			<CategorySquareBadge category={category} />
			<span className="text-subtitle3 mt-4 text-white">
				{categoryLabels[category]}
			</span>
		</div>
	);
}
