import { cn } from "@/utils/cn";
import { CategoryChip } from "./CategoryChip";
import {
	type CategoryType,
	categoryLabels,
	categoryHoverColors,
	categorySelectedColors,
} from "./config";

interface CategoryTagProps {
	category: CategoryType;
	selected?: boolean;
	className?: string;
}

export function CategoryTag({
	category,
	selected = false,
	className,
}: CategoryTagProps) {
	const label = categoryLabels[category];
	const hoverColor = categoryHoverColors[category];
	const selectedColor = categorySelectedColors[category];

	return (
		<div
			className={cn(
				"glass flex w-fit items-center justify-center gap-2 overflow-visible rounded-xl border-[0.25px] border-white px-5 py-2 transition-colors",
				selected ? selectedColor : "bg-white-5",
				!selected && hoverColor,
				className
			)}
		>
			<CategoryChip category={category} />
			<div className="flex items-center gap-0.5">
				<span className="text-body5 font-bold leading-6 text-white">
					#{label}
				</span>
			</div>
		</div>
	);
}
