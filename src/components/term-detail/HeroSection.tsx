"use client";

import { cn } from "@/utils/cn";
import type { TermDetail } from "@/lib/terms";
import {
	ChevronLeftIcon,
	ScrapIcon,
	ShareIcon,
	LightIcon,
	HashtagIcon,
} from "@/components/icons";
import { getCategoryConfig } from "./types";

interface HeroSectionProps {
	term: TermDetail;
	bookmarked: boolean;
	onBack: () => void;
	onBookmark: () => void;
	onShare: () => void;
}

export function HeroSection({
	term,
	bookmarked,
	onBack,
	onBookmark,
	onShare,
}: HeroSectionProps) {
	const { config } = getCategoryConfig(term.primaryTag);
	const Icon = config.icon;

	return (
		<section className="flex flex-col gap-10">
			{/* Back Button */}
			<button
				onClick={onBack}
				className="flex h-6 w-6 items-center justify-center"
				aria-label="뒤로 가기"
			>
				<ChevronLeftIcon size={24} color="white" />
			</button>

			{/* Title Row */}
			<div className="flex items-start justify-between">
				<div className="flex items-end gap-3">
					{/* Category Badge */}
					<div
						className={cn(
							"glass flex h-16 w-16 items-center justify-center rounded-xl",
							config.bgColor
						)}
					>
						<Icon size={42} color="white" />
					</div>
					{/* Term Name */}
					<h1 className="text-h2 text-white">
						{term.term.en || term.term.ko}
					</h1>
				</div>

				{/* Action Buttons */}
				<div className="flex items-center gap-2">
					<button
						onClick={onBookmark}
						className={cn(
							"flex h-9 w-9 items-center justify-center rounded-md transition-colors",
							bookmarked
								? "bg-primary-500/30"
								: "bg-white-10 hover:bg-white-20"
						)}
						aria-label="스크랩"
					>
						<ScrapIcon
							size={24}
							color={bookmarked ? "#9F74D8" : "#D4C2F0"}
						/>
					</button>
					<button
						onClick={onShare}
						className="bg-white-10 hover:bg-white-20 flex h-9 w-9 items-center justify-center rounded-md transition-colors"
						aria-label="공유"
					>
						<ShareIcon size={24} color="#D4C2F0" />
					</button>
				</div>
			</div>

			{/* Aliases & Summary Quote */}
			<div className="flex items-center gap-4">
				<div className="h-11 w-1 bg-gray-100" />
				<div className="flex flex-col gap-1">
					{/* Aliases */}
					{term.aliases && term.aliases.length > 0 && (
						<div className="flex items-center gap-2">
							<HashtagIcon size={14} color="#9E9E9E" />
							<div className="flex items-center gap-2">
								{[term.term.ko, ...term.aliases].map((alias, idx) => (
									<span key={idx} className="text-caption1 text-gray-500">
										{alias}
									</span>
								))}
							</div>
						</div>
					)}
					{/* Summary */}
					<p className="text-body4 text-white">
						&ldquo;{term.summary}&rdquo;
					</p>
				</div>
			</div>

			{/* One-liner Card */}
			{term.onelinerForNonTech && (
				<div className="rounded-xl bg-linear-to-r from-brand-purple/40 to-brand-red/40 p-5">
					<p className="text-body5 text-gray-500">쉬운 한줄 정리</p>
					<div className="mt-1 flex items-center gap-3">
						<LightIcon size={20} color="#D4C2F0" />
						<p className="text-body3 text-gray-50">
							{term.onelinerForNonTech}
						</p>
					</div>
				</div>
			)}
		</section>
	);
}
