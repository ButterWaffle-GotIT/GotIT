"use client";

import { CategorySquareBadge } from "@/components/ui/category/CategorySquareBadge";
import {
	categoryLabels,
	categoryHoverColors,
	categorySelectedColors,
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
	const hoverStyle = categoryHoverColors[category];
	const activeStyle = categorySelectedColors[category];

	return (
		<button
			onClick={onClick}
			className={cn(
				"glass flex h-36 w-44 cursor-pointer flex-col items-center justify-center rounded-lg outline-[0.25px] outline-offset-[-0.25px] transition-all",
				isSelected
					? `${activeStyle} outline-white`
					: `outline-white-30 bg-white/5 ${hoverStyle} hover:outline-white-50`
			)}
		>
			<CategorySquareBadge category={category} />
			<span className="text-subtitle3 mt-4 text-white">
				{categoryLabels[category]}
			</span>
		</button>
	);
}
