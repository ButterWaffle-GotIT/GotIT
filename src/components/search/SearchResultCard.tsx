"use client";

import { useRouter } from "next/navigation";
import { useScrapToggle } from "@/hooks/useScrapToggle";
import { useShare } from "@/hooks/useShare";
import type { TermIndexItem } from "@/lib/terms";
import { ShareIcon, HashtagIcon } from "@/components/icons";
import { CategoryChip } from "@/components/ui/category/CategoryChip";
import { ScrapButton } from "@/components/ui/buttons/ScrapButton";
import { CATEGORIES, getCategoryType } from "@/config/categories";

interface SearchResultCardProps {
	item: TermIndexItem;
}

export default function SearchResultCard({ item }: SearchResultCardProps) {
	const router = useRouter();
	const { bookmarked, handleToggle } = useScrapToggle(item.id);
	const { shareTerm } = useShare();
	const category = getCategoryType(item.primaryTag);

	const handleBookmark = (e: React.MouseEvent) => {
		e.stopPropagation();
		handleToggle();
	};

	const handleShare = async (e: React.MouseEvent) => {
		e.stopPropagation();
		await shareTerm(item.termEn || item.termKo, item.summary, item.slug);
	};

	const handleClick = () => {
		router.push(`/terms/${item.slug}`);
	};

	return (
		<div
			onClick={handleClick}
			className="glass flex cursor-pointer flex-col gap-2.5 overflow-hidden rounded-xl p-5 transition-colors hover:bg-white/5"
		>
			<div className="flex flex-col gap-3">
				<div className="flex flex-col gap-1.5">
					<div className="flex items-center justify-start gap-1">
						<div className="flex flex-1 items-center gap-2">
							<CategoryChip category={category} />
							<h3 className="font-['Pretendard'] text-xl leading-7 font-semibold text-gray-50">
								{item.termEn || item.termKo}
							</h3>
						</div>
						<div className="flex items-center gap-1">
							<ScrapButton bookmarked={bookmarked} onClick={handleBookmark} />
							<button
								onClick={handleShare}
								className="flex h-6 w-6 items-center justify-center overflow-hidden rounded bg-white/10 transition-colors hover:bg-white/20"
							>
								<ShareIcon size={16} color="#D4C2F0" />
							</button>
						</div>
					</div>

					{/* Aliases 행 */}
					<div className="flex items-center gap-1">
						<HashtagIcon size={14} color="#9E9E9E" />
						<div className="flex items-center gap-2">
							{item.termEn && (
								<span className="font-['Pretendard'] text-[10px] leading-3.5 font-light text-gray-500">
									{item.termKo}
								</span>
							)}
							<span className="font-['Pretendard'] text-[10px] leading-3.5 font-light text-gray-500">
								{item.primaryTag}
							</span>
						</div>
					</div>
				</div>

				{/* 태그 섹션 */}
				<div className="flex flex-wrap items-start gap-1">
					{item.tags?.slice(0, 3).map((tag, index) => {
						const isFirstTag = index === 0;
						const bgColor = isFirstTag
							? CATEGORIES[category].selectedColor
							: "bg-gray-900";
						const textColor = isFirstTag ? "text-white" : "text-gray-300";

						return (
							<div
								key={index}
								className={`flex items-center justify-center gap-2.5 overflow-hidden rounded-full px-2 py-0.5 ${bgColor}`}
							>
								<span
									className={`font-['Pretendard'] text-[10px] leading-3.5 font-light ${textColor}`}
								>
									# {tag}
								</span>
							</div>
						);
					})}
				</div>

				{/* Summary */}
				<p className="line-clamp-2 font-['Pretendard'] text-xs leading-[18px] font-light text-gray-400">
					{item.summary}
				</p>
			</div>
		</div>
	);
}
