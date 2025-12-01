import { cn } from "@/utils/cn";
import { type CategoryType, CATEGORIES } from "@/config/categories";

interface CategoryChipProps {
	category: CategoryType;
	disabled?: boolean;
	className?: string;
}

export function CategoryChip({
	category,
	disabled = false,
	className,
}: CategoryChipProps) {
	const config = CATEGORIES[category];
	const Icon = config.icon;

	return (
		<div
			className={cn(
				"glass flex h-6 w-6 items-center self-stretch overflow-visible rounded-full border-[0.25px] border-white p-1",
				disabled ? "bg-gray-700" : config.bgColor,
				className
			)}
		>
			<Icon size={16} color="white" />
		</div>
	);
}
