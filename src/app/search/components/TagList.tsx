"use client";

import {
	CATEGORIES,
	CATEGORY_ROWS,
	type CategoryType,
} from "@/config/categories";

interface TagListProps {
	selectedTag: string;
	onTagSelect: (tagName: string) => void;
}

function TagItem({
	category,
	isActive,
	onClick,
}: {
	category: CategoryType;
	isActive: boolean;
	onClick: () => void;
}) {
	const config = CATEGORIES[category];
	const IconComponent = config.icon;

	const baseClasses =
		"glass inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl px-5 py-2 outline outline-[0.25px] outline-offset-[-0.25px] transition-colors";

	const stateClasses = isActive
		? `${config.selectedColor} outline-white`
		: `bg-white/5 outline-white-30 ${config.hoverColor} hover:outline-white-50`;

	return (
		<div onClick={onClick} className={`${baseClasses} ${stateClasses}`}>
			<div
				className={`w-6 p-1 ${config.bgColor} flex items-center justify-start gap-2.5 overflow-hidden rounded-[100px] outline outline-[0.25px] outline-offset-[-0.25px] outline-white`}
			>
				<IconComponent className="h-4 w-4 text-white" width={16} height={16} />
			</div>
			<span className="text-sm leading-6 font-bold text-white">
				#{config.label}
			</span>
		</div>
	);
}

export default function TagList({ selectedTag, onTagSelect }: TagListProps) {
	return (
		<div className="flex flex-col items-center justify-start gap-3 self-stretch">
			{CATEGORY_ROWS.map((row, rowIndex) => (
				<div
					key={rowIndex}
					className="inline-flex items-center justify-center gap-5 self-stretch"
				>
					{row.map((category) => (
						<TagItem
							key={category}
							category={category}
							isActive={selectedTag === CATEGORIES[category].label}
							onClick={() => onTagSelect(CATEGORIES[category].label)}
						/>
					))}
				</div>
			))}
		</div>
	);
}
