import { type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/utils/cn";

interface GlassButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
	variant?: "default" | "rounded";
}

export function GlassButton({
	children,
	className,
	variant = "default",
	...props
}: GlassButtonProps) {
	const borderRadius = variant === "rounded" ? "rounded-full" : "rounded";

	return (
		<button
			className={cn(
				"glass bg-white-10 hover:bg-white-20 flex items-center justify-center backdrop-blur-sm transition-colors",
				borderRadius,
				className
			)}
			{...props}
		>
			{children}
		</button>
	);
}
