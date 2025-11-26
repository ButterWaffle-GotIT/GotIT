import { cn } from "@/utils/cn";
import { type CategoryType, categoryConfig } from "./config";

interface CategorySquareBadgeProps {
	category: CategoryType;
	className?: string;
}

export function CategorySquareBadge({
	category,
	className,
}: CategorySquareBadgeProps) {
	const config = categoryConfig[category];
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
