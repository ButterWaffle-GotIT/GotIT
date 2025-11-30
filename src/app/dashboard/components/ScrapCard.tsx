"use client";

import { useRouter } from "next/navigation";
import { ScrapIcon } from "@/components/icons/ic_scrap";
import { ArrowRightIcon } from "@/components/icons/ic_arrow_right";
import { categoryIcons, categoryColors, ScrapCardData } from "@/types/category";

interface ScrapCardProps {
	card: ScrapCardData;
}

export default function ScrapCard({ card }: ScrapCardProps) {
	const router = useRouter();
	const IconComponent = categoryIcons[card.category];
	const colorClass = categoryColors[card.category];

	const handleClick = () => {
		if (card.slug) {
			router.push(`/terms/${card.slug}`);
		}
	};

	return (
		<div
			onClick={handleClick}
			className="glass flex w-78.5 cursor-pointer flex-col rounded-2xl bg-white/5 p-5 transition-colors hover:bg-white/10"
		>
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<div
						className={`h-6 w-6 ${colorClass} flex items-center justify-center rounded-full p-1 outline-[0.25px] outline-offset-[-0.25px] outline-white`}
					>
						{IconComponent && (
							<IconComponent
								className="h-4 w-4 text-white"
								width={16}
								height={16}
							/>
						)}
					</div>

					<div className="h-6 w-43">
						<span className="text-subtitle1 line-clamp-1 text-gray-50">
							{card.term}
						</span>
					</div>
				</div>

				<span className="text-caption2 rounded-[6.25rem] bg-gray-900 px-2 py-0.5 text-gray-300">
					{card.tag}
				</span>
			</div>

			<div className="py-[0.69rem]">
				<p className="text-caption1 line-clamp-2 h-9 w-68.5 text-gray-400">
					{card.description}
				</p>
			</div>

			<div className="mb-[0.62rem] h-px w-full bg-gray-500" />

			<div className="flex items-center justify-between">
				<div className="flex items-center gap-1">
					<ScrapIcon
						className="h-3 w-3 text-yellow-400"
						width={12}
						height={12}
					/>
					<span className="text-caption2 text-gray-500">{card.date}</span>
				</div>
				<ArrowRightIcon
					className="h-3 w-3 text-gray-400"
					width={12}
					height={12}
				/>
			</div>
		</div>
	);
}
