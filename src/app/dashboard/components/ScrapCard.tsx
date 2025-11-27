"use client";

import { ScrapIcon } from "@/components/icons/ic_scrap";
import { ArrowRightIcon } from "@/components/icons/ic_arrow_right";
import { categoryIcons, categoryColors, ScrapCardData } from "./categoryData";

interface ScrapCardProps {
	card: ScrapCardData;
}

export default function ScrapCard({ card }: ScrapCardProps) {
	const IconComponent = categoryIcons[card.category];
	const colorClass = categoryColors[card.category];

	return (
		<div className="glass flex flex-col rounded-2xl p-5 bg-white/5 w-78.5">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<div
						className={`w-6 h-6 ${colorClass} flex items-center justify-center rounded-full outline-[0.25px] outline-offset-[-0.25px] outline-white p-1`}
					>
						{IconComponent && (
							<IconComponent className="w-4 h-4 text-white" width={16} height={16} />
						)}
					</div>

					<div className="w-43 h-6">
						<span className="text-subtitle1 text-gray-50 line-clamp-1">
							{card.term}
						</span>
					</div>
				</div>

				<div className="bg-gray-900 flex items-center px-2 py-0.5 rounded-[6.25rem]">
					<span className="text-caption2 text-gray-300">{card.tag}</span>
				</div>
			</div>

			<div className="py-[0.69rem]">
				<p className="text-caption1 w-68.5 h-9 text-gray-400 line-clamp-2">
					{card.description}
				</p>
			</div>

			<div className="w-full h-px bg-gray-500 mb-[0.62rem]" />

			<div className="flex items-center justify-between">
				<div className="flex items-center gap-1">
					<ScrapIcon className="w-3 h-3 text-yellow-400" width={12} height={12} />
					<span className="text-caption2 text-gray-500">{card.date}</span>
				</div>
				<ArrowRightIcon className="w-3 h-3 text-gray-400" width={12} height={12} />
			</div>
		</div>
	);
}
