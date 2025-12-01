import { cn } from "@/utils/cn";
import { type CategoryType, CATEGORIES } from "@/config/categories";

interface CategorySquareBadgeProps {
	category: CategoryType;
	className?: string;
}

export function CategorySquareBadge({
	category,
	className,
}: CategorySquareBadgeProps) {
	const config = CATEGORIES[category];
	const Icon = config.icon;

	return (
		<div
			className={cn(
				"glass flex h-16 w-16 items-center justify-center overflow-visible rounded-xl",
				config.bgColor,
				className
			)}
		>
			<Icon size={42} color="white" />
		</div>
	);
}
