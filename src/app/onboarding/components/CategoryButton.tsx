"use client";

import { CategorySquareBadge } from "@/components/ui/category/CategorySquareBadge";
import { CATEGORIES, type CategoryType } from "@/config/categories";
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
	const config = CATEGORIES[category];

	return (
		<button
			onClick={onClick}
			className={cn(
				"glass flex h-36 w-44 cursor-pointer flex-col items-center justify-center rounded-lg outline-[0.25px] outline-offset-[-0.25px] transition-all",
				isSelected
					? `${config.selectedColor} outline-white`
					: `outline-white-30 bg-white/5 ${config.hoverColor} hover:outline-white-50`
			)}
		>
			<CategorySquareBadge category={category} />
			<span className="text-subtitle3 mt-4 text-white">{config.label}</span>
		</button>
	);
}
