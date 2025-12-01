"use client";

import { CATEGORIES, getCategoryType } from "@/config/categories";

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
	const categoryType = getCategoryType(category);
	const config = CATEGORIES[categoryType];
	const IconComponent = config.icon;

	const baseClasses =
		"glass inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl px-5 py-2 outline-[0.25px] outline-offset-[-0.25px] transition-colors shrink-0";

	const stateClasses = isActive
		? `${config.selectedColor} outline-white`
		: `bg-white/5 outline-white-30 ${config.hoverColor} hover:outline-white-50`;

	return (
		<div onClick={onClick} className={`${baseClasses} ${stateClasses}`}>
			<div
				className={`w-6 p-1 ${config.bgColor} flex items-center justify-start gap-2.5 overflow-hidden rounded-[100px] outline-[0.25px] outline-offset-[-0.25px] outline-white`}
			>
				<IconComponent className="h-4 w-4 text-white" width={16} height={16} />
			</div>
			<span className="text-sm leading-6 font-bold text-white">
				#{category}
			</span>
		</div>
	);
}
