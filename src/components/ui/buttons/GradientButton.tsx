import { ButtonHTMLAttributes, ReactNode } from "react";

interface GradientButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
	isLoading?: boolean;
	rounded?: "xl" | "lg" | "full";
}

export default function GradientButton({
	children,
	isLoading = false,
	rounded = "xl",
	className = "",
	disabled,
	...props
}: GradientButtonProps) {
	const roundedClass = {
		xl: "rounded-xl",
		lg: "rounded-lg",
		full: "rounded-full",
	}[rounded];

	return (
		<button
			disabled={disabled || isLoading}
			className={`${roundedClass} bg-linear-to-r from-violet-700 to-red-400 px-8 py-4 font-bold text-white transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
			{...props}
		>
			{children}
		</button>
	);
}
