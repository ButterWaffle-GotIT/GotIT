"use client";

import { useRouter } from "next/navigation";
import { cn } from "@/utils/cn";
import type { TermIndexItem } from "@/lib/terms";
import { RelationIcon, HashtagIcon, ChevronRightIcon } from "@/components/icons";
import { getCategoryType } from "@/config/categories";
import { CategoryChip } from "@/components/ui/category";
import { ScrapButton } from "@/components/ui/buttons/ScrapButton";
import { useScrapToggle } from "@/hooks/useScrapToggle";

interface RelatedTabProps {
	relatedTerms: TermIndexItem[];
}

export function RelatedTab({ relatedTerms }: RelatedTabProps) {
	return (
		<article className="flex flex-col gap-5 rounded-xl border border-gray-800 p-7">
			<div className="flex items-center gap-2">
				<RelationIcon size={24} color="#9F74D8" />
				<h2 className="text-subtitle1 text-gray-500">연관 용어</h2>
			</div>

			{relatedTerms.length > 0 ? (
				<div className="flex flex-col gap-4">
					{relatedTerms.map((related) => (
						<RelatedTermCard key={related.id} term={related} />
					))}
				</div>
			) : (
				<p className="text-body5 text-gray-500">연관 용어가 없습니다.</p>
			)}
		</article>
	);
}

// 연관 용어 카드 컴포넌트
function RelatedTermCard({ term }: { term: TermIndexItem }) {
	const router = useRouter();
	const { bookmarked, handleToggle } = useScrapToggle(term.id);

	const category = getCategoryType(term.primaryTag);

	const handleBookmark = (e: React.MouseEvent) => {
		e.stopPropagation();
		handleToggle();
	};

	return (
		<div
			className="hover:bg-white-5 flex cursor-pointer flex-col gap-3 rounded-xl p-5 outline-1 outline-white/25 transition-colors"
			onClick={() => router.push(`/terms/${term.slug}`)}
		>
			{/* Header */}
			<div className="flex flex-col gap-1.5">
				<div className="flex items-center justify-between">
					<div className="flex flex-1 items-center gap-2">
						<CategoryChip category={category} />
						{/* Term Name */}
						<span className="text-subtitle1 text-gray-50">
							{term.termEn || term.termKo}
						</span>
					</div>

					{/* Action Buttons */}
					<div className="flex items-center gap-1">
						<ScrapButton bookmarked={bookmarked} onClick={handleBookmark} />
						<button className="bg-white-10 flex h-6 w-6 items-center justify-center rounded">
							<ChevronRightIcon size={16} color="#D4C2F0" />
						</button>
					</div>
				</div>

				{/* Aliases */}
				<div className="flex items-center gap-1">
					<HashtagIcon size={14} color="#9E9E9E" />
					<span className="text-[10px] leading-3.5 font-light text-gray-500">
						{term.termKo}
					</span>
				</div>
			</div>

			{/* Tags */}
			<div className="flex flex-wrap gap-1">
				<span
					className={cn(
						"rounded-full px-2 py-0.5 text-[10px] leading-3.5 font-light text-white",
						`bg-category-${category}/50`
					)}
				>
					# {term.primaryTag}
				</span>
				{term.tags
					.filter((tag) => tag !== term.primaryTag)
					.slice(0, 2)
					.map((tag, idx) => (
						<span
							key={idx}
							className="rounded-full bg-gray-900 px-2 py-0.5 text-[10px] leading-3.5 font-light text-gray-300"
						>
							# {tag}
						</span>
					))}
			</div>

			{/* Summary */}
			<p className="text-caption1 line-clamp-3 text-gray-400">{term.summary}</p>
		</div>
	);
}
