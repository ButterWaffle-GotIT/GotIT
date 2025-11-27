"use client";

import { categoryIcons, categoryColors } from "./categoryData";

interface CategoryTagProps {
	category: string;
	isActive: boolean;
	onClick: () => void;
}

export default function CategoryTag({
	category,
	isActive,
	onClick,
}: CategoryTagProps) {
	const IconComponent = categoryIcons[category];
	const colorClass = categoryColors[category];
	const defaultStyle = "bg-white/5 outline-white-30";
	const hoverStyle = `hover:${colorClass}/10 hover:outline-white-50`;
	const activeStyle = `${colorClass}/50 outline-white`;
	const finalClasses = isActive
		? activeStyle + " transition-colors"
		: defaultStyle + " " + hoverStyle + " transition-colors";

	return (
		<div
			onClick={onClick}
			className={`glass inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl px-5 py-2 outline-[0.25px] outline-offset-[-0.25px] ${finalClasses} shrink-0`}
		>
			<div
				className={`w-6 p-1 ${colorClass} flex items-center justify-start gap-2.5 overflow-hidden rounded-[100px] outline-[0.25px] outline-offset-[-0.25px] outline-white`}
			>
				{IconComponent && (
					<IconComponent
						className="h-4 w-4 text-white"
						width={16}
						height={16}
					/>
				)}
			</div>
			<div className="flex items-center justify-start gap-0.5">
				<span className="text-sm leading-6 font-bold text-white">#</span>
				<span className="text-sm leading-6 font-bold text-white">
					{category}
				</span>
			</div>
		</div>
	);
}
