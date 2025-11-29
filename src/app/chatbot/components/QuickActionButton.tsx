import { type ReactNode } from "react";

interface QuickActionButtonProps {
	icon: ReactNode;
	label: string;
	onClick: () => void;
}

export default function QuickActionButton({
	icon,
	label,
	onClick,
}: QuickActionButtonProps) {
	return (
		<button
			onClick={onClick}
			className="text-button-small glass flex items-center gap-2 rounded-lg bg-white/5 px-4 py-2 text-gray-300 transition-colors hover:bg-white/10"
		>
			{icon}
			<span>{label}</span>
		</button>
	);
}
