"use client";

import { cn } from "@/utils/cn";
import { ScrapIcon } from "@/components/icons";

type ScrapButtonSize = "sm" | "lg";

interface ScrapButtonProps {
	bookmarked: boolean;
	onClick: (e: React.MouseEvent) => void;
	size?: ScrapButtonSize;
	className?: string;
}

const sizeConfig = {
	sm: {
		button: "h-6 w-6 rounded",
		icon: 16,
	},
	lg: {
		button: "h-9 w-9 rounded-md",
		icon: 24,
	},
} as const;

export function ScrapButton({
	bookmarked,
	onClick,
	size = "sm",
	className,
}: ScrapButtonProps) {
	const config = sizeConfig[size];

	return (
		<button
			onClick={onClick}
			className={cn(
				"flex items-center justify-center transition-colors",
				config.button,
				bookmarked ? "bg-yellow-500/20" : "bg-white/10 hover:bg-white/20",
				className
			)}
			aria-label="스크랩"
		>
			<ScrapIcon
				size={config.icon}
				color={bookmarked ? "#FFC107" : "#D4C2F0"}
				filled={bookmarked}
			/>
		</button>
	);
}
