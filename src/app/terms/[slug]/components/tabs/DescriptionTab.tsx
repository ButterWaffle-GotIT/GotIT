import { cn } from "@/utils/cn";
import type { TermDetail } from "@/lib/terms";
import { InfoIcon, HashtagIcon } from "@/components/icons";
import { getCategoryType } from "@/config/categories";

interface DescriptionTabProps {
	term: TermDetail;
}

export function DescriptionTab({ term }: DescriptionTabProps) {
	const category = getCategoryType(term.primaryTag);

	return (
		<>
			{/* Description Card */}
			<article className="flex flex-col gap-5 rounded-xl border border-gray-800 p-7">
				<div className="flex items-center gap-2">
					<InfoIcon size={24} color="#9F74D8" />
					<h2 className="text-subtitle1 text-gray-500">상세 설명</h2>
				</div>
				<p className="text-body4 whitespace-pre-line text-white">
					{term.description}
				</p>
			</article>

			{/* Keywords Card */}
			{term.keywords && term.keywords.length > 0 && (
				<article className="flex flex-col gap-4 rounded-xl border border-gray-800 p-7">
					<div className="flex items-center gap-2">
						<HashtagIcon size={24} color="#9F74D8" />
						<h2 className="text-subtitle1 text-gray-500">관련 키워드</h2>
					</div>
					<div className="flex flex-wrap gap-1">
						{/* Primary Tag */}
						<span
							className={cn(
								"rounded-full px-2 py-0.5 text-[10px] leading-3.5 font-light text-white",
								`bg-category-${category}/50`
							)}
						>
							# {term.primaryTag}
						</span>
						{/* Other Tags */}
						{term.tags
							.filter((tag) => tag !== term.primaryTag)
							.map((tag, idx) => (
								<span
									key={idx}
									className="rounded-full bg-gray-900 px-2 py-0.5 text-[10px] leading-3.5 font-light text-gray-300"
								>
									# {tag}
								</span>
							))}
						{/* Keywords */}
						{term.keywords.map((keyword, idx) => (
							<span
								key={idx}
								className="rounded-full bg-gray-900 px-2 py-0.5 text-[10px] leading-3.5 font-light text-gray-300"
							>
								# {keyword}
							</span>
						))}
					</div>
				</article>
			)}
		</>
	);
}
